package repository

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
)

type AuthorRepository struct {
	db *gorm.DB
}

func NewAuthorRepository(db *gorm.DB) *AuthorRepository {
	return &AuthorRepository{db}
}

func (r *AuthorRepository) CreateAuthor(m model.Author) error {
	return r.db.Create(&m).Error
}

func (r *AuthorRepository) ListAuthors() ([]model.Author, error) {
	var authors []model.Author
	err := r.db.Find(&authors).Error
	return authors, err
}

func (r *AuthorRepository) UpdateAuthor(m model.Author) error {
	return r.db.Save(&m).Error
}

func (r *AuthorRepository) GetAuthorByID(id int) (model.Author, error) {
	var author model.Author
	err := r.db.Where("id = ?", id).First(&author).Error
	return author, err
}

func (r *AuthorRepository) DeleteAuthor(m model.Author) error {
	return r.db.Delete(&m).Error
}