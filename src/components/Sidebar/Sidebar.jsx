import { DropdownItem } from "./DropdownItem"
import logo from "../../assets/logo.png"
import progress from "../../assets/sidebar/progress.svg"
import impediments from "../../assets/sidebar/impediments.svg"
import blockers from "../../assets/sidebar/blockers.svg"
import retrospective from "../../assets/sidebar/retrospective.svg"
import insights from "../../assets/sidebar/insights.svg"
import sentiment from "../../assets/sidebar/ico_emoji_green.svg"
import productVision from "../../assets/sidebar/productVision.svg"
import productArtifacts from "../../assets/sidebar/productArtifacts.svg"
import productDescription from "../../assets/sidebar/productDescription.svg"
import productNews from "../../assets/sidebar/productNews.svg"
import valueProposition from "../../assets/sidebar/valueProposition.svg"
import okrs from "../../assets/sidebar/okrs.svg"
import meetTeam from "../../assets/sidebar/meetTeam.svg"
import customerPersonas from "../../assets/sidebar/customerPersonas.svg"
import productRoadmap from "../../assets/sidebar/productRoadmap.svg"
import techStack from "../../assets/sidebar/techStack.svg"
import techNews from "../../assets/sidebar/techNews.svg"
import customerFeedback from "../../assets/sidebar/customerFeedback.svg"
import teamFeedback from "../../assets/sidebar/teamFeedback.svg"
import plus from "../../assets/sidebar/plus.svg"
import { SidebarItem } from "./SidebarItem"
import caret from "../../assets/caret.svg"
import { Dropdown } from "./Dropdown"
import { Link } from "react-router-dom"
import { useStore } from "../../stores/useStore"
import { useQuery } from "react-query"
import { getProductAreas } from "../../api/productAreas"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { getTeams } from "../../api/teams"
import { Tooltip } from "../Tooltip"
import sidebarOpen from "../../assets/sidebar/ico_sidebar_on.png"

export const Sidebar = ({ open, onItemClick, setOpen }) => {
    const { editingProduct } = useEditProductStore()
    const { openModal } = useStore()

    const {
        error: productAreasError,
        isLoading: productAreasLoading,
        data: productAreas,
    } = useQuery(
        ["productAreas", editingProduct.id],
        () => getProductAreas(editingProduct.id),
        { retry: false }
    )
    const {
        error: teamsError,
        isLoading: teamsLoading,
        data: teamsList,
    } = useQuery(
        ["teams", editingProduct.id],
        () => getTeams(editingProduct.id),
        { retry: false }
    )

    const dashboard = [
        {
            title: "Progress",
            icon: progress,
            href: "/dashboard/progress",
        },
        {
            title: "Insights",
            icon: insights,
            href: "/dashboard/insights",
        },
        {
            title: "Blockers",
            icon: blockers,
            href: "/dashboard/blockers",
        },
        {
            title: "Impediments",
            icon: impediments,
            href: "/dashboard/impediments",
        },
        {
            title: "Retrospective",
            icon: retrospective,
            href: "/dashboard/retrospective",
        },
        {
            title: "Sentiment",
            icon: sentiment,
            href: "/dashboard/sentiment",
        },
    ]

    const aboutProduct = [
        {
            title: "Product Vision",
            icon: productVision,
            href: "/dashboard/product-vision",
        },
        {
            title: "Product Description",
            icon: productDescription,
            href: "/dashboard/product-description",
        },
        {
            title: "Product News",
            icon: productNews,
            href: "/dashboard/product-news",
        },
        {
            title: "Product Artifacts",
            icon: productArtifacts,
            href: "/dashboard/product-artifacts",
        },
        {
            title: "Value Proposition",
            icon: valueProposition,
            href: "/dashboard/value-proposition",
        },
        {
            title: "OKRs",
            icon: okrs,
            href: "/dashboard/okrs",
        },
        {
            title: "Meet the team",
            icon: meetTeam,
            href: "/dashboard/meet-the-team",
        },
        {
            title: "Customer Personas",
            icon: customerPersonas,
            href: "/dashboard/customer-personas",
        },
        {
            title: "Product Roadmap",
            icon: productRoadmap,
            href: "/dashboard/product-roadmap",
        },
        {
            title: "Technology Stack",
            icon: techStack,
            href: "/dashboard/tech-stack",
        },
        {
            title: "Technology News",
            icon: techNews,
            href: "/dashboard/tech-news",
        },
        {
            title: "Customer Feedback",
            icon: customerFeedback,
            href: "/dashboard/customer-feedback",
        },
        {
            title: "Team Feedback",
            icon: teamFeedback,
            href: "/dashboard/team-feedback",
        },
    ]

    const getTeamsItems = () => {
        let dropdown = []
        if (editingProduct?.role?.includes("Owner")) {
            dropdown = [
                {
                    title: "Teams",
                    dropdown: true,
                    icon: caret,
                    items: teamsList?.map((t) => ({
                        ...t,
                        name: t.name,
                        href: `/dashboard/teams/${t.id}`,
                        bgIcon: true,
                    })),
                },
                {
                    title: "Add Teams",
                    button: true,
                    onClick: () => openModal("createTeam"),
                    icon: plus,
                },
            ]
        } else {
            dropdown = [
                {
                    title: "Teams",
                    dropdown: true,
                    icon: caret,
                    items: teamsList?.map((t) => ({
                        ...t,
                        name: t.name,
                        href: `/dashboard/teams/${t.id}`,
                        bgIcon: true,
                    })),
                },
            ]
        }
        return dropdown
    }

    const getProductsAreaItems = () => {
        let dropdown = []
        if (editingProduct?.role?.includes("Owner")) {
            dropdown = [
                {
                    title: "Product areas",
                    dropdown: true,
                    icon: caret,
                    items: productAreas?.map((p) => ({
                        name: `# ${p.name}`,
                        href: `/dashboard/product-areas/${p.id}`,
                    })),
                },
                {
                    title: "Add Product Areas",
                    button: true,
                    icon: plus,
                    onClick: () => openModal("createProductArea"),
                },
            ]
        } else {
            dropdown = [
                {
                    title: "Product areas",
                    dropdown: true,
                    icon: caret,
                    items: productAreas?.map((p) => ({
                        name: p.name,
                        href: `/dashboard/product-areas/${p.id}`,
                    })),
                },
            ]
        }
        return dropdown
    }

    const getDropdownItems = () => {
        let dropdown = [
            {
                title: `Invite people to ${editingProduct?.name}`,
                onClick: () => openModal("sendInviteProduct"),
                mobileOnly: true,
            },
            {
                title: `Invite people to ${editingProduct?.name}`,
                linkAndButton: true,
                onClick: () => openModal("sendInviteProduct"),
                href: "/dashboard/members",
                desktopOnly: true,
            },
        ]
        if (editingProduct?.role?.includes("Owner")) {
            dropdown = [
                ...dropdown,
                {
                    title: "Create team",
                    onClick: () => openModal("createTeam"),
                },
                {
                    title: "Create product area",
                    onClick: () => openModal("createProductArea"),
                },
                {
                    title: "Members",
                    desktopOnly: true,
                    link: true,
                    href: "/dashboard/members",
                },
                {
                    title: "Edit productspace",
                    onClick: () => openModal("editProduct"),
                },
            ]
        }
        if (
            editingProduct?.role === "Primary Product Owner" ||
            editingProduct?.role === "Primary Organization Owner"
        ) {
            dropdown = [
                ...dropdown,
                {
                    title: "Delete productspace",
                    onClick: () => openModal("deleteProduct"),
                },
            ]
        }

        return dropdown
    }

    return (
        <nav
            data-visible={open}
            className="sidebar"
        >
            <div className="sidebar__inner">
                <header className="sidebar__header">
                    <Link
                        to="/dashboard"
                        className="flex fw-600 logo"
                    >
                        <img
                            className="sidebar__logo"
                            src={logo}
                            alt="Wallow logo"
                        />
                    </Link>

                    <Tooltip
                        text={"Close sidebar"}
                        position={"left"}
                    >
                        <button
                            onClick={() => {
                                setOpen(false)
                            }}
                            className="icon-button"
                        >
                            <img
                                src={sidebarOpen}
                                alt="sidebar"
                            />
                        </button>
                    </Tooltip>
                </header>

                <Dropdown
                    image={editingProduct?.image}
                    title={editingProduct?.name}
                    items={getDropdownItems()}
                    onItemClick={onItemClick}
                />
                <div>
                    <ul className="sidebar__list">
                        {dashboard.map((item) =>
                            !item.dropdown ? (
                                <SidebarItem
                                    key={item.title}
                                    {...item}
                                    onItemClick={onItemClick}
                                />
                            ) : (
                                <DropdownItem
                                    error={false}
                                    isLoading={false}
                                    key={item.title}
                                    {...item}
                                    onItemClick={onItemClick}
                                />
                            )
                        )}
                    </ul>
                </div>
                <div>
                    <h3 className="sidebar__list-title">Teams</h3>
                    <ul className="sidebar__list">
                        {getTeamsItems().map((item) =>
                            !item.dropdown ? (
                                <SidebarItem
                                    key={item.title}
                                    {...item}
                                    onItemClick={onItemClick}
                                />
                            ) : (
                                <DropdownItem
                                    error={teamsError}
                                    isLoading={teamsLoading}
                                    key={item.title}
                                    {...item}
                                    onItemClick={onItemClick}
                                />
                            )
                        )}
                    </ul>
                </div>

                <div>
                    <h3 className="sidebar__list-title">Product area</h3>
                    <ul className="sidebar__list">
                        {getProductsAreaItems().map((item) =>
                            !item.dropdown ? (
                                <SidebarItem
                                    key={item.title}
                                    {...item}
                                    onItemClick={onItemClick}
                                />
                            ) : (
                                <DropdownItem
                                    error={productAreasError}
                                    isLoading={productAreasLoading}
                                    key={item.title}
                                    {...item}
                                    onItemClick={onItemClick}
                                />
                            )
                        )}
                    </ul>
                </div>

                <div>
                    <h3 className="sidebar__list-title">
                        About {editingProduct?.name}
                    </h3>
                    <ul className="sidebar__list">
                        {aboutProduct.map((item) => (
                            <SidebarItem
                                key={item.title}
                                {...item}
                                onItemClick={onItemClick}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
