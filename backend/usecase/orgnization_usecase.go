package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type OrganizationUsecase struct {
	repository repository.IOrganizationRepository
	validated *validator.Validate
}

func NewOrganizationUsecase(r repository.IOrganizationRepository) *OrganizationUsecase {
	return &OrganizationUsecase{
		repository: r,
		validated: validator.New(),
	}
}

func (u *OrganizationUsecase) ListOrganizations() ([]model.Organization, error) {
	return u.repository.ListOrganizations()
}

func (u *OrganizationUsecase) CreateOrganization(m model.Organization) error {
	err := u.validated.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateOrganization(m)
}

func (u *OrganizationUsecase) GetOrganizationByID(id int) (model.Organization, error) {
	return u.repository.GetOrganizationByID(id)
}

func (u *OrganizationUsecase) UpdateOrganization(m model.Organization) error {
	err := u.validated.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateOrganization(m)
}

func (u *OrganizationUsecase) DeleteOrganization(id int) error {
	return u.repository.DeleteOrganization(id)
}

