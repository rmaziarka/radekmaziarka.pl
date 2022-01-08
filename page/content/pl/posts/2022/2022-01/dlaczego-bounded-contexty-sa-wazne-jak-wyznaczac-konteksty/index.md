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

Podział naszego rozwiązania technicznego na mniejsze konteksty to temat, który zawsze pojawia się podczas tworzenia bardziej rozbudowanego rozwiązania. Dlaczego tak jest? 

Nieprawidłowy podział kontekstów ma duże wady:
- praca będzie przechodziła przez wiele obszarów technicznych
- będziemy musieli koordynować pracę kilku zespołów naraz
- wiedza o statusie procesu będzie podzielona na kilka miejsc - brak będzie jednego źródla prawdy 
- rozwój jednej funkcji będzie rozwalać działanie funkcji pobocznych

Dlatego też chcemy wydzielić konteksty, które możemy rozwijać osobno i skupić naszą uwagę na konkretnym problemie. Następnie przydzielimy do kontekstów różne zespoły i odpowiednio ich zaplanujemy pracę. Na tej podstawie rozwój systemu będzie lepiej skoordynowany, poszczególne zespoły nie będą sobie wchodziły razem w paradę.

Na potrzeby tego artykułu wyszczególniłem takie 5 heurystyk dzielenia systemu na konteksty:
- Proces i jego podział
- Możliwości zmiany
- Źródło wiedzy

## Czym jest heurestyka
Lecz najpierw wyjaśnijmy sobie krótko czym jest heurestyka.

Zadaj sobie pytanie: "Jak podzielić XYZ na mniejsze części?" Nie ma tutaj jednoznacznie poprawnych odpowiedzi. C 

I tym właśnie jest heurystyka - pomocą w rozwiązaniu problemu, który nie bazuje na 100% powtarzalnym procesie, a raczej na wskazówkach i połączeniu ze sobą faktów z różnych dziedzin wiedzy.

Dlatego też mówimy o heurystykach w przypadku definiowania kontekstów. Nie ma tutaj najlepszego rozwiązania. Musimy dopasować nasze podejście do problemu z którym się stykamy, sprawdzać jak nam idzie i iterować w kierunku lepszego systemu.

## Heurestyki

### Proces i jego podział
Ta heurestyka jest najbardziej popularna (co też oznacza, że nie zawsze właściwa). 

Rozpoczynamy od przeglądu naszego strumienia wartości (Value Stream). Rozpisujemy w jaki sposób działa proces, który chcemy zinformatyzować. Kto się z kim komunikuje, jakie informacje transportujemy 

Następnie szukamy zdarzeń granicznych (Pivotal Events). To pozwoli nam określić w których miejscach 

**Pytania pomocnicze:**
- W którym miejscu mój proces się dzieli?
- Gdzie oddaję pracę innej osobie / innemu działowi?
- Jakie informacje są wymagane od działu w którym współpracuję?

https://www.dddheuristics.com/assets/images/value-stream-contexts.png

### Możliwości zmiany i autonomia
Jeśli widzimy, że coś się szybko zmienia to warto to wydzielić na mniejszy zbiór.

//książka o modułach
//mapy wardleya

### Źródło wiedzy

Ta heurestyka pozwala nam skupić się na bardziej ukrytych kontekstach. Są to również te konteksty, które podskórnie poszukują nasi klienci.


Odpowiedź na główne pytanie.

W ten sposób np. da się wyciągnąć potrzebę **stworzenia kontekstu Dostępności** w systemie e-commerce. 

Załóżmy, że tworzymy rozbudowany system e-commerce. Możemy sprzedawać / rezerwować / zamieniać reklamacyjnie produkty. Ponieważ każda z tych akcji zajmuje konkretne sztuki produtków to trudno bedzie nam wyliczyć ich rzeczywistą ilość. Zadaj sobie wtedy pytanie "Ile mam danego produktu możliwego do sprzedaży?"

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