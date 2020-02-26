---
title: 'Dapper - many to many relation in a single request'
slug: '/2018/01/16/dapper-many-to-many-relation-in-single-request/'
date: Tue, 16 Jan 2018 13:14:57 +0000
draft: false
category: 'ORM'
tags: ['Dapper', 'MS SQL']
---

During my [CQRS journey](http://radblog.pl/2017/08/19/cqrs-first-step-split-to-commands-and-queries/), I implemented many-to-many data querying, in the single database request. I achieved getting all products with associated entities at the same time. To achieve the same, we need to define a **temporary table** to store all first-level entities:```
CREATE TABLE #Products
(
	Id int, 
	Name NVarchar(128),
	Price decimal
)
```Then insert first-level entities into this table:```
INSERT INTO #Products

SELECT P.Id, P.Name, P.Price
FROM dbo.Products AS P

ORDER BY P.CreateDate
OFFSET @Take \* (@Page - 1) ROWS
FETCH NEXT @Take ROWS ONLY;
```With such temporary table, we are able to **query it multiple times** - to return values and to use it in additional subqueries to gather related entities:```
\-- Query all found products
SELECT \* FROM #Products
	
-- Query product photos
SELECT 
	PP.ProductId, PP.PhotoUrl
FROM ProductPhotos PP
WHERE PP.ProductId IN (SELECT Id FROM #Products)
	
-- Query latest reviews
SELECT TOP 4
	R.Rating, R.CreateDate, R.ProductId,
	U.Name AS UserName
FROM Reviews R
JOIN Users U ON R.UserId = U.Id
WHERE R.ProductId IN (SELECT Id FROM #Products)
ORDER BY R.CreateDate DESC
```At the end, we map all the data to C# objects:```
List<ProductVm> products;

using (var multi = connection.QueryMultiple(sqlQuery,
    new { Page = command.Page, Take = command.Take))
{
	products = multi.Read<ProductVm>().ToList();

	var photos = multi.Read<PhotoVm>().ToList();
	products.ForEach(p =>
	{
		p.Photos = photos.Where(r => r.ProductId == p.Id).ToList();
	});

	var latestReviews = multi.Read<ReviewVm>().ToList();
	products.ForEach(p =>
	{
		p.LatestReviews = latestReviews.Where(r => r.ProductId == p.Id).ToList();
	});
}

return products;
```Dapper has an extension **QueryMultiple **which allows reading multiple times from the query. Every **Read **usages gather data from the next **SELECT** statement in SQL query. With above solution, we don't need to make roundtrips to the database to gather the data.