---
title: 'Serverless – Local environment [2]'
slug: '/2017/07/14/serverless-local-environment-2/'
date: Fri, 14 Jul 2017 14:20:55 +0000
draft: false
featured_image: 'images/2017/07/benjamin-child-19747.jpg'
category: 'Serverless'
tags: ['']
---

_This post is one in the cycle of posts related to serverless topic. To check all of them go to [serverless category](/category/serverless/)._

Why functions in Javascript?
----------------------------

For my client I decided to launch 3 functionalities in Azure Functions, written in Javascript language. At the beginning it was simpler for me to write function code in untyped language, where you can easily create structures and not concern about classes. That's why my tutorial won't describe how to start local environment and run functions in .NET languages, but you can follow tutorials described in Microsoft's [documentation](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs).

I undestand that at some point you need to lean on languages like Typescript or C# to write better codebase but for my cases it wasn't required.

Quick start
-----------

At the beginning I had to **install package** which allows to run Azure Function locally:

```npm i -g azure-functions-core-tools```

And you will see that required packages will be installed:

```C:\\Users\\Radosław\\AppData\\Roaming\\npm\\azurefunctions - C:\\Users\\Radosław\\AppData\\Roaming\\npm\\node\_modules\\azure-functions-core-tools\\lib\\main.js
C:\\Users\\Radosław\\AppData\\Roaming\\npm\\func - C:\\Users\\Radosław\\AppData\\Roaming\\npm\\node\_modules\\azure-functions-core-tools\\lib\\main.js
C:\\Users\\Radosław\\AppData\\Roaming\\npm\\azfun - C:\\Users\\Radosław\\AppData\\Roaming\\npm\\node\_modules\\azure-functions-core-tools\\lib\\main.js
C:\\Users\\Radosław\\AppData\\Roaming\\npm
\`-- azure-functions-core-tools@1.0.0-beta.100```

In that point these commands **should** run Azure Functions CLI:

 *   func
 *   azfun
 *   azurefunctions

Resolving packages error
------------------------

And of course they didn't run this CLI. I got such error:

```$ func
 module.js:442
 throw err;
 ^

Error: Cannot find module 'C:\\Program Files\\Git\\node\_modules\\azure-functions-core-tools\\lib\\main.js'
at Function.Module.\_resolveFilename (module.js:440:15)
at Function.Module.\_load (module.js:388:25)
at Module.runMain (module.js:575:10)
at run (node.js:348:7)
at startup (node.js:140:9)
at node.js:463:3```

Console is trying to find Azure Function's modules in Git folder. Why? I couldn't find explanation of this behavior. I tried running function CLI from Console / Bash / Powershell and they all resulted with the same failure.

So I omitted this problem with creating linking from node modules to Git workplace. And it solved the problem:

```C:\\Program Files\\Git: mklink /D node\_modules %USERPROFILE%\\AppData\\Roaming\\npm\\node\_modules```

I know that this is a workaround but it's better than nothing. If you know how to solve this problem properly please write a comment at the bottom of this post :)

Beware the antiviruses
----------------------

I thought that after this fix my functions will work without any problems but I was wrong. I was trying to run function CLI by simply typing **func**. And nothing happened - literally nothing. Like empty function called, no output in console, just new line to type command.

I decided to check file **main.js **in azure-function-core-tools package folder, because it was runned by console. I debugged it by adding few console.log() commands, and found out that **func.exe** process is runned but it was automatically closed. Few more minutes and I catched responsible process.

My **Comodo Antivirus** was closing func.exe just after started running due. It was caused by calling func.exe from the inside of a other process - npm. Comodo calculated this behavior as so risky that it couldn't be allowed. But what is most frustrating - Comodo didn't prompted me any information about it, just was closing it silently. To resolve this case I had to disable func.exe from sandboxing, as written [here](https://help.comodo.com/topic-72-1-623-7666-.html).

Simple scenario
---------------

At the beginning I wanted to try, whether a straightforward scenario, about connection to blob storage, will work. First I needed to add **function project**:

```func init Functions```

Which resulted with:

```Writing .gitignore
Writing host.json
Writing local.settings.json
Created launch.json
Initialized empty Git repository in C:/Users/rmaziarka/documents/Projects/Functions/.git/```

Then I moved to created folder and used a **template** provided by Azure Functions CLI:

```func new --language JavaScript --template BlobTrigger -name BlobTriggerJS```

It created a function in my project's folder:

```Select a language: JavaScript
Select a template: BlobTrigger
Function name: [BlobTriggerJS] 
Writing C:\\Users\\rmaziarka\\Documents\\Projects\\BlobTriggerJS\\index.js
Writing C:\\Users\\rmaziarka\\Documents\\Projects\\BlobTriggerJS\\readme.md
Writing C:\\Users\\rmaziarka\\Documents\\Projects\\BlobTriggerJS\\sample.dat
Writing C:\\Users\\rmaziarka\\Documents\\Projects\\BlobTriggerJS\\function.json```

Moreover I had to specify which **storage account** I wanted to use:

```func settings add AzureWebJobsStorage UseDevelopmentStorage=true```

This variable was set in **local.settings.json **\- in this file you can specify local parameters of your functions:

[javascript]{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  },
  "ConnectionStrings": {}
}[/javascript]

By default function will attach to blob storage named **samples-workitems**. You can change it in **function.json** file.

To be completely sure that my solution is worth something I **runned** my function:

```func host start```

You can check how it works (clik to open):

[![](/images/2017/07/rT0NWJa.gif)](/images/2017/07/rT0NWJa.gif)

Besides the initial problems - creating local functions is that simple ;)

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Serverless-Local-environment-2-RadBlog "") - <time datetime="2017-07-16 20:03:28">Jul 0, 2017</time>

**Serverless – Local environment \[2\] | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
