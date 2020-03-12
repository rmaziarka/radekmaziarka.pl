---
title: 'Dynamic model validation with Fluent Validation'
slug: '/2016/03/30/dynamic-model-validation-with-fluent-validation/'
date: Wed, 30 Mar 2016 17:09:43 +0000
draft: false
featured_image: 'images/2016/03/wind-surfing-67627_1280.jpg'
category: 'Fluent Validation'
tags: ['']
---

Sometimes, there is a need to implement dynamic model in your application to handle sophisticated user requirements. For example, in online store there is an option for administrator to define dynamic fields for the products. Then, employees of this store can use these dynamic fields for adding new information for theirs products. Naturally, such dynamism should not allow to insert invalid data - everything should be validated before showing it to the end user. But how to handle such validation? You could think, that this would require many of hours spent on thinking about such mechanism, but you are wrong. This functionality is very easy to develop in _FluentValidation_.

At the beginning let's create some sample structure to store fields and values. There are many ways to do it, but I wanted to make it as simple as possible so I decided not to use any generic structure, and define everything explicit. These are definitions of fields:

```csharp
public class Field
{
    public int Id { get; set; }

    public string Name { get; set; }

    public IEnumerable<ValidationRule> ValidationRules { get; set; }
}

public class IntegerField: Field {}

public class StringField: Field {}
```

As you can see, there are 2 types of fields: string and integer. For every of this field you can define specific validation rule:

```csharp
public class ValidationRule { }

public class IntegerRangeValidationRule: ValidationRule
{
    public IntegerRangeValidationRule(int min, int max)
    {
        Min = min;
        Max = max;
    }
    public int Min { get; private set; }
    public int Max { get; private set; }
}

public class StringNotEmptyValidationRule: ValidationRule {}

public class StringRegexValidationRule : ValidationRule
{
    public StringRegexValidationRule(string regex)
    {
        Regex = regex;
    }

    public string Regex { get; private set; }
}
```

Let's define 2 fields for  the Product entity: Millesimal fineness for jewelry and ISBN for books. ISBN cannot be empty and needs to be in specific format, Millesimal  fineness needs to be defined between 0 and 1000. For this showcase they are stored in simple provider.

```csharp
public static class FieldsProvider
{
    public static IEnumerable<Field> GetFields()
    {
        return new Field[]
        {
            new StringField() 
            {
                Id = 1,
                Name = "ISBN",
                ValidationRules = new ValidationRule[]
                {
                    new StringNotEmptyValidationRule(),
                    new StringRegexValidationRule(@"^(97(8|9))?\\d{9}(\\d|X)$"),
                }
            },
            new IntegerField() 
            {
                Id = 2,
                Name = "Millesimal fineness",
                ValidationRules = new ValidationRule[]
                {
                    new IntegerRangeValidationRule(0, 1000)
                }
            }
        };
    } 
}
```

Now let's check the values structure. Product has a list of _FieldValue_ entities, which contain value for every field that is defined for this product. Right now there are only two types of field values: _StringFieldValue_ and _IntegerFieldValue_.

```csharp
public class Product
{
    public string Name { get; set; }

    public IEnumerable<FieldValue> FieldValues { get; set; } 
}

public class FieldValue
{
    public int FieldId { get; set; }
}

public class IntegerFieldValue : FieldValue
{
    public int Value { get; set; }
}

public class StringFieldValue: FieldValue
{
    public string Value { get; set; }
}
```

These entities are used during definition product data from employee panel.

And finally validation. There are two field validators: _IntegerFieldValidator_ and _StringFieldValidator_, which creates rules about validating specific fields. These validators derive from base class _BaseFieldValidator_, which contains shared code between validators. Adding new validator rule is very simple - you just add new rule to dictionary in destination validator and during validator creation rule is connected to validator instance.

```csharp
public abstract class BaseFieldValidator<T> : AbstractValidator<T>
{
    protected BaseFieldValidator(Field field)
    {
        AttachValidators(field);
    }
    protected abstract Dictionary<Type, Action<ValidationRule, Field>> RuleDictionary { get; }

    private void AttachValidators(Field field)
    {
        foreach (var validationRule in field.ValidationRules)
        {
            var validationRuleAction = RuleDictionary[validationRule.GetType()];
            validationRuleAction(validationRule, field);
        }
    }
}

public class IntegerFieldValidator : BaseFieldValidator<int>
{
    public IntegerFieldValidator(Field field) : base(field) { }

    private Dictionary<Type, Action<ValidationRule, Field>> ruleDictionary;

    protected override Dictionary<Type, Action<ValidationRule, Field>> RuleDictionary
    {
        get
        {
            return ruleDictionary ?? (ruleDictionary = new Dictionary<Type, Action<ValidationRule, Field>>
            {
                [typeof(IntegerRangeValidationRule)] = AddIntegerRangeValidationRule
            });
        }
    }

    private void AddIntegerRangeValidationRule(ValidationRule validationRule, Field field)
    {
        var rangeValidationRule = (IntegerRangeValidationRule) validationRule;

        this.RuleFor(i => i)
            .GreaterThan(rangeValidationRule.Min)
            .LessThan(rangeValidationRule.Max)
            .WithName(field.Name);
    }
}

public class StringFieldValidator : BaseFieldValidator<string>
{
    public StringFieldValidator(Field field) : base(field) { }

    private Dictionary<Type, Action<ValidationRule, Field>> ruleDictionary;

    protected override Dictionary<Type, Action<ValidationRule, Field>> RuleDictionary
    {
        get
        {
            return ruleDictionary ?? (ruleDictionary =  new Dictionary<Type, Action<ValidationRule, Field>>
            {
                [typeof(StringNotEmptyValidationRule)] = AddStringNotEmptyValidationRule,
                [typeof(StringRegexValidationRule)] = AddStringStringRegexValidationRule
            });
        }
    }

    private void AddStringNotEmptyValidationRule(ValidationRule validationRule, Field field)
    {
        this.RuleFor(s => s).NotEmpty().WithName(field.Name);
    }

    private void AddStringStringRegexValidationRule(ValidationRule validationRule, Field field)
    {
        var regexValidationRule = (StringRegexValidationRule) validationRule;
        this.RuleFor(s => s).Matches(regexValidationRule.Regex).WithName(field.Name);
    }
}
```

As you can see, you can dynamically choose, which validation should be set, by the rules in field. I really like to use dictionaries to control the logic flow because it's easy to read and expand it, if new validation rule come out. In the future, connecting rules to validators can be refactored to some factory, but for post needs this code is good enough.

These validators are run by _FieldValidatorRunner_, which knows which validator is used to validate specific field. Runner is used by _FieldValuesValidator_, validator for list of _FieldValue_. Validate method is overrided to return all validation errors in one _ValidationResult_. This validator is set in _ProductValidation_.

```csharp
public class FieldValidatorRunner
{
    private Dictionary<Type, Func<Field, FieldValue, ValidationResult>> _fieldValidators;

    public FieldValidatorRunner()
    {
        _fieldValidators =
        new Dictionary<Type, Func<Field, FieldValue, ValidationResult>>()
        {
            [typeof(IntegerField)] = RunIntegerValidator,
            [typeof(StringField)] = RunStringValidator
        };
    }

    private ValidationResult RunIntegerValidator(Field field, FieldValue fieldValue)
    {
        var integerField = (IntegerField)field;
        var integerFieldValue = (IntegerFieldValue)fieldValue;
        var integerValidator = new IntegerFieldValidator(integerField);

        var validationResult = integerValidator.Validate(integerFieldValue.Value);

        return validationResult;
    }

    private ValidationResult RunStringValidator(Field field, FieldValue fieldValue)
    {
        var stringField = (StringField) field;
        var stringFieldValue = (StringFieldValue) fieldValue;
        var integerValidator = new StringFieldValidator(stringField);

        var validationResult = integerValidator.Validate(stringFieldValue.Value);

        return validationResult;
    }

    public ValidationResult RunFieldValidatorForField(Field field, FieldValue fieldValue)
    {
        var fieldValidatorRunner = _fieldValidators[field.GetType()];

        var validationResult = fieldValidatorRunner(field, fieldValue);

        return validationResult;
    }
}

public class FieldValuesValidator : AbstractValidator<IEnumerable<FieldValue>>
{
    private IEnumerable<Field> _fields;
    private FieldValidatorRunner _fieldValidationRunner;

    public FieldValuesValidator()
    {
        _fields = FieldsProvider.GetFields();
        _fieldValidationRunner = new FieldValidatorRunner();
    }

    public override ValidationResult Validate(ValidationContext<IEnumerable<FieldValue>> context)
    {
        var fieldValues = context.InstanceToValidate;
        var validationResultList = new List<ValidationResult>();

        foreach (var fieldValue in fieldValues)
        {
            var field = _fields.First(f => f.Id == fieldValue.FieldId);
            var validationResult = _fieldValidationRunner.RunFieldValidatorForField(field, fieldValue);
            validationResultList.Add(validationResult);
        }

        var errors = validationResultList.SelectMany(el => el.Errors);
        return new ValidationResult(errors);
    }
}

public class ProductValidator: AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(p => p.Name).NotEmpty();
        RuleFor(p => p.FieldValues).SetValidator(new FieldValuesValidator());
    }
}
```

Running validation doesn't differ from  typical _FV_ validation - this is an example of validating book and jewerly:

```csharp
var products = new Product[]
{
    new Product()
    {
        Name = "Book with wrong ISBN",
        FieldValues = new FieldValue[]
        {
            new StringFieldValue() {FieldId = 1, Value = "12345"}
        }
    },
    new Product()
    {
        Name = "Jewelry with wrong millesimal fineness",
        FieldValues = new FieldValue[]
        {
            new IntegerFieldValue() {FieldId = 2, Value = 1500 }
        }
    }
};

foreach (var product in products)
{
    var validator = new ProductValidator();
    var result = validator.Validate(product);
    WriteValidationResults(product, result);
}
```

![dynamicValidationResult](http://radblog.pl/wp-content/uploads/2016/03/dynamicValidationResult.jpg)

### Summary

As you could see, adding validation to dynamic model is not so hard as it could appear. There are many ways to achieve it and I showed the most simple and easy to understand solution, but you can create more sophisticated structure. The most important thing is that _FluentValidation_ can add rules to validator during runtime, so we don't need to struggle with reflection or other complicated topics. This solution allows to add a new type of field in few minutes of work and it's easy to maintain even with many fields and rules.

In this showcase I didn't show you a lot of code, that should be in production system, for example: validation if field is connected to specific type of product before adding field value to it. In addition I completely ignored information how to store such dynamic structure in database. These are quite interesting topics, but I would completely break the flow of this post so let's leave it for next posts.

You can find working example at my [GitHub](https://github.com/rmaziarka/FluentValidation.Examples).

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Dynamic-model-validation-with-Fluent-Validation-RadBlog "") - <time datetime="2016-03-31 00:15:10">Mar 4, 2016</time>

**Dynamic model validation with Fluent Validation | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[FluentValidation &#8211; walidacja dynamicznego modelu. | RadBlog](http://radblog.pl/pl/2016/05/01/fluentvalidation-walidacja-dynamicznego-modelu/ "") - <time datetime="2016-05-01 20:19:31">May 0, 2016</time>

\[…\]  English \[…\]
