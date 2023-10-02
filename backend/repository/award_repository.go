package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type AwardRepository struct {
	db *gorm.DB
}

func NewAwardRepository(db *gorm.DB) *AwardRepository {
	return &AwardRepository{db}
}

func (r *AwardRepository) CreateAward(m model.Award) error {
	return r.db.Create(&m).Error
}

func (r *AwardRepository) ListAwards() ([]model.Award, error) {
	var awards []model.Award
	err := r.db.Preload("Organization").Preload("Tags").Find(&awards).Error
	return awards, err
}

func (r *AwardRepository) UpdateAward(m model.Award) error {
	return r.db.Save(&m).Error
}

func (r *AwardRepository) GetAwardByID(id int) (model.Award, error) {
	var award model.Award
	err := r.db.Preload("Organization").Preload("Tags").Where("id = ?", id).First(&award).Error
	return award, err
}

