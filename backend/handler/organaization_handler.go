package handler

import (
	"strconv"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/gin-gonic/gin"
)

type OrganizationHandler struct {
	usecase usecase.IOrganizationUsecase
}

func NewOrganizationHandler(u usecase.IOrganizationUsecase) *OrganizationHandler {
	return &OrganizationHandler{
		usecase: u,
	}
}

func (h *OrganizationHandler) ListOrganizations(c *gin.Context) {
	organizations, err := h.usecase.ListOrganizations()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, organizations)
}

func (h *OrganizationHandler) CreateOrganization(c *gin.Context) {
	var m model.Organization
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.CreateOrganization(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *OrganizationHandler) UpdateOrganization(c *gin.Context) {
	var m model.Organization
	err := c.BindJSON(&m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.usecase.UpdateOrganization(m)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}

func (h *OrganizationHandler) GetOrganizationByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	organization, err := h.usecase.GetOrganizationByID(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, organization)
}

func (h *OrganizationHandler) DeleteOrganization(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}
	err = h.usecase.DeleteOrganization(id)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
	}
	c.JSON(200, gin.H{"message": "success"})
}