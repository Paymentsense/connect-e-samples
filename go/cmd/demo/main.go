package main

import (
	"log"

	"github.com/paymentsense/connect-e-samples/go/internal/demo"
)

func main() {
	srv := demo.NewServer()
	if err := srv.Init(); err != nil {
		log.Fatalf("error initialising server. error: %v", err)
	}

	if err := srv.Start(); err != nil {
		log.Fatalf("error starting server. error: %v", err)
	}
}
