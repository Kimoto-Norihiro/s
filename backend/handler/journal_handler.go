package handler

import (
	"fmt"
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
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
	fmt.Println(m)
	if err != nil {
		c.JSON(400, gin.H{"bind error": err.Error()})
		return
	}
	err = h.usecase.CreateJournal(m)
	if err != nil {
		c.JSON(400, gin.H{"create error": err.Error(), "model": m})
		return
	}
	c.JSON(200, gin.H{"message": "success", "model": m})
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

func (h *JournalHandler) GetJournalByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	journal, err := h.usecase.GetJournalByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journal)
}
