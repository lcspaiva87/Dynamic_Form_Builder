import { Status } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'

export interface IFormType {
  id: string
  name: string
  title: string
  logo: string | null
  fields: JsonValue
  createdAt: Date
  updatedAt: Date
  status: Status
}
