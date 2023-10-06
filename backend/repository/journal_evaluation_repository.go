package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type JournalEvaluationRepository struct {
	db *gorm.DB
}

func NewJournalEvaluationRepository(db *gorm.DB) *JournalEvaluationRepository {
	return &JournalEvaluationRepository{db}
}

func (r *JournalEvaluationRepository) CreateJournalEvaluation(m model.JournalEvaluation) error {
	return r.db.Create(&m).Error
}

func (r *JournalEvaluationRepository) ListJournalEvaluations() ([]model.JournalEvaluation, error) {
	var journalEvaluations []model.JournalEvaluation
	err := r.db.Preload("JournalInfo").Find(&journalEvaluations).Error
	return journalEvaluations, err
}

func (r *JournalEvaluationRepository) GetJournalEvaluationByJournalIDAndYear(journalID int, year int) (model.JournalEvaluation, error) {
	var journalEvaluation model.JournalEvaluation
	err := r.db.Where("journal_info_id = ? AND year = ?", journalID, year).First(&journalEvaluation).Error
	return journalEvaluation, err
}

func (r *JournalEvaluationRepository) UpdateJournalEvaluation(m model.JournalEvaluation) error {
	return r.db.Save(&m).Error
}

func (r *JournalEvaluationRepository) DeleteJournalEvaluation(journalID int, year int) error {
	return r.db.Delete(&model.JournalEvaluation{}, "journal_info_id = ? AND year = ?", journalID, year).Error
}