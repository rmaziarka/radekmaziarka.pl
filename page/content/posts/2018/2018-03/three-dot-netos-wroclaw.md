---
title: 'Three Dot Netos - Wrocław'
slug: '/2018/03/18/three-dot-netos-wroclaw/'
date: Sun, 18 Mar 2018 19:16:13 +0000
draft: false
featured_image: 'images/2018/03/event-logo.png'
category: 'Recenzja'
tags: ['.Net', 'performance', 'three dot netos']
---

[Trzej Dot Netos](https://dotnetos.org/) w składzie Łukasz Pyrzyk, Konrad Kokosa i Szymon Kulec 16 marca odwiedzili Wrocław. Maestro wydajności i sztuki optymalizacji opowiadali o tematach im bliskim:

 *   How to make a tabasco sauce from a GPU using C# - Łukasz
 *   A Garbage Collector, his collections and what it implies for you - Konrad
 *   The Secret Serialization Sauce and its spicy mysteries - Szymon

Wszystko podlane odpowiednią ilością ostrego sosu, by doprowadzić uczestników do wrzenia od ilości technologicznej wiedzy 😉

Obsługa GPU z poziomu C# - Łukasz
---------------------------------

[![](https://radblog.pl/wp-content/uploads/2018/03/DYbRI3yXcAYQkcZ-1024x576.jpg)](https://radblog.pl/wp-content/uploads/2018/03/DYbRI3yXcAYQkcZ.jpg)

Łukasz opowiedział o obsłudze GPU z poziomu kodu C#. Może nam się to wydawać zbyteczne - po co zajmować się takimi rzeczami? Okazuje się, że użycie przez StackOverflow karty graficznej za 400$ do przetwarzania informacji o tagach było wydajniejsze niż użycie serwera z 72 rdzeniami CPU. **Ogromny przyrost mocy za pomocą użycia podstawowych komponentów**.

Jest to spowodowane faktem, że karty graficzne mają układy GPU zoptymalizowane do przetwarzania bardzo dużych ilości danych w konkretnie określony sposób. CPU nie jest w stanie konkurować z nimi w kontekście mocy, za to jest o wiele lepszy do zróżnicowanych operacji. [Tutaj](https://www.quora.com/Whats-the-difference-between-a-CPU-and-a-GPU-When-I-switch-on-my-computer-it-shows-GPU-information-What-does-it-mean) więcej na ten temat.

Jeśli nie mamy karty graficznej (Łukasz też nie ma 😁) to można użyć chmury Azure i wirtualnych maszyn z dostępnymi kartami graficznymi. Są one [odpowiednio droższe](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/), ale mamy dostęp do naprawdę potężnego sprzętu - [NVidia Tesla P40](https://www.nvidia.com/object/accelerate-inference.html).

GPU jest dobre do obsługi dużej ilości małych zadań, więc **nie sprawdzi się w każdym przypadku**:

 1.  Kiedy nie mamy operacji równoleglych.
 2.  Kiedy mamy różnorodność zadań - GPU nie da rady obsłużyć wielu różnych problemów jednocześnie.
 3.  Kiedy musimy się synchronizować.
 4.  Kiedy używany dużo pamięci.
 	5.  Kiedy możemy zoptymalizować kod na CPU.

Łukasz do zabawy z obsługą GPU polecał 2 frameworki - [Alea](http://www.aleagpu.com/release/3_0_4/doc/) i [Hybrydizer](https://devblogs.nvidia.com/hybridizer-csharp/) - pozostałe nie są wspierane.

Optymalizacja zużycia pamięci - Konrad
--------------------------------------

[![](https://radblog.pl/wp-content/uploads/2018/03/DYbebQtXkAAZ_d0-1024x576.jpg)](https://radblog.pl/wp-content/uploads/2018/03/DYbebQtXkAAZ_d0.jpg)

Konrad opowiedział o optymalizacji zużycia pamięci i przyśpieszania pracy naszych aplikacji za pomocą prostych poprawek naszego kodu. Niewielkie zmiany w naszym kodzie mogą mieć ogromny wpływ na wydajność i poprawić działanie naszej aplikacji.

Pierwszym szokiem dla publiczności był fakt, że kod w **Intermediate Language** (IL) jest kompletnie inny niż kod niskopoziomowy w asemblerze (ASM). Kompilator [Just In Time](https://www.telerik.com/blogs/understanding-net-just-in-time-compilation) dokonuje niesamowitych optymalizacji by nasz kod był jak najbardziej wydajny. Zbiór różnych metod wywołujących siebie nawzajem może być przetransformowanych do jedynie kilku operacji w asemblerze.

Ciekawym zaskoczeniem było również pokaz różnic pomiędzy klasami a strukturami. Wszyskie poradniki o C# mówią, że dane klas są przechowywane na stercie a struktur na stosie. Nie mówią za to, że często możemy w ogóle tego stosu nie używać bo JIT zoptymalizuje nasz kod by poruszać się jedynie w kontekście rejestrów i operacji na CPU. Zmiana class -> struct sprawiła, że **kod w ASM zmniejszył się prawie 6-krotnie**.

Na koniec Konrad wspomniał o słowie kluczowym **stackalloc**, które pozwala przydzielić dla zmiennej blok pamięci na stosie. Użycie tego zwrotu daje możliwości natychmiastowego dostepu do pamięci i potrafi znacznie przyśpieszyć działanie kodu opartego o dane na sosie. Używanie stackalloc było do tej pory uciążliwe, ale w nowym .NET 7.2 mamy możliwość używania nowej struktury [Span](http://adamsitnik.com/Span/#introduction), która obsługuje za nas obliczenia na wskaźnikach i jest bardzo wydajnym sposobem na pisanie programów bez potrzeby nadmiarowej alokacji pamięci. Aktualnie cały świat .NET idzie w kierunku głębszej optymalizacji zużycia pamięci, widać to na przykładzie już wspomnianego [Span](http://adamsitnik.com/Span/#introduction), [ValueTask](http://blog.i3arnon.com/2015/11/30/valuetask/), [ArrayPool](http://adamsitnik.com/Array-Pool/) czy [Pipelines](https://msdn.microsoft.com/en-us/library/ff963548.aspx).

Cała prezentacja opierała się na narzędziu [Tune](https://github.com/kkokosa/Tune) - programu do śledzenia jak nasz kod C# jest transformowany do IL i ASM. Bardzo proste i potężne narzędzie stworzone przez Konrada - zachęcał do pomocy przy rozwijaniu go 😊

Różne drogi serializacji w .NET - Szymon
----------------------------------------

[![](https://radblog.pl/wp-content/uploads/2018/03/20180316_201504-1024x576.jpg)](https://radblog.pl/wp-content/uploads/2018/03/20180316_201504.jpg)

Szymon opowiedział o różnych sposobach serializacji danych w .NET. Przeszedł od zaszłości XMLowych, przez 2 biblioteki do serializowania JSONa po serializatory binarne i własny serializator, stworzony na potrzeby NServiceBusa. Każdy krok to spojrzenie z różnej perspektywy na potrzeby i wymagania stawiane przez nasze aplikacje.

XML Szymon odrzucił już na wstępie ;) nie dziwię się temu, ponieważ poza wysoką czytelnością **trudno w XML o większe zalety**. Było wspomniane o parserach cechujących się wysokim zużyciem pamięci, niską prędkością i ogólnie słabą jakością działania.

Odnośnie JSONa zostały wspomniane 2 biblioteki - [JSON.NET](https://www.newtonsoft.com/json) i [Jil](https://github.com/kevin-montrose/Jil). Pierwsza z nich to najpopularniejsza biblioteka do parsowania JSON w świecie .NET, której domyślnie używają już wszystkie aplikacje ASP.NET. Ta druga została napisana by jak **najbardziej optymalnie serializować i deserializować obiekty**. Jil posiada bardzo dużo małych tricków i usprawnień które pozwalają ominięcie alokacji pamięci i niepotrzebnych wywołań funkcji. Twórcy napisali własną obsługę parsowania Int'a, zaś Szymon pokazywał [obsługę parsowania GUID'ów](https://github.com/kevin-montrose/Jil/blob/master/Jil/Serialize/Methods.cs#L100), która powala na kolana.

Później kolej przyszła na protokoły binarne - [Google Protocol Buffer](https://developers.google.com/protocol-buffers/), [Wire](https://github.com/rogeralsing/Wire) / [Hyperion](https://github.com/akkadotnet/Hyperion) i inne. **Protocol Buffer** pozwala na utworzenie schematu danych pomiędzy end-pointami a następnie serializowanie danych bezpośrednio do strumienia bajtów. Te następnie są deserializowane wg schematu po drugiej stronie. Ciekawy koncept pozwalający na wysoką wydajność i mniejsze zużycie miejsca, kosztem czytelności. Podobnie działa **Wire / Hyperion**, które działają jedynie w środowisku .NET, ale są bardziej rozszerzalne - obsługują wersjonowanie, polimorficzną serializacje itd.

Na koniec Szymon wspomniał o serializatorze, który napisali na potrzeby **NServiceBusa.** W firmie potrzebowali logować wszystkie zdarzenia jakie następowały w kontekście obsługi wiadomości. Dzięki głębokiemu zrozumieniu wymagań i sytuacji, w której chcą wykorzystać swój serializator, maksymalnie wykorzystali alokację pamięci i pominęli część pól. Pozwoliło im to osiągnąć wysoką wydajność, jaka jest potrzebna przy olbrzymiej ilości wiadomości używanej przez ich szynę. Szymon bardzo mocno podkreślił, że **pisanie swojego serializatora powinno nastąpić tylko wtedy, kiedy nie mamy już innej opcji**. W pozostałych sytuacjach wystarczą poprzednie serializatory.

Marketing - Three Dot Netos
---------------------------

To wydarzenie byłoby i tak świetnie znane w społeczności .NET, nawet bez mocnej promocji. Ale dobry marketing pozwala na zwiększenie zainteresowania i promuje dobre strony wydarzeń. Tutaj to zagrało znakomicie:

Chłopaki postanowili stworzyć spójny branding dla swojej inicjatywy i reklamować siebie jako 3 gringos - **"UNSAFE AND FURIOUS!"**. I wyszło świetnie - nikt wcześniej czegoś podobnego w Polsce nie zrobił. Wynikiem była silna, oddolna promocja na Facebooku, Twitterze, Linkedinie i bardzo duża ilość uczestników na ich eventach (we Wrocławiu w piątek wieczór zapełnili prawie całą salę w Sali Kongresowej Hali Stulecia). Uczestnicy wiedzieli, że przychodzą na wydarzenie wymiataczy .NET, ale z nastawieniem na dobrą zabawę i integracje.

Strzałem w dziesiątkę były **sosy tabasco**, brandowane ich inicjatywą. Sosy były dostępne dla uczestników wydarzenia w ramach pytań i odpowiedzi, co dawało fajny kontakt z publicznością i lepszy odbiór samych prezentacji. Ludzie chętnie się angażowali, były dyskusje, wymiana doświadczeń. Sam sos był też dostępny w trybie Insider, ja dostałem go w takim pięknym pudełeczku już nieco wcześniej 😉

[![](https://radblog.pl/wp-content/uploads/2018/03/DYRKTb4WkAEiR-L-225x300.jpg)](https://radblog.pl/wp-content/uploads/2018/03/DYRKTb4WkAEiR-L.jpg)[![](https://radblog.pl/wp-content/uploads/2018/03/20180228_114921-2-169x300.jpg)](https://radblog.pl/wp-content/uploads/2018/03/20180228_114921-2.jpg)

Podsumowanie
------------

Zbierając informacje o tym evencie razem - było to świetne wydarzenie, zarówno pod kątem merytorycznym jak i społecznościowym. Duża dawka wiedzy, mili ludzie, przyjemny after-party. Czekam z niecierpliwością co 3 gringos jeszcze wymyślą 😊

[![](https://radblog.pl/wp-content/uploads/2018/03/DYkI2D4WAAAQztU-300x225.jpg)](https://radblog.pl/wp-content/uploads/2018/03/DYkI2D4WAAAQztU.jpg)

PS. Zagarnięta sala w Kociej Kołysce przez team .NET 😉

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Three-Dot-Netos-Wroclaw-Radek-Maziarka-Blog "") - <time datetime="2018-03-18 20:30:29">Mar 0, 2018</time>

**Three Dot Netos – Wrocław | Radek Maziarka Blog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
