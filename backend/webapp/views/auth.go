package views

import (
	"net/http"
	l "webapp/model"

	"github.com/gin-gonic/gin"
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
		username := json.Username
		password := json.Password

		// DB query to search for username and password and store the results in users
		db.Where("username = ? AND password >= ?", username, password).Find(&users)

		// if user found return success
		if len(users) > 0 {
			c.JSON(http.StatusOK, gin.H{
				"result": "login success",
			})
		}

		// return unauthorized status
		c.JSON(http.StatusUnauthorized, gin.H{
			"result": "Invalid username and password",
		})
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}
