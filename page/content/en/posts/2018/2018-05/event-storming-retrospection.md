---
title: 'Event Storming - retrospection'
url: '/2018/05/24/event-storming-retrospection/'
date: Thu, 24 May 2018 22:21:45 +0000
draft: false
images: ['images/2018/05/eventstorming.logo_.png']
description: "My thoughts and advice after Event Storming workshop, from a facilitator's point of view."
category: 'Event Storming'
tags: ['domain driven design', 'event storming']
---

[Event Storming](https://en.wikipedia.org/wiki/Event_storming) is a workshop which makes it easier to understand business domain and to translate it into an architecture of the application. It was first described by Alberto Brandolini in his [blog post](https://ziobrando.blogspot.com/2013/11/introducing-event-storming.html), in November 2013. I won't elaborate on what it is and how to conduct this workshop - there are plenty of materials on the Internet. You can read this [article](https://blog.redelastic.com/corporate-arts-crafts-modelling-reactive-systems-with-event-storming-73c6236f5dd7), watch this [video](https://skillsmatter.com/skillscasts/9507-dddx-bytes) or read a short [book ](http://eventstorming.com/)about ES. In this article, I would like to describe my first experience as a facilitator of this workshop and to share some feelings as well as some advice.

We started our Event Storming workshop based on the existing system. This system has a typical mix of business responsibilities, complicated calculations running every HTTP call, which have a negative impact on performance, abstruse business rules imposing themselves in too many places in the system. In a word - monolith 😉

The workshop's aim was to **split monolith into business subdomain** - have a greater view on understanding how these subdomains affect one another. Having this knowledge, we wanted to think it over and to come up with some ideas of how to split our system into particular modules / bounded context. In the end, we’ve made it – we’ve accomplished this goal. Part of the result below:

[![](/images/2018/05/DdfVYTgUwAIjlCv.jpg)](/images/2018/05/DdfVYTgUwAIjlCv.jpg)

Unfortunately, our system is enormous so we haven't managed to split it completely. However, we went through the main use-case, which causes various problems and spans across the whole system. It resulted in many different subdomains which encapsulate business logic cohesively and communicate by clear, definite patterns. Such knowledge allowed our architect team to start working on a plan how to split the application into business modules. **We were astonished** **how great understanding we gained in such short time**. Spending 8 hours together in front of a wall, with many different sticky cards, helped us visualize business logic and figure out how it affects each other. We wouldn't get this much value just with sitting at the table and arguing ourselves about proposed modules.

Now, I would like to share some of my thoughts and advice (mostly for my next workshop 😉):

**Thoughts:**

 *   Our domain was so big that it took us 1.5 hours just to put down all the events. That’s quite much, but without that, it would’ve been hard to split it into smaller parts and to focus on the most important aspects.
 *   After 4-hour workshops, people realized that it was too much for one day and on the next day we continued with Reverse Narrative. Generally, it turned out to be a two-day workshop with 4 hours spent every day. It would be difficult to spend more time in a single day because your mind suddenly gives up and stops working.
 *   We combined Reverse Narrative and Process Modeling to save some time. Additionally, we ignored those subdomains which weren't problematic / connected with the main use-case.
 *   Read models / data containers had already appeared at the Enforce Timeline stage - people wanted to highlight that particular event creates / modifies some data containers. Later on, this container turned out to become another subdomain with its own events and processes.
 *   In turn, processes appeared quite late and people weren't so willing to use them. For the participants it was clear that there were some interactions between the events and they didn’t always find it necessary to write it down.
 *   These last two issues could result from a larger granulation of events, which was caused by a sufficient amount of time to define them all. As a result, we didn't create aggregates and we focused only on general data containers, which still gave us a greater understanding of our system.

**Advice:**

 *   Book your meals earlier - the best idea would be to do it the day before to be sure that it will arrive on time.
 *   Leave more space between the events - at the beginning, we put them really close to one another, and later on, we had to separate them.
    
     *   It wasn't such a big problem since we did it during Reverse Narrative.
    
 *   When you are running out of time, try to combine stages - during Reverse Narrative people started noticing down personas / processes / commands / read-models.
 *   Place an instruction board just right to your event wall.
    
     *   We had one big board behind us, so it was quite hard to look at it while focusing on the event wall. A small one would be more convenient.
    
 *   Timeboxes - at the beginning it's good to inform participants about the stages and breaks between them
    
     *   Alberto says that you shouldn't share too many details, but, on the other hand, people don't know how long it will take and it makes them feel uncomfortable
     *   Even the short mentioning that workshops have different stages makes participants focus more on finishing the particular part in order to have a break
    
 *   When your application is tough enough it's better to divide workshops into 2-3 days
    
     *   The workshop is mentally exhausting and after 4-5 hours people are drifting away
     *   It will let attendances"sleep on the problem" and approach it with a fresh mind  on the next day
    
 *   Keep the consistency - it is crucial to focus on the workshop
    
     *   People even asked me why arrows are drawn in a different color, or whether  it means something else
    
 *   Mark your cups with cards 😀
    
     *   We lost the track of whose each cup was
    

And most importantly - **prepare for inner chaos**, both inside yourself as well as inside the participants’ minds. At the beginning, you don't know what this workshop will result in. As the situation evolves, you need to react accordingly and instead of following the textbook example - people are different, the reasons of why you conduct this workshop are different and the target which you are trying to reach is different. Having a well-established system, you need to prepare and run Event Storming differently than running it with startup. Keep your head up and try to find the best way to sort out the situation.

However, one way or another, **Event Storming will give you a great amount of insight about your business domain**. It's worth doing it, both at the beginning of the project and while developing it when you need to make some major changes. And it's really easy, the only thing you need is to have sticky notes, markers, a wall and the people with a knowledge of the domain. Then magic happens  😉