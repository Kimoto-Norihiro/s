package usecase

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
	"github.com/go-playground/validator/v10"
)

type InternationalConferenceInfoUsecase struct {
	repository repository.IInternationalConferenceInfoRepository
	validate *validator.Validate
}

func NewInternationalConferenceInfoUsecase(r repository.IInternationalConferenceInfoRepository) *InternationalConferenceInfoUsecase {
	return &InternationalConferenceInfoUsecase{
		repository: r,
		validate: validator.New(),
	}
}

func (u *InternationalConferenceInfoUsecase) CreateInternationalConferenceInfo(m model.InternationalConferenceInfo) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateInternationalConferenceInfo(m)
}

func (u *InternationalConferenceInfoUsecase) ListInternationalConferenceInfos() ([]model.InternationalConferenceInfo, error) {
	return u.repository.ListInternationalConferenceInfos()
}

func (u *InternationalConferenceInfoUsecase) UpdateInternationalConferenceInfo(m model.InternationalConferenceInfo) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateInternationalConferenceInfo(m)
}