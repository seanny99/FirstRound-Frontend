import React, { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`card ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

interface CardHeaderProps {
    title?: string
    subtitle?: string
    action?: ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
    return (
        <div className="card-header">
            <div>
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
            {action && <div className="card-action">{action}</div>}
        </div>
    )
}
