package handler

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
)

type AuthorHandler struct {
	usecase usecase.IAuthorUsecase
}

func NewAuthorHandler(u usecase.IAuthorUsecase) *AuthorHandler {
	return &AuthorHandler{
		usecase: u,
	}
}

func (h *AuthorHandler) IndexAuthor(c *gin.Context) {
	authors, err := h.usecase.IndexAuthor()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, authors)
}

func (h *AuthorHandler) CreateAuthor(c *gin.Context) {
	var m model.Author
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateAuthor(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
