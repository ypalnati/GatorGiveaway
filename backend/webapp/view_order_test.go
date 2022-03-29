package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	m "webapp/model"

	"github.com/stretchr/testify/assert"
)

func TestGetAllOrdersPassCase(t *testing.T) {

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

	if nr.Code == 200 {

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/allOrders", nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(w, req)
		assert.Equal(t, 200, w.Code)

	}

}

func TestGetParticularOrderPassCase(t *testing.T) {

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

	if nr.Code == 200 {

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/order/1", nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(w, req)
		assert.Equal(t, 200, w.Code)

	}

}
func TestGetParticularOrderUserNotLoggedInCase(t *testing.T) {
	nr := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/order/1", nil)
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(nr, req)
	assert.Equal(t, 404, nr.Code)
}

func TestGetParticularOrderFailCase(t *testing.T) {

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

	if nr.Code == 200 {

		w := httptest.NewRecorder()
		req, _ := http.NewRequest("GET", "/order/11", nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(w, req)
		assert.Equal(t, 409, w.Code)

	}

}
func TestPlaceOrderPassCase(t *testing.T) {
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
	if nr.Code == 200 {
		order := m.Order{
			UserId: 1,
			Posts: []m.Post{
				{
					Count:     1,
					ProductId: 1,
				},
				{
					Count:     2,
					ProductId: 1,
				},
			},
		}
		nr.Flush()
		body, _ := json.Marshal(order)
		req, _ := http.NewRequest("POST", "/placeOrder", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func TestPlaceOrderNotLoggedInFailCase(t *testing.T) {
	order := m.Order{
		UserId: 1,
		Posts: []m.Post{
			{
				Count:     1,
				ProductId: 1,
			},
			{
				Count:     2,
				ProductId: 1,
			},
		},
	}

	nr := httptest.NewRecorder()
	body, _ := json.Marshal(order)
	req, _ := http.NewRequest("POST", "/placeOrder", strings.NewReader(string(body)))
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(nr, req)
	assert.Equal(t, http.StatusUnauthorized, nr.Code)
}

func TestPlaceOrderJsonFieldsMissing(t *testing.T) {
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
	if nr.Code == 200 {
		order := m.Order{
			UserId: 1,
			Posts:  nil,
		}
		nr.Flush()
		body, _ := json.Marshal(order)
		req, _ := http.NewRequest("POST", "/placeOrder", strings.NewReader(string(body)))
		req.Header.Set("Content-Type", "application/json")
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, http.StatusOK, nr.Code)
	}
}

func TestCancelOrderSuccessCase(t *testing.T) {
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
	if nr.Code == 200 {
		nr.Flush()
		req, _ := http.NewRequest("POST", "/cancelOrder/1", nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, 200, nr.Code)
	}
}

func TestCancelOrderUserNotLoggedInCase(t *testing.T) {
	nr := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/cancelOrder/1", nil)
	req.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(nr, req)
	assert.Equal(t, 400, nr.Code)
}

func TestCancelOrderOrderNotExistsCase(t *testing.T) {
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
	if nr.Code == 200 {
		nr.Flush()
		req, _ := http.NewRequest("POST", "/cancelOrder/100", nil)
		req1.Header.Set("credentials", "include")
		req.Header.Set("Cookie", cookieValue)
		router.ServeHTTP(nr, req)
		assert.Equal(t, http.StatusOK, nr.Code)
	}
}
