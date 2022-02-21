package model

import "gorm.io/gorm"

// User table
type User struct {
	gorm.Model
	Username  string `form:"username" json:"username" binding:"required"`
	Password  string `form:"password" json:"password" binding:"required"`
	FirstName string `form:"firstname" json:"firstname" binding:"required"`
	LastName  string `form:"lastname" json:"lastname" binding:"required"`
	Email 	  string `form:"email" json:"email" binding:"required"`
	Phone     string `form:"phone" json:"phone" binding:"required"`
}

// Login struct, mapping json to the variables
type Login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}
