package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
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

func (h *TagHandler) CreateTag(c *gin.Context) {
	var m model.Tag
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.CreateTag(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *TagHandler) ListTags(c *gin.Context) {
	tags, err := h.usecase.ListTags()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, tags)
}

func (h *TagHandler) UpdateTag(c *gin.Context) {
	var m model.Tag
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.usecase.UpdateTag(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *TagHandler) GetTagByID(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	tag, err := h.usecase.GetTagByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, tag)
}

func (h *TagHandler) DeleteTag(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.DeleteTag(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
