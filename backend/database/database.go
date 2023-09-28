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

	// db.Migrator().DropTable(
	// 	&model.Author{},
	// 	&model.Publisher{},
	// 	&model.Journal{},
	// 	&model.JournalInfo{},
	// 	&model.JournalEvaluation{},
	// 	&model.Tag{},
	// 	&model.Country{},
	// )

	db.AutoMigrate(
		&model.Author{},
		&model.Publisher{},
		&model.Journal{},
		&model.JournalInfo{},
		&model.JournalEvaluation{},
		&model.Tag{},
		&model.Country{},
	)

	return db, nil
}
