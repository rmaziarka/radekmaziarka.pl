---
title: 'Log2Console - prostsze nasłuchiwanie logów'
slug: '/2016/06/07/log2console-prostsze-nasluchiwanie-logow/'
date: Tue, 07 Jun 2016 18:36:35 +0000
draft: false
category: 'Różne'
tags: ['']
---

Jeśli denerwuje was lokalne przeszukiwanie logów czy ślęczenie z debuggerem by dowiedzieć się czy wasza aplikacja się poprawnie zachowuje, to mam dla was proste rozwiązanie. Polecono mi je jeszcze kilka lat temu i w prosty sposób rozwiązuje moje problemy. [Log2Console](https://log2console.codeplex.com/) ![Log2Console_1](http://radblog.pl/wp-content/uploads/2016/06/Log2Console_1.png) Aplikacja nasłuchuje dany port, na który są rzucane logi z aplikacji. Następnie wypisuje je, kolorując w zależności od poziomu loga. Aby tego dokonać wystarczy jedynie dodać odpowiedni wpis w pliku konfiguracyjnym loggera, by logi leciały także przez UDP. Dla NLoga trzeba dodać nowy target: \[code lang="xml"\] <target xsi:type="NLogViewer" name="viewer" address="udp://127.0.0.1:7071"/> \[/code\] Dla Log4Net należy stworzyć appender i dodać go do roota: \[code lang="xml"\] <appender name="UdpAppender" type="log4net.Appender.UdpAppender"> <remoteAddress value="127.0.0.1" /> <remotePort value="7071" /> <layout type="log4net.Layout.XmlLayoutSchemaLog4j" /> </appender> <root> <priority value="INFO" /> <appender-ref ref="UdpAppender" /> </root> \[/code\] Następnie w Log2Console ustawiamy odpowiedni Receiver (w przykładach UDP). Dzięki temu, każdy nowy log pojawi się już na konsoli. Pozwala to szybko sprawdzić co poszło nie tak, bez uruchamiania debuggera czy szukania logów. Niby nic, a jednak oszczędza czas. Polecam.