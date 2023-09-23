import { useState } from "react"
import { Checkbox } from "../../../components/Checkbox"
import { useTabs } from "../../../hooks/useTabs"
import { Tablist } from "../../../components/Tablist"
import deleteIcon from "../../../assets/delete.svg"
import pencilIcon from "../../../assets/pencil.svg"

export const TechStack = () => {
    const [formData, setFormData] = useState([
        {
            title: "Front-end",
            sections: [
                {
                    label: "Programming Languages",
                    items: [
                        { label: "HTML", checked: false },
                        { label: "CSS", checked: false },
                        { label: "JavaScript", checked: false },
                    ],
                },
                {
                    label: "Frameworks & Libraries",
                    items: [
                        { label: "React", checked: false },
                        { label: "Angular", checked: false },
                        { label: "Vue.js", checked: false },
                    ],
                },
                {
                    label: "UI Frameworks",
                    items: [
                        { label: "Bootstrap", checked: false },
                        { label: "Material-UI", checked: false },
                    ],
                },
                {
                    label: "State Management",
                    items: [
                        { label: "Redux", checked: false },
                        { label: "MobX", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Back-end",
            sections: [
                {
                    label: "Programming Languages",
                    items: [
                        { label: "Python", checked: false },
                        { label: "Java", checked: false },
                        { label: "Ruby", checked: false },
                        { label: "Node.js", checked: false },
                    ],
                },
                {
                    label: "Web Frameworks",
                    items: [
                        { label: "Django", checked: false },
                        { label: "Ruby on Rails", checked: false },
                        { label: "Express.js", checked: false },
                    ],
                },
                {
                    label: "Database Management",
                    items: [
                        { label: "MySQL", checked: false },
                        { label: "PostgreSQL", checked: false },
                        { label: "MongoDB", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Server-Side Development",
            sections: [
                {
                    label: "Web Servers",
                    items: [
                        { label: "Nginx", checked: false },
                        { label: "Apache", checked: false },
                    ],
                },
                {
                    label: "Application Servers",
                    items: [
                        { label: "Tomcat", checked: false },
                        { label: "WildFly", checked: false },
                    ],
                },
            ],
        },
        {
            title: "APIs and Microservices",
            sections: [
                {
                    label: "API Frameworks",
                    items: [
                        { label: "GraphQL", checked: false },
                        { label: "RESTful APIs", checked: false },
                    ],
                },
                {
                    label: "Microservices",
                    items: [
                        { label: "Docker", checked: false },
                        { label: "Kubernetes", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Database",
            sections: [
                {
                    label: "Relational Databases",
                    items: [
                        { label: "MySQL", checked: false },
                        { label: "PostgreSQL", checked: false },
                        { label: "SQL Server", checked: false },
                    ],
                },
                {
                    label: "NoSQL Databases",
                    items: [
                        { label: "MongoDB", checked: false },
                        { label: "Cassandra", checked: false },
                        { label: "Redis", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Version Control",
            sections: [
                {
                    label: "Git",
                    items: [
                        { label: "GitHub", checked: false },
                        { label: "GitLab", checked: false },
                        { label: "Bitbucket", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Testing",
            sections: [
                {
                    label: "Unit Testing",
                    items: [
                        { label: "Jest", checked: false },
                        { label: "JUnit", checked: false },
                    ],
                },
                {
                    label: "Integration Testing",
                    items: [
                        { label: "Selenium", checked: false },
                        { label: "TestNG", checked: false },
                    ],
                },
            ],
        },
        {
            title: "CI/CD",
            sections: [
                {
                    label: "CI/CD Tools",
                    items: [
                        { label: "Jenkins", checked: false },
                        { label: "CircleCI", checked: false },
                        { label: "Travis CI", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Hosting and Cloud Services",
            sections: [
                {
                    label: "Cloud Platforms",
                    items: [
                        { label: "AWS", checked: false },
                        { label: "Google Cloud Platform", checked: false },
                        { label: "Microsoft Azure", checked: false },
                    ],
                },
                {
                    label: "Hosting Services",
                    items: [
                        { label: "Heroku", checked: false },
                        { label: "Netlify", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Development Tools",
            sections: [
                {
                    label: "Integrated Development Environments (IDEs)",
                    items: [
                        { label: "Visual Studio Code", checked: false },
                        { label: "IntelliJ IDEA", checked: false },
                        { label: "Eclipse", checked: false },
                    ],
                },
                {
                    label: "Package Managers",
                    items: [
                        { label: "npm (Node.js)", checked: false },
                        { label: "pip (Python)", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Front-End Design",
            sections: [
                {
                    label: "Design Tools",
                    items: [
                        { label: "Adobe XD", checked: false },
                        { label: "Figma", checked: false },
                        { label: "Sketch", checked: false },
                    ],
                },
                {
                    label: "Prototyping",
                    items: [
                        { label: "InVision", checked: false },
                        { label: "Marvel", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Security",
            sections: [
                {
                    label: "Web Application Firewalls (WAF)",
                    items: [
                        { label: "ModSecurity", checked: false },
                        { label: "Cloudflare WAF", checked: false },
                    ],
                },
                {
                    label: "SSL Certificates",
                    items: [
                        { label: "Let's Encrypt", checked: false },
                        { label: "Comodo", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Analytics and Monitoring",
            sections: [
                {
                    label: "Analytics",
                    items: [
                        { label: "Google Analytics", checked: false },
                        { label: "Mixpanel", checked: false },
                    ],
                },
                {
                    label: "Error Tracking",
                    items: [
                        { label: "Sentry", checked: false },
                        { label: "Rollbar", checked: false },
                    ],
                },
            ],
        },
        {
            title: "CMS",
            sections: [
                {
                    label: "Systems",
                    items: [
                        { label: "WordPress", checked: false },
                        { label: "Drupal", checked: false },
                        { label: "Joomla", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Communication and Collaboration",
            sections: [
                {
                    label: "Project Management",
                    items: [
                        { label: "Jira", checked: false },
                        { label: "Trello", checked: false },
                        { label: "Asana", checked: false },
                    ],
                },
                {
                    label: "Communication",
                    items: [
                        { label: "Slack", checked: false },
                        { label: "Microsoft Teams", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Versioning and Documentation",
            sections: [
                {
                    label: "Version Control",
                    items: [{ label: "Git", checked: false }],
                },
                {
                    label: "Documentation",
                    items: [
                        { label: "Swagger", checked: false },
                        { label: "Confluence", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Machine Learning and AI",
            sections: [
                {
                    label: "Frameworks",
                    items: [
                        { label: "TensorFlow", checked: false },
                        { label: "PyTorch", checked: false },
                    ],
                },
                {
                    label: "Libraries",
                    items: [
                        { label: "scikit-learn", checked: false },
                        { label: "OpenCV", checked: false },
                    ],
                },
            ],
        },
        {
            title: "Mobile Development",
            sections: [
                {
                    label: "iOS",
                    items: [
                        { label: "Swift", checked: false },
                        { label: "Xcode", checked: false },
                    ],
                },
                {
                    label: "Android",
                    items: [
                        { label: "Kotlin", checked: false },
                        { label: "Android Studio", checked: false },
                    ],
                },
            ],
        },
    ])
    const [editing, setEditing] = useState(false)

    const { currTab, onTabChange, tabs } = useTabs(formData)

    const categoryIdx = tabs.findIndex((i) => i.title === currTab.title)

    const onChange = (sectionIdx, itemIdx) => {
        const updatedFormData = [...formData]
        const item =
            updatedFormData[categoryIdx].sections[sectionIdx].items[itemIdx]

        if (item.checked) {
            updatedFormData[categoryIdx].sections[sectionIdx].items[
                itemIdx
            ].checked = false
        } else {
            updatedFormData[categoryIdx].sections[sectionIdx].items[
                itemIdx
            ].checked = true
        }
        setFormData(updatedFormData)
    }

    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <div
                className="flex justify-between"
                style={{ minHeight: "40px" }}
            >
                <h1 className="fs-700 fw-600">Technology Stack</h1>
                {!editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(true)}
                    >
                        Add technology
                    </button>
                )}
            </div>
            {editing && (
                <form className="flow customer-personas-form">
                    <div className="mt">
                        <Tablist
                            centered={false}
                            tabs={tabs}
                            currTab={currTab}
                            onTabChange={onTabChange}
                        />
                    </div>
                    {currTab.sections.map((s, sectionIdx) => (
                        <div
                            key={sectionIdx}
                            className="flow mt"
                        >
                            <h2 className="fs-500 fw-500 flow">{s.label}</h2>
                            <div className="flex flex-wrap ">
                                {s.items.map((item, itemIdx) => (
                                    <label
                                        key={itemIdx}
                                        htmlFor={item.label}
                                        className="flex"
                                    >
                                        <Checkbox
                                            name={item.label}
                                            onChange={() =>
                                                onChange(sectionIdx, itemIdx)
                                            }
                                            checked={
                                                formData[categoryIdx].sections[
                                                    sectionIdx
                                                ]?.items.find(
                                                    (i) =>
                                                        i.label === item.label
                                                )?.checked
                                            }
                                        />
                                        {item.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </form>
            )}
            {editing && (
                <div className="flex mt">
                    <button
                        className="button button--green "
                        onClick={() => setEditing(true)}
                    >
                        Save
                    </button>
                    <button
                        className="button "
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {!editing && (
                <div className="tech-stack-items">
                    {tabs.map((tab, tabIdx) => (
                        <Item
                            key={tabIdx}
                            tab={tab}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const Item = ({ tab }) => {
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState(tab)

    const onChange = () => {}

    return (
        <div className="text-center tech-stack-item flow hovered-icon-button-parent">
            <h3 className="fs-600 fw-600">{tab.title}</h3>

            {formData.sections.map((s, sIdx) => (
                <div
                    key={sIdx}
                    className="flow"
                    data-spacing="small"
                >
                    <h4 className="fw-500">{s.label}:</h4>
                    <div className="flex flex-wrap justify-center">
                        {editing
                            ? s.items.map((item, itemIdx) => (
                                  <label
                                      key={itemIdx}
                                      htmlFor={item.label}
                                      className="flex"
                                  >
                                      <Checkbox
                                          name={item.label}
                                          onChange={onChange}
                                          checked={
                                              formData.sections[
                                                  sIdx
                                              ]?.items.find(
                                                  (i) => i.label === item.label
                                              )?.checked
                                          }
                                      />
                                      {item.label}
                                  </label>
                              ))
                            : s.items.map((item, itemIdx) => (
                                  <p key={itemIdx}>{item.label}</p>
                              ))}
                    </div>
                </div>
            ))}
            <div className="flex">
                {editing && (
                    <button
                        className="button button--green "
                        onClick={() => setEditing(true)}
                    >
                        Save
                    </button>
                )}
                {editing && (
                    <button
                        className="button "
                        onClick={() => setEditing(false)}
                    >
                        Cancel
                    </button>
                )}
            </div>
            {!editing && (
                <div
                    className="flex"
                    style={{ "--gap": ".25rem", marginTop: "auto" }}
                >
                    <button
                        className="icon-button"
                        onClick={() => setEditing(true)}
                    >
                        <img
                            src={pencilIcon}
                            alt="edit"
                        />
                    </button>
                    <button className="icon-button">
                        <img
                            src={deleteIcon}
                            alt="delete"
                        />
                    </button>
                </div>
            )}
        </div>
    )
}
