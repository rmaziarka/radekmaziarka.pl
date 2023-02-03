---
title: "5 odpowiedzialności lidera technicznego"
date: 2023-02-03T09:59:30+01:00
url: '/2023/02/03/odpowiedzialnosci-lidera-technicznego'
images: ['2023/02/03/odpowiedzialnosci-lidera-technicznego/main.jpg']
description: "Kim jest lider techniczny? Czym zajmuje się w firmie? Jakie są główne zadanie tech leada? W tym artykule na to odpowiemy."
category: 'Tech Lead'
---

Lider techniczny to osoba, która nie tylko potrafi programować, ale też bierze odpowiedzialność za proces dostarczania i jego sukces - bądź porażkę. **Jakie są umiejętności nowoczesnego tech leada?** Jakie techniki pomogą mu w codziennej pracy? Jak powinna wyglądać praca zespołowa nad architekturą projektu?

W cyklu artykułów o pracy lidera technicznego w zespołach produktowych odpowiem na te – i nie tylko – pytania, bazując na podstawie własnego doświadczenia i obserwacji organizacji, z którymi współpracowałem.

## Kim jest tech lead?

Osoba na stanowisku tech leada łączy umiejętności techniczne z nietechnicznymi, a jej wiedza musi być wszechstronna. **Lider techniczny jest odpowiedzialny za kierowanie zespołem developerów, tworzenie wizji rozwoju technicznego i produktów dla klientów.**

Nie da się podać jednoznacznej definicji lidera technicznego. W zależności od zakresu działalności firmy, stanowisko to będzie określone na podstawie różnych aspektów. 
**Istnieje jednak kilka wspólnych odpowiedzialności łączących każde stanowisko tech leada.** Poznaj je i wykorzystaj w praktyce, by Twój zespół ze sobą współdziałał, a projekty kończyły się sukcesem.

## Odpowiedzialności
Poniższe odpowiedzialności są opisane w skrócie, z przykładami. W kolejnych tygodniach opiszę dokładniej te odpowiedzialności w akcji:

### Przekładanie celów biznesowych na aspekty techniczne

Jedną z najważniejszych odpowiedzialności lidera technicznego jest **zrozumienie potrzeb i celów biznesowych klientów** , a następnie przełożenie ich na rozwiązania techniczne.

Zacznij od zrozumienia, czego oczekują Twoi interesariusze. **Co chcą osiągnąć? Czego się obawiają?** Zebrane odpowiedzi przełóż na tzw. drivery architektoniczne, wpływające na implementację systemu. Są to np.: wymagania funkcjonalne, ograniczenia projektowe czy cele projektu.

Podsumowując wszystkie zebrane informacje, **będziesz mógł stworzyć optymalne rozwiązanie**.

_Przykład: Ustaliłem, że biznesowi najbardziej zależy na aktualnych danych z portalu CRM na poziomie minut opóźnienia, a nie dni. W tym przypadku należy skupić się na stabilnym pobieraniu i aktualizacji danych maksymalnie co 5 minut. Dane muszą być cacheowane, gdyby system zewnętrzny przestał działać._

### Projektowanie rozwiązania

Po przełożeniu celów biznesowych na aspekty techniczne, czas na zaprojektowanie rozwiązania. Zadaniem tech leada – czyli Twoim 😊 - jest stworzenie optymalnych propozycji i ich ocena na podstawie driverów architektonicznych.Ważne jest również, by plan rozwiązania został udokumentowany. **W ten sposób usprawnisz pracę zespołu, zmodernizujesz przyszłe procesy i utrzymasz spójność operacyjną.**

_Przykład: Razem z zespołem stworzyliśmy trzy propozycje na pobieranie danych z systemu zewnętrznego: przez funkcję serverless, osobną aplikację webową i w ramach obecnej aplikacji. Oceniając drivery i ryzyka, wybraliśmy osobną aplikację webową, co udokumentowaliśmy w ADR._

### Definiowanie planu dostarczania

![](leader1.jpg)

Jako tech lead jesteś odpowiedzialny za kierowanie zespołem developerów. Twoim zadaniem jest określenie, co musi zostać dostarczone w pierwszej kolejności, rozdzielenie prac i oszacowanie ryzyk w dostarczaniu. **Wiele zespołów podchodzi do planu dostarczania powierzchownie, nie rozumiejąc, że od tego może zależeć sukces lub porażka projektu.** Lider techniczny angażuje zespół w jego opracowanie, by rozbudzić wewnętrzne interakcje i dbać o dobrą kooperację.

_Przykład: funkcjonalność do dostarczania składa się z: 3 zadań na froncie, 2 zmian w API, 2 nowych tabelach w bazie SQL, nowym indeksie w Elastic Searchu. Kolejność to SQL / API / Front / ES. Zadania w API i froncie można zrównoleglić._


### Dbanie o jakość rozwiązania

Będąc liderem technicznym nadzorujesz działania zespołu. oOceniasz realizację wymagań funkcjonalnych i kryteriów jakościowych zaprojektowanej przez zespół architektury **. Dodatkowo jesteś odpowiedzialny za zapewnienie spójnej strategii testowania rozwiązania oraz wdrażanie dobrych praktyk w zespole.** Wszystkie te działania pozwolą działać skutecznie i wyciągać wnioski na przyszłośćstawać się coraz lepszym zespołem.

_Przykład: Aby zapobiec problemom z brakiem observability dla działających funkcji, dodaliśmy zadanie „add monitoring capability" do kolejnych zadań. Monitoringiem objęliśmy też nasze „Definition of done" jako punk do sprawdzenia._

### Praca zespołowa nad rozwiązaniem

Dobry lider techniczny zna swój zespół, rozumie różne typy osobowości i na ich podstawie rozdziela zadania.Nie musisz samodzielnie podejmować decyzji – pozwól, by zespół uczestniczył w tym procesie. **Wspólnie dyskutujcie nad „za" i „przeciw" danej opcji i analizujcie popełnione błędy, wyciągając z nich wnioski.** Aby praca przebiegała sprawnie, Twój zespół musi rozumieć, na czym polega cały proces.

_Przykład: w ramach pracy nad funkcjonalnością synchronizacji danych udało się wypracować rozwiązanie API, które zaadresowało główne uwagi zespołu. Dla rozwiązania problemu filtrowania danych nie udało się wybrać najlepszej opcji. Zdecydowaliśmy więc przetestować obie opcje na danych testowych._

## Podsumowanie

![](leader2.jpg)

Umiejętne przekładanie celów biznesowych na rozwiązania techniczne, projektowanie rozwiązań, definiowanie planu dostarczania i dbanie o jakość rozwiązania to podstawowe zadania lidera technicznego.

**Pracując na tym stanowisku, kształtujesz procesy wdrażania i stajesz się osobą odpowiedzialną za cały zespół i niejednokrotnie – gwarantem sukcesu.** Stanowisko lidera technicznego to ogromna odpowiedzialność. Zarówno za swoją pracę, jak i cały zespół.

Więcej o umiejętnościach nowoczesnego lidera technicznego w kolejnych artykułach. Może również zainteresować Cię kurs na którym poruszamy dogłębnie powyższe zagadnienia i trenujemy je w praktyce:

{{< advertisement type="TechLead">}}