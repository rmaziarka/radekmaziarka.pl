---
title: 'Dlaczego Bounded Contexty są ważne – narzędzia Business Inteligence'
slug: '/2019/05/23/dlaczego-bounded-contexty-sa-wazne-przyklad-4/'
date: Thu, 23 May 2019 22:13:12 +0000
draft: false
featured_image: 'images/2018/07/private-1665019_960_720.jpg'
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

 // wszystkie materiały zostały zebrane w [podsumowaniu cyklu](/2018/07/16/dlaczego-bounded-contexty-sa-wazne-podsumowanie/).

Po poprzednich, bardziej teoretycznych postach, warto przejść do praktyki. W kilku następnych postach pokażę problemy, jakie powstały przez brak wydzielonych kontekstów w aplikacji.

Wszystkie przytoczone przeze mnie przypadki braku kontekstów są realnymi przypadkami. Jedynie domena biznesowa została zmieniona na systemy zakupowe.

Sytuacja biznesowa
==================

Firma tworząca platformę sklepów potrzebowała narzędzia do wykonywania analiz i tworzenia raportów. Chciała ona móc, na podstawie danych w platformie, uzyskiwać bardziej złożoną wiedzę odnośnie akcji klientów w sklepie: przeszukiwane produkty, raporty sprzedażowe tygodniowe / miesięczne / kwartalne, najbardziej popularne produkty / godziny zakupów itd.

Podjęta została decyzja, aby nie pisać tej funkcjonalności od zera, ale wykorzystać jedno z dostępnych na rynku narzędzi Business Inteligence (np. [Power BI](https://powerbi.microsoft.com/en-us/)). Pozwalają one tworzyć wysokiej jakości analizy i raporty, bez konieczności dodawania takich możliwości do samej platformy. Co ważniejsze, bardziej biegli analitycy biznesowi czy project managerowie, również mogli sami tworzyć takie raporty.

Rozwiązanie techniczne
======================

Po zakupie narzędzia BI połączono się z tabelami wewnątrz bazy danych platformy (narzędzia te rzadko łączą się przez API) w celu pobierania i analizy danych. Biznes (analitycy, PMowie itd.) pracowali na tych samych strukturach danych co developerzy.

[![](/images/2019/05/artykul-BC-zdjecie1.jpg)](/images/2019/05/artykul-BC-zdjecie1.jpg)

Platforma była w tym czasie rozszerzana o nowe funkcjonalności, które modyfikowały jej sposób działania.

Problem
=======

Po pewnym czasie zauważono, że zespoły pracujące nad danymi modułami bardzo starają się unikać pracy związanej ze zmianami w bazie danych. Ilość tabel rosła niewspółmiernie do zmian jakie były dokonywane. Dodatkowo te tabele, które istniały już wcześniej, miały strukturę nieprzystającą do aktualnych potrzeb.

Zespół argumentował swoje zachowanie faktem, że narzędzie BI nie pozwala im dokonywać zmian jakich by wymagali. Parę razy ich modyfikacje spowodowały problemy z używaniem narzędzia przez osoby od strony biznesu. W reakcji na tą sytuację zdecydowali się tworzyć swoją architekturę tak, by nie dokonywać zmian, które mogą spowodować jakieś problemy.

Osoby te pracowały w jednej firmie i najprawdopodobniej mogłyby się porozumieć odnośnie modyfikacji struktury bazy danych i aktualizacji zarówno po stronie platformy jak i narzędzia BI. Jednak żadna z grup nie wyszła z inicjatywą i developerzy woleli dodawać nowe tabele niż usuwać / modyfikować istniejące.

Bounded Context
===============

Zabrakło tutaj ewidentnie separacji i jasnego zdefiniowania odpowiedzialności w jaki sposób wybrane narzędzie BI będzie się integrowało z bazą danych. Tak silne połączenie zewnętrznego komponentu z naszym systemem powoduje trudności w rozwoju aplikacji. Jednocześnie zmusza członków zespołu do dokonywania skomplikowanych wyborów i przeprowadzania trudnych rozmów. A ludzie z natury nie lubią ich podejmować / brać w nich udziału i wolą raczej tak działać by nie musieć się z takimi problemami zmagać.

Bounded Context to nie tylko zagadnienie techniczne – **Bounded Context to zagadnienie socjotechniczne**, mocno zahaczające o sposoby pracy zespołów i pojedynczych jednostek. Zespół pracując w takim kontekście powinien mieć pełną możliwość pracy wg ich reguł, jeśli tylko przestrzegają kontraktów, które zdefiniowali. Praca wewnątrz kontekstu daje poczucie autonomii. A ta, wg książki [Drive](https://en.wikipedia.org/wiki/Drive:_The_Surprising_Truth_About_What_Motivates_Us) Daniela Pinka, jest uważana za kluczowy parametr, by pracujące osoby były silnie zmotywowane. Ale jest coś ważniejszego niż motywacja.

Google w 2015 roku opublikował [badanie](https://rework.withgoogle.com/blog/five-keys-to-a-successful-google-team/), w którym sprawdzali jakie są najważniejsze czynniki wpływające na efektywność ich zespołów. **Kluczową wartością było psychologiczne bezpieczeństwo**, pozwalające dokonywać zmiany i przeprowadzać eksperymenty, bez olbrzymich konsekwencji z zewnątrz. Takie środowisko powoduje, że nie boimy się zadawać pytań, popełniać błędy i uczyć się na nich, poprosić o pomoc, gdy czegoś nie wiemy. To rodzi atmosferę współpracy dającą wymierne korzyści zarówno dla pojedynczego pracownika jak i dla całego zespołu.

Konteksty wspierają to bezpieczeństwo definiując jaki jest kontrakt z zewnętrznym światem, a co jest naszymi wewnętrznymi detalami. Jeśli tylko zadbamy, by efekt naszych zmian nie burzył tego kontraktu **możemy dokonywać dowolne zmiany jakie są dla nas wymagane**. Zmiana bazy danych / frameworka / języka programowania czy nawet zmiana modelu pracy staje się w tym momencie możliwa. Musimy jedynie pamiętać o tym by dotrzymywać wcześniej danego słowa.

Rozwiązanie
===========

W zasadzie, w opisanej sytuacji są możliwe 2 rozwiązania, które zależą od tego, jak chcemy uformować zespoły:

 *   Biznes i developerzy razem - planujemy ścisłą kooperację pomiędzy działem biznesowych i technicznym, która będzie przyporządkowana kontekstom biznesowym
 *   Biznes i developerzy osobno - chcemy by każdy z tych działów mógł pracować niezależnie od siebie, na podstawie zdefiniowanych reguł pracy

### Biznes i developerzy razem

Jeśli chcemy mieć bliską współpracę pomiędzy zespołami a osobami biznesowymi to lepiej jest uformować wspólne zespoły – tzw. cross-funkcjonalne. W tym przypadku np. zespół zajmujący się kontekstem sklepu rozszerza się o dodatkowego analityka. Nowa formacja pracuje razem, by rozwijać dane rozwiązanie, w obszarze danego zespołu. Można powiedzieć, że dany analityk staje się w tym momencie analitykiem sklepu – koordynującym dany obszar.

[![](/images/2019/05/artykul-BC-zdjecie2.jpg)](/images/2019/05/artykul-BC-zdjecie2.jpg)

Taki analityk pracuje ściśle z zespołem współdzieląc odpowiedzialność za realizowane zadania. Plan na nowe funkcjonalności sklepu, zarówno w platformie i narzędziu BI, jest bezpośrednio ze sobą związany. Praca zespołu jest silnie skoncentrowana by rozwijać te 2 produkty razem.

W tej sytuacji połączenie pomiędzy narzędziem BI, a tabelami w bazie danych pozostanie takie samo, ponieważ zespół bierze odpowiedzialność zarówno za połączenie platforma -> tabele, ale także narzędzie BI -> tabele, w ściśle zdefiniowanym obszarze. Jakakolwiek zmiana, zarówno w platformie, jak i w narzędziu jest konsultowana w całym zespole.

### Biznes i developerzy osobno

Jeśli chcemy mieć separację pomiędzy osobami biznesowymi, a zespołem, to trzeba zdefiniować jasne zasady, na podstawie których osoby biznesowe integrują się z danymi wewnątrz kontekstu danego zespołu. Da to jasną odpowiedź co jest używane przez zewnętrzny podmiot, a co możemy zmieniać bez większych trudności.

Można to osiągnąć np. tworząc osobne tabele, które będą zawierały dane skierowane jedynie dla narzędzia BI. Zespół będzie populował te dane w odpowiedniej częstotliwości, którą zdefiniuje w ramach kontraktu. Biznes będzie się łączyć jedynie do tych tabel, mając słowo od zespołu, że dane zawsze będą dostarczane na czas.

[![](/images/2019/05/artykul-BC-zdjecie3.jpg)](/images/2019/05/artykul-BC-zdjecie3.jpg)

To rozwiązanie wymaga więcej pracy od zespołu programistycznego (aktualizacja danych, dbanie o przypadki desynchronizacji etc.), ale tworzy jasne ramy współpracy, zapewniając autonomię i bezpieczeństwo zmian. Celowo pominąłem w poście opisy sposobów tworzenia i populowania takich tabel BI - to temat na kompletnie inną dyskusję 😉

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Dlaczego-Bounded-Contexty-sa-wazne-narzedzia-Business-Inteligence-Radek-Maziarka "") - <time datetime="2019-05-27 09:06:37">May 1, 2019</time>

**Dlaczego Bounded Contexty są ważne – narzędzia Business Inteligence | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
