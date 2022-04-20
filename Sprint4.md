## Description of your application - 200 words max
- GatorGiveaway is a common platform for users to sell their items/belongings and also to buy items they need. Its like ebay platform for UF students
- This is developed as a web application portal using ReactJS as front end and GoLang to write backend services

#### Technical Infrastructure leveraged in this project
- AWS S3 for block storage of images/files
- AWS EC2 for deploying backend services to remote server
- Git Hub pages for deploying UI to remote server
- GORM for persistance framework in GoLang
- GIN for webservice framework in GoLang
- CYPRESS/JEST for unit testing
- SQLite for DBMS

#### The functionalities our application provides are as follows:

- *Register:* New users can register to our portal 
- *Login:*  Already registered users can login using their credentials
- *Buyer/Seller:* Buyer and sellers have custom login functionalities, like buyer has addtocart, favorites tab and can see all posts, whereas seller can only see what items he has posted for selling
- *Create Post:* For a user he can create a post to sell what items he needs to sell and mention all details like Product name, size, age, weight, image etc.,
- *Mark Favorite:* 
  - Users can mark their products as favorite and can see those items in the favorites tab
- *About Us:* 
  Details about all our developers
## BONUS
- Remote Website url : [https://raghusaripalli.github.io/GatorGiveaway/](https://raghusaripalli.github.io/GatorGiveaway/)
#### Remote deploy details
- We have deployed backend services using amazon aws
- For UI we have used git-hub pages to deploy our application 

## Demo video functionality - 3min max
## Cypress test video - 90sec max
![Alt text](media/CypressDemo.gif?raw=true "Cypress demo")
## Backend unit test video - 90sec max
## Unit Tests Backend Summary
## Component testing suite UI results
![Alt text](media/UI_ComponentTestingSuite.png?raw=true "Component testing results")

## Link to Project board
- [Sprint 4 Board](https://github.com/raghusaripalli/GatorGiveaway/projects/4)
## Link to Sprint4 deliverables
- [Issues Link](https://github.com/raghusaripalli/GatorGiveaway/issues)
## Frontend and backend team members
- Raghu Saripalli (Backend)
- Tejasri Dontham (Backend)
- Sujay (Front end)
- Yamini Palnati (Front end)

## Api documentation of backend services
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

<details>
  <summary>Place Order API Tests</summary>
<hr>

- TestPlaceOrderPassCase
	- Tested the /placeOrder API by logging in with a user and placing an order using posts he could see
- TestPlaceOrderNotLoggedInFailCase
	- Tested the /placeOrder API NOT logging in with user, this return status of UNAUTHORIZED
- TestPlaceOrderJsonFieldsMissing
	- Json Fileds missing is handled in this test
	
<hr>

</details>
<details>
  <summary>Cancel Order API Tests</summary>
<hr>

- TestCancelOrderSuccessCase
	- Tested the /cancelOrder API by logging in with a user and cancelling the user order by order id, STATUS is updated to 2
- TestCancelOrderUserNotLoggedInCase
	- Tested the /cancelOrder API NOT logging in with user, this return status of UNAUTHORIZED
- TestCancelOrderOrderNotExistsCase
	- Order Id not existing in this case is handled, with a positive response and message in json response.
	
<hr>

</details>
<details>
  <summary>List Orders API Tests</summary>
<hr>

- TestGetAllOrdersPassCase
	- Lists all orders by calling the /alOrders, it returns in a pagination format
- TestGetParticularOrderPassCase
	- List Order based on the Order ID, return a single json
- TestGetParticularOrderFailCase
	- Provided order ID if it's not present, returns a 409 status and validated the same.
	
<hr>

</details>

