package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/gin-gonic/gin"
)

type AwardHandler struct {
	usecase usecase.IAwardUsecase
}

func NewAwardHandler(u usecase.IAwardUsecase) *AwardHandler {
	return &AwardHandler{
		usecase: u,
	}
}

func (h *AwardHandler) CreateAward(c *gin.Context) {
	var m model.Award
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"bind error": err.Error()})
		return
	}
	err = h.usecase.CreateAward(m)
	if err != nil {
		c.JSON(400, gin.H{"create error": err.Error(), "model": m})
		return
	}
	c.JSON(200, gin.H{"message": "success", "model": m})
}

func (h *AwardHandler) ListAwards(c *gin.Context) {
	awards, err := h.usecase.ListAwards()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, awards)
}

func (h *AwardHandler) UpdateAward(c *gin.Context) {
	var m model.Award
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateAward(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *AwardHandler) GetAwardByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	award, err := h.usecase.GetAwardByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, award)
}
