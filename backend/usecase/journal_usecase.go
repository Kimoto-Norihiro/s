package usecase

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"
	"github.com/Kimoto-Norihiro/nkt-scholar/repository"
	"github.com/go-playground/validator/v10"
)

type JournalUsecase struct {
	repository repository.IJournalRepository
	evaluationRepository repository.IJournalEvaluationRepository
	validate *validator.Validate
}

func NewJournalUsecase(r repository.IJournalRepository, er repository.IJournalEvaluationRepository) *JournalUsecase {
	return &JournalUsecase{
		repository: r,
		evaluationRepository: er,
		validate: validator.New(),
	}
}

func (u *JournalUsecase) CreateJournal(m model.Journal) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	_, err = u.evaluationRepository.GetJournalEvaluationByJournalIDAndYear(m.JournalInfo.ID, m.Year)
	if err != nil {
		err := u.evaluationRepository.CreateJournalEvaluation(model.JournalEvaluation{
			JournalInfoID: m.JournalInfo.ID,
			Year: m.Year,
		})
		if err != nil {
			return err
		}
	}
	return u.repository.CreateJournal(m)
}

func (u *JournalUsecase) ListJournals() ([]model.Journal, error) {
	return u.repository.ListJournals()
}

func (u *JournalUsecase) UpdateJournal(m model.Journal) error {
	err := u.validate.Struct(m)
	if err != nil {
		return err
	}
	return u.repository.UpdateJournal(m)
}

func (u *JournalUsecase) GetJournalByID(id int) (model.Journal, error) {
	return u.repository.GetJournalByID(id)
}