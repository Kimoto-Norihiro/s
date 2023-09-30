package repository

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
)

type PublisherRepository struct {
	db *gorm.DB
}

func NewPublisherRepository(db *gorm.DB) *PublisherRepository {
	return &PublisherRepository{db}
}

func (pr *PublisherRepository) IndexPublisher() ([]model.Publisher, error) {
	var publishers []model.Publisher
	err := pr.db.Find(&publishers).Error
	return publishers, err
}

func (pr *PublisherRepository) CreatePublisher(m model.Publisher) error {
	return pr.db.Create(&m).Error
}
