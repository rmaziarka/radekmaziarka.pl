---
title: 'Event Storming w analizie procesu rekrutacji - case study'
url: '/2019/09/08/event-storming-w-analizie-procesu-rekrutacji-case-study/'
date: Sun, 08 Sep 2019 10:24:16 +0000
draft: false
images: ['images/2018/05/eventstorming.logo_.png']
description: "Case study rozwiązania problemów procesu rekrutacji za pomocą warsztatu Event Storming."
category: 'Event Storming'
tags: ['ddd', 'domain driven design', 'event storming']
---

// artykuł napisany razem z [Piotrem Klimcem](https://www.linkedin.com/in/piotr-klimiec-621873b5/) – programistą w firmie Software Mind.

Event Storming staje się coraz popularniejszy i jest szeroko stosowany przy projektowaniu systemów informatycznych. Branża IT to nie jedyny obszar, gdzie można wykorzystać tą technikę – tak jak pisałem w [Event Storming – Narzędzie usprawniające pracę organizacji](/2018/12/10/event-storming-narzedzie-usprawniajace-prace-organizacji/), można ją również zastosować w domenach **nieinformatycznych**.

W tym artykule chcielibyśmy przedstawić w jaki sposób Event Storming pomógł w analizie właśnie takiej nieinformatycznej domeny - procesu rekrutacji w firmie ~ 500 osób.

## Skąd potrzeba na Event Storming w rekrutacji?

W wielu organizacjach procesy są tworzone ewolucyjnie - nikt ich z góry nie planuje. Dostosowywane są one do obecnej sytuacji w sposób doraźny, kiedy jest bieżąca potrzeba. Firma zaś rośnie: 20 osób, potem 100, 500, jednak nikt się nie zastanawia czy poszczególne procesy dalej działają. Biznes przynosi zyski, płaci pracownikom w terminie - znaczy, że wszystko jest w porządku.

To przekonanie, że jest dobrze i stabilnie, może spowodować, że w rezultacie kończymy z procesem, nad którym nikt nie ma pieczy. Potworkiem, który nikogo nie zadowala, którego nikt nie kontroluje, ale ostatecznie jednak spełnia swoje zadanie. Szczególnie podatne na takie zjawiska są procesy, które przebiegają przez wiele działów. Rekrutacja to idealny przykład.

W ten proces są zaangażowane różne grupy osób z wielu działów – HR, osoby techniczne, zarządzający projektami, dyrektorzy, managerowie etc. Każda osoba w tym procesie **jest jedynie** **trybikiem**, który ma swoje cele i jest skupiony ich realizacji. Dział HR ma wyrobić normę, manager zatrudnić najtaniej jak się da, a osoba techniczna zweryfikować, ile kandydat nakłamał w CV 😉. Dla każdego pracownika słowo ‘rekrutacja’ oznacza zupełnie coś innego.

[![](/images/2019/09/silos.jpg)](/images/2019/09/silos.jpg)

Jeśli nie mamy możliwości patrzeć na całość procesu, to może się to skończyć spychaniem odpowiedzialności na innych i omijaniu problemów, które nas nie dotyczą. Długofalowo takie zachowanie prowadzi do nagromadzenia się negatywnych emocji pomiędzy działami. Stajemy się wtedy [organizacją silosową](https://www.cmswire.com/leadership/5-signs-your-organization-is-too-siloed/), która stawia na optymalizację lokalną kosztem zysków globalnych. Generujemy straty, zarówno te widoczne (np. koszty ogłoszeń na portalach) jak i te niewidoczne (np. czas osób technicznych spędzony na rozmowie kwalifikacyjnej).

Jak zatem zweryfikować czy tak złożony proces jak rekrutacja działa odpowiednio, skoro w zależności od działu ma to dla niego inne znaczenie? Najlepiej jest zacząć od wizualizacji całego procesu – i tutaj wkracza Event Storming!

## Przed Event Stormingiem

Każdy kto już przeprowadzał sesje Event Storming’u wie, że najtrudniej jest wystartować – zebranie odpowiedniego grona nie jest prostym zadaniem. W proces rekrutacji zaangażowanych jest bardzo wiele osób z różnych działów. Trzeba było skoordynować kalendarze tak, by każdy mógł wygospodarować 4 godziny w jednym terminie.

Dla wielu osób, które nie znały tej techniki, czas trwania warsztatu był sporym zaskoczeniem. „Dlaczego potrzebujemy aż 4 godzin? Co tak długo będziemy robić?” Osoby przyzwyczajone do spotkań w stylu „1 telewizor i 10 osób patrzących na własne laptopy” były mocno zaskoczone. Na szczęście Event Storming nie wymaga od uczestników posiadania żadnej elektroniki - potrzebujemy jedynie zestawu karteczek i markerów.

[![](/images/2019/09/sticky-notes.jpg)](/images/2019/09/sticky-notes.jpg)

W zorganizowaniu spotkania bardzo pomocne okazało się posiadanie zwolennika jego przeprowadzenia, w postaci osoby wysoko postawionej, która potrafiła ‘zachęcić’ innych do wzięcia udziału w warsztacie. Bez takiego sprzymierzeńca czas zebrania grupy mógłby się jeszcze bardziej rozciągnąć.

Ostatecznie termin pierwszego spotkania udało się wyznaczyć na piątek 13:00 - 17:00.  Z psychologicznego punktu widzenia jest to najgorszy możliwy czas na intensywną pracę. Część osób myślała, że zacznie weekend wcześniej. Niestety, inaczej się nie udało ☹

## Rozpoczęcie warsztatu

Warsztat zaczął się **od jasnego zdefiniowania celu** - chcemy zrozumieć, jak działa proces rekrutacji. Jak to wygląda z punktu widzenia poszczególnych działów, ile ludzi jest w to zaangażowanych, jakie narzędzie wykorzystywane są w procesie etc.

[![](/images/2019/09/mariusz-gil-event-storming.png)](/images/2019/09/mariusz-gil-event-storming.png)

W spotkaniu uczestniczyło 13 osób z czego dla 10 osób był to pierwszy kontakt z Event Stormingiem. Krótki wstęp, wytłumaczenie jak będziemy pracować i po chwili rozpoczęliśmy sesję [Big Picture](/2018/12/06/event-storming-jak-szybko-odkrywac-nieznane/) – od zrzutu wszystkich możliwych zdarzeń istniejących w procesie rekrutacyjnym w firmie:

[![](/images/2019/09/1-wild-exploration.jpg)](/images/2019/09/1-wild-exploration.jpg)

Następnie przeszliśmy do porządkowania procesu nakładając dodatkowe karteczki z problemami i innymi elementami.

Ciekawym spostrzeżeniem było, że ludzie początkowo bali się oznaczać Hot Spoty (problemy). Myśleli, że będziemy oceniać ich pracę, a nie proces jako całość. Problemy zaś mogłyby wskazywać, że nie są na tyle kompetentni, by sami je rozwiązać. Część z problemów była wynikiem współpracy z innym działem co mogło rodzić konflikty na linii dział-dział. Dopiero po pewnym czasie utworzyła się atmosfera bezpieczeństwa, która pozwoliła uczestnikom dzielić się swoimi wątpliwościami.

Z powyższym wiąże się również drugi temat – tzw. polskiego [„Zapierdalać trzeba”](https://noizz.pl/opinie/felieton-o-bezsensowej-pracy-po-polsku/lj87pjn). Osoby na warsztacie chciały pokazać, że robią odpowiednio dużo, by proces rekrutacji doszedł do skutku. Tak, jakby każda brakująca karteczka mogła być powodem do ich ukarania przez spoglądających obok uczestników. Na szczęście jednak taki stan nie trwał długo. Ostatecznie grupa pracowała skupiając się na celach warsztatu, a nie na pozorowaniu działania.

Te 2 tematy pokazują, że podczas warsztatu uczestniczy **muszą zbudować między sobą zaufanie**, bo tylko wtedy grupa jako całość będzie mogła efektywnie pracować i rozwiązywać problemy. Duża w tym rola facilitatora i odpowiedniego doboru uczestników. Czasami jedna niewłaściwa osoba na sali potrafi zablokować resztę uczestników, co przekłada się bezpośrednio na to, co podczas warsztatu uda się osiągnąć.

## Rezultaty pierwszej sesji

[![](/images/2019/09/2_pierwsza-sesja.jpg)](/images/2019/09/2_pierwsza-sesja.jpg)

Pierwsza sesja zakończyła się dużym sukcesem. W ciągu 4h udało się zwizualizować cały proces oraz odkryć kilka „smoków” które w nim żyły 😀 Zmapowaliśmy pracę wszystkich osób, oznaczyliśmy miejsca problematyczne i podzieliliśmy obszary procesu na mniejsze fragmenty.

Wciąż jednak nie mieliśmy jednoznacznych odpowiedzi na to, w jaki sposób poprawić nasz proces. Czuliśmy, że poświęcając jeszcze kilka godzin moglibyśmy dość do finalnych rezultatów.

## Przeprowadzamy drugą sesję

Efekty pierwszej sesji były tak dobre, że od razu padła propozycja zrobienia kolejnej, najszybciej jak się da. O ile zorganizowanie pierwszego warsztatu trwało 4 tygodnie, to na kolejny potrzebowaliśmy zaledwie 5 dni! Motywacja i energia do działania były tak duże, że synchronizacja tak sporej grupy nie stanowiła już problemu. **Jeżeli ludzie zobaczą, że coś działa i ma sens będą chcieli to kontynuować.**

Podczas drugiej sesji pracowaliśmy nad identyfikacją problemów i, o ile to możliwe, zaadresowaniu ich przy pomocy [Action Pointów](/2019/07/22/event-storming-rozszerzenie-notacji-action-point/). Zaznaczyliśmy wszystkie systemy oraz aktorów biorących udział w procesie. Popatrzyliśmy również na model pod kątem potencjalnych usprawnień. Ostatecznie udało się uzyskać następujący efekt:

[![](/images/2019/09/3_druga_sesja.jpg)](/images/2019/09/3_druga_sesja.jpg)

Druga sesja miała zupełnie inną dynamikę niż pierwsza. Podczas pierwszej sesji uczestnicy potrzebowali czasu, żeby zaadoptować ten niekonwencjonalny sposób pracy, oswoić się z karteczkami, nabrać pewności siebie i poczuć się bezpiecznie. Podczas drugiej był ogień od samego początku!

## Rezultat warsztatu

To co widoczne poniżej, udało się stworzyć w ciągu 8 godzin (2 sesje po 4 godziny):

[![](/images/2019/09/4_ostateczny-rezultat.jpg)](/images/2019/09/4_ostateczny-rezultat.jpg)

Rezultat pracy był niesamowity – **nikt nie spodziewał się, że tyle zostanie osiągnięte w tak krótkim czasie**. Został zbudowany widok całego proces rekrutacyjnego, wraz z jego dobrymi i złymi stronami. Problemów było dużo, ale uczestnicy od razu proponowali ich możliwe rozwiązania. Udało się zdefiniować kto i kiedy jest zaangażowany, a kiedy zostawia tą kwestię innym.

Każda osoba na sali była zadowolona z rezultatów. Osoby z HRu mocno się zdziwiły, że ich proces jest bardziej efektywny niż im się zdawało. Osoby techniczne były zadowolone po zwizualizowaniu ich trudności, bo mogą teraz nad nimi pracować. Kadra zarządzająca zobaczyła proces rekrutacji jako całość, by móc go następnie usprawniać.

Ludzie skończyli Event Storming z nadziejami. Po raz pierwszy podzielili się swoimi problemami w tak szerokim gronie, zdefiniowali propozycje poprawy i kto się nimi zajmie. Niektóre tematy długo leżały na sercu pracowników firmy, ale o nich się milczało. Dzięki warsztatowi udało się to rozwiązać.

## Podsumowanie

Gdyby nie Event Storming to nie udałoby się przeprowadzić spotkania z takim rozmachem i przy tylu osobach. Wizualne spotkania pozwalają **łatwiej komunikować się i szybciej rozwiązywać problemy**. Po 8 godzinach mieliśmy gotowy rezultat. Każdy z uczestników potwierdzał, że był to czas dobrze spędzony. Część osób zostało nawet po godzinach, by podzielić się swoimi wrażeniami.

Osoby nietechniczne bardzo dobrze odnalazły się w tej technice – każdy brał aktywny udział. Ludziom bardzo się ta technika spodobała – jej lekkość i możliwość dostosowania pod własne potrzeby. Od razu pojawiły się propozycje by przejść tak np. proces on-boardingu nowych pracowników. W naszej ocenie wydaje się, że każdy, każdy proces biznesowy da się zwizualizować przy użyciu tej techniki.

Wydaje się, że wycisnęliśmy wszystko z tej cytryny 😊

PS. Gdyby Cię interesował temat to polecam moje[**warsztaty z Event Stormingu**](/szkolenia/event-storming) lub sprawdzenie [pozostałych postów](/category/event-storming/) z tego tematu.