package main

import (
	"github.com/gin-gonic/gin"

	"github.com/Kimoto-Norihiro/scholar-manager/database"
	"github.com/Kimoto-Norihiro/scholar-manager/handler"
	"github.com/Kimoto-Norihiro/scholar-manager/middleware"
	"github.com/Kimoto-Norihiro/scholar-manager/repository"
	"github.com/Kimoto-Norihiro/scholar-manager/usecase"
	"github.com/Kimoto-Norihiro/scholar-manager/utils"
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
	r.POST("/tag", th.CreateTag)
	r.GET("/tags", th.ListTags)

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

	// Journal
	jr := repository.NewJournalRepository(db)
	ju := usecase.NewJournalUsecase(jr, jer)
	jh := handler.NewJournalHandler(ju)
	r.POST("/journal", jh.CreateJournal)
	r.GET("/journals", jh.ListJournals)
	r.PUT("/journal", jh.UpdateJournal)

	// InternationalConferenceInfo
	icir := repository.NewInternationalConferenceInfoRepository(db)
	iciu := usecase.NewInternationalConferenceInfoUsecase(icir)
	icih := handler.NewInternationalConferenceInfoHandler(iciu)
	r.POST("/international_conference_info", icih.CreateInternationalConferenceInfo)
	r.GET("/international_conference_infos", icih.ListInternationalConferenceInfos)
	r.PUT("/international_conference_info", icih.UpdateInternationalConferenceInfo)

	// InternationalConferenceEvaluation
	icer := repository.NewInternationalConferenceEvaluationRepository(db)
	iceu := usecase.NewInternationalConferenceEvaluationUsecase(icer)
	iceh := handler.NewInternationalConferenceEvaluationHandler(iceu)
	r.POST("/international_conference_evaluation", iceh.CreateInternationalConferenceEvaluation)
	r.GET("/international_conference_evaluations", iceh.ListInternationalConferenceEvaluations)
	r.PUT("/international_conference_evaluation", iceh.UpdateInternationalConferenceEvaluation)
	r.GET("/international_conference_evaluation", iceh.GetInternationalConferenceEvaluationByInternationalConferenceIDAndYear)

	// InternationalConference
	icr := repository.NewInternationalConferenceRepository(db)
	icu := usecase.NewInternationalConferenceUsecase(icr, icer)
	ich := handler.NewInternationalConferenceHandler(icu)
	r.POST("/international_conference", ich.CreateInternationalConference)
	r.GET("/international_conferences", ich.ListInternationalConferences)
	r.PUT("/international_conference", ich.UpdateInternationalConference)
	r.GET("/international_conference", ich.GetInternationalConferenceByID)

	// DomesticConferenceInfo
	dcir := repository.NewDomesticConferenceInfoRepository(db)
	dciu := usecase.NewDomesticConferenceInfoUsecase(dcir)
	dcih := handler.NewDomesticConferenceInfoHandler(dciu)
	r.POST("/domestic_conference_info", dcih.CreateDomesticConferenceInfo)
	r.GET("/domestic_conference_infos", dcih.ListDomesticConferenceInfos)
	r.PUT("/domestic_conference_info", dcih.UpdateDomesticConferenceInfo)
	r.GET("/domestic_conference_info", dcih.GetDomesticConferenceInfoByID)

	// DomesticConference
	dcr := repository.NewDomesticConferenceRepository(db)
	dcu := usecase.NewDomesticConferenceUsecase(dcr)
	dch := handler.NewDomesticConferenceHandler(dcu)
	r.POST("/domestic_conference", dch.CreateDomesticConference)
	r.GET("/domestic_conferences", dch.ListDomesticConferences)
	r.PUT("/domestic_conference", dch.UpdateDomesticConference)
	r.GET("/domestic_conference", dch.GetDomesticConferenceByID)

	r.Run(":8000")
}
