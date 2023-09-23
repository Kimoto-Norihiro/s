package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
)

type AuthorUseCase struct {
	repository repository.IAuthorRepository
	validate *validator.Validate
}

func NewAuthorUseCase(r repository.IAuthorRepository) *AuthorUseCase {
	return &AuthorUseCase{
		repository: r,
		validate: validator.New(),
	}
}

func (u *AuthorUseCase) IndexAuthor() ([]model.Author, error) {
	return u.repository.IndexAuthor()
}

func (u *AuthorUseCase) CreateAuthor(m model.Author) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateAuthor(m)
}