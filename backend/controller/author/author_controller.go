package controller

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	repository "github.com/Kimoto-Norihiro/scholar-manager/repository/author"
	usecase "github.com/Kimoto-Norihiro/scholar-manager/usecase/author"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthorController interface {
	CreateAuthor(c *gin.Context)
	ListAuthors(c *gin.Context)
	UpdateAuthor(c *gin.Context)
	GetAuthorByID(c *gin.Context)
	DeleteAuthor(c *gin.Context)
}

type authorController struct {
	usecase usecase.AuthorUsecase
}

func NewAuthorController(db *gorm.DB) AuthorController {
	repo := repository.NewAuthorRepository(db)
	usecase := usecase.NewAuthorUsecase(repo)

	return &authorController{
		usecase: usecase,
	}
}

func (h *authorController) CreateAuthor(c *gin.Context) {
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

func (h *authorController) ListAuthors(c *gin.Context) {
	authors, err := h.usecase.ListAuthors()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, authors)
}

func (h *authorController) UpdateAuthor(c *gin.Context) {
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

func (h *authorController) GetAuthorByID(c *gin.Context) {
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

func (h *authorController) DeleteAuthor(c *gin.Context) {
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
