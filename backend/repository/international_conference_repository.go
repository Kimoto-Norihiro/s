package repository

import (
	"log"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type InternationalConferenceRepository struct {
	db *gorm.DB
}

func NewInternationalConferenceRepository(db *gorm.DB) *InternationalConferenceRepository {
	return &InternationalConferenceRepository{db}
}

func (r *InternationalConferenceRepository) CreateInternationalConference(m model.InternationalConference) error {
	return r.db.Create(&m).Error
}

func (r *InternationalConferenceRepository) ListInternationalConferences(filter model.InternationalConferenceFilter) ([]model.InternationalConference, error) {
	var internationalConferences []model.InternationalConference
	db := ApplyInternationalConferenceFilter(r.db, filter)
	err := db.Find(&internationalConferences).Error
	return internationalConferences, err
}

func (r *InternationalConferenceRepository) UpdateInternationalConference(m model.InternationalConference) error {
	return r.db.Save(&m).Error
}

func (r *InternationalConferenceRepository) GetInternationalConferenceByID(id int) (model.InternationalConference, error) {
	var internationalConference model.InternationalConference
	err := r.db.Preload(clause.Associations).Preload("InternationalConferenceInfo.Publisher").Where("id = ?", id).First(&internationalConference).Error
	return internationalConference, err
}

func (r *InternationalConferenceRepository) DeleteInternationalConference(id int) error {
	return r.db.Delete(&model.InternationalConference{}, id).Error
}

func ApplyInternationalConferenceFilter(db *gorm.DB, filter model.InternationalConferenceFilter) *gorm.DB {
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
		db = db.Joins("JOIN international_conference_authors ON international_conference_authors.international_conference_id = international_conferences.id").
			Where("international_conference_authors.author_id IN (?)", ids).Preload("Authors")
	} else {
		db = db.Preload("Authors")
	}
	if filter.InternationalConferenceInfo != (model.InternationalConferenceInfo{}) {
		log.Print(filter.InternationalConferenceInfo)
		db = db.Where("international_conference_info_id = ?", filter.InternationalConferenceInfo.ID).Preload("InternationalConferenceInfo")
	} else {
		db = db.Preload("InternationalConferenceInfo")
	}
	if filter.Tags != nil {
		log.Print(filter.Tags)
		ids := []int{}
		for _, tag := range filter.Tags {
			ids = append(ids, tag.ID)
		}
		db = db.Joins("JOIN international_conference_tags ON international_conference_tags.international_conference_id = international_conferences.id").
			Where("international_conference_tags.tag_id IN (?)", ids).Preload("Tags")
	} else {
		db = db.Preload("Tags")
	}
	return db
}
