---
title: 'Event Storming - typowe problemy'
url: '/2020/02/09/event-storming-typowe-problemy/'
date: Sun, 09 Feb 2020 15:34:03 +0000
draft: false
featured_image: 'images/2018/05/eventstorming.logo_.png'
category: 'Event Storming'
tags: ['event storming']
---

Z Event Stormingiem jest jak z wojskową bitwą – przygotowany jesteś w stanie osiągnąć określony cel, nawet jeśli warunki nie są sprzyjające. Zaś będąc nieprzygotowanym - nawet najprostsza potyczka stanie się ostatecznie porażką. Nie inaczej jest z warsztatami.

Planując jakikolwiek z nich (nie tylko Event Storming) warto zwrócić uwagę na możliwe problemy, które mogą się przytrafić podczas przygotowania i samego jego przeprowadzania. Mogą one spowodować, że oczekiwane rezultaty będą niższe niż oczekiwane. Niekiedy mogą nawet wyłożyć cały warsztat powodując ostatecznie negatywne konsekwencje dla facylitatora lub uczestników.

Pogrupowałem (dość arbitralnie) problemy w 3 grupy:

 *   [Praca z ludźmi](#ludzie)
 *   [Miejsce warsztatu](#miejsce)
 *   [Facylitator](#facylitator)

[![](/images/2020/02/people-2557396_1920.jpg)](/images/2020/02/people-2557396_1920.jpg)

# Praca z ludźmi

### Brak celu warsztatu

Każdy przeprowadzany warsztat powinien mieć swój cel. Bez niego ludzie nie wiedzą w którą stronę podążają i co chcą osiągnąć. Robienie Event Stormingu dla samego Event Stormingu nie przyniesie wymiernych korzyści. Owszem, będzie ciekawą zabawą, ale uczestnicy wyjdą z warsztatu z przeświadczeniem, że stracili czas.  A to potrafi zabić jakąkolwiek kolejną edycję warsztatu.

Warto więc przed Event Stormingiem postawić cel, do którego się przygotujemy i przeprowadzimy warsztat zgodnie z nim. Czy to jest rozbicie monolitu, wejście w nową domenę biznesową czy współdzielenie wiedzy pomiędzy nowymi członkami zespołu – każdy warsztat jest inny. Mając obrany kierunek uczestnikom będzie łatwiej skupić się na jego realizacji. Posiadamy określoną ilość czasu i to na nas spoczywa odpowiedzialność, by iść w dobrą stronę.

### Osoby nieumiejące rozmawiać z biznesem

Często generalizuje się, mówiąc, że programiści to osoby nieprzygotowane do życia w społeczeństwie. Jest to oczywiście nieprawda, ale charakter naszej pracy może dość mocno wpływać na nasz sposób myślenia i utrudniać rozmowę z osobami nietechnicznymi ([mój post](/2018/09/28/podstawy-psychologiczne-ubiquitous-language/) na ten temat). Może to powodować kilka problemów.

Najmniejszym z nich jest używania ściśle języka technicznego. Osoby spoza świata IT będą się w tym momencie czuły obco, przez co naturalnie będą się wycofywać z dyskusji. Nie będziemy wtedy tworzyć pożądanego [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html) i budowali relacji pomiędzy grupami. Warto więc skupiać się na wspieraniu uczestników w używaniu spójnego języka - poprawiać zbyt zawiłe technologiczne terminy i zamieniać je na te bliższe codziennemu życiu.

Niestety, niekiedy osoby ze świata IT będą chciały wykazać, że osoby z biznesu się mylą. Zaczną tak zadawać pytania, aby ich rozmówcy zrobili z siebie głupków. Ma to katastroficzne skutki podczas warsztatu, ponieważ antagonizuje między sobą uczestników. Niekiedy będzie potrzeba uciszenia delikwenta i zawieszenie dyskusji. Tylko to uratuje nas przed np. obrażeniem naszego klienta i przedwczesnym zakończeniem warsztatu.

### Osoby despotyczne

Z drugiej strony podczas warsztatu mogą się pojawić osoby, które będą zbyt władcze i autorytarne. Nie będą one pozwalały wypowiedzieć się innym uczestnikom. Będą blokowały dyskusje i narzucały swój punkt widzenia. Uczestnicy będą bali się cokolwiek powiedzieć w ich otoczeniu. Taka atmosfera nie pozwala znaleźć źródła problemu i go dobrze zaadresować. [Badania](https://rework.withgoogle.com/blog/five-keys-to-a-successful-google-team/) pokazują, że psychologiczne bezpieczeństwo jest kluczowe by ludzie mogli efektywnie pracować. Możemy zakończyć swój warsztat z bardzo negatywnymi emocjami i niechęcią ludzi do siebie nawzajem.

Niekiedy takie osoby są po prostu nieświadome swoich cech. Działają tak naturalnie, ponieważ w ich naturze jest dowodzić innymi / narzucać swoje zdanie. Uświadomienie im tej sytuacji pozwoli im na cofnięcie się i pozwolenie grupie pracować dalej.

Niestety czasami tacy despoci są niemożliwi do poprawy podczas pojedynczego warsztatu. Dlatego też może się okazać, że zmuszeni będziemy do podziękowania takiej osobie za uczestnictwo. Jeśli jednak jest to niemożliwe to może pomóc podzielenie grupy na mniejsze podzespoły. Wtedy tylko jedna grupa cierpi z powodu pracy z despotą, a reszta jest w stanie pracować efektywnie. Jeśli takich osób jest więcej to możemy zrobić z nich jedną grupę, tzw. grupę śmierci 😉

### Niepewność podczas warsztatu

Grupa podczas warsztatu powinna mieć pole do działania i możliwość rozwiązywania tego problemu w sposób najbardziej dla niej optymalny. Jednak przeważnie uczestnicy warsztatów nie znają dostatecznie specyfiki warsztatu (również często siebie nawzajem) by móc odpowiednio płynnie radzić sobie z każdym problemem i wątpliwością. Jeśli poczują się niepewnie, to nie będą mogli odpowiednio działać bądź reagować. Może dojść do tzw. [paraliżu decyzyjnego](https://dopracowani.pl/2017/02/07/paraliz-decyzyjny/).

Na prowadzącym ciąży wtedy odpowiedzialność odpowiednio szybkiej reakcji, aby móc taką niepewność rozbić i pozwolić uczestnikom kontynuować warsztaty. Bardzo często będziemy musieli podjąć natychmiastową decyzję. I zwykle nie będzie ona najlepsza z możliwych. Jednak ważniejsza jest tutaj szybkość a nie poprawność – lepiej naprawić swój błąd po pewnym czasie niż tracić go na wybór najwłaściwszej drogi.

### Niezaplanowanie przerw

Brak jasnej agendy i planu spotkania może wzbudzić w ludziach strach, że warsztaty nie idą w dobrą stronę. Szczególnie ważne są tutaj przerwy. Uczestnicy chcą mieć pewność, że będą mieli chwilę na odpoczynek, a jednocześnie nie będą przeszkadzali wtedy innym. Brak zaplanowania takowych będzie skutkował tworzącym się chaosem i rozproszeniem uczestników.

Plan, nawet szczątkowy, z zapowiedzianymi miejscami na chwilę dla siebie, pozwala w kontrolowany sposób maksymalizować skupienie, a następnie przeznaczać czas na odpoczynek. Robimy jedną rzecz i robimy ją dobrze – albo praca nad problemem albo przerwa. Dzięki temu szybciej osiągamy wymagany rezultat, a uczestnicy są bardziej zadowoleni.

[![](/images/2020/02/meeting-room-730679_960_720.jpg)](/images/2020/02/meeting-room-730679_960_720.jpg)

# Miejsce warsztatu

### Niedopasowana sala

Sala do przeprowadzenia warsztatów musi mieć odpowiednie warunki do pracy grupowej. Ponieważ zwykle na sesji jest powyżej 6 osób to mała sala może być do tego niedostosowana. Będzie tam duszno, tłoczno, krępująco. A w takich warunkach trudno się myśli i pracuje wspólnie.

Sala do warsztatu powinna być na tyle duża by spokojnie przy ścianie mogło pracować kilka osób naraz. Miejsce powinno być przewiewne, najlepiej z oknami albo mocno działającą klimatyzacją. Światło słoneczne pobudza do działania i pozwala lepiej skoncentrować się na działaniu.

### Złe przygotowanie sali

Sama sala to tylko połowa sukcesu – należy ją też odpowiednio przygotować. Krzesła bądź stoły blisko ściany pracy odwrócą uwagę uczestników od warsztatu i zachęcą do siadania / oparcia się. A to pierwszy krok, by uczestnicy nie brali aktywnego udziału w warsztacie. Kiedy już dana osoba przystanie z daleka od ściany o wiele trudniej jest ją ponownie zachęcić do pracy wspólnej. Sam Alberto Brandolini w [swojej książce](https://leanpub.com/introducing_eventstorming) o Event Stormingu pisał, że krzesła są trujące – zabijają kreatywność i chęć działania.

Dlatego najlepszym rozwiązaniem jest odsunięcie krzeseł i stolików jak najdalej od miejsca pracy. Mogą być one w zasięgu wzroku, ale dojście do nich powinno być konkretnym wysiłkiem, które zniechęci uczestników do siadania. Przy ścianie powinno być bardzo dużo miejsca i przestrzeni do pracy i rozmowy.

Warto też zadbać, by karteczki i markery były blisko uczestników. Można to zrobić np. podkładając niski taboret przy ścianie i kładąc na nim warsztatowy asortyment. Dzięki temu uczestnicy nie będą musieli poświęcić dużo czasu na wzięcie karteczki do ręki i zaczęcie pisać.

### Mała ilość karteczek / markerów

Nawet tak błaha rzecz jak niewystarczająca liczba kartek i marketów potrafi spowodować, że twoje warsztaty nie będą miały pozytywnego rezultatu. Niedostateczna liczba materiałów spowoduje w uczestnikach niechęć do sięgania po nie – będą się bać, że ich zabraknie. Zadziała tutaj błąd poznawczy znany jako [niechęć do straty](https://pl.wikipedia.org/wiki/Niech%C4%99%C4%87_do_straty). Może się okazać, że ta jedna karteczka, której ktoś nie zapisał była kluczowa do rozwiązania problemu.

Dlatego podczas warsztatu karteczek i markerów powinno być o wiele więcej niż uczestników. Tak, by ich zostało jeszcze dużo po warsztacie. Nie zmarnują się – wykorzystasz je przy następnym. Za to ich duża ilość pozwoli zgromadzonym nie przejmować się czy komuś czegoś zabraknie. Uczestnicy będą mogli się w pełni skupić się tylko na rozwiązywaniu problemu.

Jeśli chcesz nieco oszczędzić na kosztach warsztatu możesz sprawdzić mój [poprzedni post](/2019/06/15/event-storming-ile-kosztuje-przeprowadzenie-warsztatu/).

### Brak przekąsek

Warsztaty są niesamowicie wyczerpujące pod względem mocy umysłowej. Uczestnicy mogą przestać działać, ponieważ zabraknie im odpowiedniej energii. O tym pisze Daniel Kahneman w swojej książce [Thinking Fast and Slow](https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow) przytaczając przykład sędziów, którzy przed obiadem przestawali analizować swoje podejmowane decyzje. Takie zachowanie może utrudnić zrealizowanie celów warsztatu.

Warto więc w miejscu nieco oddalonym od ściany postawić lekkie przekąski bądź owoce, które wspomogą warsztatujących w trudnych chwilach. Nie powinny być to jednak ciężkostrawne produkty typu pizza, ponieważ ludzie będą się czuli ociężale i w rezultacie mniej chętni do działania.

Często przy takich miejscach rozgrywają się naprawdę ciekawe dyskusje, które później będą miały odzwierciedlenie karteczkach na ścianie. Nie zabraniajmy ludziom rozmów w ich ulubionym środowisku – zadbajmy tylko, by miało to później przełożenie na rezultat pracy.

[![](/images/2020/02/white-board-593309_960_720.jpg)](/images/2020/02/white-board-593309_960_720.jpg)

# Facylitator

### Słabe warunki kondycyjne

Praca jako facylitator jest bardzo wyczerpująca. Męczymy się zarówno fizycznie jak i mentalnie. Nasza słabość w tych obszarach przełoży się następnie na aktywność uczestników. Gdy będziemy siadać, bo rozbolą nas nogi, sprawi, że tak samo będą się zachowywać warsztatujący. Będziemy mieli problemy z pomocą innym, bo zarwaliśmy noc ze znajomymi w barze i teraz nie myślimy odpowiednio szybko. Prowadzący zawsze musi być gotowy do interwencji, co jest trudne, gdy nie mamy do tego odpowiednich predyspozycji.

Przed prowadzeniem takiego warsztatu ważne jest, by dobrze wypocząć i być pełnym sił, zarówno fizycznych jak i mentalnych. Jeśli często będziemy pełnić taką rolę to warto więcej czasu poświęcić na ćwiczenia rozwijające kondycje i wydolność organizmu. W przypadku problemów z gardłem pomagają tabletki typu [Isla](https://www.doz.pl/apteka/p489-Isla-Cassis_pastylki_do_ssania_30_szt.) czy [Fiorda](https://www.doz.pl/apteka/p63613-Fiorda_pastylki_do_ssania_o_smaku_czarnej_porzeczki_30_szt.).

### Warsztat „by the book”

Częstym problemem z przeprowadzaniem Event Stormingu jest jego literalny odbiór. Chcemy go przeprowadzić dokładnie tak, jak jest opisano w książce. Idziemy przez plan realizując go krok po kroku. Jednak w końcu zauważamy, że coś jest nie tak – warsztat nam zajął bardzo dużo czasu a nie osiągnęliśmy zakładanego celu. Mamy dużo karteczek, które tylko rozmywają dany problem, zamiast pomóc go rozwiązać.

Alberto Brandolini opowiada, że warsztat jest jak pizza – ma pewną bazę, ale pozostałe elementy możemy wybierać w dowolny sposób. Dlatego też powinno kształtować notację i kierunek warsztatu dynamicznie, w zależności od zaistniałych problemów:

 *   Nie trzeba wykorzystywać całej notacji
 *   Nowe karteczki można wprowadzać w innej kolejności
 *   Pewne elementy warto celowo pominąć bądź wykorzystać w inny sposób
 *   Długość poszczególnych faz adaptujemy do zaistniałej sytuacji

Dzięki takiemu podejściu łatwiej jest nam przynieść wartość warsztatem, bo odrzucamy to co jest niepotrzebne i skupiamy się na najważniejszych rzeczach.

### Bycie uczestnikiem, nie prowadzącym

Podczas warsztatów łatwo jest prowadzącemu wychodzić z pozycji siły i narzucać konkretne rozwiązania. Ma on bardzo dużą władzę i przeważnie uczestnicy będą się jego słuchać. Jednak takie zachowanie burzy współpracę pomiędzy nim a uczestnikami – zaczynają go postrzegać jako stronę w dyskusji, a nie moderatora. A to sprawia, że mogą przestać się dzielić swoimi przemyśleniami. Rozwiązanie będzie wtedy postrzegane jako to facylitatora, nie uczestników. I to krok od uznania warsztatu jako porażki.

Prowadzący, gdy przeprowadzamy warsztaty z własnym zespołem, musi umieć zmienić swoją rolę by być bardziej przewodnikiem niż faktycznym uczestnikiem tych warsztatów. Nawet jeśli potrzebuje osiągnąć dany cel to lepiej jest nie narzucać swojego punktu widzenia. Budowa rozwiązania przez uczestników może trwać dłużej, ale dzięki temu nauczą się oni więcej i będą postrzegali to rozwiązanie jako własne.

Warto rozważyć tutaj pomoc kogoś spoza zespołu – celowe pożyczenie kolegi / koleżanki na warsztaty by pomogła nam je przeprowadzić, nawet jeśli u siebie mamy takie umiejętności. W ramach kolejnych warsztatów my możemy wystąpić u nich jako facylitator.

# Podsumowanie

W artykule przedstawiłem kilkanaście różnych problemów z warsztatów, w których brałem udział. Część miała znikome konsekwencje na ogólny rezultat warsztatu, ale część z nich w zdecydowany sposób utrudniła realizację celów. Warto o nich pamiętać, by się ich przestrzegać lub przynajmniej mieć je na uwadze przeprowadzając Event Storming.

A z jakimi problemami się Ty zmierzyłeś? Daj znać w komentarzach 😊

PS. Gdyby Cię interesował temat to polecam moje[**warsztaty z Event Stormingu**](/szkolenia/event-storming) lub sprawdzenie [pozostałych postów](/category/event-storming/) z tego tematu.