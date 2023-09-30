package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/gin-gonic/gin"
)

type InternationalConferenceEvaluationHandler struct {
	usecase usecase.IInternationalConferenceEvaluationUsecase
}

func NewInternationalConferenceEvaluationHandler(u usecase.IInternationalConferenceEvaluationUsecase) *InternationalConferenceEvaluationHandler {
	return &InternationalConferenceEvaluationHandler{
		usecase: u,
	}
}

func (h *InternationalConferenceEvaluationHandler) CreateInternationalConferenceEvaluation(c *gin.Context) {
	var m model.InternationalConferenceEvaluation
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateInternationalConferenceEvaluation(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *InternationalConferenceEvaluationHandler) ListInternationalConferenceEvaluations(c *gin.Context) {
	internationalConferenceEvaluations, err := h.usecase.ListInternationalConferenceEvaluations()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, internationalConferenceEvaluations)
}

func (h *InternationalConferenceEvaluationHandler) GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(c *gin.Context) {
	internationalConferenceID, _ := strconv.Atoi(c.Param("international_conference_id"))
	year, _ := strconv.Atoi(c.Param("year"))
	internationalConferenceEvaluation, err := h.usecase.GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID, year)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, internationalConferenceEvaluation)
}

func (h *InternationalConferenceEvaluationHandler) UpdateInternationalConferenceEvaluation(c *gin.Context) {
	var m model.InternationalConferenceEvaluation
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateInternationalConferenceEvaluation(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}