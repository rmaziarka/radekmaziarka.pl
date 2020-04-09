---
title: 'Synchronizacja czasu pomiędzy serwerem i przeglądarką'
url: '/2016/04/04/synchronizacja-czasu-pomiedzy-serwerem-i-przegladarka/'
date: Mon, 04 Apr 2016 21:28:58 +0000
draft: false
featured_image: 'images/2016/04/4072684900_b0201a60f0_o.jpg'
category: 'Javascript'
tags: ['']
---

Podczas pisania aplikacji konkursowej na konferencję **WROC#** pojawił się ciekawy problem, który wydał mi się warty opisania. O danej godzinie, podczas przerwy, administrator aplikacji uruchamiał test. Następnie, podczas 10 minut, każda z zarejestrowanych osób mogła odpowiedzieć na pytanie testowe i wziąć udział w konkursie.

Jedną z funkcjonalności tej aplikacji był licznik czasu przy pytaniu testowym, który odmierzał czas do zakończenia konkursu. Gdy czas doszedł do zera, strona przekierowywała uczestnika konkursu na stronę z informacją o zakończeniu testu. Dana funkcjonalność działała świetnie na komputerze lokalnym, ale po uruchomieniu aplikacji na chmurze Azure okazało się, że użytkownik jest około **2 minuty do przodu** w stosunku do czasu na serwerze. Powodowało to problemy z zakończeniem testu - strona przekierowywała użytkownika na podsumowanie, które jeszcze w tym momencie nie było dostępne.

Ratunkiem okazał się poniższy kod:

```javascript
(function () {
    var timeSync = {};
    window.timeSync = timeSync;

    timeSync.url = "/Home/GetServerTime";
    timeSync.httpMethod = "GET";
    timeSync.dataType = "json";
    timeSync.contentType = "application/json; charset=utf-8";

    timeSync.getTimeDifference = function () {

        var roundTripStart = new Date();
        var clientTime = new Date();

        return $.ajax({
            type: timeSync.httpMethod,
            url: timeSync.url,
            dataType: timeSync.dataType,
            contentType: timeSync.contentType,
            async: false
        })
        .then(function (serverTimeString) {
                var roundTrip = new Date().getTime() - roundTripStart.getTime();

                var serverTime = new Date(serverTimeString);


                var timeDifference = (serverTime.getTime() - roundTrip) - clientTime.getTime();

                return timeDifference;
            });
    }
})()
```

Jest to funkcja, która pozwala pobrać aktualny czas z serwera i wyliczyć różnicę pomiędzy przeglądarką a zdalnym serwisem. Wzorowałem się na [poście](https://codemadesimple.wordpress.com/2012/06/18/timesync-with-asp-net-mvc-4/), który jednak w rzeczywistym zastosowaniu nie działał poprawnie, a dodatkowo potrzebował kolejnych bibliotek do działania. Tutaj mamy prosty fragment, który robi dokładnie to co potrzebujemy - pobiera czas z serwera, odejmuje czas potrzebny na obsługę żądania i zwraca różnicę pomiędzy czasem serwerowym, a przeglądarką. Do poprawnego działania będziemy potrzebować jeszcze kontrolera **HomeController**, który będzie zwracał nam odpowiednio sformatowaną godzinę.

```csharp
public class HomeController : Controller
{
	public ActionResult GetServerTime()
	{
		return Json(DateTime.Now.ToString("yyyy'-'MM'-'ddTHH':'mm':'ss.fff%K"), JsonRequestBehavior.AllowGet);
	}
}
```

Samo wywołanie jest bardzo proste - wywołujemy metodę **getTimeDifference** i w momencie odczytania różnicy czasów używamy jej do zsynchronizowania naszych dat wyświetlanych użytkownikowi. W aplikacji **WROC#** użyłem tej metody by poprawnie obsłużyć zakończenie czasu testu.

```javascript
window.timeSync
	.getTimeDifference()
	.done(function (timeDifference) {
		var endDateString = '@Model.EndDate.ToString("o")';
		var endDate = new Date(endDateString);

		var clientEndDateTicks = endDate - timeDifference;

		var clientEndDate = new Date(clientEndDateTicks);

		// użycie liczniak jQuery który odmierza czas i przekierowuje na stronę podsumowania gdy czas się skończy
	});
```

Jeśli ktoś był na WROC# to wie, że synchronizacja działała poprawnie, więc z pełnym zaufaniem mogę wam polecić ten kod :)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Synchronizacja-czasu-pomiedzy-serwerem-i-przegladarka-RadBlog "") - <time datetime="2016-04-04 22:30:07">Apr 1, 2016</time>

**Synchronizacja czasu pomiędzy serwerem i przeglądarką | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
