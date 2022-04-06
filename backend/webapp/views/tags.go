package views

import (
	"net/http"
	"strings"
	m "webapp/model"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"strconv"

	"gorm.io/gorm"
)

// split tags string into list of tags
func splitTagStringByHash(tags string) []string {
	return strings.Split(tags, "#")
}
func joinStringList(tagList []string, delimeter string) string {
	return strings.Join(tagList, delimeter)
}

// remove duplicate tags
func removeDuplicates(tagList []string) []string {
	allKeys := make(map[string]bool)
	list := []string{}
	for _, item := range tagList {
		if _, value := allKeys[item]; !value {
			if len(item) != 0 {
				allKeys[item] = true
				list = append(list, item)
			}

		}
	}
	return list
}

// remove duplicates from tags
func removeTagDuplicates(tags string) string {
	tagList := splitTagStringByHash(tags)
	var list = removeDuplicates(tagList)
	return joinStringList(list, "#")
}

func GetAllTags(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var products []m.Product
		db.Find(&products)
		var tags []string

		for i := 0; i < len(products); i++ {
			var t = products[i].Tags
			var temp = splitTagStringByHash(t)
			tags = append(tags, temp...)
		}
		tags = removeDuplicates(tags)
		c.JSON(http.StatusOK, tags)
	}
	return gin.HandlerFunc(fn)
}

func GetTagsOfParticularPost(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var products []m.Product

		productId, _ := strconv.Atoi(c.Param("productId"))

		db.Find(&products, productId)
		var tags []string

		for i := 0; i < len(products); i++ {
			var t = products[i].Tags
			var temp = splitTagStringByHash(t)
			tags = append(tags, temp...)
		}
		tags = removeDuplicates(tags)
		c.JSON(http.StatusOK, tags)
	}
	return gin.HandlerFunc(fn)
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
