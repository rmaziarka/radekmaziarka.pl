---
title: 'Serverless – Continous deployment with GIT [3.1]'
slug: '/2017/08/03/continous-deplyment-with-git-3-1/'
date: Thu, 03 Aug 2017 20:59:42 +0000
draft: false
featured_image: 'images/2017/07/benjamin-child-19747.jpg'
category: 'Serverless'
tags: ['']
---

_This post is one in the cycle of posts related to serverless topic. To check all of them go to [serverless category](http://radblog.pl/en/category/serverless/)._

In this part I will show you how easy is to connect our function stored in GIT repository to Azure cloud, with continous deployment after every commit.

Repository and Function App
---------------------------

At the beginning you need to create repository to connect it to remote function app. In this step GIT repository is not fully required - you can connect Azure function to storages like OneDrive or Dropbox but it is easier to show you how the changes occur in our code, when it stays on GitHub (public repo FTW). You can check my code on [https://github.com/rmaziarka/AzureFunctionsPoc](https://github.com/rmaziarka/AzureFunctionsPoc) - this is the same code from previous scenario, only published to GH.

Then you need to create you Function App in Azure portal. Find "function app" and choose parameters:
![](http://radblog.pl/wp-content/uploads/2017/08/chrome_2017-08-02_22-51-00.png)

*   **App name** - Name of group of your functions (in my case Azure-Function-Poc).
*   **Subsciption** - Which subscription will take costs of this Function App.
*   **Resource group** - choose how would you like to group tour resources.
*   **Hosting plan -** You can choose from charging from every Function App or gather it together inside one App Service Plan. I have chosen simple charging.
*   **Storage** - function needs to be storage in some Azure Storage account. We can either create it or use existing one. I create new azurefunctionpoc

You don't need to add Azure Insight. After clicking Create, in a moment you will got your function.

Deployment from GitHub
----------------------

After creation you go inside the function and choose option to setup the deployment: tab Platform features -> CODE DEPLOYMENT section -> Deployment option.

![](http://radblog.pl/wp-content/uploads/2017/08/chrome_2017-08-02_23-07-42.png)

Then you go through Setup, you choose GitHub, authenticate with this provider and check repository and branch you want to connecto to Function App.

![](http://radblog.pl/wp-content/uploads/2017/08/chrome_2017-08-02_23-10-22.png)
 

You get the window about creation the package and in the moment you get confirmation message:

 ![](http://radblog.pl/wp-content/uploads/2017/08/chrome_2017-08-02_23-13-19.png)

After these steps you should got your function in Azure portal:

![](http://radblog.pl/wp-content/uploads/2017/08/chrome_2017-08-02_23-16-03.png)

Configuration in Azure
----------------------

With such deplyment you don't need to change any option in your Function App - everything will work from the beginning. Parameters as **AzureWebJobsStorage** are automatically set with connection string to your remote Azure Storage, which was provider during creation of app.

You can check your settings in Function App -> Platfom Features tab -> GENERAL SETTINGS section -> Application settings -> App settings section -> **AzureWebJobsStorage**.

Testing remote Function App
---------------------------

You can add some file to check whether your function is working. To remote Azure Storage you can drag any file and in function **Logs** you can check how function is responding to new file (clik to open).

[![](http://radblog.pl/wp-content/uploads/2017/08/2017-08-02_23-55-06.gif)](http://radblog.pl/wp-content/uploads/2017/08/2017-08-02_23-55-06.gif)

As you can see, function is responding to the new file in blob, describing name and size in log window in function panel.

---
### Comments:
#### 
[dotnetomaniak.pl](http://dotnetomaniak.pl/Serverless-Simple-deploy-31-RadBlog "") - <time datetime="2017-08-03 22:00:56">Aug 4, 2017</time>

**Serverless – Simple deploy \[3.1\] | RadBlog**

Dziękujemy za dodanie artykułu - Trackback z dotnetomaniak.pl
