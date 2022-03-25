package model

import "gorm.io/gorm"

type OrderStatus int

const (
	PENDING OrderStatus = iota
	CONFIRMED
	CANCELLED
)

type Post struct {
	Count     uint `json:"-"`
	ProductId uint `json:"-"`
}

type Order struct {
	gorm.Model
	UserId uint   `json:"-"`
	Post   []Post `json:"post"`
	Status OrderStatus
}
