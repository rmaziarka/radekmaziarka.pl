---
title: "5 odpowiedzialności lidera technicznego"
date: 2023-02-03T09:59:30+01:00
url: '/2023/02/03/odpowiedzialnosci-lidera-technicznego'
images: ['2023/02/03/odpowiedzialnosci-lidera-technicznego/main-social.jpg']
pageImage: '2023/02/03/odpowiedzialnosci-lidera-technicznego/main.jpg'
description: "Kim jest lider techniczny? Czym zajmuje się w firmie? Jakie są główne zadanie tech leada? W tym artykule na to odpowiemy."
category: 'Tech Lead'
---

Lider techniczny to osoba, która nie tylko potrafi programować, ale też bierze odpowiedzialność za proces dostarczania i jego sukces - bądź porażkę. **Jakie są umiejętności nowoczesnego Tech Leada?** Jakie techniki pomogą mu w codziennej pracy? Jak powinna wyglądać praca zespołowa nad architekturą projektu?

W cyklu artykułów o pracy lidera technicznego w zespołach produktowych odpowiem na te – i nie tylko – pytania, bazując na podstawie własnego doświadczenia i obserwacji organizacji, z którymi współpracowałem.

## Kim jest Tech Lead?

Osoba na stanowisku Tech Leada łączy umiejętności techniczne z nietechnicznymi - projektowymi, czy analitycznymi. Lider techniczny jest odpowiedzialny za kierowanie prac zespołu technicznego, tworzenie wizji technicznej i dowożenie rozwiązań dla klientów.

Nie da się podać jednoznacznej definicji lidera technicznego. W zależności od zakresu działalności firmy, stanowisko to będzie określone na podstawie różnych aspektów. 
**Istnieje jednak kilka wspólnych odpowiedzialności łączących każde stanowisko Tech Leada.** Poznaj je i wykorzystaj w praktyce, by Twój zespół ze sobą współdziałał, a projekty kończyły się sukcesem.

## Odpowiedzialności
Poniższe odpowiedzialności są opisane w skrócie, z przykładami. W kolejnych tygodniach opiszę dokładniej te odpowiedzialności w akcji:

### Przekładanie celów biznesowych na aspekty techniczne

Jedną z najważniejszych odpowiedzialności lidera technicznego jest **zrozumienie potrzeb i celów biznesowych klientów** , a następnie przełożenie ich na rozwiązania techniczne.

Zacznij od zrozumienia, czego oczekują Twoi interesariusze. **Co chcą osiągnąć? Czego się obawiają?** Zebrane odpowiedzi przełóż na tzw. drivery architektoniczne, wpływające na implementację systemu. Są to np.: wymagania funkcjonalne, atrybuty jakościwoe czy ograniczenia projektowe.

Podsumowując wszystkie zebrane informacje, będziesz mógł stworzyć optymalne rozwiązanie.

_Ustaliłem, że biznesowi najbardziej zależy na aktualnych danych z portalu CRM na poziomie minut opóźnienia, a nie dni. W tym przypadku należy skupić się na stabilnym pobieraniu i aktualizacji danych maksymalnie co 5 minut. Dane muszą być cacheowane, gdyby system zewnętrzny przestał działać._

### Projektowanie rozwiązania

Po przełożeniu celów biznesowych na aspekty techniczne, czas na zaprojektowanie rozwiązania. Zadaniem Tech Leada – czyli Twoim 😊 - jest stworzenie kilku propozycji i ich ocena na podstawie driverów architektonicznych. Ważne jest również, by plan rozwiązania został udokumentowany. Możesz to zrobić za pomocą RFC, czy później ADR. 

**W ten sposób określisz właściwe rozwiązanie, zdefiniujesz wymagane procesy i utrzymasz spójność operacyjną.**

_Przykład: Razem z zespołem stworzyliśmy trzy propozycje na pobieranie danych z systemu zewnętrznego: przez funkcję serverless, osobną aplikację webową i w ramach obecnej aplikacji. Oceniając drivery i ryzyka, wybraliśmy osobną aplikację webową, co udokumentowaliśmy w ADR._

### Definiowanie planu dostarczania

![](leader1.jpg)

Jako Tech Lead jesteś odpowiedzialny za kierowanie zespołem developerów. Twoim zadaniem jest określenie, co musi zostać dostarczone w pierwszej kolejności, rozdzielenie prac i oszacowanie ryzyk w dostarczaniu. **Wiele zespołów podchodzi do planu dostarczania powierzchownie, nie rozumiejąc, że od tego może zależeć sukces lub porażka projektu.** Lider techniczny angażuje zespół w jego opracowanie, by rozbudzić wewnętrzne interakcje i dbać o dobrą kooperację.

_Przykład: funkcjonalność do dostarczania składa się z: 3 zadań na froncie, 2 zmian w API, 2 nowych tabelach w bazie SQL, nowym indeksie w Elastic Searchu. Kolejność to SQL / API / Front / ES. Zadania w API i froncie można zrównoleglić._


### Dbanie o jakość rozwiązania

Będąc liderem technicznym nadzorujesz działania zespołu. Oceniasz realizację wymagań funkcjonalnych i kryteriów jakościowych zaprojektowanej przez zespół architektury **. Dodatkowo jesteś odpowiedzialny za zapewnienie spójnej strategii testowania rozwiązania oraz wdrażanie dobrych praktyk w zespole.** Wszystkie te działania pozwolą działać skutecznie i długofalowo rozwijać rozwiązanie.

_Przykład: Aby zapobiec problemom z brakiem observability dla działających funkcji, dodaliśmy zadanie „add monitoring capability" do kolejnych zadań. Monitoringiem objęliśmy też nasze „Definition of done" jako punk do sprawdzenia._

### Praca zespołowa nad rozwiązaniem

Dobry lider techniczny zna swój zespół, rozumie różne typy osobowości i na ich podstawie rozdziela zadania.Nie musisz samodzielnie podejmować decyzji – pozwól, by zespół uczestniczył w tym procesie. **Wspólnie dyskutujcie nad „za" i „przeciw" danej opcji i analizujcie popełnione błędy, wyciągając z nich wnioski.** Aby praca przebiegała sprawnie, Twój zespół musi rozumieć spostrzeżenia innych osób w zespole.

_Przykład: w ramach pracy nad funkcjonalnością synchronizacji danych udało się wypracować rozwiązanie API, które zaadresowało główne uwagi zespołu. Dla rozwiązania problemu filtrowania danych nie udało się wybrać najlepszej opcji. Zdecydowaliśmy więc przetestować obie opcje na danych testowych._

## Podsumowanie

![](leader2.jpg)

Opisane przeze mnie odpowiedzialności są niezależne od technologii. Czy pracujesz w chmurze, analizie danych, czy tworząc frontend - pewne odpowiedzialności są identyczne.

**Pracując na tym stanowisku, kształtujesz procesy wdrażania i stajesz się osobą odpowiedzialną za prace zespołu i niejednokrotnie – gwarantem sukcesu.** Stanowisko lidera technicznego to ogromna odpowiedzialność. Jednocześnie jest to rola, która daje dużo satysfakcji. Gdy dowieziona funkcjonalność działa, biznes jest zadowolony, a jakość jest wysoka to jest to powód do dumy 😎 

Więcej o umiejętnościach nowoczesnego lidera technicznego w kolejnych artykułach. Może również zainteresować Cię kurs na którym poruszamy dogłębnie powyższe zagadnienia i trenujemy je w praktyce:

{{< advertisement type="TechLead">}}