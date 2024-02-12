package author

import (
	"github.com/Kimoto-Norihiro/scholar-manager/domain"
	"github.com/Kimoto-Norihiro/scholar-manager/domain/author"
	"gorm.io/gorm"
)

type Usecase interface {
	CreateAuthor(m domain.Author) error
	ListAuthors() ([]domain.Author, error)
	UpdateAuthor(m domain.Author) error
	GetAuthorByID(id int) (domain.Author, error)
	DeleteAuthor(id int) error
}

type usecase struct {
	db   *gorm.DB
	repo author.Repository
}

func NewUsecase(db *gorm.DB, repo author.Repository) Usecase {
	return &usecase{
		db:   db,
		repo: repo,
	}
}

func (u *usecase) CreateAuthor(m domain.Author) error {
	return u.repo.CreateAuthor(u.db, m)
}

func (u *usecase) ListAuthors() ([]domain.Author, error) {
	return u.repo.ListAuthors(u.db)
}

func (u *usecase) UpdateAuthor(m domain.Author) error {
	return u.repo.UpdateAuthor(u.db, m)
}

func (u *usecase) GetAuthorByID(id int) (domain.Author, error) {
	return u.repo.GetAuthorByID(u.db, id)
}

func (u *usecase) DeleteAuthor(id int) error {
	return u.repo.DeleteAuthor(u.db, id)
}
