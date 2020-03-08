---
title: 'Jak usprawnić pracę frontendowca w ASP.NET przy wykorzystaniu Gulpa?'
slug: '/2016/02/16/jak-usprawnic-prace-frontendowca-w-asp-net-przy-wykorzystaniu-gulpa/'
date: Tue, 16 Feb 2016 08:52:26 +0000
draft: false
category: 'Gulp'
tags: ['']
---

_Artykuł ukazał się w magazynie Programista, [nr 12/2015](http://goo.gl/W2SxlK)_

Praca webdevelopera staje się coraz bardziej skoncentrowana na frontendzie. Dzisiejsze aplikacje posiadają szeroką logikę biznesową po stronie klienta, walidacje, ściąganie danych z wielu źródeł. Jest to szczególnie widoczne w aplikacjach SPA (Single Page Application), w których jedyną funkcją serwera może być zwrócenie źródeł i odpowiedzi na żądania z aplikacji. Dotychczasowe rozwiązania zastosowane w ASP.NET oferowały raczej skromne mechanizmy usprawniające pracę programistów frontendowych.

Na przykład mechanizm Bundle (czyli łączenie wielu plików w jeden, by zoptymalizować czas ładowania strony) jest dobry w przypadku małej ilości plików JS, ale wymaga kompilowania aplikacji, aby nowe pliki JS były widoczne w pliku HTML co powoduje obniżenie efektywności pracy programisty. Najpopularniejsza .NET’owa biblioteka do kompilacji LESS -> CSS po stronie serwera (dotless) do tej pory nie wspiera wersji less 2.0 wprowadzonej ponad rok temu. Bardziej rozbudowane zarządzanie plikami klienckimi z poziomu ASP.NET jest skomplikowane. Uważam, że ASP.NET dobrze obsługuje mechanizmy back-endowe, natomiast do front-endu mamy świetne narzędzia zewnętrzne.

Taka koncepcja już od dawna rozpowszechniała się po świecie programistycznym, a w 2014 roku Microsoft dodał w Visual Studio wsparcie dla Gulp i Grunt – task runnerów JavaScript. Dzięki temu mamy łatwą i szybką możliwość uruchamiania zadań zajmujących się kompilacją, minifikowaniem czy też wrzucaniem plików do zewnętrznych folderów i serwerów. Dzięki Node.js (środowisko uruchomieniowe JS, w ramach którego działają task runnery) i npm (menadżer pakietów dla Node.js) możemy instalować pluginy Gulp bezpośrednio do projektu naszej aplikacji. Node.js jest domyślnie instalowany podczas instalacji Visual Studio 2015, więc nic nie stoi nam na przeszkodzie, by go użyć w naszym projekcie. Dla starszych wersji Visual Studio istnieją dodatki do zainstalowania lub jest możliwość uruchamiania tasków bezpośrednio z konsoli.

Chciałbym Wam przedstawić w skrócie czym jest Gulp, a następnie kilka problemów, z którymi spotkałem się przy pisaniu aplikacji SPA w Angular, oraz sposób, w jaki biblioteki dla Gulp ułatwiły ich rozwiązanie.

 

**Czym jest Gulp:**

Gulp jest to narzędzie do automatyzacji pracy działające w sposób strumieniowy – Gulp wczytuje wybrane przez nas pliki do strumienia, dokonuje transformacji na każdym elemencie w strumieniu, a następnie zapisuje na dysk rezultat naszych procesów. Przykładowa transformacja:

![](http://i.imgur.com/6Njvlu1.png)
_Rysunek 1 Przykładowa transformacja strumienia w Gulp_

Instalacja Gulp i jego pluginów następuje przez wpisanie w konsoli:

\[code lang="js"\]
npm install package-name
\[/code\]

Pluginy można wyszukiwać na stronie repozytorium npm dostępnym pod adresem [www.npmjs.com](https://www.npmjs.com/). Praktycznie wszystkie pluginy do Gulp są poprzedzone przedrostkiem gulp-\* np. gulp-less.

Zadania deklarujemy w pliku gulpfile.js, a uruchamiamy je wpisując w konsoli gulp i nazwa zadania (pusty gulp uruchomi zadanie domyślne _default_). Przykładowy plik gulpfile.js:

\[code lang="js"\]
var gulp = require('gulp');
gulp.task('default', function () {
 // run tasks here
});
\[/code\]

Dokładniejsza instrukcja dostępna jest na stronie Gulp w platformie GitHub, w zakładce dokumentacji.

 

**Użycie Gulp w projekcie ASP.NET:**

W Visual Studio zostało dodane okno _Task Runner Explorer_, w którym mamy dostęp do wszystkich tasków zadeklarowanych w pliku gulpfile.js. Możemy je ręcznie uruchamiać lub wpinać w proces budowania aplikacji, dodając zadania do etapów budowania projektu.

![](http://i.imgur.com/YK1Q3ef.png)
_Rysunek 2 Okno Task Runner Explorer w Visual Studio_

 

**Problemy:**

**Kompilacja Less/TypeScript**

*   Problem: Naszą aplikację zaczęliśmy pisać z użyciem takich techonologii frontendowych jak Less i TypeScript. Niestety, Visual Studio 2015 nie posiada wsparcia dla automatycznej kompilacji tych plików podczas budowania aplikacji, tylko wymagana jest instalacja dodatkowych narzędzi, których obsługa nie jest trywialna. Chcieliśmy prostego mechanizmu, który pozwoli nam skompilować te pliki do swoich odpowiedników.
*   Użyte biblioteki: gulp-less, gulp-typescript
*   Rozwiązanie: Obie te biblioteki kompilują pliki znalezione w przekazanej ścieżce, a nastepnie umieszcają je we wskazanym przez nas miejscu docelowym. Posiadają duże możliwości konfiguracji, ale podstawowe użycie wymaga jedynie kilku linijek kodu.
*   Przykład:

\[code lang="js"\]
gulp.task('less', function () {
 return gulp.src('./styles/\*\*/\*.less')
 .pipe(less())
 .pipe(gulp.dest('./dest/css'));
});
\[/code\]

 

**Minifikacja i łączenie plików**

*   Problem: Standardowy mechanizm ASP.NET Bundle wymaga budowania całej aplikacji nawet po dodania jednego pliku JS czy CSS. Dodatkowo możliwość zarządzania bundlami jest mocno ograniczona. Chcieliśmy mieć większą kontrolę nad tym procesem.
*   Użyte biblioteki: gulp-uglify, gulp-minify-css, gulp-concat, gulp-inject
*   Rozwiązanie: Pierwsze dwie biblioteki zajmują się minifikacją plików JS/CSS. gulp-concat łączy zminifikowane pliki w jedną całość. gulp-inject potrafi wylistować wszystkie pliki do pliku HTML. Dzięki temu mamy możliwość zareagować na konfigurację builda (Debug/Release) i wylistować albo wszystkie pliki, albo tylko te zminifikowane.
*   Przykład

\[code lang="js"\]
gulp.task('minify-js', function () {
 return gulp.src('./scripts/\*\*/\*.js')
 .pipe(uglify())
 .pipe(concat('all.min.js'))
 .pipe(gulp.dest('./dest/'));
})
\[/code\]

 

**Biblioteki zewnętrzne**

*   Problem: Używamy zewnętrznych bibliotek z Bower package manager. Chcieliśmy je móc automatycznie dołączać w pliku HTML zamiast ręcznie dodawać wpisy do nich.
*   Użyte biblioteki: main-bower-files, gulp-inject
*   Rozwiązanie: main-bower-files pozwala przeczytać zależności naszego projektu z bower.json i pobrać listę ścieżek do tych plików. Następnie przez gulp-inject jesteśmy w stanie wylistować je w naszym głównym pliku HTML lub dołączyć do napisanego wcześniej mechanizmu minifikacyjnego.
*   Przykład:

\[code lang="js"\]
gulp.task('bower', function () {
 var bowerFiles = mainBowerFiles();
 return gulp.src('./index.html')
 .pipe(inject(gulp.src(bowerFiles)))
 .pipe(gulp.dest('./'));
});
\[/code\]

 

**Dołączanie plików statycznych**

*   Problem: W aplikacji posiadaliśmy pliki widoków HTML oraz pliki tłumaczeń JSON, które były pobierane przez aplikację w trakcie użytkowania. Jednak tych plików było dużo i powodowało to lawinę żądań HTTP. Chcieliśmy mieć je połączone w jeden plik, tak by aplikacja szybciej działała.
*   Biblioteki: gulp-angular-templatecache, gulp-angular-translate
*   Rozwiązanie: Obie powyższe biblioteki przeszukują katalogi projektu i wczytują wszystkie pliki o wymaganej sygnaturze (pierwszy \*.html, drugi \*.lang.json). Następnie każdy z nich tworzy jeden połączony plik, który po wczytaniu do aplikacji zapewni Angularowi cache dla wszystkich widoków i tłumaczeń, przez co eliminujemy zbędne żądania.
*   Przykład:

\[code lang="js"\]
gulp.task('templates', function () {
 return gulp.src('./templates/\*\*/\*.html')
 .pipe(angularTemplateCache())
 .pipe(gulp.dest('./dest/'));
});
\[/code\]

 

**CDN**

*   Problem: Zauważyliśmy spadek prędkości uruchamiania aplikacji poprzez wolne ściąganie zminifikowanych plików klienckich. Po analizie okazało się, że ściąganie plików z aplikacji Azure Website, przy dużej liczbie żądań, trwało zbyt długo i opóźniało start. Postanowiliśmy umieścić te pliki w CDNie (duży, rozproszony system serwerów proxy), aby przyśpieszyć ich ściąganie i odciążyć serwery aplikacji..
*   Użyte biblioteki: gulp-deploy-azure-cdn
*   Rozwiązanie: Biblioteka wrzuca pliki do wcześniej stworzonego kontenera (Azure Blob). Ma duże możliwości konfiguracyjne i pozwala m.in. uruchamić „suchy” przebieg, który w konfiguracji Debug nie wyśle plików do kontenera. Dodając wskazanie w Azure CDN na nasz blob mamy szybki mechanizm udostępniania plików, który przyśpiesza działanie aplikacji
*   Przykład:

\[code lang="js"\]
gulp.task('upload-to-azure', function () {
 return gulp.src(\['./dest/\*.js', './dest/\*.css'\])
 .pipe(deployAzureCdn({
 containerName: 'containerName',
 serviceOptions: \['blobName', 'password'\],
 }));
});
\[/code\]

 

**Wersjonowanie plików**

*   Problem: Okazało się, że Azure CDN dla plików o tej samej nazwie zwracał stare wersje plików pomimo istnienia nowszych w kontenerze. Postanowiliśmy dodać wersję pliku do każdego pliku, by uniknąć problematycznego cachowania.
*   Biblioteki: gulp-rev
*   Rozwiązanie: Biblioteka wylicza hash zawartości i dodaje go na koniec nazwy pliku. Dzięki temu po każdej zmianie zawartości pliki różnią się nazwami i są oddzielnie dostępne z poziomu CDN. Jednocześnie niezmienione pliki są nadal cachowane i są szybciej dostępne dla aplikacji.
*   Przykład:

\[code lang="js"\]
gulp.task('version', function () {
 return gulp.src(\['./dest/\*.js', './dest/\*.css'\])
 .pipe(rev())
 .pipe(gulp.dest('./dest'));
});
\[/code\]

 

**Pomocnicze biblioteki:**

*   gulp-load-plugins – upraszcza korzystanie z pluginów. Zamiast wczytywać każdy plugin osobno przez _require_ wczytujemy raz gulp-load-plugins, a następnie z niego mamy dostęp do wszystkich pluginów dostępnych z pliku package.json
*   gulp-plumber – umożliwia kontynuację przetwarzania strumienia w przypadku wystąpienia błędu
*   gulp-task-list – pozwala wylistować z konsoli listę tasków wraz z ich komentarzami
*   gulp-watch – umożliwia nasłuchiwanie zmian w folderach i reagowanie na nie np. dodany plik .less zostanie automatycznie przekompilowany do .css
*   gulp-jshint – pozwala zautomatyzować sprawdzanie jakości kodu przez narzędzie JSHint
*   gulp-jasmine – uruchamia Jasmine, framework do testowania kodu JS

 

**Podsumowanie:**

Istnieje bardzo duża ilość pluginów do Gulp i zaprezentowałem tylko kilka z nich. Zachęcam więc do szukania i używania kolejnych, ponieważ bardzo szybko pomagają one rozwiązywać problemy i automatyzować naszą pracę.

Gulp jest bardzo potężnym narzędziem i jego użycie może mocno uprościć pracę nad Waszym projektem webowym. Znam nawet osoby, które używają Gulp przy budowaniu projektów C# (gulp-msbuild). Jednocześnie trzeba mieć świadomość, że jest to narzędzie, które posiada swoje ograniczenia i przy pewnej klasie problemów (np. olbrzymia liczba przetwarzanych plików, zaawansowane operacje na grafice) warto spojrzeć w stronę bardziej wydajnych narzędzi. Jednak do większości potrzeb Gulp się nadaje idealnie i jego wdrożenie w projekcie daje nam wymierne korzyści. Polecam każdemu zapoznać się z tym narzędziem.

A więc:
npm install gulp
:)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Jak-usprawnic-prace-w-ASPNET-przy-wykorzystaniu-Gulpa "") - <time datetime="2016-02-16 09:56:38">Feb 2, 2016</time>

**Jak usprawnić pracę w ASP.NET przy wykorzystaniu Gulpa?**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
#### 
[Wojciech Walczak](http://www.brainfucker.pl/ "wojtek@brainfucker.pl") - <time datetime="2016-02-17 09:34:00">Feb 3, 2016</time>

Nie wiem jak z ASP, ale przy innych technologiach świetnie sprawdza się gulp watch + browsersync :)
#### 
[Jakub Gutkowski](http://blog.gutek.pl/ "j.gutkowski@gmail.com") - <time datetime="2016-02-17 10:51:00">Feb 3, 2016</time>

przy ASP nie trzeba bylo robić watcha i browsersynca, ale przy ASP.NET już tak ;)

ale dopiero przy ASP.NET Core widać co to moze dac i jak to dziala w pelni z automatyzowanym system:
- kompilacji
- pre-processingu (coffee, sass, less itp itd)
- odswiezenia przegladarki
- resync z workspace od Chrome

Bo przy samym ASP.NET to mala porazka :) nie da sie za duzo i to co sie daje tez ma swoje ograniczenie do bugow runnera gulpa po stronie VS, a jest ich troche.
