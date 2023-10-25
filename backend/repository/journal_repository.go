package repository

import (
	"log"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type JournalRepository struct {
	db *gorm.DB
}

func NewJournalRepository(db *gorm.DB) *JournalRepository {
	return &JournalRepository{db}
}

func (r *JournalRepository) CreateJournal(m model.Journal) error {
	log.Print(m)
	return r.db.Create(&m).Error
}

func (r *JournalRepository) ListJournals(filter model.JournalFilter) ([]model.Journal, error) {
	var journals []model.Journal
	db := ApplyJournalFilter(r.db, filter)
	err := db.Find(&journals).Error
	return journals, err
}

func (r *JournalRepository) UpdateJournal(m model.Journal) error {
	return r.db.Save(&m).Error
}

func (r *JournalRepository) GetJournalByID(id int) (model.Journal, error) {
	var journal model.Journal
	err := r.db.Preload("JournalInfo.Publisher").Preload(clause.Associations).Where("id = ?", id).First(&journal).Error
	return journal, err
}

func (r *JournalRepository) DeleteJournal(id int) error {
	return r.db.Delete(&model.Journal{}, id).Error
}

func ApplyJournalFilter(db *gorm.DB, filter model.JournalFilter) *gorm.DB {
	if filter.Title != "" {
		log.Print(filter.Title)
		db = db.Where("title LIKE ?", "%"+filter.Title+"%")
	}
	if filter.Authors != nil {
		log.Print(filter.Authors)
		ids := []int{}
		for _, author := range filter.Authors {
			ids = append(ids, author.ID)
		}
		db = db.Joins("JOIN journal_authors ON journal_authors.journal_id = journals.id").
			Where("journal_authors.author_id IN (?)", ids).Preload("Authors")
	} else {
		db = db.Preload("Authors")
	}
	if filter.JournalInfo != (model.JournalInfo{}) {
		log.Print(filter.JournalInfo)
		db = db.Where("journal_info_id = ?", filter.JournalInfo.ID).Preload("JournalInfo")
	} else {
		db = db.Preload("JournalInfo")
	}
	if filter.Tags != nil {
		log.Print(filter.Tags)
		ids := []int{}
		for _, tag := range filter.Tags {
			ids = append(ids, tag.ID)
		}
		db = db.Joins("JOIN journal_tags ON journal_tags.journal_id = journals.id").
			Where("journal_tags.tag_id IN (?)", ids).Preload("Tags")
	} else {
		db = db.Preload("Tags")
	}
	return db
}
