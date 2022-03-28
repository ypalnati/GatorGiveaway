package model

import "gorm.io/gorm"

type OrderStatus int

const (
	PENDING   OrderStatus = iota
	CONFIRMED             //status =1
	CANCELLED             //status =2
)

type Post struct {
	Count     uint `json:"count"`
	ProductId uint `json:"productId"`
}

type Order struct {
	gorm.Model
	UserId uint   `json:"-"`
	Posts  []Post `json:"posts" gorm:"foreignKey:ProductId;references:ID"`
	Status OrderStatus
}
