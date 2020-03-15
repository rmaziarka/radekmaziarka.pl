---
title: 'Moduły w testach Angulara czyli dlaczego warto czytać tutoriale'
slug: '/2016/02/01/testowanie-w-angularze-czyli-dlaczego-warto-czytac-tutoriale/'
date: Mon, 01 Feb 2016 20:06:19 +0000
draft: false
category: 'Angular'
tags: ['']
---

Testy w Angularze to temat rzeka i łatwo pominąć pewne fragmenty uznając je za mało ważne by później mocno tego żałować. Gorzej jeśli rozkładamy się na tak bazowej rzeczy że aż później plujemy sobie w brodę. Tutaj trochę usprawiedliwia nas użyty typescript bo gdy IDE podświetla używane typy to nie podejrzewamy, że coś idzie nie tak.

Przykładowy kod:

```typescript
    beforeEach(() => {
        angular.mock.inject((\_someService\_: NameSpace.SomeService) => {
            someService = _someService\_;
        });
    });

    it('should be true', () => {
        // treść testu
    });
```

Nasz _SomeService _jest podświetlony czyli została do niego znaleziona referecja. Uruchamiamy test i wywala się, że nie potrafimy odnaleźć owego serwisu.

Ponieważ realny test był bardziej skomplikowany szukaliśmy błędu w wielu miejscach licząc na coś nietrywialnego. Kiedy jednak wszystko inne sprawdziliśmy zostało nam coś co ominęliśmy, a jest opisane na samym początku tutoriala testów Angulara - wczytanie modułu.

```typescript
    beforeEach(angular.mock.module('NameSpace'));
```

I kod zaczął przechodzić testy. Ehh...