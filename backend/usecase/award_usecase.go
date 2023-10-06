package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/go-playground/validator/v10"
)

type AwardUsecase struct {
	repository repository.IAwardRepository
	validate *validator.Validate
}

func NewAwardUsecase(r repository.IAwardRepository) *AwardUsecase {
	return &AwardUsecase{
		repository: r,
		validate: validator.New(),
	}
}

// list
func (u *AwardUsecase) ListAwards() ([]model.Award, error) {
	return u.repository.ListAwards()
}

// create
func (u *AwardUsecase) CreateAward(m model.Award) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateAward(m)
}

// get
func (u *AwardUsecase) GetAwardByID(id int) (model.Award, error) {
	return u.repository.GetAwardByID(id)
}

// update
func (u *AwardUsecase) UpdateAward(m model.Award) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateAward(m)
}

// delete
func (u *AwardUsecase) DeleteAward(id int) error {
	return u.repository.DeleteAward(id)
}