package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/gin-gonic/gin"
)

type DomesticConferenceHandler struct {
	usecase *usecase.DomesticConferenceUsecase
}

func NewDomesticConferenceHandler(u *usecase.DomesticConferenceUsecase) *DomesticConferenceHandler {
	return &DomesticConferenceHandler{
		usecase: u,
	}
}

func (h *DomesticConferenceHandler) CreateDomesticConference(c *gin.Context) {
	var m model.DomesticConference
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.CreateDomesticConference(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *DomesticConferenceHandler) ListDomesticConferences(c *gin.Context) {
	domesticConferences, err := h.usecase.ListDomesticConferences()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, domesticConferences)
}

func (h *DomesticConferenceHandler) GetDomesticConferenceByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	domesticConference, err := h.usecase.GetDomesticConferenceByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, domesticConference)
}

func (h *DomesticConferenceHandler) UpdateDomesticConference(c *gin.Context) {
	var m model.DomesticConference
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.UpdateDomesticConference(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}