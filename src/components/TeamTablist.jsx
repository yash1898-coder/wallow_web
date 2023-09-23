import { useState } from "react"

export const TeamTablist = ({ tabs, currTab, onTabChange }) => {
    return (
        <div
            className="team-tablist"
            role="team-tablist"
            aria-label="teams list"
        >
            {tabs.map((tab, idx) => (
                <Tab
                    key={idx}
                    currTab={currTab}
                    onTabChange={onTabChange}
                    tab={tab}
                />
            ))}
        </div>
    )
}

const Tab = ({ onTabChange, tab, currTab }) => {
    const [hovered, setHovered] = useState(false)

    return (
        <button
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onTabChange(tab)}
            role="tab"
            aria-selected={currTab.title === tab.title}
            aria-controls={`${tab.title}-tab`}
            className="team-tablist__tab"
        >
            <span
                className="team-tablist__tab-tooltip"
                data-visible={hovered}
            >
                {tab.title}
            </span>
            <span className="team-tablist__tab-inner">
                <img
                    className="team-tablist__tab-icon"
                    src={tab.icon}
                    alt={`${tab.title}`}
                />
            </span>
        </button>
    )
}
