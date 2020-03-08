---
title: 'FluentValidation – integracja z ASP.NET Web API'
slug: '/2016/04/12/fluentvalidation-integracja-z-asp-net-web-api/'
date: Tue, 12 Apr 2016 20:41:06 +0000
draft: false
featured_image: 'images/2016/04/picjumbo.com_HNCK9261.jpg'
category: 'Fluent Validation'
tags: ['']
---

W [poprzednim poście](http://radblog.pl/pl/2016/03/13/fluentvalidation-integracja-z-asp-net-mvc/) z cyklu _FluentValidation_ pokazałem jak dodać _FluentValidation_ do _ASP.NET MVC_.  W takim razie pora na pokaz integracji z _ASP.NET Web API._

Zaczynamy od dodania do naszego projektu biblioteki łączącej _FluentValidation_ z _WebApi._

\[code\]
Install-Package FluentValidation.WebAPI
\[/code\]

Następnie w miejscu startu aplikacji (u mnie jest to _Application\_Start_ _Global.asax_) dodajemy kod odpowiedzialny za połączenie _FluentValidation_ z domyślną walidacją _WebAPI._

\[code\]
FluentValidationModelValidatorProvider.Configure(GlobalConfiguration.Configuration);
\[/code\]

W przypadku używania _FluentValidation_ także z _MVC_ może wystąpić problem z identycznymi nazwami klas przez co trzeba się posiłkować dodaniem przedrostka przestrzeni nazw.

Do walidacji użyjemy tego samego modelu i walidatora, co w poprzednim poście:

\[code lang="csharp"\]
\[Validator(typeof(UserViewModelValidator))\]
public class UserViewModel
{
 public string UserName { get; set; }

 public string Email { get; set; }

 public string Password { get; set; }
}

public class UserViewModelValidator: AbstractValidator<UserViewModel>
{
 public UserViewModelValidator()
 {
 this.RuleFor(r => r.UserName).NotEmpty().Length(0, 50);

 this.RuleFor(r => r.Email).NotEmpty().EmailAddress().Length(0, 100);

 this.RuleFor(r => r.Password).NotEmpty().Length(6, 50);
 }
}
\[/code\]

Następnie stwórzmy prosty kontroler zwracający informacje o nieudanej walidacji użytkownika, w przypadku błędów walidacji:

\[code lang="csharp"\]
public class UserController : ApiController
{
 public HttpResponseMessage PostUser(UserViewModel user)
 {
 if (!ModelState.IsValid)
 {
 return new HttpResponseMessage
 {
 StatusCode = HttpStatusCode.BadRequest,
 Content = new StringContent("Validation failed.")
 };
 }
 
 // create user

 return this.Request.CreateResponse(HttpStatusCode.Created);
 }
}
\[/code\]

Uruchamiając Postmana i wysyłając proste żądanie dostajemy poprawną odpowiedź:
![chrome_2016-04-12_22-04-22](http://radblog.pl/wp-content/uploads/2016/04/chrome_2016-04-12_22-04-22.png)

Czyli nasza walidacja działa - dostajemy błąd HTTP 400 i komunikat błędu.

### Filtr walidacyjny

Aby uprościć sobie życie i nie dodawać za każdym razem sprawdzania walidacji w akcji kontrolera proponowałbym stworzenie prostego filtra walidacyjnego. Miałby on za zadanie podpięcie się przed wykonaniem metody i sprawdzenie czy model jest poprawny. Kiedy zachodzi problem walidacji modelu, zwracamy odpowiednią dla nas wiadomość - może to być prosta lista błędów, ale nic nie szkodzi nam na przeszkodzie by pogrupować te błędy i zwrócić bardziej skomplikowany obiekt. Moja implementacja filtra:

\[code lang="csharp"\]
public class ModelStateFilterAttribute : ActionFilterAttribute
{
 public override void OnActionExecuting(HttpActionContext actionContext)
 {
 if (!actionContext.ModelState.IsValid)
 {
 var errors = actionContext.ModelState
 .Values.SelectMany(v => v.Errors)
 .Select(e => e.ErrorMessage);

 actionContext.Response =
 actionContext.Request.CreateResponse(HttpStatusCode.BadRequest, errors);
 }
 }
}
\[/code\]

Postawiłem na prostotę. Dziedziczę po klasie _ActionFilterAttribute, _która umożliwia podpięcie się pod akcje kontrolera_. _W metodzie _OnActionExecuting _sprawdzam, czy _ModelState _jest prawidłowy. Jeśli nie, to iteruję po wszystkich błędach i zwracam je jako listę do użytkownika. W takim przypadku metoda kontrolera się bardzo upraszcza:

\[code lang="csharp"\]
public HttpResponseMessage PostUser(UserViewModel user)
{ 
 // create user

 return this.Request.CreateResponse(HttpStatusCode.Created);
}
\[/code\]

Nie potrzebujemy dodatkowego kodu walidacyjnego - wszystko załatwia nam filtr. Zostaje tylko podpiąć nasz filtr do _WebAPI_ - u mnie dzieje się to w pliku _WebApiConfig._

\[code lang="csharp"\]
config.Filters.Add(new ModelStateFilterAttribute());
\[/code\]

Dzięki temu, przy identycznym żądaniu z Postmana, dostajemy listę błędów modelu.
![chrome_2016-04-12_22-27-31](http://radblog.pl/wp-content/uploads/2016/04/chrome_2016-04-12_22-27-31.png)

### Podsumowanie

Dodanie _FluentValidation_ do _ASP.NET WebAPI _nie różni się skomplikowaniem od dodania integracji do _ASP.NET MVC _ - jest równie proste. Z pomocą filtrów jesteśmy w stanie uprościć proces walidacji, przez co nie dodajemy dodatkowego kodu w naszych kontrolerach. Kod jest o wiele czystszy i czytelniejszy.

Standardowo, wszystkie pokazane tutaj przykłady są na [GitHubie](https://github.com/rmaziarka/FluentValidation.Examples).

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/FluentValidation-integracja-z-ASPNET-Web-API-RadBlog "") - <time datetime="2016-04-12 21:42:12">Apr 2, 2016</time>

**FluentValidation – integracja z ASP.NET Web API | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
