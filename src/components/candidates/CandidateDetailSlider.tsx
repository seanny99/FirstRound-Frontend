import React from 'react'
import { X, Calendar, Ban } from 'lucide-react'
import type { Resume } from '@/types/resume'

interface CandidateDetailSliderProps {
  candidate: Resume | null
  onClose: () => void
}

export const CandidateDetailSlider: React.FC<CandidateDetailSliderProps> = ({
  candidate,
  onClose,
}) => {
  if (!candidate) return null

  const initials =
    (candidate.full_name || '?')
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?'
  const skills = candidate.skills ?? []
  const experience = candidate.experience ?? []
  const education = candidate.education ?? []
  const matchFromResume = skills.length ? Math.min(skills.length * 5, 100) : null

  return (
    <>
      <div className="candidate-slider-overlay" onClick={onClose} aria-hidden="true" />
      <aside className="candidate-detail-slider" role="dialog" aria-label="Candidate details">
        <header className="candidate-slider-header">
          <h2 className="candidate-slider-title">Candidate Details</h2>
          <button
            type="button"
            className="candidate-slider-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        <div className="candidate-slider-body">
          <div className="candidate-slider-profile">
            <div className="candidate-slider-avatar candidate-slider-avatar-initials">{initials}</div>
            <p className="candidate-slider-name">{candidate.full_name}</p>
            {matchFromResume != null && (
              <p className="candidate-slider-match">{matchFromResume}% Match (from resume)</p>
            )}
            {candidate.target_role && (
              <p className="candidate-slider-role">Applying for: {candidate.target_role}</p>
            )}
          </div>

          <div className="candidate-slider-actions">
            <button type="button" className="candidate-slider-btn candidate-slider-btn-primary">
              <Calendar size={16} />
              Schedule
            </button>
            <button type="button" className="candidate-slider-btn candidate-slider-btn-danger">
              <Ban size={16} />
              Not Moving Forward
            </button>
          </div>

          <SectionDivider />
          <section className="candidate-slider-section">
            <h3 className="candidate-slider-section-title">INTERVIEW HISTORY</h3>
            <p className="candidate-slider-empty">No interviews in database.</p>
          </section>

          <SectionDivider />
          <section className="candidate-slider-section">
            <h3 className="candidate-slider-section-title">RESUME SKILLS</h3>
            {skills.length > 0 ? (
              <div className="candidate-slider-tags">
                {skills.map((skill, i) => (
                  <span key={i} className="candidate-slider-tag">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="candidate-slider-empty">No skills listed.</p>
            )}
          </section>

          {candidate.summary && (
            <>
              <SectionDivider />
              <section className="candidate-slider-section">
                <h3 className="candidate-slider-section-title">SUMMARY</h3>
                <p className="candidate-slider-summary">{candidate.summary}</p>
              </section>
            </>
          )}

          {experience.length > 0 && (
            <>
              <SectionDivider />
              <section className="candidate-slider-section">
                <h3 className="candidate-slider-section-title">EXPERIENCE</h3>
                <ul className="candidate-slider-list">
                  {experience.map((exp, i) => (
                    <li key={i} className="candidate-slider-list-item">
                      <span className="candidate-slider-exp-title">{exp.job_title}</span>
                      <span className="candidate-slider-exp-meta">
                        {exp.company} · {exp.start_date} – {exp.end_date}
                      </span>
                      {exp.description_bullets?.length > 0 && (
                        <ul className="candidate-slider-bullets">
                          {exp.description_bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {education.length > 0 && (
            <>
              <SectionDivider />
              <section className="candidate-slider-section">
                <h3 className="candidate-slider-section-title">EDUCATION</h3>
                <ul className="candidate-slider-list">
                  {education.map((edu, i) => (
                    <li key={i} className="candidate-slider-edu-item">
                      <span className="candidate-slider-edu-degree">{edu.degree}</span>
                      {edu.field && <span> – {edu.field}</span>}
                      <span className="candidate-slider-edu-meta">
                        {edu.institution}
                        {edu.year ? ` · ${edu.year}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          <SectionDivider />
          <section className="candidate-slider-section">
            <h3 className="candidate-slider-section-title">REAL SKILLS (VALIDATED)</h3>
            <p className="candidate-slider-empty">No validated skills in database.</p>
          </section>

          <SectionDivider />
          <section className="candidate-slider-section">
            <h3 className="candidate-slider-section-title">PSYCHOMETRIC PROFILE</h3>
            <p className="candidate-slider-empty">No psychometric data in database.</p>
          </section>
        </div>
      </aside>
    </>
  )
}

const SectionDivider: React.FC = () => <hr className="candidate-slider-divider" />
