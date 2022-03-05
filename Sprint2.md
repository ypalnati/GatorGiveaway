## Sprint 2 status

### React JS UI Progress
- Refactored UI using material UI and refactored login, register, home pages.
- Added header, footer and added components like aboutus, contact us.
- Added email functionality for contact us page.
- Added Jest unit testcases for UI
- Uing Cypress framework added frontend unit test cases.

### Go-Lang backend progress
- Added buyer API 
    Buyer can see all the posts from all the sellers.
    Added pagination which will only show tell records per page
    Created APIs that fetch particular page.
- Using Go lang testing package, started writting Unit tests.
- Created APIs to test user login, register functionalities. 
- Created APIs to test user APIs that fetch users, delete users.
- Created APIs to test the APIs that read, create, delete, edit posts.
- Covered all the cases to test valid and invalid cases.

### Cypress Tests
Steps:-
```
npm install cypress
```
In package.json :-
```
"scripts": {
    [....]
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress": "cypress open"
  },
```
To Run :-
```
npm run cypress
```
Output:-
![cypress_test](https://user-images.githubusercontent.com/22216660/156867093-b4bf867c-2949-4b42-9464-a878d3bf4668.gif)


### Unit

### Video Links:

### Api documentation of backend services
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

## Hosted on AWS:
- [Golang Server Base URL](http://ec2-3-144-28-176.us-east-2.compute.amazonaws.com:8080)
