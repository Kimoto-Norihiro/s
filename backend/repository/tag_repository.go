package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
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

func (r *TagRepository) UpdateTag(m model.Tag) error {
	return r.db.Save(&m).Error
}

func (r *TagRepository) GetTagByID(id int) (model.Tag, error) {
	var tag model.Tag
	err := r.db.Where("id = ?", id).First(&tag).Error
	return tag, err
}

func (r *TagRepository) DeleteTag(id int) error {
	return r.db.Delete(&model.Tag{}, id).Error
}