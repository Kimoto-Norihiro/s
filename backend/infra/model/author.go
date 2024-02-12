package model

type Author struct {
	ID          int    `gorm:"column:id"`
	JaFirstName string `gorm:"column:ja_first_name"`
	JaLastName  string `gorm:"column:ja_last_name"`
	EnFirstName string `gorm:"column:en_first_name"`
	EnLastName  string `gorm:"column:en_last_name"`
}

func (*Author) TableName() string {
	return "authors"
}
