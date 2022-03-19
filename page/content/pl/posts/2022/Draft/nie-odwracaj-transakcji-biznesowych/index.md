---
title: "Saga - nie zawracaj procesów biznesowych"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Nasz proces biznesowy rzadko jest obsługiwany w jednym miejscu. Kiedy tworzymy modularne systemy to zwykle każdy moduł obsługuje osobną część procesu. Jednak zawsze może nastąpić błąd (zarówno biznesowy jak i techniczny). W takim razie, z punktu widzenia procesu biznesowego, trzeba umieć ten błąd obsłużyć.

Z punktu widzenia technicznego:
- rozproszony proces biznesowy nazywany jest **sagą**
- obsługa problemów w tym procesie nazywana jest **transakcją kompensującą**.

Wszędzie w internetach transakcje kompensujące w sagach są opisywane w prawie identyczny sposób - dokonujemy zawrócenia całego procesu:

// zdjęcia z linkow ponizej

https://docs.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
http://vasters.com/archive/Sagas.html

I **to jest dramat**, moi drodzy. Żaden biznes nie pracuje w takim stylu.

## Antybiznes

Wyobraźmy sobie taką sytuację - przychodzi do nas biznes i pyta się co się stało z zakupem klienta. Odpowiadamy:
- Klient złożył zamówienie gdzie mamy:
    - Telewizor za 10 tys.
    - Wieża Hi-Fi za 5 tys.
    - XYZ za 10 tys.
- Klient zapłacił za wszystko
- Rozpoczęliśmy blokowanie towarów do wysyłki
- Okazało się, że tej wieży już nie ma na stanie
- Więc wszystko zawracamy - zwracamy kasę i anulujemy zakup
- Biznes płacze 😭😭

Przecież jak to sobie przeczytamy głośno to brzmi absurdalnie. Więc czemu w ten sposób są opisywane wszystkie transakcje kompensujące?

Nie wiem.

## Spójność to problem biznesowy

My, jako osoby techniczne, mamy skłonność do myślenia o procesach jako czymś co powinno być zawsze spójne. Robimy transakcję i myślimy aby udała się ona 0-1, albo całość, albo w ogóle. Tylko, że to nie jest biznesowe.

> Cytat Gunii

https://www.youtube.com/watch?v=a1pRsAi9UVs
Kacper Gunia na konferencji DDD XYZ wrzucił taki cytat, który bardzo mocno do mnie trafił. **To co robić w momencie niespójnym, to nie jest problem techniczny.** Biznes z takimi problemami styka się na codzień. I ma na to gotowe odpowiedzi.

## Jak to robią inni

Swojego czasu kupowałem sobie sprzęt komputerowy XYZ na Morele. Wybrałem, zapłaciłem i czekałem. Po 2-3 dniach zadzwonił telefon. Miła pani z Morele powiadomiła mnie, że przedmiotu nie ma. Przeprosiła i zaproponowała inny przedmiot po niższej cenie. Była to dobra okazja, więc się zgodziłem.

Z punktu widzenia technicznego proces się nie zawrócił. **Przenieśliśmy do czynnika białkowego podjęcie decyzji co dalej.** Otóż rzadko ta decyzja.

// Amazon pic

Podobnie działa Amazon w dwóch obszarach:

- Kindle - wysyłamy książki nawet jeśli płatność się nie powiedzie
- Sklep Amazonu - sprzedajemy towar bazując na ogólnym stanie towarów, bez dokładnej informacji ile ich jest

Można się zastanowić - dlaczego firmy tak robią? Czemu nie dbają aby wszystko było spójne? **Otóż przy pewnej skali nie da się zachować spójności.** Zawsze się coś nie uda.

## Ostateczna spójność

// zdjecie

Biorąc pod uwagę to co powyżej, musimy inaczej podejść do wdrażania procesu biznesowego w naszym kodzie. Trzeba inaczej zaplanować kształt procesu, aby brał pod uwagę możliwe problemy.

Możemy sobie w tym momencie zadać następujące pytania:

- Jaka jest szansa na niepowodzenie procesu?
- Jakie problemy możemy zaakceptować?
- Czy możemy inaczej ustawić proces biznesowy?
- Czy możemy zrealizować dodatkowe akcje?
- Jak szybko proces musi się zakończyć?
- Jak powiadomimy klienta, że coś się nie powiodło?

Pozwoli to nam tworzyć bardziej odporne procesy, zarówno ze strony technicznej, ale przede wszystkim biznesowym.