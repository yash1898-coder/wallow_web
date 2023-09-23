export const Tablist = ({ centered = true, tabs, currTab, onTabChange }) => {
    return (
        <div
            style={{ justifyContent: !centered ? "flex-start" : "" }}
            className="tablist"
            role="tablist"
            aria-label="teams list"
        >
            {tabs.map((tab, idx) => (
                <button
                    type="button"
                    onClick={() => onTabChange(tab)}
                    key={idx}
                    role="tab"
                    aria-selected={currTab.title === tab.title}
                    aria-controls={`${tab.title}-tab`}
                    className="tablist__tab"
                >
                    <img
                        className="tablist__tab-icon"
                        src={tab.icon}
                        alt={`${tab.title} icon`}
                    />
                    {tab.title}
                </button>
            ))}
        </div>
    )
}
