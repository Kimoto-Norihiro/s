package repository

import (
	"log"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

type AwardRepository struct {
	db *gorm.DB
}

func NewAwardRepository(db *gorm.DB) *AwardRepository {
	return &AwardRepository{db}
}

func (r *AwardRepository) CreateAward(m model.Award) error {
	return r.db.Create(&m).Error
}

func (r *AwardRepository) ListAwards(filter model.AwardFilter) ([]model.Award, error) {
	var awards []model.Award
	db := ApplyAwardFilter(r.db, &filter)
	err := db.Find(&awards).Error
	return awards, err
}

func (r *AwardRepository) UpdateAward(m model.Award) error {
	return r.db.Save(&m).Error
}

func (r *AwardRepository) GetAwardByID(id int) (model.Award, error) {
	var award model.Award
	err := r.db.Preload("Organization").Preload("Tags").Where("id = ?", id).First(&award).Error
	return award, err
}

func (r *AwardRepository) DeleteAward(id int) error {
	return r.db.Delete(&model.Award{}, id).Error
}

func ApplyAwardFilter(db *gorm.DB, filter *model.AwardFilter) *gorm.DB {
	if filter.Name != "" {
		log.Print(filter.Name)
		db = db.Where("name LIKE ?", "%"+filter.Name+"%")
	}
	if filter.Authors != nil {
		log.Print(filter.Authors)
		ids := []int{}
		for _, author := range filter.Authors {
			ids = append(ids, author.ID)
		}
		db = db.Joins("JOIN award_authors ON award_authors.award_id = awards.id").
			Where("award_authors.author_id IN (?)", ids).Preload("Authors")
	} else {
		db = db.Preload("Authors")
	}
	if filter.Organization != (model.Organization{}) {
		log.Print(filter.Organization)
		db = db.Where("organization_id = ?", filter.Organization.ID).Preload("Organization")
	} else {
		db = db.Preload("Organization")
	}
	if filter.Tags != nil {
		log.Print(filter.Tags)
		ids := []int{}
		for _, tag := range filter.Tags {
			ids = append(ids, tag.ID)
		}
		db = db.Joins("JOIN award_tags ON award_tags.award_id = awards.id").
			Where("award_tags.tag_id IN (?)", ids).Preload("Tags")
	} else {
		db = db.Preload("Tags")
	}
	return db
}
