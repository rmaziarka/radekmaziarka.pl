---
title: 'Narzędzia pracy konsultanta – Example Mapping'
url: '/2020/06/17/narzedzia-pracy-konsultanta-example-mapping/'
date: Wed, 17 Jun 2020 06:25:28 +0000
draft: false
images: ['images/2020/02/consultancy.jpg']
description: "Artykuł przedstawia Example Mapping - technikę do analizy przypadków biznesowych."
category: 'Consulting'
tags: ['consulting', 'example mapping']
---

Wszystkie narzędzia zostały zebrane w [Narzędzia pracy konsultanta - podsumowanie](/2020/02/04/narzedzia-pracy-konsultanta-podsumowanie)

## Example Mapping

Metoda [Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/) została mi polecona przez [Kenny’ego Baasa](https://www.linkedin.com/in/kenny-baas/), który używa jej razem z Event Stormingiem. Technika świetnie się sprawdza również osobno. Można ją zastosować do zbierania wymagań, znajdowania przypadków brzegowych oraz określenia pytań, na które nie mamy odpowiedzi.

Bardzo przydatne, szczególnie w kontekście grup silnie nastawionych na realizację zadań. Takie osoby będą pomijać trudniejsze przypadki, bądź nawet się  nad nimi nie zastanawiać. Później zaś okaże się, że prosty przypadek ma 20 różnych scenariuszy i ostatecznie kończymy z łataniem czegoś na gorąco.[![](/images/2020/06/example-mapping.jpg)](/images/2020/06/example-mapping.jpg)

Example Mapping - [https://xebia.com/blog/example-mapping-steering-the-conversation/](https://xebia.com/blog/example-mapping-steering-the-conversation/)

Technika jest bardzo prosta. Rozpoczynamy (zwykle) od wypisania wszystkich możliwych przypadków, które wydaje nam się, że musimy spełniać. Im dłużej to robimy tym łatwiej jest nam dojść do coraz trudniejszych sytuacji. Dodatkowo obok stawiamy wszystkie pytania, na które nie znamy odpowiedzi, a które powinny być odpowiedziane.

Tak zebrane przykłady staramy się zgrupować w reguły. To pozwala nam, na zasadzie dopełnienia, opisać kolejne przypadki jakie powinny być sprawdzone (np. do reguły obniżenia ceny przez rabat możemy dodać przypadek skrajny, gdy cena jest niższa niż rabat). Na końcu grupujemy te reguły w historyjki, czyli pewne jednostki dostarczania danej funkcjonalności. Zwykle nie musimy od początku wdrażać wszystkich przypadków – możemy je podzielić na te które przyniosą nam największą wartość.

Ta technika pozwala nam oddzielić pracę nad rozwiązaniem od pracy nad wymaganiami i nie mieszać tych 2 rzeczy naraz. Jednocześnie możemy szeroko zastanawiać się nad przypadkami szczególnymi. Najpierw zdefiniujemy wszystkie możliwe sposoby działania, a później zastanowimy czy rzeczywiście potrzebujemy tego rodzaju funkcjonalności. Szybko możemy te niepotrzebne usunąć i tworzyć system, w którym mamy tylko to co potrzebujemy.

## Przykład wykorzystania

Zespół programistyczny narzekał na niejasne wymagania dotyczące tworzonej funkcjonalności. Programistyczny kod następnie miał biznesowe dziury, które później powodowały problemy w systemie. Jednocześnie zespół biznesowy zbywał problemy programistów, mówiąc, że zbyt głęboko wchodzili w techniczne szczegóły.

Example Mapping pozwolił porozumieć się na poziomie wspólnych wartości, gdzie rozpoczęliśmy od podstawowych przypadków stopniowo przechodząc do tych bardziej złożonych. Duża część z trudniejszych była od razu odrzucana przez osoby biznesowe. Niektóre z nich jednak były na tyle krytyczne, że brak ich obsługi mógłby wyłożyć cały system.

## Dlaczego warto?

Zmiana mentalna, nakierowana na wytworzenie jak największej ilości przypadków, pozwala zdefiniować takie sytuacje, których w normalnym trybie pracy byśmy nie znaleźli. Na tej podstawie wiemy co może nas czekać i jak sobie z tym poradzić.

Cokolwiek
