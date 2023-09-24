package repository

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"gorm.io/gorm"
)

type TagRepository struct {
	db *gorm.DB
}

func NewTagRepository(db *gorm.DB) *TagRepository {
	return &TagRepository{db}
}

func (r *TagRepository) CreateTag(m model.Tag) error {
	return r.db.Create(&m).Error
}

func (r *TagRepository) ListTags() ([]model.Tag, error) {
	var tags []model.Tag
	err := r.db.Find(&tags).Error
	return tags, err
}