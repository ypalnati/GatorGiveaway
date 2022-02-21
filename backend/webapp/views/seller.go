package views

import (
	"net/http"
	"strconv"
	m "webapp/model"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/microcosm-cc/bluemonday"
	"gorm.io/gorm"
)

// Post Create View - creates the post taking in the json data
func PostCreateView(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		session := sessions.Default(c)
		v := session.Get("uId")
		if v == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User is not logged in"})
			return
		}
		uid := v.(uint)
		var user m.User
		db.First(&user, "id = ?", uid)
		var json m.Product
		// try to bind the request json to the Login struct
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// strips HTML input from strings preventing XSS
		p := bluemonday.StripTagsPolicy()
		user.Username = p.Sanitize(user.Username)
		user.Password = p.Sanitize(user.Password)
		json.Name = p.Sanitize(json.Name)
		json.Description = p.Sanitize(json.Description)
		json.Location = p.Sanitize(json.Location)
		json.Dimensions = p.Sanitize(json.Dimensions)
		json.ImageUrl = p.Sanitize(json.ImageUrl)
		json.UserId = user.ID

		// create the post
		result := db.Create(&json)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"result": "post creation success",
		})
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

// Reads posts of a particular seller
func GetPostView(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		// Get sessions
		session := sessions.Default(c)

		// Get user id from session
		v := session.Get("uId")

		// if there's no user id, return 400
		if v == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User is not logged in"})
			return
		}

		// Get user id from session
		uid := v.(uint)

		// fetch posts based on user_id
		var posts []m.Product
		db.Find(&posts, "user_id = ?", uid)

		// return the fetched posts
		c.JSON(http.StatusOK, posts)
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

// Update post by making changes to the existing post
func UpdatePostView(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		// Get sessions
		session := sessions.Default(c)

		// Get user id from session
		v := session.Get("uId")

		// if there's no user id, return 400
		if v == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User is not logged in"})
			return
		}

		// Get user id from session
		uid := v.(uint)
		postId, _ := strconv.Atoi(c.Param("postId"))

		// Get the update details from the post body
		var np m.Product
		if err := c.ShouldBindJSON(&np); err != nil {
			// return bad request if field names are wrong
			// and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// get the existing post
		var op m.Product
		db.Find(&op, "id = ? AND user_id = ?", postId, uid)

		db.Model(&op).Updates(np)

		c.JSON(http.StatusOK, op)
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

// Delete post by post id
func DeletePostView(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		// Get sessions
		session := sessions.Default(c)

		// Get user id from session
		v := session.Get("uId")

		// if there's no user id, return 400
		if v == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User is not logged in"})
			return
		}

		// Get user id from session
		uid := v.(uint)
		postId, _ := strconv.Atoi(c.Param("postId"))

		var op m.Product
		db.Find(&op, "id = ? AND user_id = ?", postId, uid)

		db.Delete(&op)

		c.JSON(http.StatusOK, op)
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}
