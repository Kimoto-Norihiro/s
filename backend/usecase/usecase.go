package usecase

import (
	"github.com/Kimoto-Norihiro/scholar-manager/model"
)

type ICountryUsecase interface {
	CreateCountry(m model.Country) error
	ListCountries() ([]model.Country, error)
	UpdateCountry(m model.Country) error
	GetCountryByID(id int) (model.Country, error)
	DeleteCountry(id int) error
}

type IAuthorUsecase interface {
	CreateAuthor(m model.Author) error
	ListAuthors() ([]model.Author, error)
	UpdateAuthor(m model.Author) error
	GetAuthorByID(id int) (model.Author, error)
	DeleteAuthor(id int) error
}

type IPublisherUsecase interface {
	CreatePublisher(m model.Publisher) error
	ListPublishers() ([]model.Publisher, error)
	UpdatePublisher(m model.Publisher) error
	GetPublisherByID(id int) (model.Publisher, error)
	DeletePublisher(id int) error
}

type IJournalUsecase interface {
	CreateJournal(m model.Journal) error
	ListJournals(filter model.JournalFilter) ([]model.Journal, error)
	UpdateJournal(m model.Journal) error
	GetJournalByID(id int) (model.Journal, error)
	DeleteJournal(id int) error
}

type ITagUsecase interface {
	CreateTag(m model.Tag) error
	ListTags() ([]model.Tag, error)
	UpdateTag(m model.Tag) error
	GetTagByID(id int) (model.Tag, error)
	DeleteTag(id int) error
}

type IJournalInfoUsecase interface {
	CreateJournalInfo(m model.JournalInfo) error
	ListJournalInfos() ([]model.JournalInfo, error)
	UpdateJournalInfo(m model.JournalInfo) error
	GetJournalInfoByID(id int) (model.JournalInfo, error)
	DeleteJournalInfo(id int) error
}

type IJournalEvaluationUsecase interface {
	CreateJournalEvaluation(m model.JournalEvaluation) error
	ListJournalEvaluations() ([]model.JournalEvaluation, error)
	GetJournalEvaluationByJournalIDAndYear(journalID int, year int) ([]model.JournalEvaluation, error)
	UpdateJournalEvaluation(m model.JournalEvaluation) error
	DeleteJournalEvaluation(journalID int, year int) error
}

type IInternationalConferenceInfoUsecase interface {
	CreateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
	ListInternationalConferenceInfos() ([]model.InternationalConferenceInfo, error)
	UpdateInternationalConferenceInfo(m model.InternationalConferenceInfo) error
	GetInternationalConferenceInfoByID(id int) (model.InternationalConferenceInfo, error)
	DeleteInternationalConferenceInfo(id int) error
}

type IInternationalConferenceEvaluationUsecase interface {
	CreateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	ListInternationalConferenceEvaluations() ([]model.InternationalConferenceEvaluation, error)
	GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(internationalConferenceID int, year int) (model.InternationalConferenceEvaluation, error)
	UpdateInternationalConferenceEvaluation(m model.InternationalConferenceEvaluation) error
	DeleteInternationalConferenceEvaluation(internationalConferenceID int, year int) error
}

type IInternationalConferenceUsecase interface {
	CreateInternationalConference(m model.InternationalConference) error
	ListInternationalConferences(filter model.InternationalConferenceFilter) ([]model.InternationalConference, error)
	UpdateInternationalConference(m model.InternationalConference) error
	GetInternationalConferenceByID(id int) (model.InternationalConference, error)
	DeleteInternationalConference(id int) error
}

type IDomesticConferenceInfoUsecase interface {
	CreateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	ListDomesticConferenceInfos() ([]model.DomesticConferenceInfo, error)
	GetDomesticConferenceInfoByID(id int) (model.DomesticConferenceInfo, error)
	UpdateDomesticConferenceInfo(m model.DomesticConferenceInfo) error
	DeleteDomesticConferenceInfo(id int) error
}

type IDomesticConferenceUsecase interface {
	CreateDomesticConference(m model.DomesticConference) error
	ListDomesticConferences(filter model.DomesticConferenceFilter) ([]model.DomesticConference, error)
	UpdateDomesticConference(m model.DomesticConference) error
	GetDomesticConferenceByID(id int) (model.DomesticConference, error)
	DeleteDomesticConference(id int) error
}

type IAwardUsecase interface {
	CreateAward(m model.Award) error
	ListAwards(filter model.AwardFilter) ([]model.Award, error)
	UpdateAward(m model.Award) error
	GetAwardByID(id int) (model.Award, error)
	DeleteAward(id int) error
}

type IOrganizationUsecase interface {
	CreateOrganization(m model.Organization) error
	ListOrganizations() ([]model.Organization, error)
	UpdateOrganization(m model.Organization) error
	GetOrganizationByID(id int) (model.Organization, error)
	DeleteOrganization(id int) error
}
