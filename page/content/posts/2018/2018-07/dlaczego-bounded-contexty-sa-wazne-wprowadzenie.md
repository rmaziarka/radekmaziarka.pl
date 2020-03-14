---
title: 'Dlaczego Bounded Contexty są ważne - wprowadzenie'
slug: '/2018/07/18/dlaczego-bounded-contexty-sa-wazne-wprowadzenie/'
date: Wed, 18 Jul 2018 20:48:22 +0000
draft: false
featured_image: 'images/2018/07/private-1665019_960_720.jpg'
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

// wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/).

**Bounded Context** to koncepcja, na którą mocno stawia nacisk Eric Evans w swojej książce [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215). Mówi ona, by aplikacje dzielić na konkteksty - części które są wewnętrznie spójne, a na zewnątrz komunikują się przez określony zbiór metod. Brzmi skomplikowanie, prawda? Wszystko się rozjaśni w dalszej częsci 😉

### W czym problem?

Im aplikacja jest większa tym **trudniej zbudować jeden wspólny model** – rozwiązanie problemu. Zasady biznesowe zaczynają się mieszać i przestajemy rozumieć za co nasz model odpowiada. Rozwijanie aplikacji mocno utrudnia fakt, że dla różnych osób ten sam zwrot może mieć inne znaczenie – użytkownik w zależności od sytuacji może być np. kupującym, klientem, odbiorcą czy administratorem.

Próba implementacji różnych funkcjonalności w jednym modelu kończy się mieszaniem odpowiedzialności, nadmiarem niepotrzebnych informacjami i dużą trudnością wprowadzania zmian. Stąd też takie narzekania na **spaghetti code** - kod, który starając się spełniać wszystkie funkcje w rzeczywistości żadnej z nich nie spełnia dobrze.

### Bounded Context

[![](/images/2018/07/bounded-context-orders-delivery.jpg)](/images/2018/07/bounded-context-orders-delivery.jpg)

Konteksty mają za zadanie podzielić skomplikowaną dziedzinę biznesową na kilka mniejszych, dostosowanych do problemu jaki aktualnie rozwiązujemy. **Dany kontekst zawiera w sobie własny model** odwzorowujący konkretne potrzeby, warunki i procesy biznesowe. Pozostałe konkteksty nie powinny mieć wpływu na działania zachodzące wewnątrz innego kontekstu – mogą jedynie zobaczyć rezultaty tych działań. Zmienianie danych wewnątrz kontekstu nie powinno być możliwe bez nadzoru samego kontektu – może to zburzyć wypracowane zasady i sprawić że dane nie będą poprawne. Takie działania pozwalają zachować spójność, którymi rządzi się dany kontekst.

Patrząc na powyższy przykład mamy **2 konteksty** - zamówień (Orders) i dostaw (Delivery). Te konteksty będą rozwiązywały konkretne problemy systemu e-commercowego. Załóżmy że pojawia się potrzeba zmiany w kontekście zamówień - podzielenia struktury klienta (Customer) na dwa osobne modele: klienta biznesowego i klienta prywatnego. W tym przypadku musimy zadbać by zasady komunikacji z kontekstem dostaw wciąż były zachowane. Nasze zmiany nie będą jednak wpływać na model odbiorcy (Recipient), przez co konktest dostaw powinien działać niezależnie od zmian w konktekście zamówień.

### Analogia ze światem rzeczywistym

Konteksty można **porównać do działów w firmie**. Weźmy na przykład dział finansów. Nie będziesz chciał / chciała znać w jaki sposób są wyliczane wszystkie twoje składki ZUS czy NFZ – ważne jest aby twoja pensja wpływała co miesiąc na konto. Równocześnie dostając podwyżkę nie zmienisz samemu informacji o swoich zarobkach – dział finansów poinformowany o podwyżce zmodyfikuje twoje dane by odzwierciedlały aktualne zarobki. W przypadku odwzorowywania w naszym systemie potrzeb konkretnej firmy, działy tej firmy mogą odpowiadać konktekstom, które będziemy implementować (choć nie należy brać tego jako sztywną regułę).

### Zalety Bounded Contextów

Wydzielanie konktekstów w naszych aplikacjach pozwala rozwiązywać nasze problemy **dokładnie w taki sposób jaki potrzebujemy**. Jeśli np. dział A potrzebuje rozwiązywać swoje problemy inaczej niż dział B, to nic nie stoi na przeszkodzie by mieć 2 osobne konkteksty, które realizują te potrzeby w inny sposób. Dzięki rozdziałowi mamy dobrą separację odpowiedzialności i łatwiej jest nam zrozumieć w jaki sposób aplikacja działa. Samo refaktoryzowanie staje się łatwiejsze bo modyfikacje w jednym konktekście nie wpływają na zachowanie innych konktekstów.

Co równie ważne, konteksty **ułatwiają porozumiewanie się z biznesem / klientami**. Używając słownictwa dostosowanego do danego problemu łatwiej jest nam komunikować nasze rozwiązania - nie musimy tłumaczyć ogólnych zwrotów na te używane przez konkretnych klientów np. "użytkowników" raz na "klientów" a raz na "odbiorców".

Tworzenie konktekstów jest przede wszystkim **bardziej efektywne kosztowo**. Już w 2003 roku Martin Fowler [pisał](https://martinfowler.com/bliki/MultipleCanonicalModels.html), że stworzenie jednego, ogólnego modelu jest prawie niemożliwe - nawet jeśli taki model damy radę zbudować to będzie on prawie niemożliwy do zrozumienia. A już na pewno do utrzymania.

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dlaczego-Bounded-Contexty-sa-wazne-wprowadzenie-Radek-Maziarka "") - <time datetime="2018-07-18 22:16:54">Jul 3, 2018</time>

**Dlaczego Bounded Contexty są ważne – wprowadzenie | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
