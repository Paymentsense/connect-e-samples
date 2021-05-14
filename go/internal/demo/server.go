package demo

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type Server struct {
	Address string
	Router  *gin.Engine
}

func NewServer() *Server {
	return &Server{}
}

// Init initialises the required configurations/dependencies for the server
func (s *Server) Init() error {
	s.Address = fmt.Sprintf(":%s", getPort())

	paymentService := NewPaymentService(getApiHostURL(), getWebHostURL())
	endpoint := NewEndpoint(paymentService)

	router, err := endpoint.Init()
	if err != nil {
		return err
	}
	s.Router = router

	return nil
}

// Run a server
func (s *Server) Run() error {
	return s.Router.Run(s.Address)
}
