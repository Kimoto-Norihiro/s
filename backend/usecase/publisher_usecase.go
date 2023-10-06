package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
)

type PublisherUsecase struct {
	validator  *validator.Validate
	repository repository.IPublisherRepository
}

func NewPublisherUsecase(r repository.IPublisherRepository) *PublisherUsecase {
	return &PublisherUsecase{
		validator:  validator.New(),
		repository: r,
	}
}

func (u *PublisherUsecase) ListPublishers() ([]model.Publisher, error) {
	return u.repository.ListPublishers()
}

func (u *PublisherUsecase) CreatePublisher(m model.Publisher) error {
	err := u.validator.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreatePublisher(m)
}

func (u *PublisherUsecase) UpdatePublisher(m model.Publisher) error {
	err := u.validator.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdatePublisher(m)
}

func (u *PublisherUsecase) GetPublisherByID(id int) (model.Publisher, error) {
	return u.repository.GetPublisherByID(id)
}

func (u *PublisherUsecase) DeletePublisher(id int) error {
	return u.repository.DeletePublisher(id)
}
