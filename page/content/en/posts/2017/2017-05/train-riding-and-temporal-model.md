---
title: 'Train riding and temporal model'
url: '/2017/05/01/train-riding-and-temporal-model/'
aliases: ['/en/2017/05/01/train-riding-and-temporal-model/']
date: Mon, 01 May 2017 10:30:55 +0000
draft: false
images: ['images/2017/05/6276604857_f96c7858d7_b.jpg']
category: 'Design patterns'
tags: ['']
---

Post is based on Szymon \`Scooletz\` Kulec post's about temporal model - [http://blog.scooletz.com/2017/05/01/top-domain-model-im-temporal](http://blog.scooletz.com/2017/05/01/top-domain-model-im-temporal)

Riding a train and reading Szymon's post inspired me to write a post, how I would model the domain of **train ticket booking**.

Topic is similar - first thought about train ticket reservation would be to **model train's ride as aggregate**. But then multiple requests would modify the same aggregate and it would cause queueing the requests and which could result with **timeouts and lost orders**. Moreover we need to remember that person who bought the ticket would like not to change his/her place every station - when seated it need to stay there from start to end of drive. We cannot just find first free place in train and book it.

So let's assume that we have a ride from city A to city E, looking like: A -> B -> C -> D -> E with 120 places. My model **TrainRidePart** would contain start city (A), end city (B) and place (1). One booking would contain multiple parts - from A -> D would have 3 parts. 

In that case reservation **would only concern about relevant places**, not the whole train. People, who would book ride in the same train, but in different places or from / to different cities wouldn't interfer each other.

This solution would allow to concurrent booking and to throw errors only if two people make reservation on the same place at the same time. We would gain **better scalability** of our system and less problems for our customers.

What do you think about this idea?

---
### Comments:
#### 
[Roman Eremin]( "roman.eremin@gmail.com") - <time datetime="2017-05-02 18:50:00">May 2, 2017</time>

Aggregate boundaries is not only about concurrency. It is about constistency. Meaning it should be able to accept or reject a command based on its state. So if booking is about seats - the minimal aggregate is the seat - you won't have extraordinary amount of requrests per particular seat at any given moment, and it is very easy to see if this seat is already booked.
