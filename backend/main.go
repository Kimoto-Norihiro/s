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

	// Publisher
	pr := repository.NewPublisherRepository(db)
	pu := usecase.NewPublisherUsecase(pr)
	ph := handler.NewPublisherHandler(pu)
	r.POST("/publisher", ph.CreatePublisher)
	r.GET("/publishers", ph.IndexPublisher)

	// Author
	ar := repository.NewAuthorRepository(db)
	au := usecase.NewAuthorUsecase(ar)
	ah := handler.NewAuthorHandler(au)
	r.POST("/author", ah.CreateAuthor)
	r.GET("/authors", ah.IndexAuthor)

	// Tag
	tr := repository.NewTagRepository(db)
	tu := usecase.NewTagUsecase(tr)
	th := handler.NewTagHandler(tu)
	r.GET("/tags", th.ListTags)

	// Journal
	jr := repository.NewJournalRepository(db)
	ju := usecase.NewJournalUsecase(jr)
	jh := handler.NewJournalHandler(ju)
	r.POST("/journal", jh.CreateJournal)
	r.GET("/journals", jh.ListJournals)
	r.PUT("/journal", jh.UpdateJournal)

	// JournalInfo
	jir := repository.NewJournalInfoRepository(db)
	jiu := usecase.NewJournalInfoUsecase(jir)
	jih := handler.NewJournalInfoHandler(jiu)
	r.POST("/journal_info", jih.CreateJournalInfo)
	r.GET("/journal_infos", jih.ListJournalInfos)

	// JournalEvaluation
	jer := repository.NewJournalEvaluationRepository(db)
	jeu := usecase.NewJournalEvaluationUsecase(jer)
	jeh := handler.NewJournalEvaluationHandler(jeu)
	r.POST("/journal_evaluation", jeh.CreateJournalEvaluation)
	r.GET("/journal_evaluations", jeh.ListJournalEvaluations)

	r.Run(":8000")
}
