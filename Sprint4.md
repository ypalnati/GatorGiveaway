# Sprint 4 - Final Sprint

## Description of your application - 200 words max
##Idea
Generally, all the giveaways and sales of old stuff happen in WhatsApp groups. There are many groups, and it's very hard to keep track of those groups and posts.
- GatorGiveaway is a common platform for users to sell their items/belongings and also to buy items they need. Its like ebay platform for UF students
- This is developed as a web application portal using ReactJS as front end and GoLang to write backend services.

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
- *Tags*
  Posts can be tagged which will be useful to search post by tags.
## BONUS
- Remote Website url : [https://raghusaripalli.github.io/GatorGiveaway/](https://raghusaripalli.github.io/GatorGiveaway/)
- Backend deployed url : http://13.71.87.168
#### Remote deploy details
- We have deployed backend services using amazon aws
- For UI we have used git-hub pages to deploy our application 

## Demo video functionality - 3min max
## Cypress test video - 90sec max
![Alt text](media/CypressDemo.gif?raw=true "Cypress demo")
## Backend unit test video - 90sec max
![BackendUnitTestsNew](https://user-images.githubusercontent.com/28947831/164368630-5cc80779-61aa-47d3-826b-0226214410ac.gif)

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
  <summary>Login</summary>

### Target URL

`"localhost:3000" + "/login"`

### Request

Method: `POST`

Example

```json
{
   "username" : "myUserName",
   "password" : "myPASSW1234!"
}
```

Fields

| Elements | Descriptions                   | Type | Required |
| -------- | ------------------------------ |------| -------- |
| username | The username cannot be empty   |String|  true    |
| password | The password cannot be empty   |String|  true    |

### Response

{
    "result": "login success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![login_success](https://user-images.githubusercontent.com/87737522/152627688-888eda8a-2882-4a90-826f-d30e114cb4ae.gif)

</details>

<details>
  <summary>Register</summary>

### Target URL

`"localhost:3000" + "/register"`

### Request

Method: `POST`

Example

```json
{
   "username" : "myUserName",
   "password" : "myPASSW1234!"
}
```

Fields

| Elements | Descriptions                   | Type | Required |
| -------- | ------------------------------ |------| -------- |
| username | The username cannot be empty   |String|  true    |
| password | The password cannot be empty   |String|  true    |

### Response

{
    "result": "registration success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![register_success](https://user-images.githubusercontent.com/87737522/152627731-69e4a622-5fa3-48db-a144-1449f0e38430.gif)

</details>
<details>
  <summary>Logout</summary>

### Target URL

`"localhost:3000" + "/logout"`

### Request

Method: `POST`


Field
{
    "result": "logout success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
![logout_success](https://user-images.githubusercontent.com/87737522/152627782-b61abec2-68d2-4a3f-86b3-b77de5910917.gif)


</details>

<details>
  <summary>Create Post</summary>

### Target URL

`"localhost:3000" + "/create"`

### Request

Method: `POST`

Example

```json
{
    "name":"Laptop Stand",
    "description": "Useful to put laptop in a height and at a distance.",
    "location": "4000 SW 34th St Block #733C",
    "dimensions": "5 x 2 x 6 m",
    "weight":10,
    "age": 1,
    "count": 2
}
```

Fields

| Elements    	| Descriptions                   | Type | Required |
| -------------	| ------------------------------ |------| -------- |
| name	   	    | Name of the product		         |String|  true    |
| description	  | Description of the item 	     |String|  true    |
| location	    | Location to pickup the item    |String|  true    |
| dimensions    | Dimensions of the item         |String|  true    |
| weight	      | Weight of the item             |int  	|  true    |
| age		        | Age of the item	               |int 	|  true    |
| count		      | No pof items		               |int	  |  true    |


### Response
{
    "result": "post creation success"
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![create_success](https://user-images.githubusercontent.com/91032296/152626808-fe772014-515a-41ab-87d7-757397937c82.gif)
  
</details>

<details>
  <summary>Edit post</summary>

### Target URL

`"localhost:3000" + "/update/<post_id>"`

### Request

Method: `PATCH`

Example

```json
{
    "name":"Steel Laptop Stand",
    "weight": 11,
    "count": 1
}
```

Fields

Same as create post fields.
Eg: 
{
    "name":"Steel Laptop Stand",
    "weight": 11,
    "count": 1
}

### Response

<Upadated post details>
{
    "ID": 5,
    "CreatedAt": "2022-02-04T20:42:18.1731823-05:00",
    "UpdatedAt": "2022-02-04T20:47:02.5941861-05:00",
    "DeletedAt": null,
    "name": "Steel Laptop Stand",
    "description": "Useful to put laptop in a height and at a distance.",
    "location": "4000 SW 34th St Block #733C",
    "dimensions": "5 x 2 x 6 m",
    "weight": 11,
    "age": 1,
    "count": 1
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![update_success](https://user-images.githubusercontent.com/91032296/152626836-a6999e3e-cbfb-4923-bab5-90f978b6f78c.gif)
  
</details>
<details>
  <summary>Delete post</summary>

### Target URL

`"localhost:3000" + "/delete/<post_id>"`

### Request

Method: `DELETE`

Example

localhost:8080/delete/5

### Response

<Deleted post details>
{
    "ID": 5,
    "CreatedAt": "2022-02-04T20:42:18.1731823-05:00",
    "UpdatedAt": "2022-02-04T20:47:02.5941861-05:00",
    "DeletedAt": null,
    "name": "Steel Laptop Stand",
    "description": "Useful to put laptop in a height and at a distance.",
    "location": "4000 SW 34th St Block #733C",
    "dimensions": "5 x 2 x 6 m",
    "weight": 11,
    "age": 1,
    "count": 1
}
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![delete_success](https://user-images.githubusercontent.com/91032296/152626857-6bc0b585-18c7-48b1-a8ce-7ee96bb317c2.gif)
  
</details>

<details>
  <summary>Get posts</summary>

### Target URL

`"localhost:3000" + "/read"`

### Request

Method: `GET`

Example

localhost:8080/read

### Response

<All post details>

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![read_success](https://user-images.githubusercontent.com/91032296/152626871-08f2fc34-97b3-4414-af3c-008a10e8170f.gif)
  
</details>

<details>
  <summary>User operations</summary>


  <details>
  <summary>Get Users</summary>

    
  ### Target URL

`"localhost:3000" + "/users"`

### Request

Method: `GET`

Example

`localhost:8080/users`

### Response

<Users details>

```
  [
    {
        "ID": 2,
        "CreatedAt": "2022-02-04T22:39:18.8175326-05:00",
        "UpdatedAt": "2022-02-04T22:39:18.8175326-05:00",
        "DeletedAt": null,
        "username": "superuser",
        "password": "Supr@123",
        "firstname": "Super",
        "lastname": "User",
        "phone": "+1 (111)-11-11111"
    },
    {
        "ID": 3,
        "CreatedAt": "2022-02-04T22:40:26.5245709-05:00",
        "UpdatedAt": "2022-02-04T22:40:26.5245709-05:00",
        "DeletedAt": null,
        "username": "admin",
        "password": "Admin@123",
        "firstname": "Admin",
        "lastname": "User",
        "phone": "+1 999-99-99999"
    },
    {
        "ID": 4,
        "CreatedAt": "2022-02-04T23:35:52.370314-05:00",
        "UpdatedAt": "2022-02-04T23:35:52.370314-05:00",
        "DeletedAt": null,
        "username": "User1",
        "password": "User@123",
        "firstname": "User First Name",
        "lastname": "User Last Name",
        "phone": "+1 443-77-66666"
    },
    {
        "ID": 5,
        "CreatedAt": "2022-02-04T23:41:40.2563053-05:00",
        "UpdatedAt": "2022-02-04T23:41:40.2563053-05:00",
        "DeletedAt": null,
        "username": "Shangchi",
        "password": "Shang@123",
        "firstname": "Shang",
        "lastname": "Chi",
        "phone": "+1 333-22-88888"
    },
    {
        "ID": 6,
        "CreatedAt": "2022-02-04T23:46:39.8110102-05:00",
        "UpdatedAt": "2022-02-04T23:46:39.8110102-05:00",
        "DeletedAt": null,
        "username": "MayaMattew",
        "password": "Maya@123",
        "firstname": "Maya",
        "lastname": "Mattew",
        "phone": "+1 333-22-88888"
    }
]
```
Possible status: 200, 400

Message format: json

Example

`Code: 200 OK`
  </details>


  <details>
  <summary>Create User</summary>


  ### Target URL

`"localhost:3000" + "/register"`

### Request

Method: `POST`

Example

`localhost:8080/users`

### Input
    
 ```
 {
    "username": "superuser1",
    "password": "Super@123",
    "firstname": "Super",
    "lastname": "User",
    "phone": "+1(111)-11-11111"
}   
 ```
    
### Response

<Users details>

```
{
    "result": "registration success"
}
```
Possible status: 200, 400

Message format: json

Example

`Code: 200 OK`
    
  </details>
  
      <details>
  <summary>Delete User</summary>


  ### Target URL

`"localhost:3000" + "/user/6"`

### Request

Method: `DELETE`

Example

`localhost:8080/user/6`

    
### Response

<Delete USer details>

```
{
    "ID": 6,
    "CreatedAt": "2022-02-04T23:46:39.8110102-05:00",
    "UpdatedAt": "2022-02-04T23:46:39.8110102-05:00",
    "DeletedAt": "2022-02-04T23:58:22.7753997-05:00",
    "username": "MayaMattew",
    "password": "Maya@123",
    "firstname": "Maya",
    "lastname": "Mattew",
    "phone": "+1 333-22-88888"
}
```
Possible status: 200, 400

Message format: json

Example

`Code: 200 OK`
    
  </details>
    
    
</details>
<details>
  <summary>Buyers view</summary>

### Target URL

`"localhost:8080" + "/allPosts"`

### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/allPosts`
### Response

 ```json
  {

    "Page": 1,

    "TotalPages": 1,

    "Products": [

        {

            "ID": 6,

            "CreatedAt": "2022-02-21T20:41:23.0404376-05:00",

            "UpdatedAt": "2022-02-21T20:41:23.0404376-05:00",

            "DeletedAt": null,

            "name": "Wireless Keyboard",

            "description": "Keyboard with adapter",

            "location": "4000 SW 37th Blvd",

            "dimensions": "12*12",

            "weight": 11,

            "age": 2,

            "count": 1,

            "imageUrl": https://s3ufsebucket.s3.amazonaws.com/wireless_keyboard.jpg

        },

        {

            "ID": 7,

            "CreatedAt": "2022-02-21T20:42:46.8338981-05:00",

            "UpdatedAt": "2022-02-21T20:42:46.8338981-05:00",

            "DeletedAt": null,

            "name": "Wooden Study Table",

            "description": "Wooden table safe with kids. Very sturdy.",

            "location": "2600 SW Archer Rd Apt J250",

            "dimensions": "12*12",

            "weight": 110,

            "age": 1,

            "count": 1,

            "imageUrl": https://s3ufsebucket.s3.amazonaws.com/wooden_Study_table.jpg

        }

    ]
  }

```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  ![buyer_valid_page](https://user-images.githubusercontent.com/28947831/156864013-1c275cca-b16d-4147-b7c7-cbeb7044fc3b.gif)


</details>
<details>
  <summary>Pagination</summary>

### Target URL

  `"localhost:8080/allPosts?page=" + page_number`

### Request

Method: `GET`

Example

### Request
  
  `localhost:8080/allPosts?page=1`
   
### Response
  We get the first 10 records in that page
  
  ![buyer_valid_page](https://user-images.githubusercontent.com/28947831/156864033-6b9a754f-1cbb-4c0e-876c-7a56db398f93.gif)

  
If the page is empty:
  ### Request
  `localhost:8080/allPosts?page=100`
  
 ### Response
```json
  {

    "Page": 100,

    "TotalPages": 1,

    "Products": []

}
  ```
  
Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
  
  ![buyer_INvalid_page](https://user-images.githubusercontent.com/28947831/156864040-e60d06ea-73b2-47a8-9c71-9fb623625f48.gif)


</details>
<details>
  <summary>Get page info from script tags </summary>

### Target URL

`localhost:8080/allPosts?page=<script>...</script>`

### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/allPosts?page=<script>alert("123")</script>`
### Response
  Requested page records

Possible status: 200, 400, 401

Message format: json

`Code: 200 OK`
 
  ![buyer_xss_attack_protect](https://user-images.githubusercontent.com/28947831/156864265-c83ce0cc-b3ab-4a5a-9164-12ce89f0fde5.gif)


</details>
<details>
  <summary>Unit Testing</summary>
  Used go lang package for unit testing

- User Auth Tesing :
  - Created functions to test login and register cases.
  - Created function to login with Valid credentials , invalid credentials.
  - Created function to register a user with valid details, a user with existing username(fail case)
- User CRUD operations test :
     - Created functions to test fetching users by Id, name, deleting users.
- Posts CRUD opertions test :
     - Created functions to test reading posts, creating , deleting and editing posts..
</details>
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
</details>
<details>
  <summary>View all tags of All Posts</summary>

### Target URL

`"localhost:8080" + "/allTags"`

  
  It takes the user id from the session.
### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/allTags`
 
### Response

 ```json
[
    "laptop",
    "support",
    "laptopstand",
    "studylight",
    "lamp",
    "bulb"
]

```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
	
#### GIF
![GetTagsOfAllPosts](https://user-images.githubusercontent.com/22216660/161361160-af859ae2-e114-4ad4-ad9e-b63bcd14fca2.gif)

</details>
<details>
  <summary>View all tags of a particular Posts</summary>

### Target URL

`"localhost:8080" + "/tags/:postId"`

  
  It takes the user id from the session.
### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/tags/1`
 
### Response

 ```json
[
    "laptop",
    "support",
    "laptopstand"
]

```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
	
#### GIF
![GetTagsOfaParticularPost](https://user-images.githubusercontent.com/22216660/161361160-af859ae2-e114-4ad4-ad9e-b63bcd14fca2.gif)

</details>
<details>
  <summary>Search Posts by tags</summary>

### Target URL

`"localhost:8080" + "/getProducts/:tags"`

  
  It takes the user id from the session.
### Request

Method: `GET`

Example

 ### Request
  `localhost:8080/getProducts/%23laptop%23bulb`
 
### Response

 ```json
{
    "bulb": [
        {
            "ID": 2,
            "CreatedAt": "2022-04-20T17:10:28.822168-04:00",
            "UpdatedAt": "2022-04-20T17:10:28.822168-04:00",
            "DeletedAt": null,
            "name": "Study light",
            "description": "Study light with 4 bulb holders",
            "location": "3800 SW 34TH street",
            "dimensions": "10cm",
            "weight": 15,
            "age": 1,
            "count": 1,
            "isFav": null,
            "tags": "#studylight#lamp#bulb",
            "imageUrl": ""
        }
    ],
    "laptop": [
        {
            "ID": 1,
            "CreatedAt": "2022-04-20T16:56:40.7459361-04:00",
            "UpdatedAt": "2022-04-20T16:56:40.7459361-04:00",
            "DeletedAt": null,
            "name": "Laptop Stand",
            "description": "Useful to put laptop in a height and at a distance.",
            "location": "4000 SW 34th St Block #733C",
            "dimensions": "5 x 2 x 6 m",
            "weight": 10,
            "age": 1,
            "count": 2,
            "isFav": null,
            "tags": "#laptop#support#laptopstand",
            "imageUrl": ""
        }
    ]
}

```

Possible status: 200, 400, 401

Message format: json

Example

`Code: 200 OK`
	
#### GIF
![GetTagsOfaParticularPost](https://user-images.githubusercontent.com/22216660/161361160-af859ae2-e114-4ad4-ad9e-b63bcd14fca2.gif)

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


