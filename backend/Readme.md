# GatorGiveaway backend

This go lang project serves as backend for the GatorGiveaway project.

## Available Scripts

Open the webapp directory of project in the terminal, you can run commands in following order

### `go mod tidy`

installs the dependencies that are in used inside the project

### `go run main.go`

starts the webserver in debug mode
prints out all the endpoints and port info

## File Structure

webapp
|-views
|--auth.go
|-model
|--user.go
|-main.go

## Setup environment

- install [go version 1.17](https://go.dev/dl/go1.17.6.windows-amd64.msi)
- add GOPATH env variable - this location can be anywhere, it'll store all the dependencies installed
- add %USERPROFILE%\go\bin to the path env variable