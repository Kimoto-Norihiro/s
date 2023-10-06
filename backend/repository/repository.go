package repository

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
)

type IAuthorRepository interface {
	CreateAuthor(m model.Author) error
	ListAuthors() ([]model.Author, error)
	GetAuthorByID(id int) (model.Author, error)
	UpdateAuthor(m model.Author) error
	DeleteAuthor(id int) error
}

type IPublisherRepository interface {
	CreatePublisher(m model.Publisher) error
	ListPublishers() ([]model.Publisher, error)
	GetAuthorByID(id int) (model.Author, error)
	UpdateAuthor(m model.Author) error
	DeleteAuthor(id int) error
}

type IJournalRepository interface {
	CreateJournal(m model.Journal) error
	ListJournals() ([]model.Journal, error)
	UpdateJournal(m model.Journal) error
	GetJournalByID(id int) (model.Journal, error)
	DeleteJournal(id int) error
}

type ITagRepository interface {
	CreateTag(m model.Tag) error
	ListTags() ([]model.Tag, error)
	GetTagByID(id int) (model.Tag, error)
	UpdateTag(m model.Tag) error
	DeleteTag(id int) error
}

type IJournalInfoRepository interface {
	CreateJournalInfo(m model.JournalInfo) error
	ListJournalInfos() ([]model.JournalInfo, error)
	UpdateJournalInfo(m model.JournalInfo) error
	GetJournalInfoByID(id int) (model.JournalInfo, error)
	DeleteJournalInfo(id int) error
}

type IJournalEvaluationRepository interface {
	CreateJournalEvaluation(m model.JournalEvaluation) error
	ListJournalEvaluations() ([]model.JournalEvaluation, error)
	GetJournalEvaluationByJournalIDAndYear(journalID int, year int) (model.JournalEvaluation, error)
	UpdateJournalEvaluation(m model.JournalEvaluation) error
	DeleteJournalEvaluation(journalID int, year int) error
}

type IInternationalConferenceInfoRepository interface {
	CreateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
	ListInternationalConferenceInfos() ([]model.InternationalConferenceInfo, error)
	UpdateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
	GetInternationalConferenceInfoByID(id int) (model.InternationalConferenceInfo, error)
	DeleteInternationalConferenceInfo(id int) error
}

type IInternationalConferenceEvaluationRepository interface {
	CreateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	ListInternationalConferenceEvaluations() ([]model.InternationalConferenceEvaluation, error)
	UpdateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID int, year int) (model.InternationalConferenceEvaluation, error)
	DeleteInternationalConferenceEvaluation(internationalConferenceID int, year int) error
}

type IInternationalConferenceRepository interface {
	CreateInternationalConference(m model.InternationalConference) error
	ListInternationalConferences() ([]model.InternationalConference, error)
	UpdateInternationalConference(m model.InternationalConference) error
	GetInternationalConferenceByID(id int) (model.InternationalConference, error)
	DeleteInternationalConference(id int) error
}

type IDomesticConferenceInfoRepository interface {
	CreateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	ListDomesticConferenceInfos() ([]model.DomesticConferenceInfo, error)
	UpdateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	GetDomesticConferenceInfoByID(id int) (model.DomesticConferenceInfo, error)
	DeleteDomesticConferenceInfo(id int) error
}

type IDomesticConferenceRepository interface {
	CreateDomesticConference(m model.DomesticConference) error
	ListDomesticConferences() ([]model.DomesticConference, error)
	UpdateDomesticConference(m model.DomesticConference) error
	GetDomesticConferenceByID(id int) (model.DomesticConference, error)
	DeleteDomesticConference(id int) error
}

type IAwardRepository interface {
	CreateAward(m model.Award) error
	ListAwards() ([]model.Award, error)
	UpdateAward(m model.Award) error
	GetAwardByID(id int) (model.Award, error)
	DeleteAward(id int) error
}

type IOrganizationRepository interface {
	CreateOrganization(m model.Organization) error
	ListOrganizations() ([]model.Organization, error)
	UpdateOrganization(m model.Organization) error
	GetOrganizationByID(id int) (model.Organization, error)
	DeleteOrganization(id int) error
}
