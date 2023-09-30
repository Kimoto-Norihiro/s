package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type DomesticConferenceInfoRepository struct {
	db *gorm.DB
}

func NewDomesticConferenceInfoRepository(db *gorm.DB) *DomesticConferenceInfoRepository {
	return &DomesticConferenceInfoRepository{db}
}

func (r *DomesticConferenceInfoRepository) CreateDomesticConferenceInfo(m model.DomesticConferenceInfo) error {
	return r.db.Create(&m).Error
}

func (r *DomesticConferenceInfoRepository) ListDomesticConferenceInfos() ([]model.DomesticConferenceInfo, error) {
	var domesticConferenceInfos []model.DomesticConferenceInfo
	err := r.db.Preload("Publisher").Find(&domesticConferenceInfos).Error
	return domesticConferenceInfos, err
}

func (r *DomesticConferenceInfoRepository) UpdateDomesticConferenceInfo(m model.DomesticConferenceInfo) error {
	return r.db.Save(&m).Error
}

func (r *DomesticConferenceInfoRepository) GetDomesticConferenceInfoByID(id int) (model.DomesticConferenceInfo, error) {
	var domesticConferenceInfo model.DomesticConferenceInfo
	err := r.db.Preload("Publisher").Where("id = ?", id).First(&domesticConferenceInfo).Error
	return domesticConferenceInfo, err
}
