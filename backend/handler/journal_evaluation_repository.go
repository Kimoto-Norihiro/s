package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
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

func (h *JournalEvaluationHandler) GetJournalEvaluationByJournalIDAndYear(c *gin.Context) {
	journalID, _ := strconv.Atoi(c.Param("journal_id"))
	year, _ := strconv.Atoi(c.Param("year"))
	journalEvaluation, err := h.usecase.GetJournalEvaluationByJournalIDAndYear(journalID, year)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, journalEvaluation)
}

func (h *JournalEvaluationHandler) UpdateJournalEvaluation(c *gin.Context) {
	var m model.JournalEvaluation
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.UpdateJournalEvaluation(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *JournalEvaluationHandler) DeleteJournalEvaluation(c *gin.Context) {
	journalID, _ := strconv.Atoi(c.Param("journal_id"))
	year, _ := strconv.Atoi(c.Param("year"))
	err := h.usecase.DeleteJournalEvaluation(journalID, year)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}