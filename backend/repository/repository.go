package repository

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
)

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
	UpdateJournal(m model.Journal) error
}

type ITagRepository interface {
	CreateTag(m model.Tag) error
	ListTags() ([]model.Tag, error)
}

type IJournalInfoRepository interface {
	CreateJournalInfo(m model.JournalInfo) error
	ListJournalInfos() ([]model.JournalInfo, error)
}

type IJournalEvaluationRepository interface {
	CreateJournalEvaluation(m model.JournalEvaluation) error
	ListJournalEvaluations() ([]model.JournalEvaluation, error)
}
