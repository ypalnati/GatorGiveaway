// Reads all posts of all sellers
func GetPosts(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		
		// fetch all posts
		var posts []m.Product
		db.Find(&posts)

		// return the fetched posts
		c.JSON(http.StatusOK, posts)
	}
	
	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

