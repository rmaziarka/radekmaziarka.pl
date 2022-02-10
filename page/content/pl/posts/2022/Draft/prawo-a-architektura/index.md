---
title: "Prawne rozważania - prawo a rola architekta"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Większość osób zna [M-A-T-A czyli Mata](https://genius.com/18659446/Mata-biblioteka-trap/M-a-t-a-czyli-mata-ksywe-wymysli-mi-papa-w-2k12-na-wakacjach-czyli-w-poowie-lata) - młodego warszawskiego rapera. Mniej osób wie, że jego tata, Marcin Matczak, jest profesorem prawa. A jeszcze mniej osób wie, że prowadzi [podcast Profesor Matczak](https://open.spotify.com/show/5NYlSMqV07NfT7xxjn9LxX) o prawie, filozofii prawa i tematach pokrewnych.

Słucham podcastu od samego początku i jestem bardzo zdziwiony jak wiele ciekawych połączeń można wyciągnąć pomiędzy prawem a naszymi tematami programistycznymi. Myślę, że będą one XYZ.

Chciałem więc rozpocząć o analogii prawa, a architektury systemowej.

## Dwa słowa o architekturze i architektach

Wiele powiedziano i napisano o architekturze systemów. Chyba najpopularniejsza definicja architektury należy do Grady'ego Boocha:

>Architecture represents the significant design decisions that shape a system, where significant is measured by cost of change.

Ta definicja przemawia do mnie bardzo mocno:

- Architektura jest nie tylko strukturą, ale także aktywnością - podejmowaniem decyzji
- Architekturę mierzymy przez koszt zmian - to co jest najbardziej trwałe i niezmienne staje się architekturą

W przypadku budynków architekturą jest najczęściej rozkład ścian nośnych - to jest najtrudniej zmienić. W systemach informatycznych jest to bardziej skomplikowane i dynamiczne. De facto w każdym systemie ta architektura będzie wyglądać nieco inaczej. 

XYZ - tutaj jest źle przejście zrobione
Wobec czego architekt systemów informatycznych to osoba / zbiór osób, które podejmują te kluczowe decyzje ograniczające system. **Architekt jest raczej zbiorem odpowiedzialności dotyczących podejmowania kluczowych decyzji. I nie musi być bezpośrednią rolą czy stanowiskiem pracy.** Architektem w mniejszej firmie może być po prostu lider techniczny, który rozwija system w okreslonym kierunku. On podejmuje istotne decyzje i ustanawia główny kształt systemu. 

I takie postrzeganie ma olbrzymie konsekwencje dla rozwoju systemów.

## Prawo a metafora archiektury systemów i architekta

Nawiąże tutaj do pierwszego wykładu profesora ["Jakie jest źródło prawa"](https://marcinmatczak.pl/podcast/wyklad-pierwszy-bog-i-natura-czy-czlowiek-i-tekst-jakie-jest-zrodlo-prawa/). 

[porównanie] architekt / architektura / wykonawca architektury | ustawodawca / prawo / sędziowie i urzędnicy | architekt / architektura / developerzy 

Otóż prawo (rozumiane jako ustawy, rozporządzenia) wprowadzane przez posłów czy senatorów jest architekturą dla wdrażania prawa przez wykonawców prawa - sędziów i urzędników. Masz możliwość działania, ale tylko taką na jaką pozwala Ci to prawo.

Analogicznie w przypadku architekta - jeśli np. on narzuci architekturę opartą o MVC to naturalne będzie korzystanie z kontrolerów, a prawie nieosiągalne korzystanie z request / endpoint.

Jednocześnie wykonawcy są bezpośrednimi interpretatorami tej architektury. Dana architektura systemu może być róznie wdrożona, w zależności od tego kto nad nią pracuje. I w prawie jest podobnie - prawo nie jest bezpośrednim zbiorem instrukcji, a raczej ramą do rozwiązywania konkretnych problemów. Prawo jest zawsze w jakims kontekscie
Patrzymy na normy wyzsze, na aplikowanie danego prawa, na potrzebę funkcjonalną a nie literalną
Samo stanowienie prawa / rozporządzeń architektonicznych zawsze ma po drugiej stronie tych odbierających którzy dostosowują to prawo do swojego kontekstu

Branie literalnie architektury może być niekiedy pożądane przez stanowiących (bo obsłużyli tylko proste przypadki), ale jest bardzo problematyczne przez odbierających. Jeśli wprowadzone prawo jest ewidentnie wadliwe, to wtedy sędziowie muszą ten problem obchodzić. Jeśli architekt z wieży słoniowej wyznaczył, że mamy robić rzecz ewidentnie błędną to zespoły zaczną się buntować.

## Wpływ architektury na rzeczywistość

Prawo i architektura systemu bezpośrednio wpływają na nasze wyniki pracy. Ich wplyw poznamy dopiero po zastosowaniu w rzeczywistości.

// zrozumiałe prawo -> łatwosc dzialania w ramach prawa -> wiecej mozliwosci
// dopasowana architektura systemu -> łatwość działania w ramach architektury -> więcej możliwości
Jeśli prawo jest zrozumiałe to ramy prawne wspierają nas w codziennym działaniu. Jednak gdy architektura wytyczona przez prawo jest bezsensowna (jak to w Polsce bywa #PolskiNieład) to urzędy mają olbrzymie wyzwanie w stanowieniu prawa.

Analogicznie jest w ramach systemów informatycznych. Dopasowana architektura systemu powoduje, że rozwiązujemy nasze problemy w mgnieniu oka. W przeciwnej sytuacji jest o wiele gorzej. Kończymy z tygodniami spędzonymi na walce z systemem. Architektura wtedy bardziej nas ogranicza niż wspiera.

Im bardziej niejasna struktura, tym trudniej się poruszać po systemie (prawnym / informatycznym). Coraz więcej nas wstrzymuje. Łatwo wtedy o narzekanie na osoby, które są na samym końcu tego procesu. Developer będzie o wiele mniej produktywny w takiej architekturze. A przecież to nie jego wina, że taką posiada.

## Pętla zwrotna architektury systemowej

Biorąc pod uwagę powyższe rolę architekta trzeba oceniać głównie poprzez wpływ decyzji na otaczającą rzeczywistość. De facto to odbiorcy tej architektury są jego oceniającymi.

// jakiś diagram

Ta pętla zwrotna jest bardzo ważna, ale często pomijana. Wprowadza się głupie prawo, a następnie trwa się z tym prawem pomimo zarzutów, że nie wiadomo jak to prawo stosować. Albo coś o informatyce.

Tempo pętli zwrotnej warunkuje czy pracujemy w zdrowym systemie. Tylko odpowiednio szybkie aplikowanie informacji zwrotnych pozwala nam się odpowiednio szybko dostosowywać do nowej sytuacji. Państwa, gdzie prawo jest bardziej zrozumiałe, a współpraca pomiędzy twórcami a wykonawcami prawa wyższa, możemy o wiele lepiej reagować na zmieniającą się rzeczywistość. Z architekturą systemów jest podobnie - głęboka współpraca osób pracujących nad architekturą i ponoszących konsekwencje tej architektury jest kluczowa by prace odpowiednio szybko posuwały się do przodu. 

Najlepsze rezultaty powstają gdy stanowiący i odbierający daną architekturę wspólnie tworzą i docierają szczegóły wobec konkretnych problemów przed nimi.