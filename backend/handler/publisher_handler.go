package handler

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type PublisherHandler struct {
	usecase usecase.IPublisherUseCase
}

func NewPublisherHandler(u usecase.IPublisherUseCase) *PublisherHandler {
	return &PublisherHandler{
		usecase: u,
	}
}

func (h *PublisherHandler) IndexPublisher(c *gin.Context) {
	publishers, err := h.usecase.IndexPublisher()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, publishers)
}

func (h *PublisherHandler) CreatePublisher(c *gin.Context) {
	var m model.Publisher
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreatePublisher(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}