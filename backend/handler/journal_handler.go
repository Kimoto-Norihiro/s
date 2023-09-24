package handler

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/gin-gonic/gin"
)

type JournalHandler struct {
	usecase *usecase.JournalUsecase
}

func NewJournalHandler(u *usecase.JournalUsecase) *JournalHandler {
	return &JournalHandler{
		usecase: u,
	}
}

func (h *JournalHandler) CreateJournal(c *gin.Context) {
	var m model.Journal
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateJournal(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *JournalHandler) ListJournals(c *gin.Context) {
	journals, err := h.usecase.ListJournals()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journals)
}

func (h *JournalHandler) UpdateJournal(c *gin.Context) {
	var m model.Journal
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateJournal(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
