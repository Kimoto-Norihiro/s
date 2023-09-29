package repository

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
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

func (r *JournalEvaluationRepository) GetJournalEvaluationByJournalIDAndYear(journalID uint, year int) (model.JournalEvaluation, error) {
	var journalEvaluation model.JournalEvaluation
	err := r.db.Where("journal_id = ? AND year = ?", journalID, year).First(&journalEvaluation).Error
	return journalEvaluation, err
}