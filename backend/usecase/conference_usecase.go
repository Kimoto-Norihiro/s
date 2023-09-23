package usecase

import (
	"github.com/go-playground/validator/v10"

	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
)

type ConferenceAndJournalUseCase struct {
	repository repository.IConferenceAndJournalRepository
	validate   *validator.Validate
}

func NewConferenceAndJournalUseCase(r repository.IConferenceAndJournalRepository) *ConferenceAndJournalUseCase {
	return &ConferenceAndJournalUseCase{
		repository: r,
		validate:   validator.New(),
	}
}

func (u *ConferenceAndJournalUseCase) IndexConferenceAndJournal() ([]model.ConferenceAndJournal, error) {
	return u.repository.IndexConferenceAndJournal()
}

func (u *ConferenceAndJournalUseCase) CreateConferenceAndJournal(m model.ConferenceAndJournal) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.CreateConferenceAndJournal(m)
}
