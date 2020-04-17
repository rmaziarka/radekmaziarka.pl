---
title: 'FluentValidation - podstawy'
url: '/2016/03/10/fluentvalidation-podstawy/'
date: Thu, 10 Mar 2016 17:45:20 +0000
draft: false
category: 'Fluent Validation'
tags: ['']
---

Walidacja danych wejściowych jest jedną z najczęściej implementowanych przez nas funkcji w naszych aplikacjach. Bardzo często używa się wtedy wbudowanych adnotacji [Data Annotations](https://msdn.microsoft.com/en-us/library/dd901590%28VS.95%29.aspx?f=255&MSPPError=-2147217396), gdyż są od razu dostępne i pojawiają się w większości tutoriali od Microsoftu. Dodatkowo, w ASP.NET MVC, bez żadnych dodatkowych konfiguracji, kontroler waliduje dane na wejściu i umieszcza błędy w obiekcie _ModelState. _Dla prostych walidacji lub nieskomplikowanych projektów _Data Annotations_ są najlepszym rozwiązaniem.

Problem pojawia się, gdy chcemy zrobić bardziej skomplikowaną walidację - po wielu polach naraz, warunkową czy wymagającą dostępu do bazy danych. Sam wiele razy kląłem pisząc skomplikowane zawijasy, by móc moją logikę biznesową ubrać w adnotacje. Ponad to, brak możliwości wstrzykiwania zależności do adnotacji sprawia, że ich testowanie staje się bardzo trudne i czasochłonne. Długo walczyłem z _Data Annotations, _aż w końcu odnalazłem lepszą bibliotekę, którą używam już od kilku lat.

### FluentValidation na ratunek

[FluentValidation](https://github.com/JeremySkinner/FluentValidation) jest biblioteką, która pozwala pisać reguły walidacyjne za pomocą interfejsu _fluent_ ([wiki EN](https://en.wikipedia.org/wiki/Fluent_interface), [przykład PL](http://kamiljozwiak.net/fluent-api/)). Taki sposób pisania kodu jest o wiele bardziej zrozumiały dla czytelnika i upraszcza utrzymywanie kodu. Dzięki temu, nawet przy skomplikowanej logice walidacyjnej i wielu krzyżujących się walidacjach, wciąż będziecie mogli nadążać nad tym, co się dzieje w waszej aplikacji. Dodatkowo biblioteka znakomicie wspiera wstrzykiwanie zależności, co upraszcza testowanie walidatorów i reguł walidacji. Całość w prosty sposób wpina się w aktualnie używany przez was framework i nadaje się do używania w ciągu kilku minut.

W tym artykule pokażę podstawy _FluentValidation_, zaś w kolejnych będę przedstawiać bardziej skomplikowane koncepty tej biblioteki - integracje z ASP.NET MVC, wstrzykiwanie zależności, współdzielone walidatory i inne.

### FluentValidation - podstawy

Rozpoczniemy od instalacji _FluentValidation_ w naszym projekcie. Aby to zrobić wpisujemy w _Package Manager Console_:

```
Install-Package FluentValidation
```

Następnie utwórzmy klasę dla typowego użytkownika systemu:

```csharp
public class User
{
    public string UserName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }
}
```

I teraz pojawia się pytanie jak zwalidować obiekt tej klasy przez naszą nową bibliotekę. Najłatwiej jest to zrobić przez użycie abstrakcyjnej klasy _AbstractValidator,_ dostępnej w _FluentValidation_, po której dziedziczymy tworząc nasz walidator. Jest ona generyczna, a my wskazujemy na klasę, którą chcemy walidować.

```csharp
public class UserValidator: AbstractValidator<User>
{
    public UserValidator()
    {
        this.RuleFor(r => r.UserName).NotEmpty().Length(0, 50);

        this.RuleFor(r => r.Email).NotEmpty().EmailAddress().Length(0, 100);

        this.RuleFor(r => r.Password).NotEmpty().Length(6, 50);
    }
}
```

W konstruktorze tworzymy nasze reguły używając metody _RuleFor _i wskazując na pole, które chcemy walidować. Następnie używając _Extension Methods_ dopisujemy kolejne reguły biznesowe, jakie ma to pole spełniać. Dzięki _Fluent Interface _dopisujemy te reguły jedna po drugiej, przez co wszystko czyta się bardzo prosto i od razu widzimy, jakie są zasady dla każdego z naszych pól.

Aby zwalidować obiekt użytkownika, tworzymy walidator i używamy metody _Validate_. I tyle, po prostu działa.

```csharp
class Program
{
    static void Main(string[] args)
    {
        var validator = new UserValidator();
        var user = new User() { Email = "user@gmail.com", Password = "123456", UserName = "user" };
        var validationResult = validator.Validate(user);

        Console.WriteLine($"Wynik walidacji: {validationResult.IsValid}");
    }
}
```

![ConsoleFluentValidation2](/images/2016/03/ConsoleFluentValidation2.png)

I jak widzimy - walidacja się powiodła. Dodając drugiego użytkownika, który nie przechodzi walidacji, i rozwijając trochę wizualizację wyniku można dość do takiego wyniku:

```csharp
var validator = new UserValidator();

var usersToValidate = new User[]
{
    new User() {Email = "user@gmail.com", Password = "123456", UserName = "user"},
    new User() {Email = "user@gmail", Password = "123", UserName = ""}
};

foreach (var user in usersToValidate)
{
    var result = validator.Validate(user);
    // wypisanie rezultatów
}
```

![ConsoleFluentValidation](/images/2016/03/ConsoleFluentValidation-2.png)

Komunikaty walidacyjne są dostarczane razem z tłumaczeniami, przez co nie musimy się przemęczać przy ich samodzielnym wymyślaniu. Oczywiście każdy komunikat można zmienić, co pokażę w następnym poście.

I to wszystko jak na początek. Kod z tego posta można znaleźć na [githubie](https://github.com/rmaziarka/FluentValidation.Examples). Zachęcam więc do czekania na kolejne posty, gdzie pokażę ciekawsze zagadnienia :)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/FluentValidation-podstawy-RadBlog "") - <time datetime="2016-03-10 18:57:41">Mar 4, 2016</time>

**FluentValidation – podstawy – RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Dawid K](http://commitandrun.pl "dwdkls@gmail.com") - <time datetime="2016-04-03 00:40:00">Apr 0, 2016</time>

Jeśli można spytać - korzystasz z tego w swoim projekcie, czy w Obj wreszcie odkryto, że można korzystać z bibliotek nie pochodzących od Microsoftu? ;)
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-04-03 18:54:00">Apr 0, 2016</time>

Wydaje mi się, że w przypadku Obj wiele zależy od wymagań klientów i w większości przypadków nie da się pewnych rzeczy zbyt szybko zmienić. Ja sam FV zacząłem używać do prywatnych projektów od 2013 roku, a od 2014 w komercyjnych projektach.
