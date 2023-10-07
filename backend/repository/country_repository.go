package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type CountryRepository struct {
	db *gorm.DB
}

func NewCountryRepository(db *gorm.DB) *CountryRepository {
	return &CountryRepository{db}
}

func (r *CountryRepository) CreateCountry(m model.Country) error {
	return r.db.Create(&m).Error
}

func (r *CountryRepository) ListCountries() ([]model.Country, error) {
	var countries []model.Country
	err := r.db.Find(&countries).Error
	return countries, err
}

func (r *CountryRepository) UpdateCountry(m model.Country) error {
	return r.db.Save(&m).Error
}

func (r *CountryRepository) GetCountryByID(id int) (model.Country, error) {
	var country model.Country
	err := r.db.Where("id = ?", id).First(&country).Error
	return country, err
}

func (r *CountryRepository) DeleteCountry(id int) error {
	return r.db.Delete(&model.Country{}, id).Error
}
