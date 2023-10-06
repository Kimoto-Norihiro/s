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

func (pr *PublisherRepository) CreatePublisher(m model.Publisher) error {
	return pr.db.Create(&m).Error
}

func (pr *PublisherRepository) ListPublishers() ([]model.Publisher, error) {
	var publishers []model.Publisher
	err := pr.db.Find(&publishers).Error
	return publishers, err
}

func (pr *PublisherRepository) UpdatePublisher(m model.Publisher) error {
	return pr.db.Save(&m).Error
}

func (pr *PublisherRepository) GetPublisherByID(id int) (model.Publisher, error) {
	var publisher model.Publisher
	err := pr.db.Where("id = ?", id).First(&publisher).Error
	return publisher, err
}

func (pr *PublisherRepository) DeletePublisher(id int) error {
	return pr.db.Delete(&model.Publisher{}, id).Error
}