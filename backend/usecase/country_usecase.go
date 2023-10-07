package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type CountryUsecase struct {
	repository repository.ICountryRepository
	validator *validator.Validate
}

func NewCountryUsecase(r repository.ICountryRepository) *CountryUsecase {
	return &CountryUsecase{
		repository: r,
		validator: validator.New(),
	}
}

func (u *CountryUsecase) ListCountries() ([]model.Country, error) {
	return u.repository.ListCountries()
}

func (u *CountryUsecase) GetCountryByID(id int) (model.Country, error) {
	return u.repository.GetCountryByID(id)
}

func (u *CountryUsecase) CreateCountry(m model.Country) error {
	err := u.validator.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateCountry(m)
}

func (u *CountryUsecase) UpdateCountry(m model.Country) error {
	err := u.validator.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateCountry(m)
}

func (u *CountryUsecase) DeleteCountry(id int) error {
	return u.repository.DeleteCountry(id)
}