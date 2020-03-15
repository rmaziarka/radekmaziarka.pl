---
title: 'CQRS - Third step - Simple read model'
slug: '/2018/01/08/cqrs-third-step-simple-read-model/'
date: Mon, 08 Jan 2018 10:33:54 +0000
draft: false
featured_image: 'images/2018/01/simple-read-model.jpg'
aliases: ['/2018/01/08/cqrs-third-step-simple-read-model/']
category: 'Design patterns'
tags: ['CQRS', 'Dapper', 'Domain Events', 'Entity Framework', 'MediatR']
---

This post series is driven by my [lightning talk](/2017/09/17/cqrs-in-4-steps-lightning-talk/) about how to introduce [CQRS ](https://martinfowler.com/bliki/CQRS.html)to your project. I thought that would be good to explain this topic further for people who won't be attending my presentation.

I will write about:

 1.  [splitting code to commands and queries](/2017/08/19/cqrs-first-step-split-to-commands-and-queries/)
 2.  [introducing different data access](/2017/10/31/cqrs-second-step-different-data-access)
 3.  [creating simple read model](/2018/01/08/cqrs-third-step-simple-read-model/)
 4.  creating read model asynchronously with SignalR notification

You can find source codes [here](https://github.com/rmaziarka/CQRS-4steps).

Stay tuned ;)

Recent state of your app
------------------------

In the [second step](/2017/10/31/cqrs-second-step-different-query-model/), you have changed your slow queries to use a more lightweight option to query the database: [ProjectTo](http://automapper.readthedocs.io/en/latest/Queryable-Extensions.html) extension and [Dapper](https://github.com/StackExchange/Dapper) ORM.

As the result of your actions, the system is performing faster. Only required places have been refactored - remaining command and queries, which were optimal, wasn't affected and work seamlessly.

Your current bottleneck - listless searching
--------------------------------------------

One of your new requirements is to implement more **complex filtering** - by the dynamic field values and by average rating with additional **conditional ordering**. Your complicated query ([listed here](/2017/10/31/cqrs-second-step-different-data-access/#dapper)) gets even more complicated.

After implementation, you find out that performance of the system has decreased significantly. A need for filtering data by selected columns is killing the database. You dive into this problem and, using SQL Server Profiler, realize that multiple JOIN and WHERE clauses over field value / order / rating tables are making database query too slow to accept, for an everyday user.

You heard that creating a **different data model **could help with this situation, but how to realize it without refactoring the whole system?

Simple read model - to the rescue
---------------------------------

[![](/images/2018/01/simple-read-model.jpg)](/images/2018/01/simple-read-model.jpg)

Read model is about creating a different store of your data with simplified schema and lower connections to other tables. You still use your previous tables but you treat them as write model.

This pattern allows you to separate your write logic from a read logic - write part can be complicated to answer your needs but the read part will gather data with astonishing speed. You can use [JSON columns](https://docs.microsoft.com/en-us/sql/relational-databases/json/json-data-sql-server), [JSON indexes](https://docs.microsoft.com/en-us/sql/relational-databases/json/index-json-data), [column stores](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/columnstore-indexes-overview), [graphs](https://docs.microsoft.com/en-us/sql/relational-databases/graphs/sql-graph-overview) and others - all these things that would be problematic in the standard part of an application.

Creating read model is a different thing. You don't want to fill two (or more) different stores with data in a command - it would break single responsibility principle and would cause problems with maintaining the application. So you decide to look at a different solution to this problem - domain events.

Domain events
-------------

[![](/images/2018/01/domain-events-1.jpg)](/images/2018/01/domain-events-1.jpg)

[DDD](https://en.wikipedia.org/wiki/Domain-driven_design) gives you multiple building blocks to help to build a better system. [Domain event](https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/microservice-ddd-cqrs-patterns/domain-events-design-implementation) is one of them - it allows you to handle additional logic that is not crucial in your current context. For example, you would like to send an email after placing an order. You publish a domain event and handle it in a custom handler.

You are able to introduce Domain events to your application in service pattern, but it creates multiple difficult questions like "Where we should throw events?", "What if we use this service in different place and we don't want to send event?". With CQRS these answers are simple. **At the end of command handler, throw an event**. Then, somewhere else attach to it and run action. Nothing will interfere with your command handlers because they are independent objects.

So you design a graph to show how the events will be thrown and used to create required read model.

[![](/images/2017/12/domain-events.png)](/images/2017/12/domain-events.png)

Every action, which embraces products, at the end publishes an event. It is handed in the event handler (specially dedicated for product read model) which adds or modify particular data in the database. Simple but powerful.

**Events**
----------

Each event contains a set of data which informs what was changed in a command handler.
```
    public class ProductAddedEvent : INotification
    {
        public ProductAddedEvent(int id, string name, int categoryId)
        {
            Id = id;
            Name = name;
            CategoryId = categoryId;
        }

        public int Id { get; }

        public string Name { get; }

        public int CategoryId { get; }
    }
```
All events are available [here](https://gist.github.com/rmaziarka/6ddb02f3b2380b200dee5d54d76aedb0).

Each event implements [INotification](https://github.com/jbogard/MediatR/wiki#publishing) interface from **MediatR** library. It allows publishing an event in MediatR pipeline, at the end of processing command in command handler.

Command handlers
----------------

Now you add throwing an event in every command handler which is dedicated to the product management.
```
    public class AddProductCommandHandler : IRequestHandler<AddProductCommand>
    {
        private readonly ProductDatabase _database;
        private readonly IMediator _mediator;

        public AddProductCommandHandler(ProductDatabase database, IMediator mediator)
        {
            _database = database;
            _mediator = mediator;
        }

        public void Handle(AddProductCommand command)
        {
            // command validation
            // add product to database
            
            var @event = new ProductAddedEvent(product.Id, product.Name, product.CategoryId);
            _mediator.Publish(@event);
        }
    }
```
All command handlers are listed [here](https://gist.github.com/rmaziarka/8cfec165c86371e4c554f33ca3f04ede).

Every particular event is created on the basis of data from the model. You pass it to mediator object and publish - no additional logic. Such behavior allows you to keep your command handler simple and maintainable in a longer perspective.

Read model - product structure
------------------------------

At that time, you define your product read model, which is used to store the data in the database.
```
    public class ProductReadModel
    {
        public int Id { get; private set; }

        public string Name { get; private set; }

        public int CategoryId { get; private set; }

        public int OrderAmount { get; private set; }

        public ReviewReadModel Review { get; private set; }

        public Dictionary<int, object> FieldValues { get; private set; }
        
        // public constructor
        // public methods
        // Review class
    }
```
Full read model is listed [here](https://gist.github.com/rmaziarka/02045d052fbbf66373fcf931c899c286). Besides data fields, read model also contains methods to handle events. It allows embracing specific logic inside the read model and not spreading it across the system. You decide to modify a state of your model only by applying events to it.

**Review** and **FieldValues** are created to make the model more flexible and readable. They are stored in the database as JSON string, Review as whole object and FieldValues as dictionary FieldValue.Id - FieldValue.Value.

Event handlers
--------------

You create event handlers very straightforward - they create or gather product from the repository, apply the event to model and save it to the database.
```
    public class ProductAddedEventHandler: INotificationHandler<ProductAddedEvent>
    {
        private readonly IProductReadModelRepository _repo;

        public ProductAddedEventHandler(IProductReadModelRepository repo)
        {
            _repo = repo;
        }

        public void Handle(ProductAddedEvent @event)
        {
            var product = new ProductReadModel(@event);
            _repo.Insert(product);
        }
    }
```
All event handlers are listed [here](https://gist.github.com/rmaziarka/d3b0d39a3c1c1804641e19a0cff742ac).

To be able to find and modify read models you create an additional repository:
```
    public class ProductReadModelRepository : IProductReadModelRepository
    {
        private readonly SqlConnection _sqlConnection;

        public ProductReadModelRepository(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection;
        }

        public ProductReadModel Find(int productId)
        {
            return _sqlConnection.QuerySingle<ProductReadModel>("SELECT \* FROM Products WHERE Id = @Id", new { Id = productId });
        }

        public void Insert(ProductReadModel product)
        {
            _sqlConnection.Execute(
                @"INSERT INTO Products (Id, Name, CategoryId, OrderAmount, Review, FieldValues) 
                VALUES(@Id, @Name, @CategoryId, @OrderAmount @Review, @FieldValues)",
                product);
        }

        public void Update(ProductReadModel product)
        {
            _sqlConnection.Execute(
                @"UPDATE Products (Name, CategoryId, OrderAmount, Review, FieldValues) 
                VALUES(@Name, @CategoryId, @OrderAmount @Review, @FieldValues)
                WHERE Id = @Id",
                product);
        }
    }
```
You use a Dapper internal mechanism to handle serialization and deserialization of JSON columns: Review and FieldValues. With this separation, your event handlers are cut off from database layer and can be tested with more simplicity.

Products query handler
----------------------

Now you change your handler to gather products from new read model. First the command:
```
    public class GetProductsQuery
    {
        public Dictionary<int, object> FieldValues { get; set; } = new Dictionary<int, object>();

        public float? AtLeastRating { get; set; }

        public SortOrder SortOrder { get; set; }

        public SortColumn SortColumn { get; set; }

        public int Take { get; set; }

        public int Page { get; set; }
    }
```
Then you change your handler to gather data by Dapper extensions to the SqlConnection. It uses JSON search capabilities, available from [SQL Server 2016](https://docs.microsoft.com/en-us/sql/relational-databases/json/json-data-sql-server).
```
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, IEnumerable<Product>>
    {
        private readonly SqlConnection _sqlConnection;
        private readonly Dictionary<SortColumn, string> _sortColumnDict = new Dictionary<SortColumn, string>()
        {
            [SortColumn.ReviewCount] = "JSON\_VALUE(Review, '$.Count') ",
            [SortColumn.ReviewAverage] = "JSON\_VALUE(Review, '$.Average') ",
            [SortColumn.OrderAmount] = "OrderAmount "
        };

        public GetProductsQueryHandler(SqlConnection sqlConnection)
        {
            _sqlConnection = sqlConnection;
        }

        IEnumerable<Product> IRequestHandler<GetProductsQuery, IEnumerable<Product>>.Handle(GetProductsQuery command)
        {
            var builder = new SqlBuilder();

            // template
            var selector = builder.AddTemplate(
                @"SELECT \* FROM Products /\*\*where\*\*/ /\*\*orderby\*\*/
	            OFFSET @Take \* (@Page - 1) ROWS
	            FETCH NEXT @Take ROWS ONLY; "); 
            builder.AddParameters(new { command.Page, command.Take });

            // filtering - rating
            if (command.AtLeastRating.HasValue)
            {
                builder.Where("JSON\_VALUE(Review,'$.Average') >= @AtLeastRating", command);
            }

            // filtering - field values
            foreach (var fieldValue in command.FieldValues)
            {
                var path = $"$.\\"{fieldValue.Key}\\""; // 1 => $."1"
                builder.Where(@"JSON\_VALUE(FieldValues, @Path) = @Value", new { Path = path, Value = fieldValue.Value });
            }

            // ordering
            var orderBy = _sortColumnDict[command.SortColumn];
            orderBy += command.SortOrder == SortOrder.Ascending ? "ASC" : "DESC";
            builder.OrderBy(orderBy);

            // running SQL query
            var products = _sqlConnection.Query<ProductReadModel>(selector.RawSql, selector.Parameters);

            return products;
        }
    }
```
You build your SQL query in query handler adding dynamically WHERE and ORDER parameters, depending on values in command:

 *   Filtering by review average rating - checking if a rating is higher or equal than sent.
 *   Filtering by field value - checking is field value is equal as in command.
 *   Ordering by Review Count / Review Average Rating / Order Amount.

Your products query currently is not using any additional table - just the ProductsReadModel. With a [mechanism](https://docs.microsoft.com/en-us/sql/relational-databases/json/index-json-data) to index JSON columns, your queries are performing a way better than before.

Transaction between Dapper and EF
---------------------------------

To avoid losing data between command handlers and event handlers, in case of failure, there is a need to implement database transaction. It should embrace logic defined in both handlers but it should not affect your written code. So you decide to implement it at the infrastructure level.

There are multiple ways to do it, [at the request level](/2018/01/04/asp-net-autofac-shared-transaction-on-request-level/), [at the command level](/2018/01/04/mediatr-autofac-shared-transaction-on-command-level/), etc. You decide to do it at the command level to make it more flexible and fine-grained.

Creating transaction between database calls versus saving changes in every command / event and handling failure is a decision that everybody needs to make, depending on your requirements. To deepen this topic I recommend a great article in [.NET Microservices. Architecture for Containerized .NET Applications](https://docs.microsoft.com/en-us/dotnet/standard/microservices-architecture/microservice-ddd-cqrs-patterns/domain-events-design-implementation#single-transaction-across-aggregates-versus-eventual-consistency-across-aggregates) book.

Re-create your read model
-------------------------

Your system is currently running so you cannot just start applying new events because existing products won't be transferred to the read model. You need to handle it yourself, by a different scenario.

You decide to do it as straightforward as it can be - during the database migration. When a new structure for a read model is created, it will automatically be filled with desired data.

Result SQL looks like [that](https://gist.github.com/rmaziarka/fd7921fc70e19d74f9184ba2884adb0e). It goes through every row in Products table and creates the analogical row in the ProductReadModel table. The most difficult part - flattening Field Values is accomplished by using a [STRING\_AGG](https://sqlperformance.com/2016/12/sql-performance/sql-server-v-next-string_agg-performance) function which allows concatenating multiple values into a single one. Unfortunately, the dynamic field value model requires CASE syntax to gather value from the proper column.

Of course, this is the simplest solution and with more complex scenarios, it won't be sufficient to cover all edge cases. More sophisticated solutions are:

 *   Custom mechanism to drop whole read model and recreate it on demand. You can define it on database or system level.
 *   Batching data migration, depending on a data structure.
 *   [Feature flags](https://martinfowler.com/articles/feature-toggles.html) - allows switching the products query handler from the previous model to new read model.
 *   [Blue-green deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html) - works together with feature flag to get the certainty that returned view is the same.
 *   [Event sourcing](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) - create an event for existing data and store all new events additionally in the different table. Then start [projection](https://abdullin.com/post/event-sourcing-projections/).

Summary
-------

The third step to implement CQRS requires **creating read model** to improve the performance of querying your system. It's better to start doing it synchronously than asynchronously to avoid problems with eventual consistency and reverting failures. By that step, you will have **two different models** for your data - write model and read model. Each dedicated to handling their scenario in a most effective way.

This approach can be applied to different scenarios or different bounded contexts in a single application. You can create multiple read models when performance needs it, and continually use write model to read in more straightforward cases.

Unfortunately, this approach has one big drawback - both command and event handlers **are applied in one transaction**. With more time-consuming reactions to your commands, whole application will start working less sufficient and be less useful for your users. To resolve this problem you will need to create your read model asynchronously, with all its difficulties and consequences.

So stay tuned for next posts 😉

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/CQRS-Third-step-Synchronous-read-model-Radek-Maziarka-Blog "") - <time datetime="2018-01-08 20:55:38">Jan 1, 2018</time>

**CQRS – Third step – Synchronous read model | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
