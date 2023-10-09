import { type } from "os"

export type Organization = {
  id: number
  name: string
}
export type Organizations = Organization[]
export type OrganizationTableDisplay = Organization
export type OrganizationTableDisplays = OrganizationTableDisplay[]

// type for table display
export function organizationsToTableDisplays(organizations: Organizations): OrganizationTableDisplays {
  return organizations.map((tag) => {
    return {
      id: tag.id,
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