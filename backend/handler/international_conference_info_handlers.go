package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/gin-gonic/gin"
)

type InternationalConferenceInfoHandler struct {
	usecase usecase.IInternationalConferenceInfoUsecase
}

func NewInternationalConferenceInfoHandler(u usecase.IInternationalConferenceInfoUsecase) *InternationalConferenceInfoHandler {
	return &InternationalConferenceInfoHandler{
		usecase: u,
	}
}

func (h *InternationalConferenceInfoHandler) CreateInternationalConferenceInfo(c *gin.Context) {
	var m model.InternationalConferenceInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateInternationalConferenceInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *InternationalConferenceInfoHandler) ListInternationalConferenceInfos(c *gin.Context) {
	internationalConferenceInfos, err := h.usecase.ListInternationalConferenceInfos()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, internationalConferenceInfos)
}

func (h *InternationalConferenceInfoHandler) UpdateInternationalConferenceInfo(c *gin.Context) {
	var m model.InternationalConferenceInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateInternationalConferenceInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *InternationalConferenceInfoHandler) GetInternationalConferenceInfoByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	internationalConferenceInfo, err := h.usecase.GetInternationalConferenceInfoByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, internationalConferenceInfo)
}
