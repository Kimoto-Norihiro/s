package main

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/nkt-scholar/database"
	"github.com/Kimoto-Norihiro/nkt-scholar/handler"
	"github.com/Kimoto-Norihiro/nkt-scholar/middleware"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
	"github.com/Kimoto-Norihiro/nkt-scholar/usecase"
	"github.com/Kimoto-Norihiro/nkt-scholar/utils"
)

func main() {
  utils.LoadEnv()
  
  r := gin.Default()
	r.Use(middleware.Cors())

  const dns = "n000r111:password@tcp(localhost:3306)/nkt_scholar?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := database.NewMySql(dns)
  if err != nil {
    panic(err)
  }

	// Paper
	er := repository.NewPaperRepository(db)
  eu := usecase.NewPaperUseCase(er)
  eh := handler.NewPaperHandler(eu)
  r.POST("/paper", eh.CreatePaper)
  r.GET("/papers", eh.IndexPaper)

	// Publisher
	pr := repository.NewPublisherRepository(db)
	pu := usecase.NewPublisherUseCase(pr)
	ph := handler.NewPublisherHandler(pu)
	r.POST("/publisher", ph.CreatePublisher)
	r.GET("/publishers", ph.IndexPublisher)

	// Author
	ar := repository.NewAuthorRepository(db)
	au := usecase.NewAuthorUseCase(ar)
	ah := handler.NewAuthorHandler(au)
	r.POST("/author", ah.CreateAuthor)
	r.GET("/authors", ah.IndexAuthor)

	// ConferenceAndJournal
	cr := repository.NewConferenceAndJournalRepository(db)
	cu := usecase.NewConferenceAndJournalUseCase(cr)
	ch := handler.NewConferenceAndJournalHandler(cu)
	r.POST("/conference_and_journal", ch.CreateConferenceAndJournal)
	r.GET("/conference_and_journals", ch.IndexConferenceAndJournal)

  r.Run(":8080")
}