---
title: 'Event Storming - rozszerzenie notacji - Action Point'
slug: '/2019/07/22/event-storming-rozszerzenie-notacji-action-point/'
date: Mon, 22 Jul 2019 09:06:16 +0000
draft: false
category: 'Event Storming'
tags: ['ddd', 'domain driven design', 'event storming']
---

// artykuł gościnny, napisany przez [Piotr Klimiec](https://www.linkedin.com/in/piotr-klimiec-621873b5/) – programistę w firmie Software Mind. Eventy, Hot Spoty, Commands - to podstawowe 'building blocking' notacji Event Stormingu. Każdy nich ma swoje ściśle określone znaczenie oraz przypisany kolor karteczki. Standardowych elementów notacji jest kilkanaście. To z ich pomocą jesteśmy w stanie zamodelować dowolny proces. Alberto Brandolini, twórca techniki Event Stormingu. często podkreśla, że notacja którą zaproponował to tylko fundament -  coś od czego mamy wyjść , ale coś co nie powinno nas ograniczać. Jeżeli przy modelowaniu danego procesu zajdzie potrzeba **rozszerzenia notacji** o elementy które spowodują u nas lepsze zrozumienie modelowanego procesu to śmiało możemy to zrobić. Ba,  nawet powinniśmy! Alberto często przywołuje w tym miejscu metaforę pizzy. Każda pizza składa się z ciasta, sera i sosu pomidorowego. Jedyną różnicą będa składniki, które można dowolnie dobierać. \[caption id="attachment\_1766" align="alignnone" width="446"\][![](https://radekmaziarka.pl/wp-content/uploads/2019/07/gordon-ramsey-pizza.jpg)](https://radekmaziarka.pl/wp-content/uploads/2019/07/gordon-ramsey-pizza.jpg) Trzeba tylko pamiętać aby nie przesadzić :)\[/caption\] Zatem, skoro sam twórca techniki zachęca nas do kreatywności i dostosowywania notacji do własnych potrzeb, to powinniśmy z tego korzystać bez obaw, że zostaniemy posądzeniu o herezje! W tej serii artykułów chciałbym przedstawić kilka propozycji rozszerzenia notacji, które może śmiało zaadoptować w innych sesjach, a które sprawdziły mi się podczas własnych sesji. Zaczniemy od **Action Point**.

 Action Point
=============

[![](https://radekmaziarka.pl/wp-content/uploads/2019/07/action-point.jpg)](https://radekmaziarka.pl/wp-content/uploads/2019/07/action-point.jpg) Action Point to element ściśle związany z **Hot Spotami**. Zanim wytłumaczę jego rolę i znaczenie,przyjrzyjmy się bliżej definicji Hot Spot’u. Hot Spot czyli różowa karteczka, obrócona o 45% względem Eventu może symbolizować kilka rzeczy:

*   brak wiedzy / niepewność
*   uwagi odnośnie problemów w procesie.
*   ryzyko

Czyli Hot Spot może mieć formę **pytająca** - 'Czy na pewno tak to działa? Czy we wszystkich procesach to występuje?' - albo formę **twierdzącą** - 'Ten proces jest wolny!' Hot Spoty w formie pytania **mogą** oznaczać, że wśród naszych expertów domenowych brak jest wiedzy na temat działania jakieś elementu procesu (pytania mogą również oznaczać potencjalny problem, wątpliwość, niepewność etc. ). Są to miejsca którym powinniśmy się bacznie przyjrzeć!  Lubię oznaczać tego typu Hot Spoty przy pomocy **Action Pointów**. **Action Point**, to po prostu informacja o osobie (obecnej na sesji),  która ma za zadanie znaleźć odpowiedź na **pytanie** zadane w Hot Spocie. Z reguły sprowadza się to do zrobienia spotkania z inną osobą nie będącej na sesji, która może znać na nie odpowiedź. Przykład:

*   Hot Spot:  "Czy wysyłamy towar za pobraniem?"
*   Action Point: "Marek (który jest obecny na sesji) ma porozmawiać z Marianem z działu sprzedaży i go dopytać, on będzie wiedział!"

Może w konsekwencji takiego spotkania Marek dowie się więcej od Mariana i będzie mógł wrócić z wiedza na kolejną sesji. Może Marek zaprosi Mariana na kolejną sesje? Sprawy mogą różnie się potoczyć. Ważne, żeby odnotować na modelu informację o takim planowanym spotkaniu. Szalenie ważne jest aby pod koniec sesji,  zweryfikować cały model z Hot Spotów w formie pytającej. Tak jak już wcześniej wspomniałem pytania **mogą** oznaczać  niewiedzę, którą trzeba jakoś zaadresować. Jeżeli jest to niemożliwe podczas trwania sesji,  trzeba do **każdego** takiego Hot Spota przypisać  Action Point. Najgorsze co można zrobić to rozejść się po sesji z niewiedzą utrwalona w postaci Hot Spotów. Nie róbmy tego!

Nie tylko pytania!
==================

Action Point sprawdzają się również świetnie w przypadku Hot Spotów w formie twierdzącej! Czasami podczas sesji, zdarza się, że pewna informacja o problemie powoduje ożywioną dyskusję. Jeżeli podczas takiej dyskusji pojawią się propozycje z kim trzeba na dany temat porozmawiać aby spróbować rozwiązać dany problem warto takiego coś zapisać w formie Action Pointu. Przykład:

*   Hot Spot: "Często występują opóźnienia w wysyłce towaru!"
*   Action Point: "Spotkanie Kierownika działu wysyłki z Grażyną (grażyna jest obecna na sesji)"

Ważne jest aby nie przesadzić i nie starać się przypisać Action Pointów do każdego Hot Spota. Nie o to w tym chodzi! **Moja heurystyka jest następująca**: Hot Spoty w formie pytającej, które oznaczają niewiedzę powinny mieć przypisany Action Point - ktoś musi znaleźć odpowiedź na pytanie! W pozostałych przypadkach wszystko zależy od sytuacji i z jak ważnymi problemami się mierzymy. Warto tutaj słuchać co mówią uczestnicy sesji i jeżeli padnie propozycja - “Musimy o tym problemie porozmawiać z ….” - to  zróbmy z tego informację w postaci Action Pointa.

Notacja
=======

Do oznaczania action pointów wybrałem karteczkę standardowych rozmiarów koloru żółtego. \[caption id="attachment\_1769" align="alignnone" width="195"\][![](https://radekmaziarka.pl/wp-content/uploads/2019/07/yellow-cards.jpg)](https://radekmaziarka.pl/wp-content/uploads/2019/07/yellow-cards.jpg) Karteczka koloru żółtego, czyli Action Point\[/caption\] Ktoś może zapytać “Ło Panie, po co kolejna nowa karteczka w notacji !? Nie można tego zapisać w formie notatki?” Oczywiście, że można i nawet wcześniej tak robiłem! Jednak Action Pointy mają to do siebie, że finalnie nie chcemy zostawić ich na modelu. Ich obecność ‘kłuje’ w oczy - o to właśnie chodzi! Jawnie komunikujemy, że jesteśmy w fazie szukania odpowiedzi na dane pytanie. Notatki nie mają takiej siły! :-)