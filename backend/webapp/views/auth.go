package views

import (
	"net/http"
	l "webapp/model"

	"github.com/gin-gonic/gin"
	"github.com/microcosm-cc/bluemonday"
	"gorm.io/gorm"
)

// Login View - wrapper func around the main login handler method
// this is because we have passed the db variable
// could've passed db variable as middleware but it is strictly against doing it in go documentation
func LoginView(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json l.Login
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var users []l.User

		// strips HTML input from user for security purpose
		p := bluemonday.StripTagsPolicy()
		username := p.Sanitize(json.Username)
		password := p.Sanitize(json.Password)

		// DB query to search for username and password and store the results in users
		db.Find(&users, "username = ? AND password = ?", username, password)

		// if user found return success
		if len(users) > 0 {
			c.JSON(http.StatusOK, gin.H{
				"result": "login success",
			})
			return
		}

		// return unauthorized status
		c.JSON(http.StatusUnauthorized, gin.H{
			"result": "Invalid username and password",
		})
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

// Login View - wrapper func around the main login handler method
// this is because we have passed the db variable
// could've passed db variable as middleware but it is strictly against doing it in go documentation
func RegisterView(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var json l.User
		// try to bind the request json to the User struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// strips HTML input from user for security purpose
		p := bluemonday.StripTagsPolicy()
		json.Username = p.Sanitize(json.Username)
		json.Password = p.Sanitize(json.Password)
		json.FirstName = p.Sanitize(json.FirstName)
		json.LastName = p.Sanitize(json.LastName)
		json.Phone = p.Sanitize(json.Phone)

		// check db if the username exists
		var user l.User
		db.Find(&user, "username = ?", json.Username)
		// return error if the user exists
		if user != (l.User{}) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Username Already Exists!"})
			return
		}

		// create the user
		result := db.Create(&json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"result": "registration success",
		})
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}
