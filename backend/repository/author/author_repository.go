package repository

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/scholar-manager/domain"
)

type AuthorRepository interface {
	CreateAuthor(m domain.Author) error
	ListAuthors() ([]domain.Author, error)
	UpdateAuthor(m domain.Author) error
	GetAuthorByID(id int) (domain.Author, error)
	DeleteAuthor(id int) error
}

type authorRepository struct {
	db *gorm.DB
}

func NewAuthorRepository(db *gorm.DB) AuthorRepository {
	return &authorRepository{db}
}

func (r *authorRepository) CreateAuthor(m domain.Author) error {
	return r.db.Create(&m).Error
}

func (r *authorRepository) ListAuthors() ([]domain.Author, error) {
	var authors []domain.Author
	err := r.db.Find(&authors).Error
	return authors, err
}

func (r *authorRepository) UpdateAuthor(m domain.Author) error {
	return r.db.Save(&m).Error
}

func (r *authorRepository) GetAuthorByID(id int) (domain.Author, error) {
	var author domain.Author
	err := r.db.Where("id = ?", id).First(&author).Error
	return author, err
}

func (r *authorRepository) DeleteAuthor(id int) error {
	return r.db.Delete(&domain.Author{}, id).Error
}
