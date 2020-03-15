---
title: 'Angular - resolving route data'
slug: '/2017/12/13/angular-resolving-route-data/'
date: Wed, 13 Dec 2017 16:07:22 +0000
draft: false
featured_image: 'images/2017/12/angular.png'
aliases: ['/2017/12/13/angular-resolving-route-data/']
category: 'Angular'
tags: ['angular']
---

In angular 1 resolving data into a route and using them in controllers was really straightforward. Below injecting orders into **ordersController**.
```
$stateProvider
    .state('app.orders', {
        resolve: {
            ..
            url: "/orders/{userId}",
            orders: ['$stateParams', 'ordersService',
                function ($stateParams, ordersService) {
                    var userId = $stateParams.userId;
                    return ordersService.getOrders(userId);
                }
            ]
        }
    });

ordersCtrl.$inject = ['orders'];
function ordersCtrl(orders) { }

```
In angular 2 / 4 / 5 it's quite more complicated.

First, you need to **create resolver**:
```
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrdersService } from './contacts.service';

@Injectable()
export class OrdersResolve implements Resolve<Order[]> {

  constructor(private OrdersService: ordersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    var userId = route.paramMap.get('userId');
    return this.ordersService.getOrders(userId);
  }
}
```
Then you need to **register your resolver** in AppModule:
```
import { OrdersResolver } from '../resolvers';

@NgModule({
  ...
  providers: [
    OrdersResolver
  ]
})
export class AppModule {}
```
And **add resolver in routes**:
```
import { OrdersResolver } from '../resolvers';

export const AppRoutes: Routes = [
  ...
  { 
    path: 'orders/:userId',
    component: OrdersComponent,
    resolve: {
      orders: OrdersResolve
    }
  }
];
```
At the end, you **gather data from route object**:
```
import { ActivatedRoute } from '@angular/router';

@Component()
export class OrdersComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    var orders = this.route.snapshot.data['contact'];
  }
}
```
And this is it :)