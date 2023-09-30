package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type InternationalConferenceUsecase struct {
	repository     repository.IInternationalConferenceRepository
	evaluationRepo repository.IInternationalConferenceEvaluationRepository
	validate       *validator.Validate
}

func NewInternationalConferenceUsecase(r repository.IInternationalConferenceRepository, e repository.IInternationalConferenceEvaluationRepository) *InternationalConferenceUsecase {
	return &InternationalConferenceUsecase{
		repository:     r,
		evaluationRepo: e,
		validate:       validator.New(),
	}
}

func (u *InternationalConferenceUsecase) CreateInternationalConference(m model.InternationalConference) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateInternationalConference(m)
}

func (u *InternationalConferenceUsecase) ListInternationalConferences() ([]model.InternationalConference, error) {
	return u.repository.ListInternationalConferences()
}

func (u *InternationalConferenceUsecase) GetInternationalConferenceByID(id int) (model.InternationalConference, error) {
	return u.repository.GetInternationalConferenceByID(id)
}

func (u *InternationalConferenceUsecase) UpdateInternationalConference(m model.InternationalConference) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateInternationalConference(m)
}
