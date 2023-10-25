package repository

import (
	"log"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type DomesticConferenceRepository struct {
	db *gorm.DB
}

func NewDomesticConferenceRepository(db *gorm.DB) *DomesticConferenceRepository {
	return &DomesticConferenceRepository{db}
}

func (r *DomesticConferenceRepository) CreateDomesticConference(m model.DomesticConference) error {
	return r.db.Create(&m).Error
}

func (r *DomesticConferenceRepository) ListDomesticConferences(filter model.DomesticConferenceFilter) ([]model.DomesticConference, error) {
	var domesticConferences []model.DomesticConference
	db := ApplyDomesticConferenceFilter(r.db, filter)
	err := db.Find(&domesticConferences).Error
	return domesticConferences, err
}

func (r *DomesticConferenceRepository) UpdateDomesticConference(m model.DomesticConference) error {
	return r.db.Save(&m).Error
}

func (r *DomesticConferenceRepository) GetDomesticConferenceByID(id int) (model.DomesticConference, error) {
	var domesticConference model.DomesticConference
	err := r.db.Preload(clause.Associations).Preload("DomesticConferenceInfo.Publisher").Where("id = ?", id).First(&domesticConference).Error
	return domesticConference, err
}

func (r *DomesticConferenceRepository) DeleteDomesticConference(id int) error {
	return r.db.Delete(&model.DomesticConference{}, id).Error
}

func ApplyDomesticConferenceFilter(db *gorm.DB, filter model.DomesticConferenceFilter) *gorm.DB {
	if filter.Title != "" {
		db = db.Where("title LIKE ?", "%"+filter.Title+"%")
	}
	if filter.Authors != nil {
		log.Print(filter.Authors)
		ids := []int{}
		for _, author := range filter.Authors {
			ids = append(ids, author.ID)
		}
		db = db.Joins("JOIN domestic_conference_authors ON domestic_conference_authors.domestic_conference_id = domestic_conferences.id").
			Where("domestic_conference_authors.author_id IN (?)", ids).Preload("Authors")
	} else {
		db = db.Preload("Authors")
	}
	if filter.DomesticConferenceInfo != (model.DomesticConferenceInfo{}) {
		log.Print(filter.DomesticConferenceInfo)
		db = db.Where("domestic_conference_info_id = ?", filter.DomesticConferenceInfo.ID).Preload("DomesticConferenceInfo")
	} else {
		db = db.Preload("DomesticConferenceInfo")
	}
	if filter.Tags != nil {
		log.Print(filter.Tags)
		ids := []int{}
		for _, tag := range filter.Tags {
			ids = append(ids, tag.ID)
		}
		db = db.Joins("JOIN domestic_conference_tags ON domestic_conference_tags.domestic_conference_id = domestic_conferences.id").
			Where("domestic_conference_tags.tag_id IN (?)", ids).Preload("Tags")
	} else {
		db = db.Preload("Tags")
	}
	return db
}
