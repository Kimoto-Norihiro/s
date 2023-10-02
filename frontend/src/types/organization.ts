import { type } from "os"

export type Organization = {
  id: number
  name: string
}
export type Organizations = Organization[]
export type OrganizationTableDisplay = Omit<Organization, 'id'>
export type OrganizationTableDisplays = OrganizationTableDisplay[]

// type for form
export type OrganizationUpsertValues = Omit<Organization, 'id'>

// type for table display
export function organizationsToTableDisplays(organizations: Organizations): OrganizationTableDisplays {
  return organizations.map((tag) => {
    return {
      name: tag.name,
    }
  })
}

export const organizationsToOptions = (list: Organizations) => {
	return list.map((organization) => {
		return {
			value: organization.id,
			label: organization.name
		}
	})
}