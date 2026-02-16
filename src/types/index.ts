export type Section = 'home' | 'services' | 'contact'

export interface Service {
  id: string
  title: string
  subtitle?: string
  description: string
  category: string
  howItHelps?: string
  benefits?: string[]
  services?: string[]
  storageTypes?: string[]
  additionalInfo?: string
  humanizedTouch?: string
  supportedTypes?: string[]
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}
