package repository

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type PaperRepository struct {
	db *gorm.DB
}

func NewPaperRepository(db *gorm.DB) *PaperRepository {
	return &PaperRepository{db}
}

func (r *PaperRepository) CreatePaper(m model.Paper) error {
	return r.db.Create(&m).Error
}

func (r *PaperRepository) IndexPaper() ([]model.Paper, error) {
	var papers []model.Paper
	err := r.db.Preload("Authors").Preload("ConferenceAndJournal").Find(&papers).Error
	return papers, err
}
