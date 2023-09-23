package repository

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type AuthorRepository struct {
	db *gorm.DB
}

func NewAuthorRepository(db *gorm.DB) *AuthorRepository {
	return &AuthorRepository{db}
}

func (r *AuthorRepository) IndexAuthor() ([]model.Author, error) {
	var authors []model.Author
	err := r.db.Find(&authors).Error
	return authors, err
}

func (r *AuthorRepository) CreateAuthor(m model.Author) error {
	return r.db.Create(&m).Error
}

