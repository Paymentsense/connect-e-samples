package demo

import (
	"html/template"
	"io"

	"github.com/labstack/echo/v4"
)

type renderer struct {
	templates *template.Template
}

func newRenderer(location string) *renderer {
	return &renderer{
		templates: template.Must(template.ParseGlob(location)),
	}
}

func (r *renderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return r.templates.ExecuteTemplate(w, name, data)
}
