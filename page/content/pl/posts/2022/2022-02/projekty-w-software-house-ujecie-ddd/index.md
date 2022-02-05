---
title: "Projekty w Software House – ujęcie DDD"
date: Sat, 05 Feb 2022 09:40:09 +0000
url: '/2022/02/05/projekty-w-software-house-ujecie-ddd'
images: ['2022/02/05/projekty-w-software-house-ujecie-ddd/project.jpg']
description: "Różne sposoby postrzegania projektów w ramach Software House"
category: 'Biznes w IT'
---

Pracowałem przez moją karierę zawodową w kilku software house’ach, pomagałem kilku kolejnym, znam kilkanaście więcej. **I w każdym jest ten sam problem – jak dobrze zarządzać wiedzą odnośnie projektów w firmie.** Na pierwszy rzut oka wydaje się to proste. Tworzymy Excel, czy wykorzystujemy do tego jakiś prosty edytor w Sharepoincie. Jak projekt pojawia się na horyzoncie to dodajemy go do narzędzia, a następnie w miarę postępu aktualizujemy o kolejne dane. Na końcu mamy gotowy zbiór informacji co jak poszło. Tak przynajmniej jest w założeniach...

I na założeniach się kończy. **W żadnej z tych firm nie słyszałem o dobrym podsumowaniu informacji związanych z  projektami jakie działy się, dzieją się, będą się dziać w firmie.** W każdej z firm informacje są rozsiane po dziesiątkach grup i plików, w której używa do tego innych narzędzi i trzyma te dane w innym formacie. Co gorsza te grupy rzadko się ze sobą się komunikują. Potęguje to poczucie zamieszania i brak jasnej informacji:

- co my w zasadzie zrobiliśmy,
- czym się możemy chwalić,
- czy coś podobnego już u nas nie było.

I szczerze mówiąć, w ogóle mnie to nie dziwi. A jest tak dlatego, ponieważ domena projektów jest z punktu widzenia DDD jedną z najbardziej skomplikowanych domen z jaką się możecie spotkać w otoczeniu Software House’ów.

## Projekty – różne wymiary
Obszar projektów można podzielić na kilka wymiarów, które czasami są wliczane w projekty, a czasami nie:

- Informacje o samym projekcie – dla jakiego klienta, potrzeby biznesowe, od kiedy, do kiedy.
- Skład osobowy -  kto tam występuje, od kiedy do kiedy, z jakimi umiejętnościami.
- Finansowy – ilość spędzonych godzin dla danego klienta, koszty i zyski.
- Techniczny – jakie technologie w projektach, od kiedy do kiedy.
- Biznesowy – jakie obszary biznesowe (e-commerce, lotnictwo, finanse, systemy rekomendacji).

Można też patrzeć na podstawie interesariuszy:

- Sprzedawcy
- Delivery Managerzy
- PMowie
- Członkowie zespołów
- Opiekunowie klientów
- Gildie technologiczne

Te wszystkie osoby będą miały różne cele i kierowały się innymi informacjami.

## Różnice informacyjne
Każda z grup interesuje się innym zakresem informacji projektowych:

- Sprzedaż – szansa sprzedaży projektu, możliwości finansowe klienta, możliwe technologie (na wysokim poziomie), biznesowe case study dostarczonych projektów, techniczne case study z danych obszarów, możliwości upsellowe / cross sellowe.
- Delivery Managerzy – umiejętności pracowników i ich przypisania do zespołów by formować nowe zespoły, ogólny stan projektu by móc reagować gdy coś idzie nie tak, długoterminowe wnioski.
- PM – status projektu (z perspektywy dostarczenia), zarządzanie pracownikami danego projektu, ilość przepracowanych godzin, notatki ze spotkań, poszukiwanie dodatkowych osób, obszary biznesowe.
- Członkowie zespołów – aktualizacja umiejętności na podstawie doświadczenia z projektu, zgłaszanie problemów, sprawdzanie technologii innych projektów by poszukać kogoś do pomocy.
- Gildie technologiczne – używane technologie (dokładniej), plany na modernizacje, wprowadzane nowinki, rekomendacje, przeprowadzane Proof of Concept.

Dla sprzedażowca nie ma znaczenia czy w projekcie będzie Angular 5 czy 9 bo może opowiedzieć potencjalnemu klientowi, że projekty w Angularach się toczą w firmie. Gildia technologiczna będzie już jednak zaniepokojona, że używamy starszych technologii i jaki jest plan na zmiany.

Project Manager chce wpisywać wszystkie możliwe problemy i akcje w ramach projektu. Dla Delivery Managera taka szczegółowość może być problematyczna. Ta rola woli operować na o wiele wyższym poziomie informacyjnym.

## Różnice ilościowe

Różnice będą się też pojawiać na poziomie ilościowym. **Nie każdy projekt z punktu widzenia jednej grupy będzie tym samym projektem z punktu innej.** 

Możemy mieć np. kilkumiesięczny projekt, który dla sprzedażowców rozpoczął się i zakończył pomyślnie. Dla gildii technologicznej mogły tam być np. dwa Proof of Concepts, które dopiero finalnie skończyły się trzecim projektem. Wtedy zmapowanie jednego w drugie nie jest prostą relacją 1-1.

Podobnie może być z pracownikiem. Z perspektywy samego pracownika jest on po prostu przypisany do projektu. Ale z perspektywy PMa jego czas może być rozdzielony na kilka mniejszych projektów, z których każdy jest osobno rozliczany z klientem. Wtedy de facto mamy różnych pracowników, każdy po 1/4 FTE.

## Różnice potrzeb
To wszystko wyżej przekłada się na różnice językowe. Każda z grup będzie inaczej myślała o projekcie i aspektach z nim związanych. Stąd będzie bardzo dużo niejasności, pomyłek i nieporozumień.

Delivery Manager chce szybko móc ocenić jakie ludzie mają kompetencje. Wykorzystuje do tego tabelę oceniającą umiejętności. Dla pracownika jest to jednak kompletnie nieprzyjemne - skąd on miałby wiedzieć jak siebie ocenić?

Sprzedawca będzie mówił na zewnątrz, że mamy super projekty w Azure. Ale gildia technologiczna nie będzie tak uważała - co to za projekty co siedzą na VMkach i nie wykorzystują PaaSa? Rozmowa tych dwóch grup o umiejętności Azure niechybnie skończy się kłótnią.

## I teraz software

Otóż system informatyczny, który miałby to wspierać, musiałby brać pod uwagę te wszystkie wymiary. I zwykle nie udaje się stworzyć takiego systemu - nawet nie w sensie aby był to jeden duży system informatyczny. Nie udaje się wypracować wspólnych procesów aktualizacji i gromadzenia takiej wiedzy.

