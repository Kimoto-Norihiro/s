package database

import (
	"github.com/Kimoto-Norihiro/nkt-scholar/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewMySql(dns string) (db *gorm.DB, err error) {
	db, err = gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	// drop tables
	db.Migrator().DropTable(&model.Author{}, &model.Publisher{}, &model.ConferenceAndJournal{}, &model.Paper{}, &model.PaperKind{})
	
	// db.AutoMigrate(&model.Author{}, &model.Publisher{}, &model.ConferenceAndJournal{}, &model.Paper{}, &model.PaperKind{})

	return db, nil
}
