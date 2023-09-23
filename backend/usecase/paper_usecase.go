package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
)

type PaperUseCase struct {
	repository repository.IPaperRepository
	validate *validator.Validate
}

func NewPaperUseCase(r repository.IPaperRepository) *PaperUseCase {
	return &PaperUseCase{
		repository: r,
		validate: validator.New(),
	}
}

func (u *PaperUseCase) CreatePaper(m model.Paper) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreatePaper(m)
}

func (u *PaperUseCase) IndexPaper() ([]model.Paper, error) {
	return u.repository.IndexPaper()
}