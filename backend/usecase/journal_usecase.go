package usecase

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
	"github.com/go-playground/validator/v10"
)

type JournalUsecase struct {
	repository repository.IJournalRepository
	validate *validator.Validate
}

func NewJournalUsecase(r repository.IJournalRepository) *JournalUsecase {
	return &JournalUsecase{
		repository: r,
		validate: validator.New(),
	}
}

func (u *JournalUsecase) CreateJournal(m model.Journal) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateJournal(m)
}

func (u *JournalUsecase) ListJournals() ([]model.Journal, error) {
	return u.repository.ListJournals()
}

func (u *JournalUsecase) UpdateJournal(m model.Journal) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateJournal(m)
}