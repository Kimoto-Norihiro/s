package handler

import (
	"github.com/gin-gonic/gin"
)

type IAuthorHandler interface {
	CreateAuthor(c *gin.Context)
	IndexAuthor(c *gin.Context)
}

type IPublisherHandler interface {
	CreatePublisher(c *gin.Context)
	IndexPublisher(c *gin.Context)
}

type IJournalHandler interface {
	CreateJournal(c *gin.Context)
	ListJournals(c *gin.Context)
	UpdateJournal(c *gin.Context)
}

type ITagHandler interface {
	CreateTag(c *gin.Context)
	ListTags(c *gin.Context)
}

type IJournalInfoHandler interface {
	CreateJournalInfo(c *gin.Context)
	ListJournalInfos(c *gin.Context)
}

type IJournalEvaluationHandler interface {
	CreateJournalEvaluation(c *gin.Context)
	ListJournalEvaluations(c *gin.Context)
	GetJournalEvaluationByJournalIDAndYear(c *gin.Context)
}

type IInternationalConferenceInfoHandler interface {
	CreateInternationalConferenceInfo(c *gin.Context)
	ListInternationalConferenceInfos(c *gin.Context)
	UpdateInternationalConferenceInfo(c *gin.Context)
}

type IInternationalConferenceEvaluationHandler interface {
	CreateInternationalConferenceEvaluation(c *gin.Context)
	ListInternationalConferenceEvaluations(c *gin.Context)
	GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear(c *gin.Context)
	UpdateInternationalConferenceEvaluation(c *gin.Context)
}

type IInternationalConferenceHandler interface {
	CreateInternationalConference(c *gin.Context)
	ListInternationalConferences(c *gin.Context)
	UpdateInternationalConference(c *gin.Context)
	GetInternationalConferenceByID(c *gin.Context)
}

type IDomesticConferenceInfoHandler interface {
	CreateDomesticConferenceInfo(c *gin.Context)
	ListDomesticConferenceInfos(c *gin.Context)
	UpdateDomesticConferenceInfo(c *gin.Context)
	GetDomesticConferenceByID(c *gin.Context)
}

