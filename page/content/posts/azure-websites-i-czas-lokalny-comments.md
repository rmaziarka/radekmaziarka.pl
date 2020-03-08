---
title: 'Azure Websites i czas lokalny'
slug: '/2016/02/28/azure-websites-i-czas-lokalny/'
date: Sun, 28 Feb 2016 09:31:24 +0000
draft: false
category: 'Azure'
tags: ['']
---


#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Azure-Websites-i-czas-lokalny-RadBlog "") - <time datetime="2016-02-28 15:52:30">Feb 0, 2016</time>

**Azure Websites i czas lokalny – RadBlog** Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
<hr />
#### 
[mdymel](http://dymel.pl "michal+disqus@dymel.pl") - <time datetime="2016-02-29 04:36:00">Feb 1, 2016</time>

Ja jestem zdania, że lepiej zawsze używać dat w UTC, a konwersję do strefy czasowej robić dopiero po stronie klienta. Po pierwsze rzadko kiedy można mieć 100% pewności, że kod będzie używany w jednym kraju, a po drugie znacznie ułatwia to np. współpracę z dwiema bazami danych, które mogą różnie na to patrzeć. ;-) Używając UTC mam pewność, że nie będę mial problemów z datami.
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-02-29 14:53:00">Feb 1, 2016</time>

Nie lubię słów 'zawsze' / 'nigdy' - jeśli piszemy aplikację którą używamy przez 1 dzień a później o niej zapominamy to po co się trudzić z takim strzelaniem z armaty do komara?
<hr />
#### 
[mdymel](http://dymel.pl "michal+disqus@dymel.pl") - <time datetime="2016-02-29 16:31:00">Feb 1, 2016</time>

W imię zasad ;-) Jeśli jeden dzień to może tak, ale wydaje mi się, że czasem może być nawet prościej na serwerze trzymać UTC (brak stref czasowych, zmian na letni/zimowy), a na czas użytkownika konwersję robić na końcu
<hr />
#### 
[Andrzej]( "lo4c25@wp.pl") - <time datetime="2016-03-01 08:28:00">Mar 2, 2016</time>

Czy ten pierwszy sposób uwzględnia automatyczną zmianę czasu na CEST w miesiącach letnich?
<hr />
#### 
[Radosław Maziarka]( "maziarka.radoslaw@outlook.com") - <time datetime="2016-03-01 09:05:00">Mar 2, 2016</time>

O widzisz, ciekawa kwestia. Zakładam że nie, trzeba by ręcznie zmieniać tą wartość na Azure.
<hr />
