---
title: 'DDD i Mikroserwisy'
date: Wed, 15 Aug 2020 19:31:14 +0000
draft: false
images: ['/images/trainings/distribution.png']
url: '/szkolenia-i-warsztaty/ddd-i-mikroserwisy'
aliases: ['/szkolenia-i-warsztaty/ddd']
duration: '2-3 dni'
workshopType: 'tech'
promoText: 'Wprowadzenie do mikroserwisów z wykorzystaniem DDD.'
targetGroup: 'Zespoły programistyczne, architekci, testerzy'
trainingPlace: 'Siedziba klienta lub Zdalnie'
form: '30% teoria / 70% praktyka'
knowledgeToObtain: [
    'Uzyskasz wiedzę na temat architektury mikroserwisów',
    'Nauczysz się liczyć zyski i koszta wdrażania tej architektury',
    'Poprawnie zamodelujesz mikroserwisy i ich komunikację',
    'Będziesz potrafił(a) integrować / testować / wizualizować / monitorować mikroserwisy',
    'Zarządzisz transakcjami biznesowymi w świecie mikroserwisów'
]
trainingPlan: [
    [
        'Podstawy mikroserwisów',
        'Jakie są pryncypia architektury mikroserwisowej',
        'Kiedy stosować tą architekturę',
        'Kiedy nie stosować / wystarczy zwykły modularny monolit',
    ],
    [
        'Modelowanie serwisów',    
        'Podstawy Domain Driven Design',
        'Bounded Context a mikroserwis',
        'Podstawy modelowania',
        'Strategie dekompozycji mikroserwisów',
        'Zasada pojedyńczej odpowiedzialności mikroserwisów',
        'Reużywalność',
    ],
    [
        'Loosely-Coupled Architecture',    
        'Czym jest architektura luźno ze sobą związana i jakie przynosi zyski',
        'Miary spójności',
        'Miary złączenia',
        'Miara częstotliwości zmian',
        'Trade-offy',
        'Mikroserwisy a Loosely-Coupled Architecture',
    ],
    [
        'Komunikacja międzyserwisowa',    
        'Metody komunikacji',
        'Komunikacja synchroniczna',
        'Komunikacja asynchroniczna',
        'Dobre i złe praktyki',
    ],
    [
        'Integracja międzyserwisowa',    
        'Strategie integracji',
        'Określanie odpowiedzialności',
        'Izolacja mikroserwisów',
        'Choreografia a orkiestracja',
    ],
    [
        'Testy w świecie mikroserwisów',    
        'Rodzaje testów',
        'Anty wzorzec - testy E2E',
        'Testy kontraktów',
        'Testy na produkcji',
        'Metryki testów',
    ],
    [
        'Transakcje a mikroserwisy',
        'Rozproszone transakcje',
        'Modelowanie nastawione na brak transakcji',
        'Wzorzec sagi',
        'Wzorzec process managera',
    ],
    [
        'Socjotechniczne wzorce',
        'Zespoły programistyczne a mikroserwisy',
        "Prawo Conway'a",
        'Zespoły nastawione na aktywności i rezultaty',
        'Wzorce pracy zespołowej',
    ],
    [
        'Wizualizacja architektury - Model C4',    
        'Czym jest model C4',
        'Context',
        'Container',
        'Component',
        'Code',
        'Automatyzacja tworzenia modeli',
    ],
    [
        'Event Storming - modelowanie mikroserwisów',
        'Podstawy techniki',
        'Modelowanie procesów biznesowych',
        'Projektowanie aplikacji',
        'Określanie granic modułów',
    ],
    [
        'Legacy - transformacja do mikroserwisów',
        'Od czego zacząć',
        'Rozdział obszarów bezstanowych',
        'Rozdział obszarów stanowych',
        'Wzorce podziału bazy danych',
        'Wzorce podmiany aplikacji',
    ]
]
---
Wiedza na temat Domain-Driven Design jest niesamowicie pomocna, przy tworzeniu systemów opartych o architekturę mikroserwisów. Pozwala ona stworzyć rozwiązanie skalowalne, autonomiczne i odporne na zmiany.

Podczas mojego szkolenia chciałbym przekazać Ci wiedzę jak tworzyć mikroserwisy aby na koniec dnia uznać decyzję odnośnie wybrania tej architektury za właściwą.