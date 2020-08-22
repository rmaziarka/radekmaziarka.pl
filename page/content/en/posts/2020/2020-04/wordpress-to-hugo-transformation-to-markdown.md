---
title: 'Wordpress to Hugo – transformation to markdown'
url: '/2020/04/12/wordpress-to-hugo-transformation-to-markdown/'
aliases: ['/en/2020/04/12/wordpress-to-hugo-transformation-to-markdown/']
date: Sun, 12 Apr 2020 20:17:03 +0000
draft: false
images: ['images/2020/03/way-918900_1280.jpg']
category: 'Hugo migration'
tags: ['']
---

My previous post covered the topic of why I decided to move my blog to Hugo. Now it’s time to get dirty – to start working on generating [markdown](https://en.wikipedia.org/wiki/Markdown) documents based on the existing Wordpress posts and pages.

## How to start?

It’s easier to think about it than actually start moving your data. There are multiple [migration tools](https://gohugo.io/tools/migrations/) suggested on the Hugo site but unfortunately, none of them will work like a magic wand. When you have:

 *   multilanguage page
 *   multiple different plugins installed (two different ones just for code formatting, don’t ask me why)
 *   the blog changed address during its life
 *   you weren’t consistent with the styling
 *   you want to move your images as well

you will get a lot of different edge cases to cover. And no tool will support it. So, unfortunately, you must write your own scripts to migrate it.

Luckily, there is a great Palani Raja [repo](https://github.com/palaniraja/blog2md) on GitHub with a basic converter from Wordpress XML files to markdown documents. It works with the [turndown](https://github.com/domchristie/turndown) library which produces markdown files. These scripts can be your beginning template.

## Migration script rules

[![](/images/2020/04/internet-rules.jpg)](/images/2020/04/internet-rules.jpg)

**Rule number one** with a migration script is not to make it beautiful and perfect. It is tempting to focus on the naming, good practices, reusability – it’s an easy trap. What is really important is to get the work done. You don’t need any separation of concerns, different files per function in class, etc. Every hack which makes you closer to the target is a hack worth taking.

**Rule number two** is not to try improving everything with a single sitting. You will be overwhelmed by the number of problems. It’s much better to run the first migration, then list all the mistakes and inconsistencies and then fix them one by one.

**Rule number three** is to use GIT with markdown files from the very beginning. There is a high chance that fixes for one problem will create another in a different place. Without change tracking, you won’t spot it early and you will multiply the number of mistakes. Find a problem, fix it, commit, repeat the cycle.

## My migration script

The script is available on my [GitHub](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd), but it needs a proper explanation.

### Basics

The script to run requires 3 different files: **media.xml** / **posts.xml** / **pages.xml**. These are [basic files](https://wordpress.org/support/article/tools-export-screen/) that you can generate from your Wordpress and they contain all information regarding data required to leave the old blog.

Besides that, it needs to have all images downloaded from your hosting. I stored them in **/uploads** folder.

The main function is [wordpressImport](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L44). It starts with reading information about images and handing them moving to proper folders. Then it iterates through posts and pages to create markdown files.

### Images

Function [handleImagesXML](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L83) is responsible for moving images. First, it [retrieves paths](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L63) by removing domain names from the URLs (in XML they are stored as an absolute path) and creating destination folder paths. Then it copies all files to their proper locations. [myMkdirSync](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L29) function is used (here and later) to make sure to create a folder if it doesn’t exist.

In the end, an [imagesById](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L91) dictionary is filled to simplify finding this image later by its id (it is required for posts / pages featured images).

### Posts and pages

Functions [handlePostsXML](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L95) and [handlePagesXML](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L299) iterates through posts and pages stored in XML files and at the end write them to the destinated folder. The folder structure is defined as:

 *   ‘content’ – default folder with articles
 *   ‘en’ and ‘pl’
 *   ‘posts’ and ‘pages’ – different articles types
 *   year / year-month – for logical separation between posts

### Category / tags / language

Kinda strange thing, but all three are stored in Wordpress as the same category XML node with a different domain tag. To extract it there is an [if statement](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L155) which analyses tag and sets proper values.

Category and tags are written to the markdown files at the [end of processing](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L204), and language is used to add language to the folder path – I use [Translation by content directory](https://gohugo.io/content-management/multilingual/#translation-by-content-directory) option.

### URL management

As a default, Hugo creates a URL address [base on the folder structure](https://gohugo.io/content-management/urls/). I wanted to have structure optimized for maintainability, but it would break existing links to my content. That’s why I used [URLs](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L130) to copy existing addresses to the new posts.

### Featured images

By default, Palani script was not handing featured images. Therefore I had to [set a proper path](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L169) to the image, by previously created imagesById dictionary. You need to find meta field by '_thumbnail_id" key and get its value from 'wp:meta_value' property.

### New lines in markdown

By default, turndown removes empty lines from a text. You end up with a complete disaster in your post appearance. To avoid it I [replaced a line of code](https://github.com/domchristie/turndown/issues/264#issuecomment-511063718) inside the library to turn off this behavior. Dirty hack, but it works.

### Not trailing empty spaces

Another dirty hack. Turndown uses a mechanism to [remove empty spaces](https://github.com/domchristie/turndown/blob/master/src/collapse-whitespace.js). It sounds good, but it breaks formatting from your code samples. So I removed this mechanism by [commenting out an invocation of this function](https://github.com/domchristie/turndown/blob/master/src/root-node.js#L19) in RootNode.

It had a negative consequence because then the list formatting has been broken – there were additional spaces before the ‘\*’ mark. So I had to fix it as well by [additional replacement](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L261).

### Code formatting

Old code formatting relied on the Wordpress plugin with its own markup language. And it had to be changed into markdown ones. To cover all cases I had to write [12 different replacements](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L239).

### Use proper image URLs

Wordpress, on some occasions, doesn’t use your base photos but generates automatically a smaller one. I want to use base ones, so I had to fix [the photo path](https://gist.github.com/rmaziarka/125cc7dcd99035de971a19dd3c1f46cd#file-wordpress-to-hugo-migrator-js-L288).

## End result

[![](/images/2020/04/hugo-files-1.jpg)](/images/2020/04/hugo-files-1.jpg) [![](/images/2020/04/hugo-files-2.jpg)](/images/2020/04/hugo-files-2.jpg)

The script itself can seem brittle, but it does its work and produce repetitive, the desired result with a single ‘node index.js’ run. It could seem slow with all these ‘replaceAll’ methods, but it takes below 1 sec to generate more than 100 files. And Hugo fast reload mechanism handles it immediately.

Currently, I can write new posts on my old blog and, at the same time, work on the new blog. New posts are integrated by downloading a new XML file and running the script. All the cases are covered.

Soon I will publish my repo with all Hugo’s configuration so you could check the overall result.