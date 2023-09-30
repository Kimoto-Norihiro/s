package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type DomesticConferenceInfoUsecase struct {
	repository repository.IDomesticConferenceInfoRepository
	validate   *validator.Validate
}

func NewDomesticConferenceInfoUsecase(r repository.IDomesticConferenceInfoRepository) *DomesticConferenceInfoUsecase {
	return &DomesticConferenceInfoUsecase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *DomesticConferenceInfoUsecase) CreateDomesticConferenceInfo(m model.DomesticConferenceInfo) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateDomesticConferenceInfo(m)
}

func (u *DomesticConferenceInfoUsecase) ListDomesticConferenceInfos() ([]model.DomesticConferenceInfo, error) {
	return u.repository.ListDomesticConferenceInfos()
}

func (u *DomesticConferenceInfoUsecase) UpdateDomesticConferenceInfo(m model.DomesticConferenceInfo) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateDomesticConferenceInfo(m)
}

func (u *DomesticConferenceInfoUsecase) GetDomesticConferenceInfoByID(id int) (model.DomesticConferenceInfo, error) {
	return u.repository.GetDomesticConferenceInfoByID(id)
}
