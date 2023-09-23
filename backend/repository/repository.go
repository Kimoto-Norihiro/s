package repository

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

type IPaperRepository interface {
	CreatePaper(m model.Paper) error
	IndexPaper() ([]model.Paper, error)
}

type IConferenceAndJournalRepository interface {
	CreateConferenceAndJournal(m model.ConferenceAndJournal) error
	IndexConferenceAndJournal() ([]model.ConferenceAndJournal, error)
}

type IAuthorRepository interface {
	CreateAuthor(m model.Author) error
	IndexAuthor() ([]model.Author, error)
}

type IPublisherRepository interface {
	CreatePublisher(m model.Publisher) error
	IndexPublisher() ([]model.Publisher, error)
}

type IJournalRepository interface {
	CreateJournal(m model.Journal) error
	ListJournals() ([]model.Journal, error)
}

type ITagRepository interface {
	ListTags() ([]model.Tag, error)
}

type I