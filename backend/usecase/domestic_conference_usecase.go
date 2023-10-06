package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type DomesticConferenceUsecase struct {
	repository repository.IDomesticConferenceRepository
	validate   *validator.Validate
}

func NewDomesticConferenceUsecase(r repository.IDomesticConferenceRepository) *DomesticConferenceUsecase {
	return &DomesticConferenceUsecase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *DomesticConferenceUsecase) ListDomesticConferences() ([]model.DomesticConference, error) {
	return u.repository.ListDomesticConferences()
}

func (u *DomesticConferenceUsecase) CreateDomesticConference(m model.DomesticConference) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateDomesticConference(m)
}

func (u *DomesticConferenceUsecase) UpdateDomesticConference(m model.DomesticConference) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateDomesticConference(m)
}

func (u *DomesticConferenceUsecase) GetDomesticConferenceByID(id int) (model.DomesticConference, error) {
	return u.repository.GetDomesticConferenceByID(id)
}

func (u *DomesticConferenceUsecase) DeleteDomesticConference(id int) error {
	return u.repository.DeleteDomesticConference(id)
}
