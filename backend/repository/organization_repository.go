package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type OrganizationRepository struct {
	db *gorm.DB
}

func NewOrganizationRepository(db *gorm.DB) *OrganizationRepository {
	return &OrganizationRepository{db}
}

func (r *OrganizationRepository) CreateOrganization(m model.Organization) error {
	return r.db.Create(&m).Error
}

func (r *OrganizationRepository) ListOrganizations() ([]model.Organization, error) {
	var organizations []model.Organization
	err := r.db.Find(&organizations).Error
	return organizations, err
}

func (r *OrganizationRepository) UpdateOrganization(m model.Organization) error {
	return r.db.Save(&m).Error
}

func (r *OrganizationRepository) GetOrganizationByID(id int) (model.Organization, error) {
	var organization model.Organization
	err := r.db.Where("id = ?", id).First(&organization).Error
	return organization, err
}

func (r *OrganizationRepository) DeleteOrganization(id int) error {
	return r.db.Delete(&model.Organization{}, id).Error
}