---
title: 'Microsoft Ignite - 3 nowe możliwości Azure Functions'
slug: '/2017/09/26/microsoft-ignite-3-nowe-mozliwosci-azure-functions/'
date: Tue, 26 Sep 2017 21:38:35 +0000
draft: false
category: 'Serverless'
tags: ['']
---

Trwa właśnie kolejna edycja konferencji [Microsoft Ignite](https://www.microsoft.com/en-us/ignite/default.aspx) - wydarzenia na którym Microsoft ogłasza nowe możliwości techniczne swojego ekosystemu. Zbiór nowości i tematów jest ogromny, ale mnie najbardziej interesuje trend **Serverless**, więc na nim się skupiłem. Poniżej opisałem 3 najciekawsze wg. mnie funkcje, jakie do tej pory zostały ogłoszone podczas obecnej edycji MS Ignite.

### Azure Cosmos DB

Do Azure Functions zostały dodane bindingi z usługi Azure Cosmos DB (wcześniej znane jako Azure DocumentDB). Oznacza to, że możemy podpiąć się bezpośrednio pod daną tabelę / graf / dokument i uruchamiać funkcję kiedy te zbiory zostaną zmienione. ![](http://radblog.pl/wp-content/uploads/2017/09/46e71098-271d-454f-9df5-6feb42f02c4a.png) Umożliwia to tworzenie procesów biznesowych połączonych bezpośrednio do źródła danych, bez narzutu związanego z rzucaniem i obsługą eventów z Event Grida / kolejki. [Tutaj](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-cosmos-db-triggered-function) mamy opis jak podpiąć Azure Cosmos DB do Azure Functions.

### **Microsoft Graph**

Twór jeszcze niedawno dla mnie nieznany - MS Graph umożliwia podpięcie się do całego obszaru usług Microsoftu (Outlook / OneDrive / Calendar i inne). Zyskujemy ogromny zbiór API, który umożliwia nam na pobieranie / modyfikację danych a także interakcje z daną usługą (tworzenie spotkań w kalendarzu, zarządzanie użytownikami w kontaktach itd). ![](http://radblog.pl/wp-content/uploads/2017/09/microsoft_graph.png) Dzięki połączeniu Azure Functions i Microsoft Graph mamy możliwość czytać i zmieniać dane w plikach Excela, plikach na OneDrive, wysyłać emaile z Outlooka, a także podpinać się pod webhooki zdefiniowane bezpośrednio w MS Graph. Więcej przeczytacie [tutaj](https://docs.microsoft.com/pl-pl/azure/azure-functions/functions-bindings-microsoft-graph).

### Cross Platform

Do tej pory nie było wsparcia dla Azure Functions dla Linuxa i Maca, przez co jedyną opcją na profesjonalny development był Windows. To się właśnie zmieniło, przez pojawienie się wersji Azure Functions 2.0. ![](http://radblog.pl/wp-content/uploads/2017/09/891e92c1-b595-4733-9d9c-33db6d422153.gif) Możemy pisać i debugować nasze funkcje używając do tego Azure Function Core Tools i Visual Studio Code (oczywiście zwykłe Visual Studio też działa). Można pisać w C#, F#, JavaScript, Java, więc zbiór całkiem niezły jak na początek. Ta wersja Azure Functions nie jest jeszcze w pełni produkcyjna ([known issues](https://github.com/Azure/azure-webjobs-sdk-script/wiki/Azure-Functions-runtime-2.0-known-issues)), więc nie polecam przesiadania się w pełni na inne platformy niż Windows, ale najprawdopodobniej w ciągu kilku tygodni / miesięcy bedzie na tyle stabilna że osoby spoza świata Microsoftu będą mogły bez przeszkód na nią przejść. Donna Malayeri, odpowiedzialna za Azure Functions w Microsofcie, opisała jak rozpocząć zabawę z nowym Azure Functions na [MSDN](https://blogs.msdn.microsoft.com/appserviceteam/2017/09/25/develop-azure-functions-on-any-platform/).   A wam co się spodobało na MS Ignite? Dajcie znać w komentarzach :)