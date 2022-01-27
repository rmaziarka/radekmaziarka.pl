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

Wobec czego architekt systemów informatycznych to osoba która podejmuje te kluczowe decyzje ograniczające system. **Architekt jest raczej zbiorem odpowiedzialności dotyczących podejmowania kluczowych decyzji. I nie musi być bezpośrednią rolą czy stanowiskiem pracy.** Architektem w mniejszej firmie może być po prostu lider techniczny, który rozwija system w okreslonym kierunku. On podejmuje istotne decyzje i ustanawia główny kształt systemu. 

I takie postrzeganie ma olbrzymie konsekwencje dla rozwoju systemów.

## Prawo a metafora archiektury systemów i architekta

Nawiąże tutaj do pierwszego wykładu profesora [Jakie jest źródło prawa](https://marcinmatczak.pl/podcast/wyklad-pierwszy-bog-i-natura-czy-czlowiek-i-tekst-jakie-jest-zrodlo-prawa/). 

[porównanie] archiktekt / architektura / wykonawca architektury | ustawodawca / prawo / sędziowie i urzędnicy | architekt / architektura / developerzy 

Otóż prawo (rozumiane jako ustawy, rozporządzenia) jest narzucone przez ustawodawców (posłów, senatorów) architekturą dla wdrażania prawa przez pojedyncze jednostki (sędziów, urzędników). Można podejmować takie decyzje, na jakie pozwala Ci to prawo. Analogicznie w przypadku architekta - jeśli on narzuci architekturę opartą o MVC to naturalne będzie korzystanie z kontrolerów, a prawie nieosiągalne korzystanie z request / 

Wzięcie prawa literalnie może być niekiedy pożądane przez stanowiących ale jest bardzo problematyczne przez odbierających. Dalej przełoży się to na błędne i niezrozumiałe wprowadzanie tego prawa i następnie problemy dla samych stanowiących.

## Wpływ architektury

Wpływ  architektury (a więc decyzji architekta) poznamy dopiero po zastosowaniu architektury na rzeczywistych przykładach i problemach. Jeśli architektura wytyczona przez prawo jest bezsensowna (jak to w Polsce bywa #PolskiNieład) to na tych wykonawcach spoczywa porządkowanie prawa aby było sensowne. Jeśli architektura systemowa jest niedopasowana do problemu to trzeba sie mocno natrudzić aby dane potrzeby ogarnąć w systemie.

## Pętla zwrotna architektury systemowej

Bardzo ważna jest tutaj ta pętla zwrotna. Otóż Ci wykonawcy prawa 

Samo stanowienie prawa / rozporządzeń architektonicznych zawsze ma po drugiej stronie tych odbierających którzy dostosowują to prawo do swojego kontekstu

Najlepsze prawo powstaje gdy stanowiący i odbierający wspólnie tworzą i docierają prawo wobec konkretnych problemów przed nimi

Prawo jest zawsze w jakims kontekscie
Patrzymy na normy wyzsze, na aplikowanie danego prawa, na potrzebę funkcjonalną a nie literalną