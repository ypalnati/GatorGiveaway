package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	m "webapp/model"

	"github.com/stretchr/testify/assert"
)

func TestAddPostWithTagsPassCase(t *testing.T) {
	login := m.Login{
		Username: "testadmin",
		Password: "TestAdmin@123",
	}
	payload, _ := json.Marshal(login)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/login", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	tag := "#chair#officechair"
	if nr.Code == 200 {
		post := m.Product{
			UserId:      1,
			Name:        "Office Chair",
			Description: "All the wheels and functionality intact",
			Location:    "3800 SW 34th Blvd",
			Dimensions:  "10 x 10 x 10",
			Weight:      110,
			Age:         2,
			Count:       1,
			Tags:        tag,
		}
		nr.Flush()
		body, _ := json.Marshal(post)
		req, _ := http.NewRequest("POST", "/create", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
		assert.Equal(t, tag, post.Tags)
	}
}

func TestAddPostWithDuplicateTagsPassCase(t *testing.T) {
	login := m.Login{
		Username: "testadmin",
		Password: "TestAdmin@123",
	}
	payload, _ := json.Marshal(login)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/login", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	tags := "#instantpot#cooking#electric#cooking"
	uniqueTag := "#instantpot#cooking#electric"
	if nr.Code == 200 {
		post := m.Product{
			UserId:      1,
			Name:        "Instant Pot 5 Litres",
			Description: "Can Cook for 4 people",
			Location:    "3415 SW 34th Blvd",
			Dimensions:  "35 x 25 x 11",
			Weight:      110,
			Age:         2,
			Count:       1,
			Tags:        tags,
		}
		nr.Flush()
		// ignore the login success message
		io.ReadAll(nr.Body)
		body, _ := json.Marshal(post)
		req, _ := http.NewRequest("POST", "/create", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
		var dbPost m.Product
		jsonStr, _ := ioutil.ReadAll(nr.Body)
		err := json.Unmarshal(jsonStr, &dbPost)
		if err != nil {
			fmt.Println(err)
		}
		assert.Equal(t, uniqueTag, dbPost.Tags)
	}
}

func TestAddPostWithTagsFailCase(t *testing.T) {
	login := m.Login{
		Username: "testadmin",
		Password: "TestAdmin@122",
	}
	payload, _ := json.Marshal(login)
	nr := httptest.NewRecorder()
	req1, _ := http.NewRequest("POST", "/login", strings.NewReader(string(payload)))
	req1.Header.Set("Content-Type", "application/json")
	req1.Header.Set("credentials", "include")
	router.ServeHTTP(nr, req1)
	cookieValue := nr.Result().Header.Get("Set-Cookie")
	tags := "#instantpot#cooking#electric#cooking"
	uniqueTag := "#instantpot#cooking#electric"
	if nr.Code == 200 {
		post := m.Product{
			UserId:      1,
			Name:        "Instant Pot 5 Litres",
			Description: "Can Cook for 4 people",
			Location:    "3415 SW 34th Blvd",
			Dimensions:  "35 x 25 x 11",
			Weight:      110,
			Age:         2,
			Count:       1,
			Tags:        tags,
		}
		nr.Flush()
		// ignore the login success message
		io.ReadAll(nr.Body)
		body, _ := json.Marshal(post)
		req, _ := http.NewRequest("POST", "/create", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
		var dbPost m.Product
		jsonStr, _ := ioutil.ReadAll(nr.Body)
		err := json.Unmarshal(jsonStr, &dbPost)
		if err != nil {
			fmt.Println(err)
		}
		assert.Equal(t, uniqueTag, dbPost.Tags)
	} else {
		assert.Equal(t, 401, nr.Code)
	}
}
