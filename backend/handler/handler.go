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
