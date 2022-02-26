---
title: "Modelowanie w Cosmos DB - zwrot"
date: Sat, 12 Feb 2022 09:40:09 +0000
url: '/2022/02/12/modelowanie-w-cosmos-db-zwrot'
images: ['2022/02/12/modelowanie-w-cosmos-db-zwrot/cosmos-modeling.jpg']
description: "Kolejny odcinek o modelowaniu w Cosmos DB - analiza potrzeb w obszarze zwrotów"
category: 'Wzorce projektowe'
draft: true
---

Kontynuujemy cykl o modelowaniu w Cosmos DB, na podstawie rozmów biznesem i analizą ich potrzeb. Kończymy obszarem zwrotów. 

W kolejnych odcinkach przejdziemy do analizy scenariuszy pod kątem wymagań bazy danych 💻

## Wypożyczenia bez rezerwacji

Biznes wspomina o ostatnim obszarze - zwrotach, i pierwszym scenariuszu:

- "No to pora zakończyć naszą opowieść zwrotem roweru. Na początek zwrot poza stacją. Pomimo, że to dodatkowo kosztuje, to i tak się ludzie na to zgadzają."
- "Czyli zatrzymuję rower, i co dalej?"
- "Otwierasz aplikację i aktywne wypożyczenia."
- "A to można mieć naraz kilka wypożyczeń?"
- "A czemu nie? Możesz wypożyczyć rower dla siebie i dzieci. Kiedy masz już aktywne wypożyczenie to wybierasz właściwe i je kończysz. System zwraca rower do listy dostępnych rowerów. Następnie blokuje kłódkę rowerową."

[![](return-outside-station.jpg)](return-outside-station.jpg)

Nawiązując do poprzednich diagramów dodajemy licznik czasu i powiadomienie. Biznes kiwa głową i przechodzi dalej.

## Wypożyczenie z rezerwacją

Kontynuujemy z drugim scenariuszem.

- "Ok, to teraz druga opcja zwrotu - na stacji. Tutaj jest nieco inaczej. Klient podjeżdża na stację i wpina rower w wolne miejsce. Na tej podstawie system kończy wypożyczenie na dany rower."
- "Hmm, a czemu po prostu nie można po prostu otworzyć aktywnych wypożyczeń i zwrócić rower?"
- "Ponieważ to w rzeczywistości nie jest proste. Skoro mamy rower i stację to czemu zmuszać klienta do otwierania aplikacji? Dodatkowo jak potwierdzimy, że rower jest na stacji?"
- "Rzeczywiście. Co się dzieje dalej?"
- "Dalej jest w sumie identycznie jak poprzednio - zwrot na listę dostępnych, blokada kłódki, licznik i powiadomienie."

[![](return-to-station.jpg)](return-to-station.jpg)

Wracamy z diagramem dodając jedną ścieżkę:
- "Po dyskusji uznaliśmy, że brakuje tutaj pobierania wypożyczenia na bazie roweru. System sam z siebie nie będzie wiedział do jakiego wypożyczenia należy dany rower."
- "Słuszna uwaga, założyliśmy to automagicznie 😁"

## Automatyczne zakończenie

Biznes rozpoczyna ostatni scenariusz:
- "Pora na automatyczne zakończenie wypożyczenia. Tutaj nie ma wielkiej filozofii. Po tym jak upłynie czas na wypożyczenie (24 godziny) to kończymy automatycznie wypożyczenie. Następnie powiadamiamy klienta, a także pracownikow administracji."
- "Czy nie powinniśmy również zablokować kłódki w rowerze?"
- "Niech was ręka boska broni by pisać taki kod 😱 Załóżmy, że ktoś tym rowerem jedzie. Przecież to mogłoby nawet zabić naszego klienta."
- "Co racja to racja."

[![](automatic-stop.jpg)](automatic-stop.jpg)

## Domain Storytelling postscriptum 

### Dodatkowe ścieżki

"Po dyskusji uznaliśmy, że brakuje tutaj pobierania wypożyczenia na bazie roweru. System sam z siebie nie będzie wiedział do jakiego wypożyczenia należy dany rower."

### Drobne akcje i głębokie konsekwencje

Zablokowanie kłódki przy zakonczeniu wypożyczenia wydaje się dobrym pomysłem. Ale czasem dobre pomysły mają bardzo złe konsekwencje.
