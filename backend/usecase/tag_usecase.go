package usecase

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
	"github.com/go-playground/validator/v10"
)

type TagUsecase struct {
	repository repository.ITagRepository
	validate *validator.Validate
}

func NewTagUsecase(r repository.ITagRepository) *TagUsecase {
	return &TagUsecase{
		repository: r,
		validate: validator.New(),
	}
}

func (u *TagUsecase) ListTags() ([]model.Tag, error) {
	return u.repository.ListTags()
}

func (u *TagUsecase) CreateTag(m model.Tag) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateTag(m)
}
