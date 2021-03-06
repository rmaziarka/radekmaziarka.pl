---
title: 'Event Storming - mapowanie ograniczeń'
url: '/2019/02/22/event-storming-mapowanie-ograniczen/'
date: Fri, 22 Feb 2019 22:40:23 +0000
draft: false
images: ['images/2018/05/eventstorming.logo_.png']
description: "Event Stroming ma szerokie spektrum zastosowań. Przeczytaj, jak pomaga mapować nasze ograniczenia organizacyjne i adresować te problemy."
category: 'Event Storming'
tags: ['ddd', 'domain driven design', 'event storming']
---

// artykuł napisany razem z [Tomaszem Kurowskim](https://www.linkedin.com/in/tomasz-kurowski/), Scrum Masterem / Analitykiem Biznesowym w firmie Metrosoft

Każdy z nas działa w organizacji, gdzie zmaga się z problemami zarówno ze swoją dzienną pracą jak i działaniem całej grupy projektowej. Niejednokrotnie trudności napotykamy także w kooperacji ze stronami zewnętrznymi jak inne firmy technologiczne czy też wybitnie wymagający interesariusze. Aby móc takie problemy rozwiązywać we wczesnych etapach egzystencji środowisko Agile stworzyło praktykę nazywaną [Retrospektywą](http://www.scrumdo.pl/2014/12/efektywna-retrospektywa-sprintu.html). Ma ona na celu zatrzymanie się na pewien czas i wspólne zastanowienie się jak usprawnić ich aktywności.

## Mapowanie ograniczeń

Niestety pytanie osób bezpośrednio jak poprawić ich sytuację nie zadziała – Dave Snowden mówi o tym w swojej [prezentacji](https://youtu.be/4o_TnYmDHsg?t=2485) na Agile People. Ludzie będą się skupiali na rozwiązaniach, które mają w głowę, a nie na realnych problemach z którymi się zmagają. Na sprawdzonych odpowiedziach, które niestety najprawdopodobniej były remedium na zupełnie inne problemy. Dlatego trzeba zajmować się jedną rzeczą naraz – najpierw mapowanie ograniczeń, a następnie możliwe propozycje usprawnień.[![](/images/2019/02/mapping-constraints.jpg)](https://www.youtube.com/watch?v=4o_TnYmDHsg&feature=youtu.be&t=2485)

Takie zachowanie pozwala nam zebrać stan, w którym się aktualnie znajdujemy, z całym bagażem doświadczń jakie niesiemy. Wizualizacja daje możliwość zrzucenia tego co mamy w głowie, dzięki czemu pojawi się tam miejsce na kolejne problemy, które wcześniej nie zauważaliśmy.  Kolokwialnie mówiąc, lepiej zostawić sobie w głowie miejsce na rozwiązania, a problemy przelać na papier, tablicę, schemat czy też rysunek. Następnie planujemy dokonanie zmian, na relatywnie małym obszarze by, wykonać bezpieczne doświadczenie. Jeśli się ono nie powiedzie, to nic się nie stanie.

Jeśli dana próba się powiedzie to staramy się je krokowo przeistoczyć w naszą codzienną praktykę. Dzięki temu posuwamy się do przodu krok po kroku, analizując nasze wady, działając sprawniej z każdą iteracją. Same usprawnienia też dobrze rozłożyć w czasie, zajmując się na start tymi najbardziej krytycznymi. Pytając retorycznie (retrorycznie?), czy te kilka rys na zderzaku Twojego wymarzonego Passata są większym priorytetem niż martwa turbina? No właśnie...

## Event Storming

Tomek Kurowski opisał na [LinkiedIn](https://www.linkedin.com/feed/update/urn:li:activity:6504609931918864384) zastosowanie Event Stromingu do rozpoznania i rewizji procesu Scrumowego w obrębie całego zespołu projektowego pracującego w trybie zwinnym. I jak dla mnie to jest świetny pokaz wyżej wspomnianej techniki – mapowania ograniczeń.

Skupiamy się na wizualizacji procesu działania naszej grupy. Mapujemy każde zdarzenie w systemie naszej pracy, a następnie pokazujemy ile czasu trwa każde zdarzenie (łączymy Event Stroming z [Value Stream Mapping](https://en.wikipedia.org/wiki/Value_stream_mapping)). Na końcu dodajemy ograniczenia jakie widzimy w zachodzącym procesie.

Koncentracja tylko na jednej warstwie na raz pozwala wejść bardzo głęboko w problemy, nie skupiając się na tym co będzie dalej. Każda informacja jest wartościowa – nawet jeśli Ty nie będziesz wiedział, jak to rozwiązać to możliwe, że twój kolega / koleżanka będzie. Dopiero mając wszystkie nasze ograniczenia jasne dla wszystkich członków zespołu można iść dalej i proponować rozwiązania.

[![](/images/2019/02/0-1.jpg)](/images/2019/02/0-1.jpg)

Efekty były zaskakujące.  Zespół jest złożony z programistów z wieloletnim doświadczeniem a także z osób po studiach managerskich, gdzie zwinne metodyki rozbijano na czynniki pierwsze. Ale nawet tutaj natrafili na sytuację, gdy te same zdania Scrum Guide były interpretowane w sposób zgoła inny. Czytając ten sam materiał dochodzili do przeciwnych wniosków. Warsztaty pozwoliły im to niezrozumienie zwizualizować, a następnie zaadresować problem.

Pokazanie, ile trwa każde z zdarzeń było bardzo dobrym sposobem na rozpoczęcie dyskusji. Uczestnicy określili kilka ze zdarzeń jako problematyczne – trwające zbyt długo. Na końcu dokonano szybkiego brain-stormu by ustalić jaki jest plan na zmniejszenia trwania i podziału tego zdarzenia na 2 mniejsze.

Event Storming zidentyfikował również problemy ze wspólnym językiem pomiędzy zespołami technicznymi a biznesowymi. Zastanowili się, czy na daily stand-upie informacje techniczne przekazywane przez programistów są możliwe do zrozumienia przez osobę o najniższej wiedzy technicznej w zespole?  Z drugiej strony czy przekaz biznesowy deklarowany na cotygodniowych spotkaniach projektowych dostarcza wartości osobom technicznym? Te dwie obserwacje są intrygującym punktem wyjścia do zupełnie nowych zagadanień, jak [Ubiquitous Language](https://dddunveiled.wordpress.com/2016/03/29/ubiquitous-language-czyli-dlaczego-nie-lubie-kubusia-puchatka/) – wszak język jest jednym z elementów, które ograniczają nas najbardziej.