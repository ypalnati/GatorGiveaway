package model

import "gorm.io/gorm"

// Product table
type Product struct {
	gorm.Model
	UserId      uint   `json:"-"`
	Name        string `form:"name" json:"name" binding:"required"`
	Description string `form:"description" json:"description" binding:"required"`
	Location    string `form:"location" json:"location" binding:"required"`
	Dimensions  string `form:"dimensions" json:"dimensions" binding:"required"`
	Weight      int    `form:"weight" json:"weight" binding:"required"`
	Age         int    `form:"age" json:"age" binding:"required"`
	Count       int    `form:"count" json:"count" binding:"required"`
}
