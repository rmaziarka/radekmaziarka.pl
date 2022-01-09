---
title: "Dlaczego Bounded Contexty są ważne - jak wyznaczać?"
date: Sun, 08 Jan 2022 09:40:09 +0000
url: '/2022/01/01/dlaczego-bounded-contexty-sa-wazne-jak-wyznaczac/'
images: ['images/2018/07/private-1665019_960_720.jpg']
description: "Kilka heurystyk jak wyznaczać Bounded Contexty"
category: 'Wzorce projektowe'
draft: true
---

// wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/). 

Podział naszego rozwiązania technicznego na mniejsze konteksty to temat, który zawsze pojawia się podczas tworzenia bardziej rozbudowanego rozwiązania. Szczególnie jeśli mówimy o [mikroserwisach](https://blog.avanscoperta.it/2020/06/11/about-bounded-contexts-and-microservices/). Dlaczego tak jest? 

Nieprawidłowy podział kontekstów ma duże wady:
- praca będzie przechodziła przez wiele obszarów technicznych
- rozwój funkcji biznesowy wymagać będzie koordynacji  pracy kilku zespołów
- wiedza o statusie procesu będzie podzielona na kilka miejsc - brak będzie jednego źródła prawdy 
- rozwój jednej funkcji biznesowej będzie burzyć działanie funkcji pobocznych

Dlatego też chcemy wydzielić konteksty, które możemy rozwijać osobno i skupić naszą uwagę na konkretnym problemie. Następnie przydzielimy do kontekstów różne zespoły i odpowiednio ich zaplanujemy pracę. Na tej podstawie rozwój systemu będzie lepiej skoordynowany, poszczególne zespoły nie będą sobie wchodziły razem w paradę.

Na potrzeby tego artykułu wyszczególniłem takie 5 heurystyk dzielenia systemu na konteksty:
- Proces i jego podział
- Możliwości zmiany
- Źródło wiedzy

## Czym jest heurestyka
Lecz najpierw wyjaśnijmy sobie krótko czym jest heurestyka.

Zadaj sobie pytanie: "Jakie kryterium przyjmiesz dzieląc mieszkanie na mniejsze pokoje?" Nie ma tutaj jednoznacznie poprawnych odpowiedzi. Część rozwiązań będzie bardziej techniczna (jak biegną rury i elektryka), część związana z potrzebami (chęć posiadania dużej kuchni), część z czynnikami zewnętrznymi (skąd świeci słońce, na co wychodzą okna). W pewnym przypadku bardziej skłonisz się ku kwestiom technicznym, a czasem ku kwestiom bazującym na potrzebach. 2 podobne mieszkania mogą mieć całkowicie różny podział - nie ma tutaj najlepszego wyboru.

I tym właśnie jest **heurystyka - pomocą w rozwiązaniu problemu**, który nie bazuje na 100% powtarzalnym procesie, a raczej na wskazówkach i połączeniu ze sobą faktów z różnych dziedzin wiedzy. W pewnych sytuacjach wybierzesz heurystykę X, a w pewnych heurystykę Y.  

Dlatego też mówimy o heurystykach w przypadku definiowania kontekstów. Nie ma tutaj najlepszego rozwiązania. Musimy dopasować nasze podejście do problemu z którym się stykamy, sprawdzać jak nam idzie i iterować w kierunku lepszego systemu.

## Heurestyki

### Proces i jego podział
Ta heurestyka jest najbardziej popularna (co też oznacza, że nie zawsze właściwa). 

Rozpoczynamy od przeglądu naszego strumienia wartości (Value Stream). Rozpisujemy w jaki sposób działa proces, który chcemy zinformatyzować. Kto się z kim komunikuje, jakie informacje transportujemy, jakie cele chcemy spełniać.

Następnie szukamy zdarzeń granicznych ([Pivotal Events](https://www.dddheuristics.com/guiding-heuristics/eventstorming-emerging-pivotal-events-for-a-big-picture/)). To pozwoli nam określić w których miejscach proces zauważalnie zmienia swoją strukturę - pracują w nim inne osoby, lub proces spełnia inne cele. Bardzo często miejsce podziału procesu będzie pokrywało się z obecną strukturą organizacyjną. W ten sposób odkryjemy główny podział procesu i mniejsze obszary biznesowe (poddomeny).

Na tej podstawie możemy utworzyć nasze konteksty. Aktywności biznesowe danej grupy docelowej oraz przetwarzane informacje będą zawierać się w danym konktekście. Zamykamy część procesu biznesowego. XYZ 

**Pytania pomocnicze:**
- W którym miejscu mój proces się dzieli?
- Gdzie oddaję pracę innej osobie / innemu działowi?
- Jakie informacje są wymagane od działu w którym współpracuję?

https://www.dddheuristics.com/assets/images/value-stream-contexts.png

### Możliwości zmiany i autonomia
Jeśli widzimy, że pewne funkcje i cele biznesowe są często zmieniane, to bardzo możliwe, że warto dla nich wydzielić osobny kontekst. Nawiązuje to do słynnej pracy D.L. Parnasa [On the Criteria To Be Used in Decomposing Systems into Modules](https://www.win.tue.nl/~wstomv/edu/2ip30/references/criteria_for_modularization.pdf)

>> We propose instead that one begins with a list of difficult design decisions or design decisions which are likely to change. Each module is then designed to hide such a decision from the others.

Załóżmy, że nasz dział marketingu wykorzystuje promocje w systemie e-commerce. Istnieją różne rodzaje promocji, a wobec czego różne sposoby liczenia cen produktów. Część z tych promocji może się na siebie nakladać, część nie. **Ostatecznie skończymy z olbrzymim narzutem promocji na implementację funkcji zakupów.** Wyliczenie ostatecznej ceny produktu będzie skomplikowane, czasochłonne i zaburzało proces zakupów. 

Dlatego też wartościowe będzie odseparowanie od siebie tych odpowiedzialności. Liczenie cen przeniesiemy do kontekstu _Cennik_ który będzie odpowiedzialny za bazowe ceny produktów oraz promocje. Tutaj będzie wyliczana ostateczna cena produktów. Na tej podstawie zasilony zostanie kontekst _Zakupy_, który dostanie gotowe informacje do działania.

Przydatną techniką tutaj jest [Mapa Wardley'a](https://learnwardleymapping.com/). Pozwala ona, po podziale na obszary, zastanowić się na ile są one dojrzałe i stabilne. Na tej podstawie możemy podjąć powyższe decyzje.

### Źródło wiedzy

Ta heurestyka pozwala nam skupić się na bardziej ukrytych kontekstach. Są to również te konteksty, które podskórnie poszukują nasi klienci.


Odpowiedź na główne pytanie.

Załóżmy, że tworzymy rozbudowany system e-commerce. Możemy sprzedawać / rezerwować / zamieniać reklamacyjnie produkty. Każda z tych akcji blokuje konkretne sztuki produtków. Zadaj sobie wtedy pytanie "Ile mam danego produktu możliwego do sprzedaży?" Odpowiedź na to pytanie nie będzie łatwa - wymagane będzie przeliczenie 3 zbiorów danych. 

To jest sugestia, że brakuje nam dodatkowego obszaru, który będzie się zajmować dokładie
W ten sposób np. da się wyciągnąć potrzebę **stworzenia kontekstu Dostępności** w systemie e-commerce.

**Pytania pomocniczne:**
- Na jakie główne pytania powiniśmy odpowiedzieć w naszym systemie?
- Co jest dla nas najbardziej istotną informacją w systemie?
- Jaka odpowiedź powinna być dla nas znana bez zapytań do innych kontekstów?

### Językowe różnice

Lead w marketingu i sprzedaży. Model predykcyjny dla definiującego wzór i dla obsługującego konkretne użycie modelu.

### Reużywalność

Płatności są tego dobrym przykładem. Na początku chcielibyśmy aby klienci nam mogłi płacić za towary. Połączenie odpowiedzialności płatności z zamówieniem wydają się dobrą początkową decyzją. Później jednak możemy chcieć aby klient mógł zapłacić dodatkową kwotę za rzeczy niezwiązane z zamówieniem - dodatkową wysyłkę, wymianę. 

Tworzymy tutaj konteksty reużywalne - takie które mogą być wykorzystywane przez konteksty wyższego poziomu.

## Podsumowanie i materiały


`` Bounded Contexts shouldn’t serve the designer’s sensibilities and need for perfection, but enable business opportunities.

W internecie jest o wiele więcje heurystyk o których możecie przeczytać

https://www.dddheuristics.com/design-heuristics/

https://www.youtube.com/watch?v=ez9GWESKG4I

https://www.youtube.com/watch?v=ZEJ2Vyk1HA0

[Panel] Splitting systems towards bounded contexts and microservices
https://www.youtube.com/watch?v=h-7-lMJ_jdw

https://verraes.net/2021/06/split-domain-across-bounded-contexts/