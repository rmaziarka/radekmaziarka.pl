---
title: 'Wordpress to Hugo – why and how'
url: '/2020/03/14/wordpress-to-hugo-why-and-how/'
date: Sat, 14 Mar 2020 15:08:42 +0000
draft: false
images: ['images/2020/03/way-918900_1280.jpg']
description: "My first post on a journey how to migrate your Wordpress blog to Hugo static site generator."
category: 'Hugo migration'
tags: ['hugo', 'wordpress']
---

A few weeks ago, I began my journey to migrate an existing blog from Wordpress to Hugo. I waited for that moment for a long time, and finally, it got me. This post will be a first of in a series of many about moving to Hugo.

There were several points why I decided to undertake such an activity:

 *   Wordpress is extremely slow and pages take seconds to load
 *   Even when I have cache plugins I can’t lower the load time
 *   Plugins have issues and sometimes works in contrary to each other
 *   A few months ago a backup plugin, when upgraded, made my whole page crash
 *   Making changes to the theme was very counterintuitive and timeconsuming
 *   Debugging Wordpress is extremely difficult
 *   Wordpress offered multiple options that exceed needs for a simple personal page and constrained these which were essential for me

After these years I perceive **Wordpress as a gateway drug** – it is easy to start but maintaining this system makes a lot of pain to you. Therefore I decided to switch into a more adjusted option to my needs.

## Static site generator

My eyes turned to the more basic option to create the page – static site. Because the blog is a package of defined pages there is no need for adding a dynamicity there. Therefore, a site generator can be used to create HTML content that I will provide to the end readers. Static site generators are not a new thing (interesting article in [Smashing Magazine](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/) from 2015), but only a few choose them as a default option, typically preferring Wordpress.

From my perspective there are meaningful advantages to use such a generator for creating a personal page:

 *   Performance – your site is delivered from a pre-rendered HTML therefore there is no need for any backend actions.
 *   Improved SEO – with performance boost you get better discoverability and accessibility for your readers.
 *   Reliability – you provide static files and nothing more. It means that the almost whole site can be stored on CDN. Fewer points that may fail and crash your server.
 *   Security – static site lowers the attack vectors because there aren’t many options to hack.
 *   Version control – your whole page can be stored in Git and tracked accordingly.
 *   Testing – it is much easier to set up a testing environment and test before pushing changes into the production site.

There are obvious [disadvantages](https://www.sitepoint.com/7-reasons-not-use-static-site-generator/) of such a static site generator, but from my perspective, they are not applicable in this context.

## Hugo

![](https://d33wubrfki0l68.cloudfront.net/c38c7334cc3f23585738e40334284fddcaf03d5e/2e17c/images/hugo-logo-wide.svg)

There are multiple static site generators over the web: [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [Gatsby](https://www.gatsbyjs.org/), [Next.JS](https://nextjs.org/) to name a few. All of them have different options and you need to choose your pick wisely. I decided to pick Hugo because of:

 *   Native support for MD files – I want my posts to be programming language independent.
 *   Build time – creating a site is extremely fast, even when I change 500 files at the same time (MD files generator).
 *   Different taxonomies – Hugo doesn’t constraints you in terms of categories / tags / others. You define them and use whatever you like.
 *   Simple structure - from the very beginning I can be productive and adapt the page to my needs. [Documentation](https://gohugo.io/documentation/) is very helpful.
 *   Support for internationalization – the multi-language site is straightforward and doesn’t require to make a significant change to your posts.
 *   Written in Go – I wanted to learn Go for a long time and it is an opportunity to start that journey.
 *   Continuous deployment – there are plenty of materials on how to connect Hugo to your beloved CI/CD pipeline.

It can differ from your perspective, so check different generators and find most appropriate to your situation.

## A plan for a migration

It is an easy thing to start a page based on a static site generator. When you have over 100 posts, pages, used different plugins and taxonomies things start to get complicated. Therefore, I divided my migration into a multiple-step to track the progress:

 *   Transform posts and pages to MD files with images and taxonomies
 *   Theme improvements – menus / code highlighting / multilanguage
 *   Infrastructure - Setting up test / prod environment with Terraform on Azure
 *   CI/CD – pipeline in Azure DevOps which uses GitHub triggers
 *   Server-side functionalities – Disqus comments and Logic Apps contact form
 *   Redirection - move DNS traffic from the current provider to Azure and handle previous page url

Wish me luck and wait for the next posts in this series 😉