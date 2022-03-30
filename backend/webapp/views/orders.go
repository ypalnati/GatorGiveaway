package views

import (
	"net/http"
	"strconv"
	m "webapp/model"

	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

type Orders struct {
	Page       int
	TotalPages int64
	Orders     []m.Order
}

// Fetches orders of a particular buyer
func GetUserOrdersView(db *gorm.DB) gin.HandlerFunc {
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

		// fetch orders based on user_id
		var orders []m.Order
		db.Find(&orders, "user_id = ?", uid)

		// return the fetched orders
		c.JSON(http.StatusOK, orders)
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}

// Ftech all orders of all buyers
func GetAllOrders(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		page := secure.Sanitize(c.DefaultQuery("page", "1"))
		pageNumber, err := strconv.Atoi(page)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("%s is a invalid page number", page)})
			return
		}

		// fetch all orders
		var orders []m.Order
		db.Model(&m.Order{}).Limit(Limit).Offset((pageNumber - 1) * Limit).Find(&orders)

		// get total records
		var count int64
		db.Model(&m.Order{}).Count(&count)

		// build the response json
		totalPages := count/int64(Limit) + 1
		ordrs := Orders{Page: pageNumber, TotalPages: totalPages, Orders: orders}

		// return response json
		c.JSON(http.StatusOK, ordrs)
	}

	// return the GetPosts
	return gin.HandlerFunc(fn)
}

/*
 * Register User Order
 * Validate the user login
 * Validate the Order Structure
 * Write to DB
 * Return the status and Order ID accordingly
 */

func PlaceOrder(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {

		// validate user session
		session := sessions.Default(c)
		v := session.Get("uId")
		if v == nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"result": "User not logged in",
			})
			return
		}

		// validate the json
		var json m.Order
		if err := c.ShouldBindJSON(&json); err != nil {
			// return bad request if field names are wrong and if fields are missing
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// set the status
		json.Status = m.CONFIRMED

		// create object in database
		result := db.Create(&json)

		// return error if creating object in db failed
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": result.Error.Error()})
			return
		}

		// return 200 status
		// along with Order Id
		c.JSON(http.StatusOK, gin.H{
			"orderId": json.ID,
			"result":  "order successfully placed!",
		})
	}
	return gin.HandlerFunc(fn)
}

/*
 * Cancel User Order
 * Validate the user login
 * Write to DB , order status as cancelled
 * Return the status and Order ID accordingly
 */

func CancelOrderView(db *gorm.DB) gin.HandlerFunc {

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
		//take order id from params
		orderId, _ := strconv.Atoi(c.Param("orderId"))

		var updated_order m.Order
		db.First(&updated_order, orderId)

		updated_order.Status = 2

		// get the existing post
		var op m.Product
		db.Find(&op, "id = ? AND user_id = ?", orderId, uid)

		db.Model(&op).Updates(updated_order)

		c.JSON(http.StatusOK, op)
	}

	// return the loginHandlerfunction
	return gin.HandlerFunc(fn)
}
