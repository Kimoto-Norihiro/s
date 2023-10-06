package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/gin-gonic/gin"
)

type DomesticConferenceInfoHandler struct {
	usecase usecase.IDomesticConferenceInfoUsecase
}

func NewDomesticConferenceInfoHandler(u usecase.IDomesticConferenceInfoUsecase) *DomesticConferenceInfoHandler {
	return &DomesticConferenceInfoHandler{
		usecase: u,
	}
}

func (h *DomesticConferenceInfoHandler) CreateDomesticConferenceInfo(c *gin.Context) {
	var m model.DomesticConferenceInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateDomesticConferenceInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *DomesticConferenceInfoHandler) ListDomesticConferenceInfos(c *gin.Context) {
	domestic_conference_infos, err := h.usecase.ListDomesticConferenceInfos()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, domestic_conference_infos)
}

func (h *DomesticConferenceInfoHandler) UpdateDomesticConferenceInfo(c *gin.Context) {
	var m model.DomesticConferenceInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateDomesticConferenceInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *DomesticConferenceInfoHandler) GetDomesticConferenceInfoByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	domestic_conference_info, err := h.usecase.GetDomesticConferenceInfoByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, domestic_conference_info)
}

func (h *DomesticConferenceInfoHandler) DeleteDomesticConferenceInfo(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	err := h.usecase.DeleteDomesticConferenceInfo(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
