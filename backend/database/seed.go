package database

import (
	"fmt"

	"github.com/Kimoto-Norihiro/scholar-manager/model"
	"gorm.io/gorm"
)

func seed(db *gorm.DB) {
	// author
	authors := []model.Author{
		{
			JaFirstName: "太郎",
			JaLastName:  "山田",
			EnFirstName: "Taro",
			EnLastName:  "Yamada",
		},
		{
			JaFirstName: "次郎",
			JaLastName:  "山田",
			EnFirstName: "Jiro",
			EnLastName:  "Yamada",
		},
		{
			JaFirstName: "三郎",
			JaLastName:  "山田",
			EnFirstName: "Saburo",
			EnLastName:  "Yamada",
		},
	}

	for _, author := range authors {
		db.Create(&author)
	}

	// publisher
	for i := 0; i < 10; i++ {
		db.Create(&model.Publisher{
			Name:      fmt.Sprintf("出版社%d", i),
			ShortName: fmt.Sprintf("出%d", i),
		})
	}

	// journal_info
	for i := 0; i < 10; i++ {
		db.Create(&model.JournalInfo{
			Name:      fmt.Sprintf("雑誌%d", i),
			ISO4Name:  fmt.Sprintf("雑%d", i),
			ShortName: fmt.Sprintf("雑%d", i),
			Publisher: model.Publisher{
				ID:        i + 1,
				Name:      fmt.Sprintf("出版社%d", i),
				ShortName: fmt.Sprintf("出%d", i),
			},
		})
	}

	// domestic_conference_info
	for i := 0; i < 10; i++ {
		db.Create(&model.DomesticConferenceInfo{
			Name: fmt.Sprintf("国内学会%d", i),
			OtherName:  fmt.Sprintf("内%d", i),
			ShortName: fmt.Sprintf("内%d", i),
			Publisher: model.Publisher{
				ID:        i + 1,
				Name:      fmt.Sprintf("出版社%d", i),
				ShortName: fmt.Sprintf("出%d", i),
			},
		})
	}

	// international_conference_info
	for i := 0; i < 10; i++ {
		db.Create(&model.InternationalConferenceInfo{
			Name: fmt.Sprintf("国際学会%d", i),
			ISO4Name:  fmt.Sprintf("際%d", i),
			ShortName: fmt.Sprintf("際%d", i),
			Publisher: model.Publisher{
				ID:        i + 1,
				Name:      fmt.Sprintf("出版社%d", i),
				ShortName: fmt.Sprintf("出%d", i),
			},
		})
	}

	// country
	names := []string{"Japan", "United States"}
	for _, name := range names {
		db.Create(&model.Country{
			Name: name,
		})
	}

	// tag
	names = []string{"MOEA", "SOEA", "GPDL", "XCS"}
	for _, name := range names {
		db.Create(&model.Tag{
			Name: name,
		})
	}
}
