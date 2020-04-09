---
title: 'Entity-Attribute-Value fallacy'
url: '/2018/10/26/entity-attribute-value-fallacy/'
date: Fri, 26 Oct 2018 10:26:29 +0000
draft: false
featured_image: 'images/2018/10/buildings-690696_960_720.jpg'
category: 'Design patterns'
tags: ['ddd', 'domain driven design']
---

> "EAV fallacy" - assumption, that you can model complex problem with an Entity-Attribute-Value solution

I've been involved in a few projects which tried to use the similar [EAV structure](https://en.wikipedia.org/wiki/Entity%E2%80%93attribute%E2%80%93value_model) ([SQL](https://www.researchgate.net/figure/The-Main-Concept-of-the-Entity-Attribute-Value-Model-The-entity-attribute-value-serves_fig2_257884193) or [JSON replacement](https://coussej.github.io/2016/01/14/Replacing-EAV-with-JSONB-in-PostgreSQL/)) to embrace difficult logic inside of the system. Mostly because we wanted to handle "unknown need" from a business perspective. For example, we wanted to use a similar structure for modeling:

 *   Apartment
 *   Restaurant
 *   Car
 *   Bike

etc. The client naturally couldn't predict all the future possible uses of the application. So the best option to prevent from the rebuilding it was to add dynamic structure. With entities and entities types, like the above ones.

On paper, it would allow us to use this structure to map new requirement in the same application. We wouldn't need to think about changing schema - only to add a new entity type to our application. The application could work without any code change or deployment.

**On paper / in reality**
-------------------------

There is this [presentation](https://www.youtube.com/watch?v=n-hTQro_yos) on DDD Europe where Avraham Poupko talks about different perspectives on software modeling. He says that:

"_The c__omplexity does not lie in relationships between objects._ _The complexity lies in:_

 *   _Why there is a relationship?_
 *   _Why it the domain the way it is?_
 *   _What objectives does the domain want to achieve?"_

and it is very applicable to our solution.

Use of EAV model hides all purpose from an entity to its attributes. We can model data ownership. We cannot model entity behavior, how it acts and relates to its parts.

It's not a problem when we use such dynamic structure just to show data on the page (e.g. Wordpress does with its [dynamic posts types](https://codex.wordpress.org/Post_Types#Custom_Post_Types)). It is an enormous problem when we want to handle additional business logic in this kind of structure.

example?
--------

Let's assume that you can rent a Car, Bike and Apartment entities, but not Restaurant entity. You need to handle this logic somewhere in the application. But your entities are dynamic, so you need to create an additional column like _IsRentable_ and add it to _EntityType_. And implement handling this restriction in your application.

Then you find out that you rent your Car and Bike entities differently than Apartment entity - you need to add some additional fields in the UI form to provide information needed for settling legal formalities. So how to show it dynamically? Another dynamic structure to handle this situation like _RentFormField, RentFormFieldConfiguration _etc. with dynamic form generation mechanism.

After it, you want to review your rent. And more variations. You can review only one parameter in Bike entity, but multiple in Car entity, like condition, cleanness, customer service. So _RentReviewField, RentReviewFieldValue _and views generators for every case.

And so on and so forth... Dynamic structure spreads like cancer.

PERFORMANCE
-----------

This solution has even more damaging drawback - performance. This works only with a small set of data. And completely collapses when data sets reach numbers of millions or more.

You cannot achieve sufficient response time with querying this structure when you want, for example, get cars' average customer service ratings in last week. It requires to go through this deep and complicated architecture to bring out single value and then process it.

Achieving proper performance in such dynamic structure requires to create dynamically read model structure with proper data gathering from the EAV data model. Creating a mechanism to do it on demand, during adding new entity type, is a challenge which I've never seen to been accomplished. You would need to automatically use almost all services from data & analytics stack of your environment (e.g. [Azure](https://azure.microsoft.com/en-us/overview/data-platform/))

Fallacy
-------

The fallacy is that you can model complex business models with such solution. You cannot. [Complex problems](https://en.wikipedia.org/wiki/Cynefin_framework) require complex solutions. You cannot jump over it. It will kick you back when you'll try to handle it the easy way. And EAV is the easiest way. So it doubles the kick.

From software perspective models always reduces the complexity of a problem to some proper extent. But if you reduce it over a point, your model won't be able to handle all needed requirements. So the logic will leak which leads to accidental complexity - not the problem's one but the solution's one.

You add complexity to your solution, not reduce it, by using EAV in not trivial problems. In other words, [EAV gives you enough rope to hang yourself.](https://softwareengineering.stackexchange.com/questions/93124/eav-is-it-really-bad-in-all-scenarios/93137#93137)

---
### Comments:
#### 
[dotnetomaniak.pl](https://dotnetomaniak.pl/Entity-Attribute-Value-fallacy-Radek-Maziarka "") - <time datetime="2018-10-26 16:15:29">Oct 5, 2018</time>

**Entity-Attribute-Value fallacy | Radek Maziarka**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
