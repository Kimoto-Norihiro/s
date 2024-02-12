package domain

type Author struct {
	ID          int    `json:"id" gorm:"primaryKey"`
	JaFirstName string `json:"ja_first_name"`
	JaLastName  string `json:"ja_last_name"`
	EnFirstName string `json:"en_first_name"`
	EnLastName  string `json:"en_last_name"`
}