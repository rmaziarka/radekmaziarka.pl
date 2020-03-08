---
title: 'Train riding and temporal model'
slug: '/2017/05/01/train-riding-and-temporal-model/'
date: Mon, 01 May 2017 10:30:55 +0000
draft: false
featured_image: 'images/2017/05/6276604857_f96c7858d7_b.jpg'
category: 'Design patterns'
tags: ['']
---


#### 
[Roman Eremin]( "roman.eremin@gmail.com") - <time datetime="2017-05-02 18:50:00">May 2, 2017</time>

Aggregate boundaries is not only about concurrency. It is about constistency. Meaning it should be able to accept or reject a command based on its state. So if booking is about seats - the minimal aggregate is the seat - you won't have extraordinary amount of requrests per particular seat at any given moment, and it is very easy to see if this seat is already booked.
<hr />
