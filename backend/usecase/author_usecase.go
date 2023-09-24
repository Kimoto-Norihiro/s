package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
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

func (u *AuthorUsecase) IndexAuthor() ([]model.Author, error) {
	return u.repository.IndexAuthor()
}

func (u *AuthorUsecase) CreateAuthor(m model.Author) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateAuthor(m)
}
