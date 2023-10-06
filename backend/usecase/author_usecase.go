package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
)

type AuthorUsecase struct {
	repository repository.IAuthorRepository
	validate   *validator.Validate
}

func NewAuthorUsecase(r repository.IAuthorRepository) *AuthorUsecase {
	return &AuthorUsecase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *AuthorUsecase) CreateAuthor(m model.Author) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateAuthor(m)
}

func (u *AuthorUsecase) ListAuthors() ([]model.Author, error) {
	return u.repository.ListAuthors()
}

func (u *AuthorUsecase) UpdateAuthor(m model.Author) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateAuthor(m)
}

func (u *AuthorUsecase) GetAuthorByID(id int) (model.Author, error) {
	return u.repository.GetAuthorByID(id)
}

func (u *AuthorUsecase) DeleteAuthor(id int) error {
	return u.repository.DeleteAuthor(id)
}
