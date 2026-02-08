import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader } from '@/components/ui/Card'
import { jobsService } from '@/services/jobsService'
import { JobDescriptionCreate } from '@/types/job'

export const JobPositionDetail: React.FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    // Form state
    const [formData, setFormData] = useState<JobDescriptionCreate>({
        jobTitle: '',
        roleOverview: '',
        responsibilities: [''],
        requiredSkills: [''],
        preferredSkills: [''],
        experienceLevel: '',
        salaryRangeDisplay: '',
        salaryRangeMin: 0,
        salaryRangeMax: 0,
        totalPositions: 1,
    })

    // Handle input changes
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        // Handle numeric fields
        if (name === 'salaryRangeMin' || name === 'salaryRangeMax') {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? 0 : parseFloat(value)
            }))
            return
        }

        if (name === 'totalPositions') {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? 1 : parseInt(value, 10)
            }))
            return
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle array field changes
    const handleArrayChange = (field: 'responsibilities' | 'requiredSkills' | 'preferredSkills', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
    }

    // Add new item to array field
    const addArrayItem = (field: 'responsibilities' | 'requiredSkills' | 'preferredSkills') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }))
    }

    // Remove item from array field
    const removeArrayItem = (field: 'responsibilities' | 'requiredSkills' | 'preferredSkills', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError(null)

            // Filter out empty strings from arrays
            const cleanedData: JobDescriptionCreate = {
                ...formData,
                responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
                requiredSkills: formData.requiredSkills.filter(s => s.trim() !== ''),
                preferredSkills: formData.preferredSkills.filter(s => s.trim() !== ''),
            }

            // Validate required fields
            if (!cleanedData.jobTitle || !cleanedData.roleOverview) {
                throw new Error('Please fill in all required fields')
            }

            // Create job via API
            await jobsService.createJob(cleanedData)

            // Navigate back to jobs list on success
            alert('Job position created successfully!')
            navigate('/jobs')
        } catch (err) {
            console.error('Error creating job:', err)
            const message = err instanceof Error ? err.message : 'Failed to create job position. Please try again.'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Add Job Position</h1>
            </header>

            <Card>
                <CardHeader title="Create New Job Position" />

                <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
                    {error && (
                        <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fee', color: '#c00', borderRadius: '4px' }}>
                            {error}
                        </div>
                    )}

                    {/* Basic Information */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: '#4A90E2', marginBottom: '1rem' }}>STEP 1: BASIC INFORMATION</h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Job Title *
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                placeholder="e.g. Senior Product Designer"
                                required
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Job Description *
                            </label>
                            <textarea
                                name="roleOverview"
                                value={formData.roleOverview}
                                onChange={handleChange}
                                placeholder="Provide a detailed job description here"
                                required
                                rows={4}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    {/* Experience & Compensation */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: '#4A90E2', marginBottom: '1rem' }}>STEP 2: EXPERIENCE & COMPENSATION</h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Experience Level *
                            </label>
                            <input
                                type="text"
                                name="experienceLevel"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                placeholder="e.g. 1-3 years"
                                required
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Total Positions *
                            </label>
                            <input
                                type="number"
                                name="totalPositions"
                                value={formData.totalPositions === 0 ? '' : formData.totalPositions}
                                onChange={handleChange}
                                placeholder="1"
                                min="1"
                                required
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                            <small style={{ color: '#666', fontSize: '0.875rem' }}>
                                Number of positions available for this role
                            </small>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Salary Display *
                                </label>
                                <input
                                    type="text"
                                    name="salaryRangeDisplay"
                                    value={formData.salaryRangeDisplay}
                                    onChange={handleChange}
                                    placeholder="e.g. RM 5000 - 8000"
                                    required
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Minimum Salary *
                                </label>
                                <input
                                    type="number"
                                    name="salaryRangeMin"
                                    value={formData.salaryRangeMin === 0 ? '' : formData.salaryRangeMin}
                                    onChange={handleChange}
                                    placeholder="5000"
                                    required
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                    Maximum Salary *
                                </label>
                                <input
                                    type="number"
                                    name="salaryRangeMax"
                                    value={formData.salaryRangeMax === 0 ? '' : formData.salaryRangeMax}
                                    onChange={handleChange}
                                    placeholder="8000"
                                    required
                                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Required Skills */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: '#4A90E2', marginBottom: '1rem' }}>STEP 3: REQUIRED SKILLS</h3>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Required Skills
                            </label>
                            {formData.requiredSkills.map((skill, index) => (
                                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleArrayChange('requiredSkills', index, e.target.value)}
                                        placeholder="e.g. React, Python"
                                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                    {formData.requiredSkills.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('requiredSkills', index)}
                                            style={{ padding: '0.5rem 1rem', backgroundColor: '#f44', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('requiredSkills')}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                + Add Skill
                            </button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Preferred Skills
                            </label>
                            {formData.preferredSkills.map((skill, index) => (
                                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleArrayChange('preferredSkills', index, e.target.value)}
                                        placeholder="e.g. Docker, AWS"
                                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                    {formData.preferredSkills.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('preferredSkills', index)}
                                            style={{ padding: '0.5rem 1rem', backgroundColor: '#f44', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('preferredSkills')}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                + Add Skill
                            </button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                                Key Responsibilities
                            </label>
                            {formData.responsibilities.map((resp, index) => (
                                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={resp}
                                        onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                                        placeholder="Add a key responsibility"
                                        style={{ flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                    />
                                    {formData.responsibilities.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('responsibilities', index)}
                                            style={{ padding: '0.5rem 1rem', backgroundColor: '#f44', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('responsibilities')}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                + Add Responsibility
                            </button>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/jobs')}
                            disabled={loading}
                            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#ddd', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ padding: '0.75rem 1.5rem', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            {loading ? 'Creating...' : 'Add Job Position'}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    )
}
