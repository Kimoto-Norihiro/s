package repository

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"gorm.io/gorm"
)

type JournalInfoRepository struct {
	db *gorm.DB
}

func NewJournalInfoRepository(db *gorm.DB) *JournalInfoRepository {
	return &JournalInfoRepository{db}
}

func (r *JournalInfoRepository) CreateJournalInfo(m model.JournalInfo) error {
	return r.db.Create(&m).Error
}

func (r *JournalInfoRepository) ListJournalInfos() ([]model.JournalInfo, error) {
	var journalInfos []model.JournalInfo
	err := r.db.Find(&journalInfos).Error
	return journalInfos, err
}
