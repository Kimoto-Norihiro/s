package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
)

type PublisherUseCase struct {
	validator *validator.Validate
	repository repository.IPublisherRepository
}

func NewPublisherUseCase(r repository.IPublisherRepository) *PublisherUseCase {
	return &PublisherUseCase{
		validator: validator.New(),
		repository: r,
	}
}

func (u *PublisherUseCase) IndexPublisher() ([]model.Publisher, error) {
	return u.repository.IndexPublisher()
}

func (u *PublisherUseCase) CreatePublisher(m model.Publisher) error {
	err := u.validator.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreatePublisher(m)
}