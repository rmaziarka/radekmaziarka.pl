---
title: 'Azure Websites i czas lokalny'
slug: '/2016/02/28/azure-websites-i-czas-lokalny/'
date: Sun, 28 Feb 2016 09:31:24 +0000
draft: false
category: 'Azure'
tags: ['']
---

Piszę aktualnie małą aplikację webową w ASP.NET, która będzie używana jedynie w Polsce. Postanowiłem ustawić na sztywno kulturę polską, aby wszystkie daty wskazywały na właściwą godzinę. Najprościej jest to zrobić dodając wpis _globalization_  w _web.config_, co też uczyniłem. Po uruchomieniu aplikacji na Azure Websites zauważyłem, że datą lokalną wciąż jest UTC. Szybka poprawka na ustawianie kultury podczas uruchamiania aplikacji przez nadpisywanie _CurrentCulture_ i_ CurrentUICulture _w aktualnym wątku, deploy i znów nic. Co jeszcze dziwniejsze, kultura aplikacji była ustawiona na polską, ale daty lokalne dalej były pobierane z UTC. Tutaj już zacząłem trochę wątpić w swoje umiejętności, ale szybki research w Google pokazał prawdziwy powód moich problemów. Azure Websites **domyślnie zwracają godzinę UTC** i nie można tego zmienić przez wyżej opisane metody. Istnieją 2 rozwiązania:

*   Wpis w ustawieniach witryny na portalu Azure _WEBSITE\_TIME\_ZONE _z wartością _Central European Standard Time - _[link](http://blogs.msdn.com/b/tomholl/archive/2015/04/07/changing-the-server-time-zone-on-azure-web-apps.aspx)
*   Każdorazowa konwersja dat do lokalnej przez zabawy z klasą _TimeZoneInfo - _[link](http://blogs.msdn.com/b/waws/archive/2014/08/05/get-the-local-server-time-for-your-azure-web-site.aspx)

Pierwszy jest dobry, gdy chcemy ustawić na sztywno datę lokalną w całej aplikacji, drugiego będziemy używali w bardziej multikulturowej aplikacji. Użyłem więc pierwszego sposobu i mam już aktualną datę na Azure :)