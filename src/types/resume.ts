/**
 * Resume / Candidate types (matches backend resume collection and API)
 */

export interface ExperienceItem {
  job_title: string
  company: string
  start_date: string
  end_date: string
  description_bullets: string[]
}

export interface EducationItem {
  institution: string
  degree: string
  field?: string | null
  year?: string | null
}

export interface Resume {
  _id: string
  full_name: string
  email: string
  phone: string
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  target_role: string
  created_at?: string
  updated_at?: string
}
