package handler

import (
	"github.com/gin-gonic/gin"
)

type IPaperHandler interface {
	CreatePaper(c *gin.Context)
	IndexPaper(c *gin.Context)
}

type IConferenceAndJournalHandler interface {
	CreateConferenceAndJournal(c *gin.Context)
	IndexConferenceAndJournal(c *gin.Context)
}

type IAuthorHandler interface {
	CreateAuthor(c *gin.Context)
	IndexAuthor(c *gin.Context)
}

type IPublisherHandler interface {
	CreatePublisher(c *gin.Context)
	IndexPublisher(c *gin.Context)
}