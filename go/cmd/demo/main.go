package main

import (
	"log"

	"github.com/Paymentsense/connect-e-samples/go/internal/demo"
)

func main() {
	srv := demo.NewServer()
	if err := srv.Init(); err != nil {
		log.Fatalf("error initialising server. error: %v", err)
	}

	if err := srv.Run(); err != nil {
		log.Fatalf("error starting server. error: %v", err)
	}
}
