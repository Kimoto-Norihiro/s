package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type DomesticConferenceRepository struct {
	db *gorm.DB
}

func NewDomesticConferenceRepository(db *gorm.DB) *DomesticConferenceRepository {
	return &DomesticConferenceRepository{db}
}

func (r *DomesticConferenceRepository) CreateDomesticConference(m model.DomesticConference) error {
	return r.db.Create(&m).Error
}

func (r *DomesticConferenceRepository) ListDomesticConferences() ([]model.DomesticConference, error) {
	var domesticConferences []model.DomesticConference
	err := r.db.Preload("DomesticConferenceInfo").Find(&domesticConferences).Error
	return domesticConferences, err
}

func (r *DomesticConferenceRepository) UpdateDomesticConference(m model.DomesticConference) error {
	return r.db.Save(&m).Error
}

func (r *DomesticConferenceRepository) GetDomesticConferenceByID(id int) (model.DomesticConference, error) {
	var domesticConference model.DomesticConference
	err := r.db.Preload("DomesticConferenceInfo").Where("id = ?", id).First(&domesticConference).Error
	return domesticConference, err
}