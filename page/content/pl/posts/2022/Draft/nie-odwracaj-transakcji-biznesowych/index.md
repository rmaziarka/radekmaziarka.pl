---
title: "Nie odwracaj transakcji biznesowych - kilka słów o sagach"
date: 2022-01-27T09:59:30+01:00
draft: true
---

Wszędzie w internetach jest opisane jak wyglądają transakcje kompensujące 

https://docs.microsoft.com/en-us/azure/architecture/patterns/compensating-transaction
http://vasters.com/archive/Sagas.html

I jest moi drodzy dramat **#stonoga**. Żaden biznes nie pracuje w takim stylu.

## Antybiznes
- Sprzedaliśmy lot za 20 tys
- Sprzedaliśmy samochód za 5 tys
- Sprzedaliśmy 3 hotele za 20 tys
- Nie udało nam się sprzedać czwartego hotelu za 5 tysięcy
- To wszystko revertujemy
- Biznes płacze 😭😭

## Spójność to problem biznesowy
https://www.youtube.com/watch?v=a1pRsAi9UVs
Kacper Gunia i parę słów od niego

## Jak to robią inni
![](image (5).png)

## Ostateczna spójność
Co trzeba siebie zapytać?

![](image (6).png)