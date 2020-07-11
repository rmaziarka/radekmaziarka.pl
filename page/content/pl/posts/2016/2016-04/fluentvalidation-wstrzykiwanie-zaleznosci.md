---
title: 'FluentValidation - wstrzykiwanie zależności'
url: '/2016/04/18/fluentvalidation-wstrzykiwanie-zaleznosci/'
date: Mon, 18 Apr 2016 22:11:15 +0000
draft: false
images: ['images/2016/04/photo-1456428746267-a1756408f782-1.jpg']
category: 'Fluent Validation'
tags: ['']
---

Przedstawione przeze mnie do tej pory przykłady walidacji były zdecydowanie prostymi walidacjami - wszystkie dane zawierały się w modelu walidowanym. Niekiedy jednak zachodzi potrzeba sięgnięcia do zewnętrznych zasobów - bazy danych / cache / serwisów zewnętrznych. Mając w pamięci 5 zasadę _SOLID'a_ warto by takie zależności wstrzykiwać do walidatora, zamiast tworzyć je bezpośrednio w konstruktorze. Kod będzie lepiej utrzymywalny i testowalny. Ja w moim przykładzie chciałbym wam pokazać wstrzykiwanie zależności do walidatorów dla _ASP.NET MVC_ i _ASP.NET WebAPI_.

Na samym początku stwórzmy repozytorium użytkowników, które będziemy wstrzykiwać do walidatora. Ponieważ w przykładzie nie używam bazy danych, repozytorium będzie zwracało domyślną listę obiektów:

```csharp
public class UserRepository:IUserRepository
{
    public IEnumerable<User> GetAll()
    {
        return new User[]
        {
            new User() {Id = 1, Email = "john@gmail.com", UserName = "john", Password = "123456"},
            new User() {Id = 2, Email = "rick@gmail.com", UserName = "rick", Password = "654321"},
        };
    }
}

public interface IUserRepository
{
    IEnumerable<User> GetAll();
}
```

Następnie do walidatora _UserViewModel_ wstrzyknijmy powyższe repozytorium i dodajmy regułę walidacji o unikalnym emailu.

```csharp
public class UserViewModelValidator : AbstractValidator<UserViewModel>
{
    private IUserRepository userRepository;

    public UserViewModelValidator(IUserRepository userRepository)
    {
        this.userRepository = userRepository;

        this.RuleFor(r => r.UserName).NotEmpty().Length(0, 50);

        this.RuleFor(r => r.Email).NotEmpty().EmailAddress().Length(0, 100)
            .Must(BeUnique).WithMessage("Email must be unique.");

        this.RuleFor(r => r.Password).NotEmpty().Length(6, 50);
    }

    private bool BeUnique(string email)
    {
        var emailFound = userRepository.GetAll().Any(u => u.Email == email);
        return !emailFound;
    }
}
```

Teraz część najważniejsza - połączenie naszego kontenera z _FluentValidation_. Ja mój przykład oparłem o kontener _Autofac_, ale analogiczny kod można stworzyć dla każdego używanego przez nas kontenera. Poniższe 2 listy kodu znajdują się w konfiguracji kontenera, u mnie w pliku _Global.asax.cs_.

Najpierw przeskanujmy nasz projekt w poszukiwaniu walidatorów,aby połączyć je z interfejsami.

```csharp
AssemblyScanner.FindValidatorsInAssembly(Assembly.GetExecutingAssembly())
    .ForEach(match =>
    {
        builder.RegisterType(match.ValidatorType).As(match.InterfaceType);
    });
```

Kolejnym krokiem będzie poinformowanie _FluentValidation_, że walidatory powinny być instancjonowane przez _Autofac_. Robi się to przez rozwinięcie istniejącej już konfiguracji o informacje o fabryce walidatorów. Taką konfigurację trzeba dokonać osobno dla _ASP.NET MVC_ i _ASP.NET WebAPI_.

```csharp
FluentValidation.Mvc.FluentValidationModelValidatorProvider.Configure(
    p => p.ValidatorFactory = new AutofacValidatorFactory(container));

FluentValidation.WebApi.FluentValidationModelValidatorProvider.Configure(GlobalConfiguration.Configuration, 
    p => p.ValidatorFactory = new AutofacValidatorFactory(container));
```

Poniżej przedstawiam przykładowy kod fabryki walidatorów. Wyszukuje ona w kontenerze walidator wymaganego typu.

```csharp
public class AutofacValidatorFactory : ValidatorFactoryBase
{
    private readonly IContainer container;

    public AutofacValidatorFactory(IContainer container)
    {
        this.container = container;
    }

    public override IValidator CreateInstance(Type validatorType)
    {
        IValidator validator = (IValidator)container.Resolve(validatorType);
        return validator;
    }
}
```

I to wszystko - wstrzykiwanie zależności do walidatorów powinno działać. Nie potrzeba dodatkowej konfiguracji w samym _MVC_ / _WebAPI_ \- _FluentValidation_ przez konfigurację fabryki wszystkim się zajmuje. By być całkowicie pewnym dokonajmy prostych testów tej funkcjonalności dokonując zapytań z poziomu przeglądarki i Postmana.
![chrome_2016-04-18_23-26-54](/images/2016/04/chrome_2016-04-18_23-26-54.png)
![chrome_2016-04-18_23-27-12](/images/2016/04/chrome_2016-04-18_23-27-12.png)

Widzimy, że zarówno dla _ASP.NET MVC jak_ i _ASP.NET WebAPI_ walidacja zadziałała i dostajemy komunikat o wymaganym unikalnym mailu.

Jeśli macie jeszcze jakieś pomysły na post o _FluentValidation_ to będę wdzięczny za podrzucenie ich - na razie mam jeszcze pomysł na posty o lokalizacji komunikatów, warunkowej walidacji i walidacji dynamicznego modelu :)

Standardowo, wszystkie pokazane tutaj przykłady są na [GitHubie](https://github.com/rmaziarka/FluentValidation.Examples).

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/FluentValidation-wstrzykiwanie-zaleznosci-RadBlog "") - <time datetime="2016-04-18 23:18:15">Apr 1, 2016</time>

**FluentValidation – wstrzykiwanie zależności | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Dariusz Lenartowicz]( "dariusz.lenartowicz@gmail.com") - <time datetime="2016-04-19 09:53:00">Apr 2, 2016</time>

Mała uwaga!
Walidatory w Web API są buforowane przez samo Web API w związku z czym kolejnym razem ten sam walidator będzie miał tą samą instancję wszystkich zależności co może łatwo doprowadzić do katastrofy. Rozwiązaniem jest użycie Func lub własna mała infrastrukturka, która zanim wykona cokolwiek w akcji kontrolera wykona najpierw walidację modelu.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-04-19 20:17:00">Apr 2, 2016</time>

Oczywiście tak jest - możliwym rozwiązaniem jest tak jak podałeś powyżej wstrzykiwanie Func zamiast IService, dzięki czemu w kontrolerach będziemy mieli pewność, że dostajemy nową instancję serwisu.

Można się również pokusić o usunięcie cachowania / buforowania walidatorów przez lekki hak na WebAPI:

            Assembly httpAssembly = Assembly.Load("System.Web.Http");
            Type cacheType = httpAssembly.GetType("System.Web.Http.Validation.IModelValidatorCache");
            GlobalConfiguration.Configuration.Services.Clear(cacheType));

Co usunie nam mechanizm buforowania i sprawi że zawsze będzie wywoływane tworzenie walidatora. Niestety interfejs IModelValidatorCache jest internal, przez wymagane jest wsparcie się refleksją.
