---
title: 'Jak unikać sagi - robiąc na odwrót'
slug: '/2019/02/13/jak-uniknac-sagi-robiac-na-odwrot/'
date: Wed, 13 Feb 2019 21:21:28 +0000
draft: false
category: 'Wzorce projektowe'
tags: ['ddd', 'domain driven design']
---

Ostatnio natrafiłem na tweeta Udiego Dahana o [sagach](https://twitter.com/UdiDahan/status/1087445225398771712) - określił on Sagi / kompensacje jako nadmiarowe w większości przypadków. Część z nich wychodzi ze złego zamodelowania domeny i procesu biznesowego, część jako nieznajomość procesów zachodzących w danej domenie. Zastanowiło mnie to, czy czasem sam nie trafiam na podobny problem.

Domena rezerwacji biletów
-------------------------

Załóżmy że mamy proces sprzedaży biletów kinowych. Użytkownik wybiera godzinę seansu i salę, a następnie prezetujemy mu wygląd sali z krzesłami. Krzesła są albo zajęte, albo wolne, w zależności od dokonanych rezerwacji. Mamy 2 osobne konteksty:

*   Zamawianie biletów - zarządza procesem rezerwacji, trzyma wszystkie informacje klienta.
*   Sale - zarządza miejscami na sali, dba by nie było podwójnie zajętego miejsca.

Problem jaki się pojawiał to w przypadku kliknięcia Rezerwuj na stronie sali trzeba było dokonać 2 operacji:

*   Zajęcie krzeseł
*   Stworzenie rezerwacji na te krzesła

Czyli 2 różne operacje w 2 różnych kontekstach. Zastanawiałem się jak to zrobić by najmniej zabolało to systemu. Jednak ciężko było uciec od czegoś na kształt sagi:

*   (UI) Kliknięcie Zarezerwuj ->
*   (Zamawianie biletów) Stwórz rezerwację -> Rezerwacja stworzona ->
*   (Zamawianie biletów) Uruchom sagę -> Wyślij żądanie "Zajmij krzesła" ->
*   (Sale) Zajmij krzesła -> Krzesła zajęte ->
*   (Zamawianie biletów) Saga zakończona -> Rezerwacja dokonana ->
*   (UI) Widok dokonanej rezerwacji

Saga utrzymuje rezerwację w stanie spójności i nie pozwala na jej stworzenie w momencie, kiedy krzesła nie zostały zajęte. Gdyby tak się stało to saga anulowałaby rezerwację. Takie rozwiązanie powoduje, że mamy proces, który wymaga koordynacji pomiędzy 2 kontekstami. Takie połączenie nie jest zbyt pożądane, ponieważ utrudnia rozwój i utrzymanie systemu. #CoRobićJakŻyć

Turn it upside down
-------------------

Adam Ralph na [DevConf](https://www.youtube.com/watch?v=rsCqHsV9Dxg) podrzucił ciekawą strategię, zaprezentowaną na przykładzie Amazona. Zamiast tworzyć byt w ostanim możliwym momencie, można utworzyć go na początku procesu.Amazon tworzy zamówienie już podczas wejścia do strony "Zamówienie", a nie na jej końcu. Takie zachowanie pozwala podpiąć wszystkie potrzebne informacje jeszcze w trakcie trwania procesu. Możemy spokojnie dodawać kolejne porcje danych zamiast wykonywać Big Bang Request na samym końcu, co może skończyć się niepowodzeniem.

No-saga w rezerwacji biletów
----------------------------

To co można zrobić w naszym przypadku to stworzyć rezerwację od razu jak użytkownik wybierze salę kina. Następnie, na podstawie identyfikatora danej rezerwacji uderzyć bezpośrednio do kontekstu Sal, prosząc o zajęcie miejsc. Unikamy jakichkolwiek sag - wszystko dzieje się w obrębie jednego kontekstu. Gdy nam się operacja nie powiedzie to możemy bezproblemowo ją ponawiać na innych krzesłach. Takie spojrzenie na problem pozwala uniknąć skomplikowania technicznego i problemów z synchronicznym odpytywaniem od siebie serwisów. Możemy uprościć komunikację i sprawić by była ona bardziej przewidywalna. Nasze konteksty są od siebie bardziej odseparowane. To co jest ciekawe to rozróżnienie UI / backend - pomimo że jesteśmy w procesie zamawiania biletów to uderzamy do kontekstu sal. Taka mała zmiana a tak duże zyski. To takie luźne przemyślenie - daj znać co myślisz 😉