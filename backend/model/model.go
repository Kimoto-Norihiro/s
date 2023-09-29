package model

type Author struct {
	ID          int    `json:"id" gorm:"primaryKey"`
	JaFirstName string `json:"ja_first_name"`
	JaLastName  string `json:"ja_last_name"`
	EnFirstName string `json:"en_first_name"`
	EnLastName  string `json:"en_last_name"`
}

type Publisher struct {
	ID        int    `json:"id" gorm:"primaryKey"`
	Name      string `json:"name"`
	ShortName string `json:"short_name"`
}

// 分野タグ
type Tag struct {
	ID   int    `json:"id" gorm:"primaryKey"`
	Name string `json:"name" validate:"required"`
}

// 国
type Country struct {
	ID   int    `json:"id" gorm:"primaryKey"`
	Name string `json:"name" validate:"required"`
}

// ジャーナル
type Journal struct {
	ID                int               `json:"id" gorm:"primaryKey"`
	Authors           []Author          `json:"authors" gorm:"many2many:journal_authors;" validate:"required"`
	Title             string            `json:"title" validate:"required"`
	JournalInfo       JournalInfo       `json:"journal_info" gorm:"foreignKey:JournalInfoID"`
	JournalInfoID     int               `json:"journal_info_id"`
	Year              int               `json:"year" validate:"required"`
	Evaluation        JournalEvaluation `json:"evaluation" gorm:"foreignKey:JournalInfoID, Year"`
	Volume            int               `json:"volume"`
	Number            int               `json:"number"`
	StartPage         int               `json:"start_page"`
	EndPage           int               `json:"end_page"`
	Url1              string            `json:"url1"`
	Url2              string            `json:"url2"`
	DOI               string            `json:"doi"`
	IsJointResearch   bool              `json:"is_joint_research"`
	PeerReviewCourse  string            `json:"peer_review_course"`
	IsManuscriptExist bool              `json:"is_manuscript_exist"`
	IsAppendixExist   bool              `json:"is_appendix_exist"`
	IsDomestic        bool              `json:"is_domestic"`
	Tags              []Tag             `json:"tags" gorm:"many2many:journal_tags;"`
}

// 雑誌名
type JournalInfo struct {
	ID          int       `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name"`
	ISO4Name    string    `json:"iso4_name"`
	ShortName   string    `json:"short_name"`
	Publisher   Publisher `json:"publisher"`
	PublisherID int       `json:"publisher_id"`
}

// ジャーナル評価
type JournalEvaluation struct {
	JournalInfoID           int         `json:"journal_info_id" gorm:"primaryKey"`
	JournalInfo             JournalInfo `json:"journal_info" gorm:"foreignKey:JournalInfoID"`
	Year                    int         `json:"year" gorm:"primaryKey"`
	IF                      float64     `json:"if"`
	AcceptanceRate          float64     `json:"acceptance_rate"`
	NumberOfSubmittedPapers int         `json:"number_of_submitted_papers"`
	NumberOfAcceptedPapers  int         `json:"number_of_accepted_papers"`
}

// 国際会議
type InterNationalConference struct {
	ID                int                         `json:"id" gorm:"primaryKey"`
	Authors           []Author                    `json:"authors" gorm:"many2many:jp_conference_authors;" validate:"required"`
	Title             string                      `json:"title" validate:"required"`
	ConferenceInfo    InterNationalConferenceInfo `json:"conference_info" gorm:"foreignKey:ConferenceInfoID"`
	StartPage         int                         `json:"start_page"`
	EndPage           int                         `json:"end_page"`
	Year              int                         `json:"year" validate:"required"`
	Month             int                         `json:"month" validate:"required"`
	Url1              string                      `json:"url1"`
	Url2              string                      `json:"url2"`
	DOI               string                      `json:"doi"`
	IsJointResearch   bool                        `json:"is_joint_research" validate:"required"`
	Country           Country                     `json:"country" gorm:"foreignKey:CountryID"`
	CountryID         uint                        `json:"country_id"`
	City              string                      `json:"city"`
	Venue             string                      `json:"venue"`
	Evaluation        ConferenceEvaluation        `json:"evaluation" gorm:"foreignKey:EvaluationID"`
	EvaluationID      uint                        `json:"evaluation_id"`
	PeerReviewCourse  string                      `json:"peer_review_course"`
	IsManuscriptExist bool                        `json:"is_manuscript_exist" validate:"required"`
	IsSlidePDFExist   bool                        `json:"is_slide_pdf_exist" validate:"required"`
	ISSlidePPTExist   bool                        `json:"is_slide_ppt_exist" validate:"required"`
	IsPosterExist     bool                        `json:"is_poster_exist" validate:"required"`
	IsVideoExist      bool                        `json:"is_video_exist" validate:"required"`
	Tags              []Tag                       `json:"tags" gorm:"many2many:jp_conference_tags;"`
}

// 国際会議名
type InterNationalConferenceInfo struct {
	ID          int       `json:"id" gorm:"primaryKey" validate:"required"`
	Name        string    `json:"name" validate:"required"`
	ShortName   string    `json:"short_name" validate:"required"`
	ISO4Name    string    `json:"iso4_name" validate:"required"`
	Publisher   Publisher `json:"publisher" gorm:"foreignKey:PublisherID"`
	PublisherID uint      `json:"publisher_id"`
}

// 国際会議評価
type ConferenceEvaluation struct {
	ConferenceNameID        int     `json:"conference_name_id" gorm:"primaryKey"`
	Year                    int     `json:"year" gorm:"primaryKey"`
	CORERank                float64 `json:"core_rank"`
	Qualis                  float64 `json:"qualis"`
	RankGuide2Research      float64 `json:"rank_guide2research"`
	AcceptanceRate          float64 `json:"acceptance_rate"`
	NumberOfSubmittedPapers int     `json:"number_of_submitted_papers"`
	NumberOfAcceptedPapers  int     `json:"number_of_accepted_papers"`
}

// 国内会議
type DomesticConference struct {
	ID                     int                    `json:"id" gorm:"primaryKey"`
	Authors                []Author               `json:"authors" gorm:"many2many:jp_conference_authors;" validate:"required"`
	Title                  string                 `json:"title" validate:"required"`
	DomesticConferenceInfo DomesticConferenceInfo `json:"conference_info" gorm:"foreignKey:ConferenceInfoID"`
	StartPage              int                    `json:"start_page"`
	EndPage                int                    `json:"end_page"`
	Year                   int                    `json:"year" validate:"required"`
	Month                  int                    `json:"month" validate:"required"`
	Url1                   string                 `json:"url1"`
	Url2                   string                 `json:"url2"`
	DOI                    string                 `json:"doi"`
	IsJointResearch        bool                   `json:"is_joint_research" validate:"required"`
	Venue                  string                 `json:"venue"`
	City                   string                 `json:"city"`
	IsManuscriptExist      bool                   `json:"is_manuscript_exist" validate:"required"`
	IsSlidePDFExist        bool                   `json:"is_slide_pdf_exist" validate:"required"`
	ISSlidePPTExist        bool                   `json:"is_slide_ppt_exist" validate:"required"`
	IsPosterExist          bool                   `json:"is_poster_exist" validate:"required"`
	IsVideoExist           bool                   `json:"is_video_exist" validate:"required"`
	Tags                   []Tag                  `json:"tags" gorm:"many2many:jp_conference_tags;"`
}

// 国内会議名
type DomesticConferenceInfo struct {
	ID                 int       `json:"id" gorm:"primaryKey" validate:"required"`
	Name               string    `json:"name" validate:"required"`
	ShortName          string    `json:"short_name" validate:"required"`
	OtherName          string    `json:"other_name"`
	CollectionNotation string    `json:"collection_notation"`
	Publisher          Publisher `json:"publisher" gorm:"foreignKey:PublisherID"`
	PublisherID        uint      `json:"publisher_id"`
}

// 表彰
type Award struct {
	ID                 int          `json:"id" gorm:"primaryKey"`
	Name               string       `json:"name" validate:"required"`
	Organization       Organization `json:"organization" validate:"required"`
	Year               int          `json:"year" validate:"required"`
	Month              int          `json:"month" validate:"required"`
	Url1               string       `json:"url1"`
	Url2               string       `json:"url2"`
	RelationID         int          `json:"relation_id"`
	IsJointResearch    bool         `json:"is_joint_research" validate:"required"`
	IsCertificateExist bool         `json:"is_certificate_exist" validate:"required"`
	Tags               []Tag        `json:"tags" gorm:"many2many:award_tags;"`
}

// 表彰団体
type Organization struct {
	ID   int    `json:"id" gorm:"primaryKey"`
	Name string `json:"name" validate:"required"`
}
