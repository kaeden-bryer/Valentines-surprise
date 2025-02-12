import React from "react"

interface MilestoneProps {
    text: string;
}

const Milestone: React.FC<MilestoneProps> = ({ text }) => {
    
    return (
        <div className="header-container">
            <img src="/images/fancy-header.png" width="60%" />
            <div className="milestone-text">{text}</div>
        </div>
    )
}

export default Milestone;