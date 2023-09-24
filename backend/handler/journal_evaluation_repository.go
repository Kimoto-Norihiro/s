package handler

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/gin-gonic/gin"
)

type JournalEvaluationHandler struct {
	usecase *usecase.JournalEvaluationUsecase
}

func NewJournalEvaluationHandler(u *usecase.JournalEvaluationUsecase) *JournalEvaluationHandler {
	return &JournalEvaluationHandler{
		usecase: u,
	}
}

func (h *JournalEvaluationHandler) CreateJournalEvaluation(c *gin.Context) {
	var m model.JournalEvaluation
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.CreateJournalEvaluation(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *JournalEvaluationHandler) ListJournalEvaluations(c *gin.Context) {
	journalEvaluations, err := h.usecase.ListJournalEvaluations()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journalEvaluations)
}