---
title: "Dlaczego testowanie mikroserwisów jest trudne"
date: 2022-04-02T09:59:30+01:00
url: '/2022/04/02/dlaczego-testowanie-mikroserwisow-jest-trudne'
images: ['2022/04/02/dlaczego-testowanie-mikroserwisow-jest-trudne/main.jpg']
description: ""
category: 'Wzorce projektowe'
---

Tłem dla tego artykułu będzie cykl tweetów Orosza:

{{< tweet user="GergelyOrosz" id="1502947315279187979" >}}

Czyli jak zmiana w zewnętrznej zalezności mikroserwisu Ubera spowodowała olbrzymie straty całej firmy.

## Codzienna praktyka testów mikroserwisów

Jak tworzymy większy serwis informatyczny to naturalnie dzielimy go na mniejsze mikroserwisy. Chcąc mieć pewność, że całe rozwiązanie działa możemy przetestować automatycznie:
1. całość - sprawdzamy działanie od A do Z.
2. poszczególne mikroserwisy - wtedy sprawdzamy czy dany mikroserwis odpowiednio realizuje część procesu biznesowego.

[![](testy-ms.jpg)](testy-ms.jpg)

Pierwsze rozwiązanie jest stosowane tylko w ograniczonym zakresie. Przetestowanie wszystkich przypadków dla całego rozwiązania jest w większym systemie niemożliwe.

Drugie rozwiązanie jest o wiele częściej spotykane. Polega ono na tym, że:

- Nasz proces biznesowy dzieli się na mniejsze części, obsługiwane przez pojedyncze mikroserwisy.
- Mniejsze części procesu biznesowego stają się dla nas przypadkami testowymi.
- Dla tych przypadków testowych piszemy testy automatyczne dla danego mikroserwisu (jednostkowe / integracyjne / komponentowe / inne)
- Takie testy uruchamiamy przed każdym wdrożeniu. 
- Gdy test przejdzie to znaczy, że jesteśmy gotowi do wdrożenia.

**Praca w drugim podejściu zakłada, że działamy na zasadzie puzzli. Nasze testy wzajemnie się zazębiają.** Wyjście mikroserwisu A jest następnie wejściem do mikroserwisu B. Testowanie poszczególnych części daje nam pewność, że całość działa.

Tak zakłada teoria. Praktyka mówi, że przetestowany mikroserwis po wdrożeniu wygląda tak:

[![](fire.gif)](fire.gif)

## Gdzie leży problem?

Cały problem wynika z naszej naiwności dotyczącej testowania mikroserwisu.

Załóżmy, że testujemy automatycznie scenariusz biznesowy:
- Mikroserwis dostaje wiadomości W1, W2, W3
- Po trzeciej wiadomości mikroserwis powinien zwrócić rezultat R1

Można by to napisać jako funkcję:
f({W1, W2, W3}) = R1
i w taki sposób napisać test automatyczny. Robota skończona, można się rozejść.

**Jednak tutaj robimy 2 ogromne założenia:**
1. Zawsze na wejściu mamy {W1, W2, W3}
2. Mikroserwis zawsze dla {W1, W2, W3} zwróci R1

Tylko wtedy nasz test ma rację bytu. A rzeczywistość pokazuje, że te 2 założenia w 99% sytuacji nie są spełnione.

### Założenia wejściowe

> Zawsze na wejściu mamy {W1, W2, W3}

Wejście do testu naszego mikroserwisu to 3 wiadomości. A te wiadomości pochodzą z serwisów zewnętrznych. My zaś **nie mamy wpływu w naszym mikroserwisie na swiat zewnętrzny**. Wobec czego w teście zakładamy, że:

1. Wiadomości przyjdą do nas.
2. Wiadomości przyjdą do nas w konkretnej kolejności.
3. Wiadomości przyjdą do nas z pożądanymi wartościami.

Pytanie - czy mamy pewność, że mikroserwisy komunikujące się z nami spełniają to założenie?

Jeśli nie to w teście:

1. Musimy obsłużyć braki wiadomości np. {W1}, {W2, W3} - mamy 6 przypadków.
2. Musimy obsłużyć inne kolejności wiadomości np. {W1, W3, W2}, {W3, W2, W1}, ale także {W3, W2} - to nam zwiększa liczbę przypadków do 15.
3. Musimy obsłużyć różne wartości w wiadomościach. To absurdalnie zwiększa ilość przypadków. Np. załóżmy, że wiadomości mogą przyjąć wartość 0 lub 1. Wtedy mamy przypadki np. {W1=1, W2=1, W3=1}, {W3=0, W2=1}. Jeśli policzyłem dobrze to mamy 78 przypadków.

**78 przypadków.** To wszystko biorąc pod uwagę, że nie bierzemy pod uwagę duplikatów wiadomości. Wtedy w ogóle "sky is the limit" 🤣

Oczywiście, duża część przypadków będzie nierozróżnialna dla naszego mikroserwisu. Pytanie które musicie sobie zadać: **Jeśli 78-ty przypadek rozwali nam mikroserwis na produkcji to czy nasz biznes będzie obchodziło, że przetestowaliśmy pozostałe 77?**

Pozostawiam wam odpowiedź na to pytanie.

### Założenia pracy mikroserwisu

> Mikroserwis zawsze dla {W1, W2, W3} zwróci R1

Powyższe oznacza, że nasz mikroserwis jest linią produkcyjną. Informacje wejściowe są przetwarzane w ten sam sposób i wypychane dalej. Nie ma żadnej zmiany sposobu przetwarzania.

Jednak nasze serwisy rzadko kiedy tak pracują. A to dlatego, że **obsługa wiadomości wejściowych nie zależy tylko od wiadomośći wejściowych**. Zwykle tworzymy mikroserwisy stanowe - gromadzące swój stan w czasie pracy.

Wobec czego funkcja f ({W1, W2, W3}) zamienia się w:

- f(params, state), gdzie
- params = parametry wejściowe
- state = stan wewnętrzny

I tu się zaczyna piekło programistyczne 😈 Otóż stan wewnętrzny nie jest pojedynczą informacją. Raczej **stan wewnętrzny jest zbiorem bardzo wielu początkowych ustawień oraz zgromadzonych wcześniej danych**. Często sami nie wiemy co i jak wpływa na nasz proces.

Zróbmy proste przeliczenie. Załóżmy, że w procesie biznesowym biorą udział:

- 4 flagi systemowe, które mogą mieć wartośc 0 lub 1.
- 2 zgromadzone dane, które mogą mieć wartość A, B, C, D.
- Łącznie mamy 256 kombinacji, a więc teoretycznie 256 przypadków do obsłużenia.

**256 przypadków**. Nie biorę pod uwagę oczywiście, że źle napisaliśmy nasz kodzik, bo to się przecież nie zdarza 😉

## Rzeczywista złożoność testowania

[![](tangled.jpg)](tangled.jpg)

Przyjmijmy, że to co przychodzi do nas z zewnątrz określimy funkcją g. Wtedy nasz biznesowy podproces czyli funkcja f({W1, W2, W3}) = R1 zamienia się w:

- g(*) = params
- f(params, state) = results

Gdzie:

- params - zbiór wszystkich przypadków jak systemy zewnętrzne zachowają się dla danego scenariusza biznesowego.
- state - zbiór wszystkich stanów mikroserwisu, które wpływają na obsługę naszego scenariusza biznesowego.
- results - zbiór wszystkich możliwych rezultatów z jakimi wyjdziemy.

W powyższym przypadku mieliśmy:

- 76 przypadków dla parametrów wejściowych,
- 256 przypadków dla stanu mikroserwisu,
- co łącznie nam daje **19456 rezultatów do sprawdzenia** w testach 🤣

Z prostego testu nagle urodził nam się całkiem skomplikowane zadanie. Oczywiście pytanie co chcemy osiągnąć:

- odhaczyć sobie taska w Jirze 😉 - wtedy robimy bazowym podejściem.
- realnie zapewnić jakość 😎 - musimy  zastanowić się z czym się zmagamy i jak rozwiążemy dany problem.

Drugie podejście jest droższe i bardziej czasochłonne. Pierwsze będzie nas (błędnie) zapewniać, że wszystko mamy pod kontrolą. A później wdrożenie na proda i system w płomieniach. Choose your poison 🍶

## Jak testować mikroserwisy na poważnie?

[![](co-robic-jak-zyc.jpg)](co-robic-jak-zyc.jpg)

Powyższe mogłoby pokazywać, że przetestowanie pojedynczego mikroserwisu nie ma sensu. Owszem nie ma - jeśli robimy to tak płytko jak na początku. Aby to robić dobrze, trzeba odpowiednio zaprojektować system aby wspierał testowalność mikroserwisu.

To co trzeba zrobić to przemyśleć następujące obszary:
 - Parametry wejściowe 
 - Praca mikroserwisu 
 - Akceptowane wyjścia

### Parametry wejściowe

Na początek należy się zająć się parametrami.

Jak widać w punkcie [założenia wejściowe](#założenia-wejściowe) różnorodność parametrów wejściowych potrafi absurdalnie zwiększyć liczbę przypadków testowych.  

Rozwiązaniem tutaj jest zarówno obniżenie liczby takich przypadków przez:

- Zmniejszenie liczby połączeń do serwisów zewnętrznych - np. tylko jeden mikroserwis wyśle do nas komplet informacji, zamiast 4 różnych.
- Zmniejszanie liczby potencjalnych infomracji w wiadomościach - np. wysłanie podsumowania zamówienia   zamiast zamówienia ze wszystkimi polami / statusami / zdarzeniami.
- Ograniczanie zrównoleglania - np. dogadujemy się z zespołem, że nie wyślą nam wiadomości dopóki wcześniej nie uzyskają poprzednika od innego systemu. 
- Testy kontraktów - system z którym się komunikujemy zachowa się dokładnie w ten sposób jaki zdefiniujemy.

Oraz bardziej defensywne podejście świata zewnętrznego:

- Zakładanie, że kolejność nie będzie ustalona, że wiadomości nie przyjdą, że przyjdą powtórzone, przyjdą błędne.
- Obsługa scenariuszy negatywnych wraz z fallbackami.

### Praca mikroserwisu

Zmniejszanie ilości stanu od którego zależy proces:

- Usuwanie zależności
- Spłaszczanie informacji - DDD i modelowanie

Prostolinijne obsługiwanie wejścia

- Dla dużej liczby przypadków  wejściowych mamy to samo wyjście
- Dla bardzo małej liczby przypadków wejściowych w ogóle sprawdzamy stan wewnętrzny


### Akceptowane wyjścia

XYZ

## Myślenie przypadkami brzegowymi

Myśląc takim stylem można się czasem poczuć jak Jocker z Dark Knight:

[![](joker.jpg)](joker.jpg)

Jednak taki styl myślenia daje dużo, ponieważ pozwala za wczasu znaleźć sytuacje, w których system nie zadziała tak jak powinien.

Taki styl myślenia bazuje zarówno na oczywistych [Fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing), ale także na świetnej książce:

[![](thinking-in-promises.jpg)](https://www.goodreads.com/en/book/show/24216682-thinking-in-promises)

XYZ