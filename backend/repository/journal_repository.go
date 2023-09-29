package repository

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"gorm.io/gorm"
)

type JournalRepository struct {
	db *gorm.DB
}

func NewJournalRepository(db *gorm.DB) *JournalRepository {
	return &JournalRepository{db}
}

func (r *JournalRepository) CreateJournal(m model.Journal) error {
	jer := NewJournalEvaluationRepository(r.db)
	_, err := jer.GetJournalEvaluationByJournalIDAndYear(m.JournalInfo.ID, m.Year)
	if err != nil {
		err := jer.CreateJournalEvaluation(model.JournalEvaluation{JournalInfoID: m.JournalInfo.ID, Year: m.Year})
		return err
	}

	return r.db.Create(&m).Error
}

func (r *JournalRepository) ListJournals() ([]model.Journal, error) {
	var journals []model.Journal
	err := r.db.Preload("JournalInfo").Preload("JournalEvaluation").Find(&journals).Error
	return journals, err
}

func (r *JournalRepository) UpdateJournal(m model.Journal) error {
	return r.db.Save(&m).Error
}
