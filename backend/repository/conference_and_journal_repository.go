package repository

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type ConferenceAndJournalRepository struct {
	db *gorm.DB
}

func NewConferenceAndJournalRepository(db *gorm.DB) *ConferenceAndJournalRepository {
	return &ConferenceAndJournalRepository{db}
}

func (cr *ConferenceAndJournalRepository) IndexConferenceAndJournal() ([]model.ConferenceAndJournal, error) {
	var conferences []model.ConferenceAndJournal
	err := cr.db.Preload("Publisher").Preload("PaperKind").Find(&conferences).Error
	return conferences, err
}

func (cr *ConferenceAndJournalRepository) CreateConferenceAndJournal(m model.ConferenceAndJournal) error {
	return cr.db.Create(&m).Error
}