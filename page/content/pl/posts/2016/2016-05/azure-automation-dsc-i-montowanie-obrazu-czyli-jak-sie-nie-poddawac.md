---
title: 'Azure Automation DSC i montowanie obrazu czyli jak się nie poddawać'
url: '/2016/05/12/azure-automation-dsc-i-montowanie-obrazu-czyli-jak-sie-nie-poddawac/'
date: Thu, 12 May 2016 19:17:51 +0000
draft: false
featured_image: 'images/2016/05/996635-cloud.jpg'
category: 'Powershell'
tags: ['AzureDSC', 'Powershell']
---

Każdy z nas miał taką sytuację: tworzymy sobie nasze rozwiązanie i nagle natrafiamy na nietypowy problem. Zaczyna się debugging i próbujemy odkryć, co powoduje błąd. Powstają różne work-aroundy, podchodzi się do problemu z różnych stron i nic. Minuta za minutą, godzina za godziną dochodzimy do coraz większej furii, a nie posuwamy się ani o krok. Aż w końcu natrafiamy na takie wyjście z problemu, że nas ścina z nóg. To jest właśnie taka opowieść ;)

Zanim jeszcze przejdę do faktycznego opisu, muszę się pożalić na chmurę Azure. Po pierwsze, dramatycznie długo wykonują się tam wszystkie operacje. Stworzenie wirtualnych maszyn trwa tak długo, że można sobie spokojnie wyjść na kawę do kuchni, wypić, pójść z powrotem po herbatę, zaparzyć, odczekać aż wystygnie i po powrocie możliwe, że maszyna zostanie utworzona. Co więcej, zmiany w **skryptach konfiguracji** wymagają usunięcia ich z poziomu portalu Azure; w przeciwnym wypadku możemy zmieniać skrypty a i tak nic się nie stanie - **Azure cachuje skrypty** i nie nadpisuje ich nowymi. Takie szczegóły sprawiają, że jakakolwiek praca przy automatyzacji Azure jest niesamowicie skomplikowana i denerwująca.

Ale wracając do tematu. Zaczęło się niewinnie - kolega organizował automatyczne tworzenie architektury projektu przez [**Azure Automation DSC**](https://azure.microsoft.com/pl-pl/documentation/articles/automation-dsc-overview/). Na maszynie wirtualnej trzeba było zainstalować SQL server z pliku ISO. Po zamontowaniu obrazu powinna rozpocząć się instalacja. **Powinna**. Krok uruchamiający instalację nie znajdował plików pod adresem dysku, mimo że dysk był widoczny jako zamontowany. Po walce z problemem kolega przekazał mi ten błąd.

Zacząłem od przejrzenia logów na maszynie wirtualnej, ale nie trafiłem tam na nic istotnego. Co jest dodatkowo denerwujące, logi wypisywane w Visual Studio są częściowo okrojone i wypisuje się tam tylko część błędów. O części nie dowiemy się, dopóki nie zalogujemy się do wirtualnej maszyny i wejdziemy do **folderu Azure DSC**. Z poziomu Visual Studio możemy dostać tylko informację, że wystąpił błąd, ale żadnej szerszej informacji. Kolejny bowdown dla Microsoftu, ile czasu nam to zajęło by do tego dojść...

Debugging rozpocząłem od najprostszej rzeczy - może montowanie jeszcze trwa, a pomimo tego instalator już zostaje uruchomiony. Rozpoczęło się hakowanie instalacji przez wstawianie timeoutów. Najpierw przez standardowe zmiany i deploy, ale z powodu dramatycznego czasu trwania deploy'a musiałem się przerzucić na edycje skompilowanych plików [**MOF**](https://azure.microsoft.com/pl-pl/documentation/articles/automation-dsc-overview/). Orka po ugorze. I do tego dalej nic. Wchodząc na maszynę wirtualną widzę, że obraz jest zamontowany, a mimo to instalator zgłasza błąd. Na konsoli widać kolejne komunikaty o czekaniu na pojawienie się obrazu, który już dawno jest zamontowany.

Pojawił się pomysł, że użytkownik uruchamiający skrypt jest nieprawidłowy- nie ma **dostępu do zasobów**. Niestety lub stety, mój kolega dobrze zadbał o odpowiedniego użytkownika i posiadał on wszystkie prawa do uruchomienia tych skryptów, więc to był ślepy punkt. Ale na pewno warty sprawdzenia.

Moje zainteresowanie przeszło na skrypt montujący i komendę **xMountImage**. Przeszukałem Internet, by znaleźć jakąś wskazówkę, co mogło pójść nie tak z nią, ale porady odnośnie tej metody są szczątkowe. Wykorzystywanie Azure DSC jest tak małe, że pomoc dla tego obszaru praktycznie nie istnieje.

Na szczęście skrypty powershellowe DSC są otwarte, więc postanowiłem zbadać co tam w środku siedzi. I to był strzał w dziesiątkę. Metoda xMountImage wykorzystuje domyślną metodę powershella **Mount-DiskImage**. Sprawdziłem jej wywołanie, ale nie było się do czego przyczepić. Postanowiłem więc sprawdzić co o tej metodzie mówi Internet. I gdzieś na 3 stronie, już tracąc nadzieję, natrafiłem na tego [posta](https://techstronghold.com/blogs/scripting/powershell-tip-how-to-immediately-access-new-disk-after-mount-mount-vhd-mount-diskimage). Jest tam opis naszego problemu:

> The issue is related to Windows PowerShell Drives (PSDrive) that were not refreshed yet. You can wait (a bad idea in the script) or you can refresh them immediately after command that mounted drive:
> 
> **Get-PSDrive | Out-Null**

Uruchomienie takiej komendy po zamontowaniu sprawia, że dysk jest widoczny w kolejnych skryptach i wszystko działa prawidłowo. Nie za bardzo rozumiem, dlaczego to się nie aktualizuje automatycznie po zamontowaniu obrazu - na pierwszy rzut oka powinno. W każdym razie problem został rozwiązany i nasze skrypty odpowiedzialne za deploy poprawnie instalują SQL Server.

Z tej całej historii jest jeden wniosek ;)
![Stop giving up!](https://i.ytimg.com/vi/7p8KjSEPtxI/maxresdefault.jpg)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Azure-Automation-DSC-i-montowanie-obrazu-czyli-jak-sie-nie-poddawac-RadBlog "") - <time datetime="2016-05-12 20:20:37">May 4, 2016</time>

**Azure Automation DSC i montowanie obrazu czyli jak się nie poddawać | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
