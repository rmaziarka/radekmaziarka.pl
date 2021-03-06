---
title: 'UI Bootstrap vs Foundation for Apps - 1:0'
url: '/2016/02/07/ui-bootstrap-vs-foundation-for-apps-10/'
date: Sun, 07 Feb 2016 13:31:44 +0000
draft: false
images: []
category: 'Angular'
tags: ['']
---

W naszym nowym projekcie postanowiliśmy sprawdzić framework Foundation for Apps aby dowiedzieć się jak się sprawdza w porównaniu do UI Bootstrap w przypadku aplikacji Angularowej. I okazało się że FfA poległ już na bardzo trywialnym przypadku.

Pojawiła się potrzeba dodania tabów, w którym w każdym z nich pojawią się pola do wpisywania danych. Liczba tabów jest dynamiczna, zależna od odpowiedzi serwera. Wpisywane dane są zebrane w jednym kontrolerze i wysyłane do serwera po wypełnieniu wszystkich pól.

Niestety okazało się że FfA tworząc taby nie pozwala na dostęp do pól modelu na którym operuje. Jest to widoczne na załączonym [Plunkerze](https://plnkr.co/edit/K5epjLvKaWzuIT6T7xMM?p=preview). Identyczny kod w pełni działa na UIB - edytując pole w tabie zmieniamy docelową wartość i ta zmiana jest widoczna w scopie, co widać [tutaj](https://plnkr.co/edit/4Sd297bsUgDNo7DoKFaP?p=preview).

Ten problem został zauważony przez użytkowników FfA: [1](http://foundation.zurb.com/forum/posts/21815-access-parent-scope-inside-zf-tabs-directive), [2](http://foundation.zurb.com/forum/posts/22749-accessing-scope-in-double-nested-zf-tab-directive), [3](https://github.com/zurb/foundation-apps/issues/588) już dość dawno temu, ale jedynym rozwiązaniem podanym przez twórców jest używanie zmiennej _$parent_, co wg mnie jest bardziej ucieczką od problemu niż realnym rozwiązaniem, szczególnie w zagnieżdżonych widokach. Co boli jeszcze bardziej, to brak informacji na stronie dokumentacji FfA odnośnie trudności jakie spotkają programistów korzystających z tabów. U mnie w zespole spowodowało to stratę kilku godzin dwóch programistów walczących z tym rozwiązaniem.

Także uważajcie na przyszłość!