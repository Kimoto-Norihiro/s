package handler

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/gin-gonic/gin"
)

type TagHandler struct {
	usecase *usecase.TagUsecase
}

func NewTagHandler(u *usecase.TagUsecase) *TagHandler {
	return &TagHandler{
		usecase: u,
	}
}

func (h *TagHandler) ListTags(c *gin.Context) {
	tags, err := h.usecase.ListTags()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, tags)
}
