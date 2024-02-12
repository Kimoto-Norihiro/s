package author

import (
	"github.com/Kimoto-Norihiro/scholar-manager/domain"
	"github.com/Kimoto-Norihiro/scholar-manager/domain/author"
	"gorm.io/gorm"
)

type repository struct {
}

func NewRepository() author.Repository {
	return &repository{}
}

func (r *repository) CreateAuthor(db *gorm.DB, m domain.Author) error {
	return db.Create(&m).Error
}

func (r *repository) ListAuthors(db *gorm.DB) ([]domain.Author, error) {
	var authors []domain.Author
	err := db.Find(&authors).Error
	return authors, err
}

func (r *repository) UpdateAuthor(db *gorm.DB, m domain.Author) error {
	return db.Save(&m).Error
}

func (r *repository) GetAuthorByID(db *gorm.DB, id int) (domain.Author, error) {
	var author domain.Author
	err := db.Where("id = ?", id).First(&author).Error
	return author, err
}

func (r *repository) DeleteAuthor(db *gorm.DB, id int) error {
	return db.Delete(&domain.Author{}, id).Error
}
