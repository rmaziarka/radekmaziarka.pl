---
title: 'FluentValidation - walidacja dynamicznego modelu.'
slug: '/2016/05/01/fluentvalidation-walidacja-dynamicznego-modelu/'
date: Sun, 01 May 2016 19:19:26 +0000
draft: false
featured_image: 'images/2016/03/wind-surfing-67627_1280.jpg'
category: 'Fluent Validation'
tags: ['']
---

Ten post został pierwotnie napisany w [języku angielskim](/2016/03/30/dynamic-model-validation-with-fluent-validation/), ale żeby kontynuować cykl o Fluent Validation, postanowiłem go przetłumaczyć na język polski.

Czasami, wraz z rozwojem systemu, pojawia się potrzeba zaimplementowania dynamicznego modelu. Na przykład, w sklepie internetowym administrator chciałby zdefiniować dodatkowe pola dla konkretnych kategorii produktów. Następnie pracownicy sklepu, na podstawie tych pól, dodawaliby do produktów potrzebne informacje. Naturalnie, taki dynamizm w definiowaniu modelu nie powinien pozwolić pracownikowi dodać nieprawidłowego pola - wszystko powinno być odpowiednio zwalidowane. Taka walidacja wydaje się skomplikowana, ale w oparciu o FluentValidation nie jest trudna do zaimplementowania i utrzymywania.

Na początku stwórzmy strukturę, która będzie w stanie przechowywać pola i ich wartości. Istnieje wiele sposobów aby to zrobić, bardziej lub mniej generycznych, ale na potrzeby tego posta postawiłem na prostotę.

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

Jak widać powyżej, mamy 2 rodzaje pól: typu _string_ i _integer_. Dla każdego z tych pól możemy zdefiniować osobne reguły walidacyjne:

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

Zdefiniujmy 2 pola dla encji Product: _Millesimal fineness_ czyli próbę złota dla biżuterii i _ISBN_ dla książek. ISBN nie może być pusta i musi mieć określony format, a próba złota musi być zdefiniowana pomiędzy 0 a 1000. Na potrzeby tego posta są one przechowywane w statycznym prowiderze.

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

Teraz sprawdźmy strukturę wartości dla dynamicznych pól. Każdy produkt zawiera listę typu _FieldValue_, w której znajdują się zdefiniowane wartości. Aktualnie mamy jedynie 2 rodzaje wartości pól, które odpowiadają typom pól: _StringFieldValue_ i_IntegerFieldValue_.

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

Te encje są używane podczas definiowania produktu z panelu pracownika.

I w końcu walidacja. Mamy 2 rodzaje walidatorów pól: _IntegerFieldValidator_ i _StringFieldValidator,_ które tworzą reguły walidacyjne dla konkretnych pól. Walidatory dziedziczą po bazowej klasie _BaseFieldValidator_, która współdzieli kod odpowiedzialny za podpinanie reguł walidacyjnych. Walidacja jest dodawana dynamicznie na podstawie reguł walidacyjnych w zdefiniowanych polach.

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

Aby dodać nową regułę walidacyjną wymagane jest jedynie wpisanie jej do słownika w docelowym walidatorze, a podczas walidacji reguła zostanie uruchomiona. Użyłem słowników, aby kontrolować wybór reguł walidacyjnych - przepływ logiki jest czytelny, a dodawanie kolejnych reguł jest proste i szybkie. W przyszłości, łączenie reguł do walidatorów może zostać zrefaktoryzowane do fabryki, ale na potrzeby postu kod jest wystarczająco dobry.

Walidatory są uruchamiane przez _FieldValidatorRunner_, który posiada informacje o połączeniu pól z walidatorami. Ten runner jest używany przez _FieldValuesValidator_, walidator listy _FieldValue_. Metoda _Validate_ jest nadpisywana, aby zwrócić wszystkie błędy walidacyjne w jednym _ValidationResult_. Walidator pól jest używany w głównym walidatorze produktu - _ProductValidation_.

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

Uruchomienie walidacji nie różni się od standardowej walidacji FluentValidation - poniżej mamy przykład walidowania książki i biżuterii:

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

![dynamicValidationResult](/images/2016/03/dynamicValidationResult.jpg)

### Podsumowanie

Jak widać, dodanie walidacji do dynamicznego modelu nie jest takie trudne jak by się mogło wydawać. Można to zrobić w sposób generyczny, ale przedstawiona powyżej baza jest prosta do zrozumienia i przedstawienia jako przykład. Najważniejszą rzeczą jest, że dzięki _FluentValidation_ jesteśmy w stanie dodawać reguły podczas działania aplikacji, bez uciekania się do refleksji, czy innych skomplikowanych zagadnień. To rozwiązanie pozwala nam na dodanie pól w ciągu kilku minut i jest utrzymywalne, nawet z dużą ilością pól i walidacji.

W tym poście nie pokazałem dużej ilości kodu, który powinien zawierać system produkcyjny np. walidacji czy wartość pola może być zdefiniowane dla danej kategorii produktów. Dodatkowo całkowicie pominąłem informacje jak przechowywać taką strukturę w bazie danych. Te tematy są interesujące, ale kompletnie złamałyby strukturę tego posta, dlatego zostawię je na kolejne posty.

Standardowo, działający kod jest dostępny na moim [GitHubie](https://github.com/rmaziarka/FluentValidation.Examples).

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/FluentValidation-walidacja-dynamicznego-modelu-RadBlog "") - <time datetime="2016-05-01 20:52:28">May 0, 2016</time>

**FluentValidation – walidacja dynamicznego modelu. | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
