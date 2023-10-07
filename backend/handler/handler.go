package handler

import (
	"github.com/gin-gonic/gin"
)

type ICountryHandler interface {
	CreateCountry(c *gin.Context)
	ListCountries(c *gin.Context)
	GetCountryByID(c *gin.Context)
	UpdateCountry(c *gin.Context)
	DeleteCountry(c *gin.Context)
}

type IAuthorHandler interface {
	CreateAuthor(c *gin.Context)
	ListAuthors(c *gin.Context)
	GetAuthorByID(c *gin.Context)
	UpdateAuthor(c *gin.Context)
	DeleteAuthor(c *gin.Context)
}

type IPublisherHandler interface {
	CreatePublisher(c *gin.Context)
	ListPublishers(c *gin.Context)
	GetPublisherByID(c *gin.Context)
	UpdatePublisher(c *gin.Context)
	DeletePublisher(c *gin.Context)
}

type IJournalHandler interface {
	CreateJournal(c *gin.Context)
	ListJournals(c *gin.Context)
	UpdateJournal(c *gin.Context)
	GetJournalByID(c *gin.Context)
	DeleteJournal(c *gin.Context)
}

type ITagHandler interface {
	CreateTag(c *gin.Context)
	ListTags(c *gin.Context)
	GetTagByID(c *gin.Context)
	UpdateTag(c *gin.Context)
	DeleteTag(c *gin.Context)
}

type IJournalInfoHandler interface {
	CreateJournalInfo(c *gin.Context)
	ListJournalInfos(c *gin.Context)
	UpdateJournalInfo(c *gin.Context)
	GetJournalInfoByID(c *gin.Context)
	DeleteJournalInfo(c *gin.Context)
}

type IJournalEvaluationHandler interface {
	CreateJournalEvaluation(c *gin.Context)
	ListJournalEvaluations(c *gin.Context)
	GetJournalEvaluationByJournalIDAndYear(c *gin.Context)
	UpdateJournalEvaluation(c *gin.Context)
	DeleteJournalEvaluation(c *gin.Context)
}

type IInternationalConferenceInfoHandler interface {
	CreateInternationalConferenceInfo(c *gin.Context)
	ListInternationalConferenceInfos(c *gin.Context)
	UpdateInternationalConferenceInfo(c *gin.Context)
	GetInternationalConferenceInfoByID(c *gin.Context)
	DeleteInternationalConferenceInfo(c *gin.Context)
}

type IInternationalConferenceEvaluationHandler interface {
	CreateInternationalConferenceEvaluation(c *gin.Context)
	ListInternationalConferenceEvaluations(c *gin.Context)
	GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(c *gin.Context)
	UpdateInternationalConferenceEvaluation(c *gin.Context)
	DeleteInternationalConferenceEvaluation(c *gin.Context)
}

type IInternationalConferenceHandler interface {
	CreateInternationalConference(c *gin.Context)
	ListInternationalConferences(c *gin.Context)
	UpdateInternationalConference(c *gin.Context)
	GetInternationalConferenceByID(c *gin.Context)
	DeleteInternationalConference(c *gin.Context)
}

type IDomesticConferenceInfoHandler interface {
	CreateDomesticConferenceInfo(c *gin.Context)
	ListDomesticConferenceInfos(c *gin.Context)
	UpdateDomesticConferenceInfo(c *gin.Context)
	GetDomesticConferenceByID(c *gin.Context)
	DeleteDomesticConferenceInfo(c *gin.Context)
}

type IAwardHandler interface {
	CreateAward(c *gin.Context)
	ListAwards(c *gin.Context)
	GetAwardByID(c *gin.Context)
	UpdateAward(c *gin.Context)
	DeleteAward(c *gin.Context)
}

type IOrganizationHandler interface {
	CreateOrganization(c *gin.Context)
	ListOrganizations(c *gin.Context)
	GetOrganizationByID(c *gin.Context)
	UpdateOrganization(c *gin.Context)
	DeleteOrganization(c *gin.Context)
}

