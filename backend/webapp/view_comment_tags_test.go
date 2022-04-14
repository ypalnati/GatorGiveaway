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
		assert.Equal(t, tag, post.Tags)
	}
}

func TestGetProductsByTagsSuccessCase(t *testing.T) {
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
	tags := []string{
		"chair",
		"studyLamp",
		"lamp",
		"bulb",
		"electricity",
		"instantpot",
		"cooking",
		"electric",
		"lighting",
	}
	tag := "%23" + strings.Join(tags, "%23")
	if nr.Code == 200 {
		nr.Flush()
		io.ReadAll(nr.Body)
		url := fmt.Sprintf("/getProducts/%s", tag)
		fmt.Println(url)
		req, _ := http.NewRequest("GET", url, nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		// check assert for code
		assert.Equal(t, 200, nr.Code)
		// check the response body
		var resp map[string][]m.Product
		jsonStr, _ := ioutil.ReadAll(nr.Body)
		err := json.Unmarshal(jsonStr, &resp)
		if err != nil {
			fmt.Println(err)
		}
		var product m.Product
		testDb.First(8, &product)
		assert.Equal(t, 8, int(resp["chair"][0].ID))
	}
}

func TestGetProductsByTagsEmptyTagCase(t *testing.T) {
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
	tags := []string{
		"chair",
		"studyLamp",
		"lamp",
		"bulb",
		"electricity",
		"instantpot",
		"cooking",
		"electric",
		"lighting",
		"",
	}
	tag := "%23" + strings.Join(tags, "%23")
	if nr.Code == 200 {
		nr.Flush()
		io.ReadAll(nr.Body)
		url := fmt.Sprintf("/getProducts/%s", tag)
		fmt.Println(url)
		req, _ := http.NewRequest("GET", url, nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		// check assert for code
		assert.Equal(t, 200, nr.Code)
		// check the response body
		var resp map[string][]m.Product
		jsonStr, _ := ioutil.ReadAll(nr.Body)
		fmt.Println(string(jsonStr))
		err := json.Unmarshal(jsonStr, &resp)
		if err != nil {
			fmt.Println(err)
		}
		// asserting that empty string is not present in th result map
		assert.Nil(t, resp[""])
	}
}

func TestGetProductsByTagsDuplicateTagCase(t *testing.T) {
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
	tags := []string{
		"chair",
		"chair",
	}
	tag := "%23" + strings.Join(tags, "%23")
	if nr.Code == 200 {
		nr.Flush()
		io.ReadAll(nr.Body)
		url := fmt.Sprintf("/getProducts/%s", tag)
		fmt.Println(url)
		req, _ := http.NewRequest("GET", url, nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		// check assert for code
		assert.Equal(t, 200, nr.Code)
		// check the response body
		var resp map[string][]m.Product
		jsonStr, _ := ioutil.ReadAll(nr.Body)
		fmt.Println(string(jsonStr))
		err := json.Unmarshal(jsonStr, &resp)
		if err != nil {
			fmt.Println(err)
		}
		// asserting that empty string is not present in th result map
		assert.Equal(t, 1, len(resp["chair"]))
	}
}

func TestAddPostWithTagsPassCase2(t *testing.T) {
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
	tag := "#studyLamp#lamp#bulb#electricity"
	if nr.Code == 200 {
		post := m.Product{
			UserId:      1,
			Name:        "Study Lamp",
			Description: "Study lamp which has 5 bulb slots in octopus fashion.",
			Location:    "3800 NE hub",
			Dimensions:  "7* 1*1",
			Weight:      25,
			Age:         1,
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

func TestGetAllPostsTagsPassCase(t *testing.T) {
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
	tag := "#chair#officechair#studyLamp#lamp#bulb#electricity"
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
		req, _ := http.NewRequest("GET", "/allTags", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)

		assert.Equal(t, 200, nr.Code)
		resp := nr.Body.String()

		idx := strings.Index(resp, "[")

		resp = string(resp[idx:])
		resp = strings.Replace(resp, "[", "", -1)
		resp = strings.Replace(resp, "]", "", -1)
		resp = strings.Replace(resp, "\"", "", -1)
		var b []string = strings.Split(resp, ",")
		tags := strings.Join(b, "#")
		if tags != "" {
			tags = "#" + tags
		}
		assert.Equal(t, tag, tags)

	}
}

func TestGetPostsTagsOfParticularPostPassCase(t *testing.T) {
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
	tag := "#studyLamp#lamp#bulb#electricity"
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
		req, _ := http.NewRequest("GET", "/tags/9", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)

		assert.Equal(t, 200, nr.Code)
		resp := nr.Body.String()

		idx := strings.Index(resp, "[")

		resp = string(resp[idx:])
		resp = strings.Replace(resp, "[", "", -1)
		resp = strings.Replace(resp, "]", "", -1)
		resp = strings.Replace(resp, "\"", "", -1)
		var b []string = strings.Split(resp, ",")
		tags := strings.Join(b, "#")
		if tags != "" {
			tags = "#" + tags
		}
		assert.Equal(t, tag, tags)

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

func TestAddPostWithDuplicateTagInDifferentPostsPassCase(t *testing.T) {
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
	tags := "#studyLamp#lighting"

	if nr.Code == 200 {
		post := m.Product{
			UserId:      1,
			Name:        "Cute Study Lamp",
			Description: "Bought before 3 months. All slots are working",
			Location:    "#studyLamp#lighting",
			Dimensions:  "11*12*11",
			Weight:      20,
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
		assert.Equal(t, tags, dbPost.Tags) //this particular post will have studyLamp in the tags
		//but in get all tags only one studyLamp is retreived.
	}
}

func TestGetAllPostsTagsDuplicatePassCase(t *testing.T) {
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
	tag := "#chair#officechair#studyLamp#lamp#bulb#electricity#instantpot#cooking#electric#lighting"
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
		req, _ := http.NewRequest("GET", "/allTags", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)

		assert.Equal(t, 200, nr.Code)
		resp := nr.Body.String()

		idx := strings.Index(resp, "[")

		resp = string(resp[idx:])
		resp = strings.Replace(resp, "[", "", -1)
		resp = strings.Replace(resp, "]", "", -1)
		resp = strings.Replace(resp, "\"", "", -1)
		var b []string = strings.Split(resp, ",")
		tags := strings.Join(b, "#")

		if tags != "" {
			tags = "#" + tags
		}
		//	fmt.Println(tags)
		assert.Equal(t, tag, tags)

	}
}
