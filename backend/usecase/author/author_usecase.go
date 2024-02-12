package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/domain"
	repository "github.com/Kimoto-Norihiro/scholar-manager/repository/author"
)

type AuthorUsecase interface {
	CreateAuthor(m domain.Author) error
	ListAuthors() ([]domain.Author, error)
	UpdateAuthor(m domain.Author) error
	GetAuthorByID(id int) (domain.Author, error)
	DeleteAuthor(id int) error
}

type authorUsecase struct {
	repo repository.AuthorRepository
}

func NewAuthorUsecase(repo repository.AuthorRepository) AuthorUsecase {
	return &authorUsecase{
		repo: repo,
	}
}

func (u *authorUsecase) CreateAuthor(m domain.Author) error {
	return u.repo.CreateAuthor(m)
}

func (u *authorUsecase) ListAuthors() ([]domain.Author, error) {
	return u.repo.ListAuthors()
}

func (u *authorUsecase) UpdateAuthor(m domain.Author) error {
	return u.repo.UpdateAuthor(m)
}

func (u *authorUsecase) GetAuthorByID(id int) (domain.Author, error) {
	return u.repo.GetAuthorByID(id)
}

func (u *authorUsecase) DeleteAuthor(id int) error {
	return u.repo.DeleteAuthor(id)
}
