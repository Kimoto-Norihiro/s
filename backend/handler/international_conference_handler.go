package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/gin-gonic/gin"
)

type InternationalConferenceHandler struct {
	usecase usecase.IInternationalConferenceUsecase
}

func NewInternationalConferenceHandler(u usecase.IInternationalConferenceUsecase) *InternationalConferenceHandler {
	return &InternationalConferenceHandler{
		usecase: u,
	}
}

func (h *InternationalConferenceHandler) CreateInternationalConference(c *gin.Context) {
	var m model.InternationalConference
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateInternationalConference(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *InternationalConferenceHandler) ListInternationalConferences(c *gin.Context) {
	internationalConferences, err := h.usecase.ListInternationalConferences()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, internationalConferences)
}

func (h *InternationalConferenceHandler) UpdateInternationalConference(c *gin.Context) {
	var m model.InternationalConference
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateInternationalConference(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *InternationalConferenceHandler) GetInternationalConferenceByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	internationalConference, err := h.usecase.GetInternationalConferenceByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, internationalConference)
}
