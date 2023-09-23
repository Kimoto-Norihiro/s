package handler

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type PaperHandler struct {
	usecase usecase.IPaperUseCase
}

func NewPaperHandler(u usecase.IPaperUseCase) *PaperHandler {
	return &PaperHandler{
		usecase: u,
	}
}

func (h *PaperHandler) CreatePaper(c *gin.Context) {
	var m model.Paper
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreatePaper(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *PaperHandler) IndexPaper(c *gin.Context) {
	papers, err := h.usecase.IndexPaper()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, papers)
}