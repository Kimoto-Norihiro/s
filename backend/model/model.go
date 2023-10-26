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

// filter
type JournalFilter struct {
	Authors     []Author    `json:"authors"`
	Title       string      `json:"title"`
	JournalInfo JournalInfo `json:"journal_info"`
	Tags        []Tag       `json:"tags"`
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
	JournalInfo             JournalInfo `json:"journal_info" gorm:"foreignKey:JournalInfoID"`
	JournalInfoID           int         `json:"journal_info_id" gorm:"primaryKey"`
	Year                    int         `json:"year" gorm:"primaryKey"`
	IF                      float64     `json:"if"`
	AcceptanceRate          float64     `json:"acceptance_rate"`
	NumberOfSubmittedPapers int         `json:"number_of_submitted_papers"`
	NumberOfAcceptedPapers  int         `json:"number_of_accepted_papers"`
}

// 国際会議
type InternationalConference struct {
	ID                            int                               `json:"id" gorm:"primaryKey"`
	Authors                       []Author                          `json:"authors" gorm:"many2many:international_conference_authors;" validate:"required"`
	Title                         string                            `json:"title" validate:"required"`
	InternationalConferenceInfo   InternationalConferenceInfo       `json:"international_conference_info" gorm:"foreignKey:InternationalConferenceInfoID"`
	InternationalConferenceInfoID int                               `json:"international_conference_info_id"`
	StartPage                     int                               `json:"start_page"`
	EndPage                       int                               `json:"end_page"`
	Year                          int                               `json:"year" validate:"required"`
	Month                         int                               `json:"month"`
	Url1                          string                            `json:"url1"`
	Url2                          string                            `json:"url2"`
	DOI                           string                            `json:"doi"`
	IsJointResearch               bool                              `json:"is_joint_research"`
	Country                       Country                           `json:"country" gorm:"foreignKey:CountryID"`
	CountryID                     int                               `json:"country_id"`
	City                          string                            `json:"city"`
	Venue                         string                            `json:"venue"`
	Evaluation                    InternationalConferenceEvaluation `json:"evaluation" gorm:"foreignKey:InternationalConferenceInfoID, Year"`
	PeerReviewCourse              string                            `json:"peer_review_course"`
	IsManuscriptExist             bool                              `json:"is_manuscript_exist"`
	IsSlidePDFExist               bool                              `json:"is_slide_pdf_exist"`
	ISSlidePPTExist               bool                              `json:"is_slide_ppt_exist"`
	IsPosterExist                 bool                              `json:"is_poster_exist"`
	IsVideoExist                  bool                              `json:"is_video_exist"`
	Tags                          []Tag                             `json:"tags" gorm:"many2many:international_conference_tags;"`
}

// filter
type InternationalConferenceFilter struct {
	Authors                     []Author
	Title                       string
	InternationalConferenceInfo InternationalConferenceInfo
	Tags                        []Tag
}

// 国際会議名
type InternationalConferenceInfo struct {
	ID                 int       `json:"id" gorm:"primaryKey"`
	Name               string    `json:"name"`
	ShortName          string    `json:"short_name"`
	ISO4Name           string    `json:"iso4_name"`
	CollectionNotation string    `json:"collection_notation"`
	Publisher          Publisher `json:"publisher" gorm:"foreignKey:PublisherID"`
	PublisherID        int       `json:"publisher_id"`
}

// 国際会議評価
type InternationalConferenceEvaluation struct {
	InternationalConferenceInfo   InternationalConferenceInfo `json:"international_conference_info" gorm:"foreignKey:InternationalConferenceInfoID"`
	InternationalConferenceInfoID int                         `json:"international_conference_info_id" gorm:"primaryKey"`
	Year                          int                         `json:"year" gorm:"primaryKey"`
	CORERank                      float64                     `json:"core_rank"`
	Qualis                        float64                     `json:"qualis"`
	RankGuide2Research            float64                     `json:"rank_guide2research"`
	AcceptanceRate                float64                     `json:"acceptance_rate"`
	NumberOfSubmittedPapers       int                         `json:"number_of_submitted_papers"`
	NumberOfAcceptedPapers        int                         `json:"number_of_accepted_papers"`
}

// 国内会議
type DomesticConference struct {
	ID                     int                    `json:"id" gorm:"primaryKey"`
	Authors                []Author               `json:"authors" gorm:"many2many:domestic_conference_authors;" validate:"required"`
	Title                  string                 `json:"title" validate:"required"`
	DomesticConferenceInfo DomesticConferenceInfo `json:"domestic_conference_info" gorm:"foreignKey:ConferenceInfoID"`
	ConferenceInfoID       int                    `json:"domestic_conference_info_id"`
	StartPage              int                    `json:"start_page"`
	EndPage                int                    `json:"end_page"`
	Year                   int                    `json:"year" validate:"required"`
	Month                  int                    `json:"month"`
	Url1                   string                 `json:"url1"`
	Url2                   string                 `json:"url2"`
	DOI                    string                 `json:"doi"`
	IsJointResearch        bool                   `json:"is_joint_research"`
	Venue                  string                 `json:"venue"`
	City                   string                 `json:"city"`
	IsManuscriptExist      bool                   `json:"is_manuscript_exist"`
	IsSlidePDFExist        bool                   `json:"is_slide_pdf_exist"`
	ISSlidePPTExist        bool                   `json:"is_slide_ppt_exist"`
	IsPosterExist          bool                   `json:"is_poster_exist"`
	IsVideoExist           bool                   `json:"is_video_exist"`
	Tags                   []Tag                  `json:"tags" gorm:"many2many:domestic_conference_tags;"`
}

// filter
type DomesticConferenceFilter struct {
	Authors                []Author
	Title                  string
	DomesticConferenceInfo DomesticConferenceInfo
	Tags                   []Tag
}

// 国内会議名
type DomesticConferenceInfo struct {
	ID                 int       `json:"id" gorm:"primaryKey"`
	Name               string    `json:"name"`
	ShortName          string    `json:"short_name"`
	OtherName          string    `json:"other_name"`
	CollectionNotation string    `json:"collection_notation"`
	Publisher          Publisher `json:"publisher" gorm:"foreignKey:PublisherID"`
	PublisherID        uint      `json:"publisher_id"`
}

// 表彰
type Award struct {
	ID                 int          `json:"id" gorm:"primaryKey"`
	Authors            []Author     `json:"authors" gorm:"many2many:award_authors;" validate:"required"`
	Name               string       `json:"name" validate:"required"`
	Organization       Organization `json:"organization" gorm:"foreignKey:OrganizationID"`
	OrganizationID     int          `json:"organization_id"`
	Year               int          `json:"year" validate:"required"`
	Month              int          `json:"month"`
	Url1               string       `json:"url1"`
	Url2               string       `json:"url2"`
	RelationID         int          `json:"relation_id"`
	IsJointResearch    bool         `json:"is_joint_research"`
	IsCertificateExist bool         `json:"is_certificate_exist"`
	Tags               []Tag        `json:"tags" gorm:"many2many:award_tags;"`
}

type AwardFilter struct {
	Authors      []Author
	Name         string
	Organization Organization
	Tags         []Tag
}

// 表彰団体
type Organization struct {
	ID   int    `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
}

type JournalAuthor struct {
	JournalID int `json:"journal_id" gorm:"primaryKey"`
	AuthorID  int `json:"author_id" gorm:"primaryKey"`
}

type InternationalConferenceAuthor struct {
	InternationalConferenceID int `json:"international_conference_id" gorm:"primaryKey"`
	AuthorID                  int `json:"author_id" gorm:"primaryKey"`
}

type DomesticConferenceAuthor struct {
	DomesticConferenceID int `json:"domestic_conference_id" gorm:"primaryKey"`
	AuthorID             int `json:"author_id" gorm:"primaryKey"`
}

type AwardAuthor struct {
	AwardID  int `json:"award_id" gorm:"primaryKey"`
	AuthorID int `json:"author_id" gorm:"primaryKey"`
}

type JournalTag struct {
	JournalID int `json:"journal_id" gorm:"primaryKey"`
	TagID     int `json:"tag_id" gorm:"primaryKey"`
}

type InternationalConferenceTag struct {
	InternationalConferenceID int `json:"international_conference_id" gorm:"primaryKey"`
	TagID                     int `json:"tag_id" gorm:"primaryKey"`
}

type DomesticConferenceTag struct {
	DomesticConferenceID int `json:"domestic_conference_id" gorm:"primaryKey"`
	TagID                int `json:"tag_id" gorm:"primaryKey"`
}

type AwardTag struct {
	AwardID int `json:"award_id" gorm:"primaryKey"`
	TagID   int `json:"tag_id" gorm:"primaryKey"`
}
