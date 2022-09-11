---
title: "Jak modularność wspiera testy"
date: 2022-01-27T09:59:30+01:00
draft: true
---
Cześć {name}

Choroba uderzyła mnie solidnie, przez co ominąłem 2 konferencje - DevConf i TestWarez. Na tej drugiej udało mi się jednak wystąpić zdalnie z prezentacją "Jak modularyzacja wspiera testy". Nagranie powinno się za niedługo pojawić w sieci, ale pomyślałem, że z chęcią dowiesz się coś więcej o tym temacie.

W teorii powinniśmy korzystać z piramidy / diamentu testowego. W praktyce:
- Testy jednostkowe sprawiają, że trudno jest cokolwiek zmieniać. System jest dosłownie "zabetonowany testami".
- Testy integracyjne testują jak system działa w ramach konkretnej funkcji. Ale dużo logiki jest zachomikowana pomiędzy funkcjami.
- Dopiero testy E2E (end-to-end) upewniają nas, że system działa tak jak powinien. Kosztem niestety bardzo drogiego w utrzymaniu i czasochłonnego zestawu testów.

**Moją hipotezą jest to, że taki stan rzeczy jest bardzo często związany z pomieszanymi potrzebami biznesowymi.** W ramach e-commerce mamy bardzo często taki byt jak Produkt. W zasadzie każdy coś chce od tego Produktu. A więc wszystkie wymagania dotyczące Produktu są trzymane i implementowane razem. I to ma ogromny wpływ na testy:
- Przenosimy liczbę przypadków testowych pomiędzy obszarami biznesowymi
- Zmiany propagują się na wszystkie obszary, przez co tylko testy E2E mogą wyłapywać błędy

I teraz na białym koniu wjeżdża modularność 😀 kluczowe jest, zamknąć poszczególne przypadki biznesowe w mniejszych obszarach biznesowych, a następnie przenieść je do określonych modułów technicznych. Czyli nasza ścieżka to:
1. Modularność biznesowa
2. Modularność techniczna
   Ta pierwsza umożliwia nam bardziej niezależnie myśleć o przypadkach biznesowych, ta druga pozwala nam implementować przypadki biznesowe, aby nie wpływały na siebie wzajemnie. Ale w tym przypadku najważniejszy jest wpływ na testy:
- Zmiana w danym module domyślnie nie pociąga za sobą zmian w innych miejscach. Wobec czego testy jednostkowe, testując daną funkcję, testują faktyczne przypadki biznesowe w tym module. Jednocześnie nie blokują nam zmian dla innych modułów.
- Widzimy wpływ modułów na siebie wzajemnie. Testy integracyjne mogą sprawdzać te powiązania i zapewniać stabilność kontraktów modułów.
- Testami E2E testujemy tylko ostateczną spójność całego rozwiązania. Wszystkie pozostałe przypadki powinny być przetestowane niżej.

A jak to teraz osiągnąć? Nie będzie pewnie dla Ciebie wielkim zdziwieniem, kiedy powiem, że ja wykorzystuję do tego Event Storming  😉 Czyli mapujemy najpierw zrozumienie biznesowe systemu za pomocą Big Picture, a później techniczną warstwę za pomocą Process Level. Dodatkowo wykorzystuję technikę Bounded Context, o której możesz posłuchać więcej w prezentacji "Bounded Context - jak modularyzować systemy w kilku krokach": https://www.youtube.com/watch?v=v1iebfacJtQ