import { Authors, Author } from "./author"
import { Organization } from "./organization"
import { Tags } from "./tag"

export type Award = {
  id: number
  authors: Authors
  name: string
	organization: Organization
  year: number
  month: number
  url1: string
  url2: string
	relation_id: number
  is_joint_research: boolean
	is_certificate_exist: boolean
	is_domestic: boolean
  tags: Tags
}
export type Awards = Award[]

// type for table display
export type AwardTableDisplay = {
	id: number
  authors_name: string
	authors_name_short: string
  name: string
	organization_name: string
  year: number
  month: number
  url1: string
  url2: string
	relation_id: number
  is_joint_research: boolean
	is_certificate_exist: boolean
  tag_names: string
}
export type AwardTableDisplays = AwardTableDisplay[]

function getAuthorsName(authors: Author[], is_domestic: boolean): string {
	if (!authors) return ''
	if (is_domestic) return authors.map((author) => `${author.ja_last_name} ${author.ja_first_name}`).join(', ')
	return authors.map((author) => `${author.en_first_name} ${author.en_last_name}`).join(', ')
}

function getAuthorsNameShort(authors: Author[], is_domestic: boolean): string {
	if (!authors) return ''
	if (is_domestic) return authors.map((author) => `${author.ja_last_name} ${author.ja_first_name}`).join(', ')
	return authors.map((author) => `${author.en_first_name[0]}. ${author.en_last_name}`).join(', ')
}

export function AwardsToTableDisplays(awards: Awards): AwardTableDisplays {
	return awards.map((award) => {
		return {
			id: award.id,
			authors_name: getAuthorsName(award.authors, award.is_domestic),
			authors_name_short: getAuthorsNameShort(award.authors, award.is_domestic),
			name: award.name,
			organization_name: award.organization.name,
			year: award.year,
			month: award.month,
			url1: award.url1,
			url2: award.url2,
			relation_id: award.relation_id,
			is_joint_research: award.is_joint_research,
			is_certificate_exist: award.is_certificate_exist,
			tag_names: award.tags.map((tag) => tag.name).join(', ')
		} 
	})
}
