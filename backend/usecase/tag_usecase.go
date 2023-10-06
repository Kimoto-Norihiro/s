package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type TagUsecase struct {
	repository repository.ITagRepository
	validate   *validator.Validate
}

func NewTagUsecase(r repository.ITagRepository) *TagUsecase {
	return &TagUsecase{
		repository: r,
		validate:   validator.New(),
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

func (u *TagUsecase) UpdateTag(m model.Tag) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateTag(m)
}

func (u *TagUsecase) GetTagByID(id int) (model.Tag, error) {
	return u.repository.GetTagByID(id)
}

func (u *TagUsecase) DeleteTag(id int) error {
	return u.repository.DeleteTag(id)
}