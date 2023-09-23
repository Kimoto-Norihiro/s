package usecase

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type IPaperUseCase interface {
	CreatePaper(m model.Paper) error
	IndexPaper() ([]model.Paper, error)
}

type IConferenceAndJournalUseCase interface {
	CreateConferenceAndJournal(m model.ConferenceAndJournal) error
	IndexConferenceAndJournal() ([]model.ConferenceAndJournal, error)
}

type IAuthorUseCase interface {
	CreateAuthor(m model.Author) error
	IndexAuthor() ([]model.Author, error)
}

type IPublisherUseCase interface {
	CreatePublisher(m model.Publisher) error
	IndexPublisher() ([]model.Publisher, error)
}
