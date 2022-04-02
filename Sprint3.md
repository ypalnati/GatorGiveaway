## Sprint 3 status

### Agenda:
- Order Management System
- Extra: Liked Posts Feature

### React JS UI Progress
- Refactored UI using material UI and refactored login, register, home pages.
- Added AddToCart, Favorites, Order feature in front-end.
    For every post, added an Add to cart button to save the product to cart
    Added Favorites fav icon and can be view in Favorites page 
    In the Add to cart page, we have a button to place order and that can be viewed in orders page.
- Added Jest unit testcases for UI to test the new pages.
- Using Cypress framework added frontend unit test cases.

### Go-Lang backend progress
- Added Order feature
    Added APIs to add, view, cancel the orders.
    Buyer can see all their orders and fetch any particular order.
    Seller can see all the orders placed by the users.
    Orders can be cancelled by the authorized users.
- Using Go lang testing package, wrote Unit tests for the Order APIs.
- Created APIs to test user APIs that fetch all the orders creation, cancellation and viewing.

### Video Links:

[Backend Demo](https://youtu.be/LNu_3BJMTxA)


[Front end Full Integration Demo](https://www.youtube.com/watch?v=vA0G7OwYMA0)

### Api documentation of backend services
<details>
  <summary>Place Order</summary>

### Status Codes
  
  - While placing orders initially we keep it in pending state and then we move it to confirmed state.
  - Once we delete we move status as cancelled state
  ``` 
	PENDING               status = 0
	CONFIRMED             status = 1
	CANCELLED             status = 2

```
  
### Target URL

`"localhost:8080" + "/placeOrder"`

### Request

Method: `POST`

Example

 ### Request
  `localhost:8080/placeOrder`
  
  `Body :{
    "posts":[
        {
            "count": 1,
            "productId": 2
        },
         {
            "count": 2,
            "productId": 3
        }
    ]
}`
  
### Response

 ```json
 {
    "orderId": 8,
    "result": "order successfully placed!"
}
```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
 
#### GIF
![placeOrder](https://user-images.githubusercontent.com/22216660/161361061-93ce1cb2-5fe8-4563-a9a9-005445585be7.gif)


</details>
<details>
  <summary>View All Orders Of All Users</summary>
  

### Target URL

`"localhost:8080" + "/allorders"`

### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/allOrders`
 
  
-  This API is for sellers to view all the orders.
  
  
### Response

 ```json
{
    "Page": 1,
    "TotalPages": 1,
    "Orders": [
        {
            "ID": 1,
            "CreatedAt": "2022-04-01T17:22:12.7615198-04:00",
            "UpdatedAt": "2022-04-01T17:22:12.7615198-04:00",
            "DeletedAt": null,
            "posts": [],
            "Status": 1
        },
        {
            "ID": 2,
            "CreatedAt": "2022-04-01T17:29:50.5213792-04:00",
            "UpdatedAt": "2022-04-01T17:29:50.5213792-04:00",
            "DeletedAt": null,
            "posts": [
                {
                    "count": 1,
                    "productId": 1
                }
            ],
            "Status": 1
        },
        {
            "ID": 3,
            "CreatedAt": "2022-04-01T17:35:38.8661683-04:00",
            "UpdatedAt": "2022-04-01T17:35:38.8661683-04:00",
            "DeletedAt": null,
            "posts": [
                {
                    "count": 1,
                    "productId": 1
                }
            ],
            "Status": 1
        },
       
    ]
}
```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
 
#### GIF
![GetAllOrders](https://user-images.githubusercontent.com/22216660/161361088-d3c39376-73de-4478-8374-0e7edb24228b.gif)


</details>
<details>
  <summary>View Particular Order</summary>

### Target URL

`"localhost:8080" + "/order/:orderId"`

### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/order/5`
 
### Response

 ```json
{
    "ID": 5,
    "CreatedAt": "2022-04-01T17:41:37.7922598-04:00",
    "UpdatedAt": "2022-04-01T17:41:37.7922598-04:00",
    "DeletedAt": null,
    "posts": [
        {
            "count": 1,
            "productId": 1
        }
    ],
    "Status": 1
}
```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
 
#### GIF
![GetOrderByOrderId](https://user-images.githubusercontent.com/22216660/161361113-5775d004-92b1-469c-aa9c-b953e1cfc2bd.gif)


</details>
<details>
  <summary>Cancel Order</summary>

### Target URL

`"localhost:8080" + "/cancelOrder/:OrderId"`

  
  It take the user id from the session.
### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/cancelOrder/3`
 
### Response

 ```json
{
    "ID": 3,
    "CreatedAt": "2022-04-01T17:35:38.8661683-04:00",
    "UpdatedAt": "2022-04-01T21:08:07.3701319-04:00",
    "DeletedAt": null,
    "posts": [
        {
            "count": 1,
            "productId": 1
        }
    ],
    "Status": 2
}
```
- Status is updated to 2 - Which means order is cancelled.
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
 
#### GIF
![CancelOrder](https://user-images.githubusercontent.com/22216660/161361146-f68eb327-540d-44b1-aeb8-8c8176b5a4f3.gif)



</details>
<details>
  <summary>View all Order of the particular user</summary>

### Target URL

`"localhost:8080" + "/orders"`

  
  It takes the user id from the session.
### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/orders`
 
### Response

 ```json
{
    "ID": 3,
    "CreatedAt": "2022-04-01T17:41:37.7922598-04:00",
    "UpdatedAt": "2022-04-01T17:41:37.7922598-04:00",
    "DeletedAt": null,
    "posts": [
        {
            "count": 1,
            "productId": 1
        }
    ],
    "Status": 1
}
```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
	
#### GIF
![GetOrdersByUser](https://user-images.githubusercontent.com/22216660/161361160-af859ae2-e114-4ad4-ad9e-b63bcd14fca2.gif)

</details>
