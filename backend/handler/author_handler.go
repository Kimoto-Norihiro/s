package handler

import (
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
)

type AuthorHandler struct {
	usecase usecase.IAuthorUsecase
}

func NewAuthorHandler(u usecase.IAuthorUsecase) *AuthorHandler {
	return &AuthorHandler{
		usecase: u,
	}
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

func (h *AuthorHandler) ListAuthors(c *gin.Context) {
	authors, err := h.usecase.ListAuthors()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, authors)
}

func (h *AuthorHandler) UpdateAuthor(c *gin.Context) {
	var m model.Author
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateAuthor(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *AuthorHandler) GetAuthorByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	author, err := h.usecase.GetAuthorByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, author)
}

func (h *AuthorHandler) DeleteAuthor(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.DeleteAuthor(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
