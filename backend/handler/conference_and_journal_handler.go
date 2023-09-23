package handler

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
)

type ConferenceAndJournalHandler struct {
	usecase usecase.IConferenceAndJournalUseCase
}

func NewConferenceAndJournalHandler(u usecase.IConferenceAndJournalUseCase) *ConferenceAndJournalHandler {
	return &ConferenceAndJournalHandler{
		usecase: u,
	}
}

func (h *ConferenceAndJournalHandler) IndexConferenceAndJournal(c *gin.Context) {
	conferences, err := h.usecase.IndexConferenceAndJournal()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, conferences)
}

func (h *ConferenceAndJournalHandler) CreateConferenceAndJournal(c *gin.Context) {
	var m model.ConferenceAndJournal
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateConferenceAndJournal(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
