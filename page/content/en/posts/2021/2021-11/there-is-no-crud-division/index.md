---
title: "There is no CRUD division"
url: '/2021/11/19/there-is-no-crud-division/'
date: Fri, 19 Nov 2021 11:58:01 +0000
draft: true
images: ['images/2019/02/acropolis-2725918_960_720.jpg']
description: ""
category: 'Other'
tags: ['']
---

This is an obvious reference to the
[There Is No Antimemetics Division](https://www.goodreads.com/en/book/show/54870256) book, but I couldn't resist it ;) (btw it is very good if you like semi-sf stories)

I want to highlight that in a usual bigger system (just bigger, not a really big one) there are no strict CRUD subdomains / components. There are obviously simpler ones which require less thinking, and complex ones. But there is no CRUD as simple Create / Read / Update / Delete. You will always need to apply some analysis and work around it.

Let's go through typical E-commerce domain to get the idea. For each CRUD word I will ask several question to show that answers are not that simple. Then you can adjust this mindset to your own domain.

## Create
You could think that this case is a simple one - shouldn't you always be able to create something? You are almost right, but sometimes reality is tricky.

The obvious case is that some business objects could be unique by their name. Like categories or tags, for SEO reasons. You would need to validate it against db to handle duplicates.

But please do not forget that in 90% of cases we don't remove entries from database - we use soft delete. So the question is if we can create a new category with the same name as deleted one?

When we allow our clients to create business object creation becomes complex. Should you validate if product name is not explicit? If it visible on our website, you are recommended not to automatically list it. But then also product pictures should be validated as well.

Created addresses are validated nowadays against actual address from a country location and post agencies. But what is we want to add data before the change - street name was changed, postcode is no longer in use. Should we accept invalid address or disregard it?

What about limits in creation? Our potential SaaS could limit number of products per client or flatten the category tree. And do not even start thinking about authorization rules. Usually you have admins / managers / employees etc with separated rules of behavior.

Read
Problems with more complicated views like categories and all assigned products. 

What kind of products you should take into consideration - all / not hidden / in sale / with price.

Update 
Change a name of product - should it be changed as well in finished order? Probably not. But what about products in basket? Is the same applies for the product description? What if we change something important from the customer perspective - he thought about X buying product, and then we changed during ordering process. Is it still a same product?

Connected question is how quickly it should be visible on page. From a business perspective changing description when people buying the product is at least not ethical. In particular countries even illegal. We should be able to postpone the change from actually happening. Even from technical point of view is not that easy. We could use a different read db for a full text search. It takes some time to move data there so at least some info should be showed about eventual consistency.

Delete
You cannot delete a category with assigned product - how to validate if. What if product is disabled, does it count?

You can delete category with assigned product - how to deal with it?

Of course, you have a thing called soft dwlete

## Problem statement
Let's look at it more broadly. It can help us if we introduce a quote from Donella Meadows (author of [Thinking in Systems](https://www.goodreads.com/book/show/3828902-thinking-in-systems))

> “A system is an interconnected set of elements that is coherently organized in a way that achieves something.”

The important word there is **interconnected**. Subdomains / modules cooperate with each other to produce something bigger. [XYZ]

So there is no CRUD division (subdomain / module) - even if it a CRUD, relationships between CRUD and different parts of the system (even with another CRUD) won't be CRUD anymore.