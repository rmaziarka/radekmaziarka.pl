---
title: 'Azure Websites i czas lokalny'
url: '/2016/02/28/azure-websites-i-czas-lokalny/'
date: Sun, 28 Feb 2016 09:31:24 +0000
draft: false
category: 'Azure'
tags: ['']
---

Piszę aktualnie małą aplikację webową w ASP.NET, która będzie używana jedynie w Polsce. Postanowiłem ustawić na sztywno kulturę polską, aby wszystkie daty wskazywały na właściwą godzinę. Najprościej jest to zrobić dodając wpis _globalization_  w _web.config_, co też uczyniłem.

Po uruchomieniu aplikacji na Azure Websites zauważyłem, że datą lokalną wciąż jest UTC. Szybka poprawka na ustawianie kultury podczas uruchamiania aplikacji przez nadpisywanie _CurrentCulture_ i_ CurrentUICulture _w aktualnym wątku, deploy i znów nic. Co jeszcze dziwniejsze, kultura aplikacji była ustawiona na polską, ale daty lokalne dalej były pobierane z UTC. Tutaj już zacząłem trochę wątpić w swoje umiejętności, ale szybki research w Google pokazał prawdziwy powód moich problemów.

Azure Websites **domyślnie zwracają godzinę UTC** i nie można tego zmienić przez wyżej opisane metody. Istnieją 2 rozwiązania:

*   Wpis w ustawieniach witryny na portalu Azure _WEBSITE_TIME_ZONE _z wartością _Central European Standard Time - _[link](http://blogs.msdn.com/b/tomholl/archive/2015/04/07/changing-the-server-time-zone-on-azure-web-apps.aspx)
*   Każdorazowa konwersja dat do lokalnej przez zabawy z klasą _TimeZoneInfo - _[link](http://blogs.msdn.com/b/waws/archive/2014/08/05/get-the-local-server-time-for-your-azure-web-site.aspx)

Pierwszy jest dobry, gdy chcemy ustawić na sztywno datę lokalną w całej aplikacji, drugiego będziemy używali w bardziej multikulturowej aplikacji. Użyłem więc pierwszego sposobu i mam już aktualną datę na Azure :)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Azure-Websites-i-czas-lokalny-RadBlog "") - <time datetime="2016-02-28 15:52:30">Feb 0, 2016</time>

**Azure Websites i czas lokalny – RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[mdymel](http://dymel.pl "michal+disqus@dymel.pl") - <time datetime="2016-02-29 04:36:00">Feb 1, 2016</time>

Ja jestem zdania, że lepiej zawsze używać dat w UTC, a konwersję do strefy czasowej robić dopiero po stronie klienta. Po pierwsze rzadko kiedy można mieć 100% pewności, że kod będzie używany w jednym kraju, a po drugie znacznie ułatwia to np. współpracę z dwiema bazami danych, które mogą różnie na to patrzeć. ;-) Używając UTC mam pewność, że nie będę mial problemów z datami.
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-29 14:53:00">Feb 1, 2016</time>

Nie lubię słów 'zawsze' / 'nigdy' - jeśli piszemy aplikację którą używamy przez 1 dzień a później o niej zapominamy to po co się trudzić z takim strzelaniem z armaty do komara?
#### 
[mdymel](http://dymel.pl "michal+disqus@dymel.pl") - <time datetime="2016-02-29 16:31:00">Feb 1, 2016</time>

W imię zasad ;-) Jeśli jeden dzień to może tak, ale wydaje mi się, że czasem może być nawet prościej na serwerze trzymać UTC (brak stref czasowych, zmian na letni/zimowy), a na czas użytkownika konwersję robić na końcu
#### 
[Andrzej]( "lo4c25@wp.pl") - <time datetime="2016-03-01 08:28:00">Mar 2, 2016</time>

Czy ten pierwszy sposób uwzględnia automatyczną zmianę czasu na CEST w miesiącach letnich?
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-03-01 09:05:00">Mar 2, 2016</time>

O widzisz, ciekawa kwestia. Zakładam że nie, trzeba by ręcznie zmieniać tą wartość na Azure.
