package repository

import (
	"log"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type JournalRepository struct {
	db *gorm.DB
}

func NewJournalRepository(db *gorm.DB) *JournalRepository {
	return &JournalRepository{db}
}

func (r *JournalRepository) CreateJournal(m model.Journal) error {
	log.Print(m)
	return r.db.Create(&m).Error
}

func (r *JournalRepository) ListJournals() ([]model.Journal, error) {
	var journals []model.Journal
	err := r.db.Preload("Authors").Preload("JournalInfo").Preload("Evaluation").Preload("Tags").Find(&journals).Error
	log.Print(journals)
	return journals, err
}

func (r *JournalRepository) UpdateJournal(m model.Journal) error {
	return r.db.Save(&m).Error
}

func (r *JournalRepository) GetJournalByID(id int) (model.Journal, error) {
	var journal model.Journal
	err := r.db.Preload("Authors").Preload("JournalInfo").Preload("Evaluation").Preload("Tags").Where("id = ?", id).First(&journal).Error
	return journal, err
}

func (r *JournalRepository) DeleteJournal(id int) error {
	return r.db.Delete(&model.Journal{}, id).Error
}