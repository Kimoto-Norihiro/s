package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type InternationalConferenceRepository struct {
	db *gorm.DB
}

func NewInternationalConferenceRepository(db *gorm.DB) *InternationalConferenceRepository {
	return &InternationalConferenceRepository{db}
}

func (r *InternationalConferenceRepository) CreateInternationalConference(m model.InternationalConference) error {
	return r.db.Create(&m).Error
}

func (r *InternationalConferenceRepository) ListInternationalConferences() ([]model.InternationalConference, error) {
	var internationalConferences []model.InternationalConference
	err := r.db.Preload("Authors").Preload("InternationalConferenceInfo").Preload("Evaluation").Preload("Tags").Find(&internationalConferences).Error
	return internationalConferences, err
}

func (r *InternationalConferenceRepository) UpdateInternationalConference(m model.InternationalConference) error {
	return r.db.Save(&m).Error
}

func (r *InternationalConferenceRepository) GetInternationalConferenceByID(id int) (model.InternationalConference, error) {
	var internationalConference model.InternationalConference
	err := r.db.Preload("Authors").Preload("InternationalConferenceInfo").Preload("Evaluation").Preload("Tags").Where("id = ?", id).First(&internationalConference).Error
	return internationalConference, err
}
