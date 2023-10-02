package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
)

type IAuthorUsecase interface {
	CreateAuthor(m model.Author) error
	ListAuthors() ([]model.Author, error)
	UpdateAuthor(m model.Author) error
	GetAuthorByID(id int) (model.Author, error)
	DeleteAuthor(m model.Author) error
}

type IPublisherUsecase interface {
	CreatePublisher(m model.Publisher) error
	IndexPublisher() ([]model.Publisher, error)
}

type IJournalUsecase interface {
	CreateJournal(m model.Journal) error
	ListJournals() ([]model.Journal, error)
	UpdateJournal(m model.Journal) error
	GetJournalByID(id int) (model.Journal, error)
}

type ITagUsecase interface {
	CreateTag(m model.Tag) error
	ListTags() ([]model.Tag, error)
}

type IJournalInfoUsecase interface {
	CreateJournalInfo(m model.JournalInfo) error
	ListJournalInfos() ([]model.JournalInfo, error)
}

type IJournalEvaluationUsecase interface {
	CreateJournalEvaluation(m model.JournalEvaluation) error
	ListJournalEvaluations() ([]model.JournalEvaluation, error)
	GetJournalEvaluationByJournalIDAndYear(journalID int, year int) ([]model.JournalEvaluation, error)
}

type IInternationalConferenceInfoUsecase interface {
	CreateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
	ListInternationalConferenceInfos() ([]model.InternationalConferenceInfo, error)
	UpdateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
}

type IInternationalConferenceEvaluationUsecase interface {
	CreateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	ListInternationalConferenceEvaluations() ([]model.InternationalConferenceEvaluation, error)
	GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID int, year int) (model.InternationalConferenceEvaluation, error)
	UpdateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
}

type IInternationalConferenceUsecase interface {
	CreateInternationalConference(m model.InternationalConference) error
	ListInternationalConferences() ([]model.InternationalConference, error)
	UpdateInternationalConference(m model.InternationalConference) error
	GetInternationalConferenceByID(id int) (model.InternationalConference, error)
}

type IDomesticConferenceInfoUsecase interface {
	CreateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	ListDomesticConferenceInfos() ([]model.DomesticConferenceInfo, error)
	GetDomesticConferenceInfoByID(id int) (model.DomesticConferenceInfo, error)
	UpdateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
}

type IDomesticConferenceUsecase interface {
	CreateDomesticConference(m model.DomesticConference) error
	ListDomesticConferences() ([]model.DomesticConference, error)
	UpdateDomesticConference(m model.DomesticConference) error
	GetDomesticConferenceByID(id int) (model.DomesticConference, error)
}

type IAwardUsecase interface {
	CreateAward(m model.Award) error
	ListAwards() ([]model.Award, error)
	UpdateAward(m model.Award) error
	GetAwardByID(id int) (model.Award, error)
}

type IOrganizationUsecase interface {
	CreateOrganization(m model.Organization) error
	ListOrganizations() ([]model.Organization, error)
	UpdateOrganization(m model.Organization) error
	GetOrganizationByID(id int) (model.Organization, error)
}