---
title: 'CQRS - First step - Split to commands and queries'
url: '/2017/08/19/cqrs-first-step-split-to-commands-and-queries/'
date: Sat, 19 Aug 2017 09:08:46 +0000
draft: false
featured_image: 'images/2017/08/command-query.jpg'
category: 'Design patterns'
tags: ['']
---

This post series is driven by my [lightning talk](/2017/09/17/cqrs-in-4-steps-lightning-talk/) about how to introduce [CQRS ](https://martinfowler.com/bliki/CQRS.html)to your project. I thought that would be good to explain this topic further for people who won't be attending my presentation.ople who won't be attending my presentation.

I will write about:

 1.  [splitting code to commands and queries](/2017/08/19/cqrs-first-step-split-to-commands-and-queries/)
 2.  [introducing different data access](/2017/10/31/cqrs-second-step-different-data-access)
 3.  [creating simple read model](/2018/01/08/cqrs-third-step-simple-read-model/)
 4.  creating read model asynchronously with SignalR notification

You can find source codes [here](https://github.com/rmaziarka/CQRS-4steps).

Stay tuned ;)

Recent state of your app
------------------------

Let's assume that you work on an e-commerce platform. You got plenty of controllers, services and repositories in your project. Every controller use services, services use other services, multiple repositories, validators and helpers. **Dependency level increase** time and effort to find correlations between components and context in your application.

You think that system that will advantage from introducing CQRS but you find it too overwhelming and hard to implement in the current situation. On the other hand, you feel that multiple parts of your codebase are painfully difficult to understand and you want to do something with that. You would like to **implement this** **pattern step by step**, without hard breakings in your current code.

You find first weak spot - **product management**. Your products contain dynamic fields, with own validation for every defined field. Moreover fields are bound to categories so we cannot add a field value to a product that is not corresponding to a product category. At the beginning of the project you followed [this article](/2016/03/30/dynamic-model-validation-with-fluent-validation/) about creating and validating a dynamic model which resulted in such [product structure](https://gist.github.com/rmaziarka/bda1abb4891b9394d45cbc60b9cc92fc).

These models are heavily used by **ProductsService** - mainly consumer of logic from **ProductsController.** In this place, you want to start your focus. Below there is a simplified view of this service, with only 2 actions listed:

 *   GetProducts - returns products for product's grid
 *   ChangeProductFieldValue - sets value for specific product's field

```
    public class ProductsService: IProductsService
    {
        private readonly ProductDatabase _database;
        private readonly ICategoryFieldService _categoryFieldService;
        private readonly IFieldValidatorFactory _fieldValidatorFactory;
        private readonly IProductFieldHelper _productFieldHelper;
        
        public ProductsService(ProductDatabase database, 
            ICategoryFieldService categoryFieldService, 
            IProductFieldHelper productFieldHelper, 
            IFieldValidatorFactory fieldValidatorFactory)
        {
            _database = database;
            _categoryFieldService = categoryFieldService;
            _productFieldHelper = productFieldHelper;
            _fieldValidatorFactory = fieldValidatorFactory;
        }

        public IEnumerable<Product> GetProducts(GetProductsDto dto)
        {
            var products = this._database
                    .Products
                    .Include(p => p.Category)
                    .Include(p => p.FieldValues)
                    .Include(p => p.FieldValues.Select(fv => fv.Field))
                ;

            if (dto.CategoryId.HasValue)
            {
                products = products.Where(p => p.CategoryId == dto.CategoryId);
            }

            if (dto.FieldValues != null)
            {
                var fieldIds = dto.FieldValues.Select(fv => fv.Key).ToList();
                var fields = _database.Fields.Where(f => fieldIds.Contains(f.Id)).ToList();

                products = this.FilterFields(dto.FieldValues, fields, products);
            }

            return products
                .OrderBy(p => p.CreationDate)
                .Skip((dto.Page - 1) \* dto.Take)
                .Take(dto.Take)
                .ToList();
        }

        private IQueryable<Product> FilterFields(Dictionary<int, object> fieldValues, List<Field> fields, IQueryable<Product> products)
        {
            foreach (var fieldValue in fieldValues)
            {
                var field = fields.First(f => f.Id == fieldValue.Key);

                if (field is StringField)
                {
                    products = products.Where(
                        p => p.FieldValues.Any(fv => 
                            fv.FieldId == field.Id 
                            && ((StringFieldValue) fv).StringValue == (string) fieldValue.Value));
                }
                else if (field is IntegerField)
                {
                    products = products.Where(
                        p => p.FieldValues.Any(fv => 
                            fv.FieldId == field.Id 
                            && ((IntegerFieldValue) fv).IntegerValue == (int) fieldValue.Value));
                }
                // etc
            }
            return products;
        }


        public void ChangeProductFieldValue(ChangeProductFieldValueDto dto)
        {
            this._categoryFieldService.ValidateIfFieldCanBeAssignedToProduct(dto.FieldId, dto.ProductId);

            var fieldValidator = this._fieldValidatorFactory(dto.FieldId);

            fieldValidator.Validate(dto.FieldValue);

            var product = this._database.Products
                .Include(p => p.FieldValues)
                .First(fv => fv.Id == dto.ProductId);

            var fieldValue = product.FieldValues.FirstOrDefault(fv => fv.FieldId == dto.FieldId);

            if (fieldValue == null)
            {
                this._productFieldHelper.AttachValueToField(product, dto.FieldId, dto.FieldValue);
            }
            else
            {
                this._productFieldHelper.ReplaceFieldValue(product, dto.FieldId, dto.FieldValue);
            }

            _database.SaveChanges();
        }
    }
```
As you can see, only these 2 methods have already created a case for injecting 4 different dependencies. 100 lines of code for merely 2 requests, when this service needs to handle a lot of them. With more internal logic your service will start looking similar to [nopCommerce](https://www.nopcommerce.com/)'s one - [ProductService.cs](https://github.com/nopSolutions/nopCommerce/blob/651e0fc0648da34239544c47b1a6642df7f3dc51/src/Libraries/Nop.Services/Catalog/ProductService.cs). Furthermore, every change or enhancement in a request to the ProductController has to be reflected with a modifying behaviour of this service - it will lead to increasing of complexity, impeding writing and maintaining unit tests and prevent this service from future refactors.

Your **ProductService **demands some action.

Command and queries
-------------------

[![](/images/2017/08/command-query.jpg)](/images/2017/08/command-query.jpg)

> CQRS is a simple pattern – two objects for command/queries where once there was one.

This quote is from [Jimmy Bogard](https://twitter.com/jbogard?lang=en) [post](https://lostechies.com/jimmybogard/2015/05/05/cqrs-with-mediatr-and-automapper/) which teaches you how easy is first step in your application to introduce first elements of CQRS.

Jimmy created awesome library called [MediatR](https://github.com/jbogard/MediatR) which provides an in-process messaging component to your system. It extremely simplifies process of sending command and queries and responding to them - you don't need to created your own class structure, everything is given out-of-the-box.

In previous code you structure GetProductsQuery and ChangeProductCategoryCommand, both implement [IRequest](https://github.com/jbogard/MediatR/blob/master/src/MediatR/IRequest.cs) interface.
```
    public class GetProductsQuery: IRequest<IEnumerable<Product>>
    {
        public int Page { get; set; }

        public int Take { get; set; }

        public int? CategoryId { get; set; }

        public Dictionary<int, object> FieldValues { get; set; }
    }
```
```
    public class ChangeProductFieldValueCommand : IRequest
    {
        public int ProductId { get; set; }

        public int FieldId { get; set; }

        public object FieldValue { get; set; }
    }
```
As parameter type you need to define what is the type of the returned element, after handling request - as you can see command is returning nothing but the query is returning a list.

Then you define handlers of these requests - they need to implement [IRequestHandler](https://github.com/jbogard/MediatR/blob/master/src/MediatR/IRequestHandler.cs) interface, with query / command as parameter type.
```
    public class GetProductsQueryHandler: IRequestHandler<GetProductsQuery, IEnumerable<Product>>
    {
        private readonly ProductDatabase _database;

        public GetProductsQueryHandler(ProductDatabase database)
        {
            _database = database;
        }

        IEnumerable<Product> IRequestHandler<GetProductsQuery, IEnumerable<Product>>.Handle(GetProductsQuery command)
        {
            var products = this._database
                    .Products
                    .Include(p => p.Category)
                    .Include(p => p.FieldValues)
                    .Include(p => p.FieldValues.Select(fv => fv.Field))
                ;

            if (command.CategoryId.HasValue)
            {
                products = products.Where(p => p.CategoryId == command.CategoryId);
            }

            if (command.FieldValues != null)
            {
                var fieldIds = command.FieldValues.Select(fv => fv.Key).ToList();
                var fields = _database.Fields.Where(f => fieldIds.Contains(f.Id)).ToList();

                products = this.FilterFields(command.FieldValues, fields, products);
            }

            return products
                .OrderBy(p => p.CreationDate)
                .Skip((command.Page - 1) \* command.Take)
                .Take(command.Take)
                .ToList();
        }

        private IQueryable<Product> FilterFields(Dictionary<int, object> fieldValues, List<Field> fields, IQueryable<Product> products)
        {
            foreach (var fieldValue in fieldValues)
            {
                var field = fields.First(f => f.Id == fieldValue.Key);

                if (field is StringField)
                {
                    products = products.Where(
                        p => p.FieldValues.Any(fv => 
                            fv.FieldId == field.Id 
                            && ((StringFieldValue) fv).StringValue == (string) fieldValue.Value));
                }
                else if (field is IntegerField)
                {
                    products = products.Where(
                        p => p.FieldValues.Any(fv => 
                            fv.FieldId == field.Id 
                            && ((IntegerFieldValue) fv).IntegerValue == (int) fieldValue.Value));
                }
                // etc
            }
            return products;
        }
    }
```
```
    public class ChangeProductFieldValueCommandHandler: IRequestHandler<ChangeProductFieldValueCommand>
    {
        private readonly ProductDatabase _database;
        private readonly ICategoryFieldService _categoryFieldService;
        private readonly IFieldValidatorFactory _fieldValidatorFactory;
        private readonly IProductFieldHelper _productFieldHelper;

        public ChangeProductFieldValueCommandHandler(ProductDatabase database, 
            ICategoryFieldService categoryFieldService, 
            IProductFieldHelper productFieldHelper, 
            IFieldValidatorFactory fieldValidatorFactory)
        {
            _database = database;
            _categoryFieldService = categoryFieldService;
            _productFieldHelper = productFieldHelper;
            _fieldValidatorFactory = fieldValidatorFactory;
        }

        public void Handle(ChangeProductFieldValueCommand command)
        {
            this._categoryFieldService.ValidateIfFieldCanBeAssignedToProduct(command.FieldId, command.ProductId);

            var fieldValidator = this._fieldValidatorFactory(command.FieldId);

            fieldValidator.Validate(command.FieldValue);

            var product = this._database.Products
                .Include(p => p.FieldValues)
                .First(fv => fv.Id == command.ProductId);

            var fieldValue = product.FieldValues.FirstOrDefault(fv => fv.FieldId == command.FieldId);

            if (fieldValue == null)
            {
                this._productFieldHelper.AttachValueToField(product, command.FieldId, command.FieldValue);
            }
            else
            {
                this._productFieldHelper.ReplaceFieldValue(product, command.FieldId, command.FieldValue);
            }

            _database.SaveChanges();
        }
    }
```
Finally, you change your ProductController to publish messages by the injected mediator:
```
    [RoutePrefix("products")]
    public class ProductsController : ApiController
    {
        private readonly IMediator mediator;

        public ProductsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        [Route("")]
        public async Task<IEnumerable<Product>> Get([FromUri]GetProductsQuery query)
        {
            return await this.mediator.Send(query);
        }

        [HttpPut]
        [Route("{productId}/fieldvalue")]
        public async Task ChangeProductFieldValue(int productId, ChangeProductFieldValueCommand command)
        {
            command.ProductId = productId;

            await this.mediator.Send(command);
        }
    }
```
And this is it - you went your first step in CQRS journey. Command and query are defined in different files which can be treated separately with different approach about database querying, parameters validation and internal logic.

The advantage from this step:
-----------------------------

Moving from typical layered pattern to Command/Query one, without further actions, has several advantages:

 *   Concern on Single Responsibility Principle - one class which handles a request.
 *   Clearly defined target and dependencies.
 *   Avoidance of mixing code which modifies data and returns it.
 *   Deeper view of your system - finding a correlation between handlers, not layers.
 *   Less effort in maintenance and more detailed refactoring.
 *   Ease of writing unit tests.

In our case, such change gave us a better understanding of our system and possibility to move toward more complicated solutions.

The moment of denying
---------------------

![](https://media.giphy.com/media/CDJo4EgHwbaPS/giphy.gif)

Wait, but you have seen in the internet piles of articles and videos how people running their CQRS app with event sourcing, multiple databases, message queues etc. Complicated diagrams, layers, components, arrors from one way to another...

**You don't need it. **Not at the beginning.

In the simplest form, CQRS model don't need to be treated as a different database model but as different in and out objects. Splitting model to the separate storages gives a lot of value, but maintenance of a distributed system with eventual consistency model is definitely tougher that a monolit's one with a single processed request.

Just remember that nobody introduced this pattern to an existing application, with so many components, in one day. Focus on a single thing, refactor your logic into separated command and queries, and then go further for greater good. Such splitting to simple handlers, won't break your application and you will get a better insight of how your system is working. Then you can take next step.

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/CQRS-First-step-Split-to-commands-and-queries-RadBlog "") - <time datetime="2017-08-19 12:56:49">Aug 6, 2017</time>

**CQRS – First step – Split to commands and queries | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Adam D.](http://www.twitter.com/adymitruk "adam@dymitruk.com") - <time datetime="2017-09-04 06:29:00">Sep 1, 2017</time>

You don't even need read models or objects. Treat the event stream as something you can query to get going asap.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2017-09-04 09:08:00">Sep 1, 2017</time>

I think that for a lot of people event stream design can be more difficult to approach that typical object's one.
