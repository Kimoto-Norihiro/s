package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
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
	GetJournalByID(id int) (model.Journal, error)
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
	GetJournalEvaluationByJournalIDAndYear(journalID int, year int) (model.JournalEvaluation, error)
}

type IInternationalConferenceInfoRepository interface {
	CreateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
	ListInternationalConferenceInfos() ([]model.InternationalConferenceInfo, error)
	UpdateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
}

type IInternationalConferenceEvaluationRepository interface {
	CreateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	ListInternationalConferenceEvaluations() ([]model.InternationalConferenceEvaluation, error)
	UpdateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID int, year int) (model.InternationalConferenceEvaluation, error)
}

type IInternationalConferenceRepository interface {
	CreateInternationalConference(m model.InternationalConference) error
	ListInternationalConferences() ([]model.InternationalConference, error)
	UpdateInternationalConference(m model.InternationalConference) error
	GetInternationalConferenceByID(id int) (model.InternationalConference, error)
}

type IDomesticConferenceInfoRepository interface {
	CreateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	ListDomesticConferenceInfos() ([]model.DomesticConferenceInfo, error)
	UpdateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	GetDomesticConferenceInfoByID(id int) (model.DomesticConferenceInfo, error)
}

type IDomesticConferenceRepository interface {
	CreateDomesticConference(m model.DomesticConference) error
	ListDomesticConferences() ([]model.DomesticConference, error)
	UpdateDomesticConference(m model.DomesticConference) error
	GetDomesticConferenceByID(id int) (model.DomesticConference, error)
}
