package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"

	"gorm.io/gorm"
)

type InternationalConferenceEvaluationRepository struct {
	db *gorm.DB
}

func NewInternationalConferenceEvaluationRepository(db *gorm.DB) *InternationalConferenceEvaluationRepository {
	return &InternationalConferenceEvaluationRepository{db}
}

func (r *InternationalConferenceEvaluationRepository) CreateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error {
	return r.db.Create(&m).Error
}

func (r *InternationalConferenceEvaluationRepository) ListInternationalConferenceEvaluations() ([]model.InternationalConferenceEvaluation, error) {
	var internationalConferenceEvaluations []model.InternationalConferenceEvaluation
	err := r.db.Find(&internationalConferenceEvaluations).Error
	return internationalConferenceEvaluations, err
}

func (r *InternationalConferenceEvaluationRepository) GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID int, year int) (model.InternationalConferenceEvaluation, error) {
	var internationalConferenceEvaluation model.InternationalConferenceEvaluation
	err := r.db.Where("international_conference_info_id = ? AND year = ?", internationalConferenceID, year).First(&internationalConferenceEvaluation).Error
	return internationalConferenceEvaluation, err
}

func (r *InternationalConferenceEvaluationRepository) UpdateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error {
	return r.db.Save(&m).Error
}

func (r *InternationalConferenceEvaluationRepository) DeleteInternationalConferenceEvaluation(internationalConferenceID int, year int) error {
	return r.db.Delete(&model.InternationalConferenceEvaluation{}, internationalConferenceID, year).Error
}
