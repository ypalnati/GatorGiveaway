# First Assignment(Sprint_1) status

## GatorGiveaway

Generally, all the giveaways and sales of old stuff happen in WhatsApp groups. There are many groups, and it's very hard to keep track of those groups and posts. The idea is to provide a web-application for such sales and giveaway stuff. It's basically an eBay clone for UF.


### React JS UI Progress
- Added boilerplate template for the front end.
- Added signup and signin pages for user.
- Added a page to view posts.
- Also added modals for edit, delete and creating the posts in the view posts page.
- Integrated all the pages with the backend APIs and also maintaing the user session.

### Go-Lang backend progress
- Added boilerplate template for the back-end.
- Using Gin Web Framework and GORM library.
- Created APIs for giveaway post CRUD operations for sellers.
- Created APIs for user CRUD operations.
- Maintaing user sessions

### Api documentation of backend services
<details>
  <summary>Login endpoints</summary>
  
  ### Get user
  - To be added
  ### Create user
  - To be added
  ### Update user
  - To be added
  ### Delete user
  - To be added
</details>


User Registration:
To register your account, first route to localhost:3000, then click on "Register" button. You need to fill username and password fields and then submit. If you input something wrong, you'll get notified at the top of the page, or if you register successfully, you'll automatically redirected to login page.

Fields in signup form that needs your notice:

Username: Has to be unique, which means you can not register with a username that has already been taken, and case sensitive.
Password: Must contains figure, uppercase letter, lowercase letter, and a special sign, and total length should be at least 9.

Login:
Route to localhost:3000/login, input your registered username and password, and sign in. After signing in, you'll see home page to view the giveaway posts.

Home Page:
In home page, we have a logout and create post buttons in the top-left.
In cards, all the giveaway posts are displayed wich can be editted and deleted.
## Useful links of the project
- [Main project repo link](https://github.com/raghusaripalli/GatorGiveaway) 
- [Link for Actions on git](https://github.com/raghusaripalli/GatorGiveaway/actions/workflows/)
- [All user stories link](https://github.com/raghusaripalli/GatorGiveaway/issues)


