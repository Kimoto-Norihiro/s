package handler

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
)

type JournalInfoHandler struct {
	usecase *usecase.JournalInfoUsecase
}

func NewJournalInfoHandler(u *usecase.JournalInfoUsecase) *JournalInfoHandler {
	return &JournalInfoHandler{
		usecase: u,
	}
}

func (h *JournalInfoHandler) CreateJournalInfo(c *gin.Context) {
	var m model.JournalInfo
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateJournalInfo(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success", "model": m})
}

func (h *JournalInfoHandler) ListJournalInfos(c *gin.Context) {
	journalInfos, err := h.usecase.ListJournalInfos()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journalInfos)
}
