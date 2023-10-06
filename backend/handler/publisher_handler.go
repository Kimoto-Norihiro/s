package handler

import (
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
)

type PublisherHandler struct {
	usecase usecase.IPublisherUsecase
}

func NewPublisherHandler(u usecase.IPublisherUsecase) *PublisherHandler {
	return &PublisherHandler{
		usecase: u,
	}
}

func (h *PublisherHandler) ListPublishers(c *gin.Context) {
	publishers, err := h.usecase.ListPublishers()
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

func (h *PublisherHandler) UpdatePublisher(c *gin.Context) {
	var m model.Publisher
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdatePublisher(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *PublisherHandler) GetPublisherByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	publisher, err := h.usecase.GetPublisherByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, publisher)
}

func (h *PublisherHandler) DeletePublisher(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.DeletePublisher(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}