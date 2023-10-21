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
			ID:          1,
			JaFirstName: "太郎",
			JaLastName:  "山田",
			EnFirstName: "Taro",
			EnLastName:  "Yamada",
		},
		{
			ID:          2,
			JaFirstName: "次郎",
			JaLastName:  "山田",
			EnFirstName: "Jiro",
			EnLastName:  "Yamada",
		},
		{
			ID:          3,
			JaFirstName: "三郎",
			JaLastName:  "山田",
			EnFirstName: "Saburo",
			EnLastName:  "Yamada",
		},
	}

	tags := []model.Tag{
		{
			ID:   1,
			Name: "MOEA",
		},
		{
			ID:   2,
			Name: "SOEA",
		},
		{
			ID:   3,
			Name: "GPDL",
		},
		{
			ID:   4,
			Name: "XCS",
		},
	}

	for _, author := range authors {
		db.Create(&author)
	}
	// publisher
	publishers := []model.Publisher{}
	for i := 0; i < 10; i++ {
		publishers = append(publishers, model.Publisher{
			ID:        i + 1,
			Name:      fmt.Sprintf("出版社%d", i),
			ShortName: fmt.Sprintf("出%d", i),
		})
		db.Create(&publishers[i])
	}

	// journal_info
	journal_infos := []model.JournalInfo{}
	for i := 0; i < 10; i++ {
		journal_infos = append(journal_infos, model.JournalInfo{
			ID:        i + 1,
			Name:      fmt.Sprintf("雑誌%d", i),
			ISO4Name:  fmt.Sprintf("雑%d", i),
			ShortName: fmt.Sprintf("雑%d", i),
			Publisher: publishers[i],
		})
		db.Create(&journal_infos[i])
	}

	// domestic_conference_info
	domestic_conference_infos := []model.DomesticConferenceInfo{}
	for i := 0; i < 10; i++ {
		domestic_conference_infos = append(domestic_conference_infos, model.DomesticConferenceInfo{
			ID:        i + 1,
			Name:      fmt.Sprintf("国内学会%d", i),
			OtherName: fmt.Sprintf("内%d", i),
			ShortName: fmt.Sprintf("内%d", i),
			Publisher: publishers[i],
		})
		db.Create(&domestic_conference_infos[i])
	}

	// international_conference_info
	international_conference_infos := []model.InternationalConferenceInfo{}
	for i := 0; i < 10; i++ {
		international_conference_infos = append(international_conference_infos, model.InternationalConferenceInfo{
			ID:        i + 1,
			Name:      fmt.Sprintf("国際学会%d", i),
			ISO4Name:  fmt.Sprintf("際%d", i),
			ShortName: fmt.Sprintf("際%d", i),
			Publisher: publishers[i],
		})
		db.Create(&international_conference_infos[i])
	}

	// country
	countries := []model.Country{
		{
			ID:   1,
			Name: "Japan",
		},
		{
			ID:   2,
			Name: "USA",
		},
	}
	for _, country := range countries {
		db.Create(&country)
	}

	// tag
	for _, tag := range tags {
		db.Create(&tag)
	}

	// organization
	for i := 0; i < 10; i++ {
		db.Create(&model.Organization{
			Name: fmt.Sprintf("組織%d", i),
		})
	}

	// journal_evaluation
	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			db.Create(&model.JournalEvaluation{
				JournalInfoID: i + 1,
				Year:          2010 + j,
			})
		}
	}

	// international_conference_evaluation
	for i := 0; i < 10; i++ {
		for j := 0; j < 10; j++ {
			db.Create(&model.InternationalConferenceEvaluation{
				InternationalConferenceInfoID: i + 1,
				Year:                          2010 + j,
			})
		}
	}

	// domestic_conference
	for i := 0; i < 10; i++ {
		db.Create(&model.DomesticConference{
			Title:                  fmt.Sprintf("国内学会題目%d", i),
			DomesticConferenceInfo: domestic_conference_infos[i],
			Year:                   2010 + i,
			Authors: []model.Author{
				authors[i%3],
			},
			Tags: []model.Tag{
				tags[i%4],
			},
		})
	}

	// international_conference
	for i := 0; i < 10; i++ {
		db.Create(&model.InternationalConference{
			Title:                       fmt.Sprintf("国際学会題目%d", i),
			InternationalConferenceInfo: international_conference_infos[i],
			Year:                        2010 + i,
			Country:                     countries[i%2],
			Authors: []model.Author{authors[i%3],},
			Tags: []model.Tag{
				tags[i%4],
			},
		})
	}

	// journal
	for i := 0; i < 10; i++ {
		db.Create(&model.Journal{
			Title:       fmt.Sprintf("雑誌題目%d", i),
			JournalInfo: journal_infos[i],
			Year:        2010 + i,
			Authors: []model.Author{
				authors[i%3],
			},
			Tags: []model.Tag{
				tags[i%4],
			},
		})
	}

	// award
	for i := 0; i < 10; i++ {
		db.Create(&model.Award{
			Name: fmt.Sprintf("賞名%d", i),
			Organization: model.Organization{
				ID: i + 1,
			},
			Year: 2010 + i,
			Authors: []model.Author{
				authors[i%3],
			},
			Tags: []model.Tag{
				tags[i%4],
			},
		})
	}
}
