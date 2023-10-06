package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type InternationalConferenceEvaluationUsecase struct {
	repository repository.IInternationalConferenceEvaluationRepository
	validate   *validator.Validate
}

func NewInternationalConferenceEvaluationUsecase(r repository.IInternationalConferenceEvaluationRepository) *InternationalConferenceEvaluationUsecase {
	return &InternationalConferenceEvaluationUsecase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *InternationalConferenceEvaluationUsecase) CreateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateInternationalConferenceEvaluation(m)
}

func (u *InternationalConferenceEvaluationUsecase) ListInternationalConferenceEvaluations() ([]model.InternationalConferenceEvaluation, error) {
	return u.repository.ListInternationalConferenceEvaluations()
}

func (u *InternationalConferenceEvaluationUsecase) UpdateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateInternationalConferenceEvaluation(m)
}

func (u *InternationalConferenceEvaluationUsecase) GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID int, year int) (model.InternationalConferenceEvaluation, error) {
	return u.repository.GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID, year)
}

func (u *InternationalConferenceEvaluationUsecase) DeleteInternationalConferenceEvaluation(internationalConferenceID int, year int) error {
	return u.repository.DeleteInternationalConferenceEvaluation(internationalConferenceID, year)
}
