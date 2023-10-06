package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
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
	err := r.db.Preload("Publisher").Find(&journalInfos).Error
	return journalInfos, err
}

func (r *JournalInfoRepository) UpdateJournalInfo(m model.JournalInfo) error {
	return r.db.Save(&m).Error
}

func (r *JournalInfoRepository) GetJournalInfoByID(id int) (model.JournalInfo, error) {
	var journalInfo model.JournalInfo
	err := r.db.Preload("Publisher").Where("id = ?", id).First(&journalInfo).Error
	return journalInfo, err
}

func (r *JournalInfoRepository) DeleteJournalInfo(id int) error {
	return r.db.Delete(&model.JournalInfo{}, id).Error
}
