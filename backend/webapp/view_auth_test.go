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

func TestLoginPassCase(t *testing.T) {
	login := m.Login{Username: "testadmin", Password: "TestAdmin@123"}

	out, err := json.Marshal(login)
	if err != nil {
		t.Fatal(err)
	}
	w := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/login", strings.NewReader(string(out)))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

}

func TestLoginFailCase(t *testing.T) {
	login := m.Login{Username: "testadmin", Password: "wrongpassword@123"}

	out, err := json.Marshal(login)
	if err != nil {
		t.Fatal(err)
	}
	w := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/login", strings.NewReader(string(out)))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req)
	assert.Equal(t, 401, w.Code)

}

func TestRegisterPassCase(t *testing.T) {
	user_details := m.User{
		Username:  "testRegisterUser",
		Password:  "TestRegisterUser@123",
		FirstName: "TestRegister",
		LastName:  "User",
		Email:     "test@gmail.com",
		Phone:     "+1 987 654 3241"}

	body, err := json.Marshal(user_details)
	if err != nil {
		t.Fatal(err)
	}
	w := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/register", strings.NewReader(string(body)))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

}

func TestRegisterFailCase(t *testing.T) {
	user_details := m.User{
		Username:  "testRegisterUser",
		Password:  "TestRegisterUser@123",
		FirstName: "TestRegister",
		LastName:  "User",
		Email:     "test@gmail.com",
		Phone:     "+1 987 654 3241"}

	body, err := json.Marshal(user_details)
	if err != nil {
		t.Fatal(err)
	}
	w := httptest.NewRecorder()

	req, err := http.NewRequest("POST", "/register", strings.NewReader(string(body)))
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req)
	assert.Equal(t, 409, w.Code)

}

func TestDeleteUserPassCase(t *testing.T) {

	w := httptest.NewRecorder()

	req, err := http.NewRequest("DELETE", "/users/testRegisterUser", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

}

func TestDeleteUserFailCase(t *testing.T) {

	w := httptest.NewRecorder()

	req, err := http.NewRequest("DELETE", "/users/nouser", nil)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")

	router.ServeHTTP(w, req)
	assert.Equal(t, 404, w.Code)

}
