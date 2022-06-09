package demo

import (
	"fmt"

	"github.com/labstack/echo/v4"
)

type Server struct {
	Address string
	Router  *echo.Echo
}

func NewServer() *Server {
	return &Server{}
}

// Init initialises the required configurations/dependencies for the server
func (s *Server) Init() error {
	s.Address = fmt.Sprintf(":%s", getPort())

	paymentService := newPaymentService(getApiHostURL(), getWebHostURL())
	endpoint := newEndpoint(paymentService)

	router, err := endpoint.init()
	if err != nil {
		return err
	}
	s.Router = router

	return nil
}

// Start a server
func (s *Server) Start() error {
	return s.Router.Start(s.Address)
}
