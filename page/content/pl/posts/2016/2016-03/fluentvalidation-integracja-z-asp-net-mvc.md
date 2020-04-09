---
title: 'FluentValidation - integracja z ASP.NET MVC'
url: '/2016/03/13/fluentvalidation-integracja-z-asp-net-mvc/'
date: Sun, 13 Mar 2016 22:03:33 +0000
draft: false
category: 'Fluent Validation'
tags: ['']
---

W dzisiejszym poście pokażę jak zintegrować _FluentValidation _z _ASP.NET MVC5_, na podstawie dodawania użytkownika.

Po za standardowym _FluentValidation_ potrzebujemy również _FluentValidation.MVC5_. Ta biblioteka zapewnia _ModelValidatorProvider_ odpowiedni dla _FluentValidation_.

```
Install-Package FluentValidation
Install-Package FluentValidation.MVC5
```

Następnie w miejscu startu aplikacji (u mnie jest to _Application\_Start_ _Global.asax_) dodajemy taki fragment kodu:

```
FluentValidationModelValidatorProvider.Configure();
```

Sprawia on, że od tej pory nasz framework webowy nie będzie korzystał w wbudowanej walidacji przez _DataAnnotations, _tylko z **_FluentValidation_**.

Teraz utwórzmy model klasy walidowanej:

```csharp
[Validator(typeof(UserViewModelValidator))]
public class UserViewModel
{
    public string UserName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }
}
```

Widzimy, że w porównaniu do modelu z poprzedniego posta, różni się on atrybutem _Validator_. Ten atrybut mówi _ASP.NET_, że gdy będzie chciał zwalidować obiekt tej klasy, to powinien użyć do tego walidatora z atrybutu.

Walidator:

```csharp
public class UserViewModelValidator :AbstractValidator<UserViewModel>
{
    public UserViewModelValidator()
    {
        this.RuleFor(r => r.UserName).NotEmpty().Length(0, 50);

        this.RuleFor(r => r.Email).NotEmpty().EmailAddress().Length(0, 100);

        this.RuleFor(r => r.Password).NotEmpty().Length(6, 50);
    }
}
```

W _HomeController_ dodajemy prosty kod mający symulować dodawanie użytkownika do bazy danych. Gdy dane nie przejdą walidacji to zwracamy widok wraz z tymi danymi. W przeciwnym wypadku przekierowujemy na stronę _UserCreated_.

```csharp
[HttpPost]
public ActionResult CreateUser(UserViewModel user)
{
    if (!ModelState.IsValid)
        return View(user);
            
    // add user to database

    return View("UserCreated");
}
```

Został tylko formularz dodawania użytkowników w _HTML_. Pod każdym polem formularz używamy _ValidationMessageFor_, aby pokazać błędy walidacyjne, jakie zwróci kontroler.

```html
<h4>Create a new user.</h4>

<div class="form-group">
    @Html.LabelFor(m => m.UserName, new { @class = "col-md-2 control-label" })
    <div class="col-md-10">
        @Html.TextBoxFor(m => m.UserName, new { @class = "form-control" })
    </div>
    @Html.ValidationMessageFor(m => m.UserName, string.Empty, new { @class = "text-danger" })
</div>

<div class="form-group">
    @Html.LabelFor(m => m.Email, new { @class = "col-md-2 control-label" })
    <div class="col-md-10">
        @Html.TextBoxFor(m => m.Email, new { @class = "form-control" })
    </div>
    @Html.ValidationMessageFor(m => m.Email, string.Empty, new { @class = "text-danger" })
</div>

<div class="form-group">
    @Html.LabelFor(m => m.Password, new { @class = "col-md-2 control-label" })
    <div class="col-md-10">
        @Html.PasswordFor(m => m.Password, new { @class = "form-control" })
    </div>
    @Html.ValidationMessageFor(m => m.Password, string.Empty, new { @class = "text-danger" })
</div>

<div class="form-group">
    <div class="col-md-offset-2 col-md-10">
        <input type="submit" class="btn btn-default" value="Create" />
    </div>
</div>
```

Po uruchomieniu naszej aplikacji i wpisaniu błędnych danych pojawia się taki o to widok:

![FluentValidationMVC](/images/2016/03/FluentValidationMVC.png)

Czyli nasza walidacja działa i nieprawidłowe dane zostały zwrócone do użytkownika w celu ich poprawienia.

### Walidacja wewnętrznych klas

Integracja pomiędzy _ASP.NET _i _FluentValidation _pozwala na bardzo prostą walidację klas, które są polami naszej głównej klasy. Powiedzmy, że do naszego użytkownika dodajemy pole odpowiedzialne za składowanie informacji o jego adresie. Aby zwalidować taki zagłebiony obiekt należy jedynie powtórzyć powyższe kroki dla klasy adresu. Framework przejdzie po wszystkich polach obiektu walidowanego i jeśli to pole jest połączone z walidatorem, to użyje go by zwalidować ten obiekt. Całość przedstawia się tak:

Model użytkownika rozszerzony o pole adresu:

```csharp
[Validator(typeof(UserViewModelValidator))]
public class UserViewModel
{
    public string UserName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public AddressViewModel Address { get; set; }
}
```

Model adresu i jego walidator.

```csharp
[Validator(typeof(AddressViewModelValidator))]
public class AddressViewModel
{
    public string City { get; set; }

    public string PostalCode { get; set; }
}
```


```csharp
public class AddressViewModelValidator : AbstractValidator<AddressViewModel>
{
    public AddressViewModelValidator()
    {
        this.RuleFor(r => r.City).NotEmpty().Length(1, 50);

        this.RuleFor(r => r.PostalCode).NotEmpty().Matches("^[0-9]{2}-[0-9]{3}$");
    }
}
```

I rezultat:
![FluentValidationMVC2](/images/2016/03/FluentValidationMVC2.png)

### Podsumowanie

Biblioteka _FluentValidation_ w prosty sposób łączy się z _ASP.NET MVC_, przez co już w kilka chwil możemy korzystać z niej w naszej aplikacji webowej. Dodawanie kolejnych walidatorów jest szybkie i nie wpływa na zmianę dotychczasowej logiki przetwarzania żądań w _MVC_. Wszystko dzieje się pod spodem, a my tylko korzystamy z dobrodziejstw _FluentValidation_.

Standardowo, wszystkie pokazane tutaj przykłady są na [GitHubie](https://github.com/rmaziarka/FluentValidation.Examples).

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/FluentValidation-integracja-z-ASPNET-MVC-RadBlog "") - <time datetime="2016-03-13 23:04:36">Mar 0, 2016</time>

**FluentValidation – integracja z ASP.NET MVC – RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[FluentValidation – integracja z ASP.NET Web API | RadBlog](http://radblog.pl/pl/2016/04/12/fluentvalidation-integracja-z-asp-net-web-api/ "") - <time datetime="2016-04-12 21:41:10">Apr 2, 2016</time>

\[…\] poprzednim poście z cyklu FluentValidation pokazałem jak dodać FluentValidation do ASP.NET MVC.  W takim razie \[…\]
#### 
[Krzysztof Wiśniewski](http://abcdw.pl/ "kwis@abcdw.pl") - <time datetime="2016-04-16 15:44:00">Apr 6, 2016</time>

Wszystkie trzy artykuły o fluent validation napisane niezwykle przystępnie. Wielkie dzieki za inspirację. Mam nadzieję, że jutro sam potestuję :)
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-04-18 19:02:00">Apr 1, 2016</time>

Jakbyś miał z czymś problemy to daj znać na maila to bym o tym posta napisał. Aktualnie mam w planach jeszcze opis DI, lokalizację komunikatów i warunkową walidację.
