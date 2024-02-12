package author

import (
	"gorm.io/gorm"

	"github.com/Kimoto-Norihiro/scholar-manager/domain"
)

type Repository interface {
	CreateAuthor(db *gorm.DB, m domain.Author) error
	ListAuthors(db *gorm.DB) ([]domain.Author, error)
	UpdateAuthor(db *gorm.DB, m domain.Author) error
	GetAuthorByID(db *gorm.DB, id int) (domain.Author, error)
	DeleteAuthor(db *gorm.DB, id int) error
}
