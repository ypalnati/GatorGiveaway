package views

import (
	"net/http"
	"strings"
	m "webapp/model"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

// split tags string into list of tags
func splitTagStringByHash(tags string) []string {
	return strings.Split(tags, "#")
}

// remove duplicate tags
func removeDuplicateTags(tagList []string) string {
	allKeys := make(map[string]bool)
	list := []string{}
	for _, item := range tagList {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			list = append(list, item)
		}
	}
	return strings.Join(list, "#")
}

// remove duplicates from tags
func removeTagDuplicates(tags string) string {
	tagList := splitTagStringByHash(tags)
	return removeDuplicateTags(tagList)
}

func GetProductsByTags(db *gorm.DB) gin.HandlerFunc {

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

		//take tags from params
		tags := c.Param("tags")

		// get list of tags
		tagList := splitTagStringByHash(tags)

		// get all products
		var products []m.Product
		db.Find(&products)

		numberOfTags := len(tagList)
		for i := 0; i < numberOfTags; i++ {

		}

	}
	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}
