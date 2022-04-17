package views

import (
	"net/http"

	m "webapp/model"

	"github.com/gin-gonic/gin"

	"strings"

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
			allKeys[item] = true
			list = append(list, item)
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
