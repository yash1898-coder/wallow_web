import { useEffect, useState } from "react"
import engineering from "../../assets/home/engineering.png"
import design from "../../assets/home/design.png"
import product from "../../assets/home/product.png"
import marketing from "../../assets/home/marketing.png"
import operations from "../../assets/home/operations.png"
import HR from "../../assets/home/HR.png"
import finance from "../../assets/home/finance.png"
import team3Preview from "../../assets/home/team3Preview.png"
import { AnimatePresence, motion } from "framer-motion"
import { fadeIn } from "../../utils"

export const Teams = () => {
    const tabs = [
        {
            title: "Engineering",
            icon: engineering,
            preview: team3Preview,
            previewAlt: "",
        },
        {
            title: "Design",
            icon: design,
            preview: team3Preview,
            previewAlt: "",
        },
        {
            title: "Product",
            icon: product,
            preview: team3Preview,
            previewAlt: "",
        },
        {
            title: "Marketing",
            icon: marketing,
            preview: team3Preview,
            previewAlt: "",
        },
        {
            title: "Operations",
            icon: operations,
            preview: team3Preview,
            previewAlt: "",
        },
        { title: "HR", icon: HR, preview: team3Preview, previewAlt: "" },
        {
            title: "Finance",
            icon: finance,
            preview: team3Preview,
            previewAlt: "",
        },
    ]

    const [currTab, setCurrTab] = useState(tabs[0])
    const [canAutoloop, setCanAutoloop] = useState(true)

    useEffect(() => {
        let interval
        if (canAutoloop) {
            interval = setInterval(() => {
                setCurrTab((prevTab) => {
                    const currTabIndex = tabs.findIndex(
                        (tab) => tab === prevTab
                    )
                    const nextTabIndex = (currTabIndex + 1) % tabs.length
                    return tabs[nextTabIndex]
                })
            }, 4000)
        }
        return () => clearInterval(interval)
    }, [canAutoloop])

    return (
        <section className="home-teams container">
            <h2 className="fs-800 fw-700 text-center">
                Every team, side-by-side
            </h2>
            <div
                className="home-teams-tablist"
                role="tablist"
                aria-label="teams list"
            >
                {tabs.map((tab) => (
                    <button
                        onClick={() => {
                            setCurrTab(tab)
                            setCanAutoloop(false)
                        }}
                        key={tab.title}
                        role="tab"
                        aria-selected={currTab.title === tab.title}
                        aria-controls={`${tab.title}-tab`}
                        className="home-teams-tablist__tab"
                    >
                        <img
                            className="home-teams-tablist__tab-icon"
                            src={tab.icon}
                            alt={`${tab.title} icon`}
                        />
                        {tab.title}
                    </button>
                ))}
            </div>
            <div
                className="home-teams__tabpanel"
                role="tabpanel"
            >
                <AnimatePresence mode="popLayout">
                    <motion.img
                        className="home-teams__preview-img preview-img"
                        key={currTab.title}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        transition={{ duration: 0.4 }}
                        variants={fadeIn}
                        src={currTab.preview}
                        alt={currTab.previewAlt}
                    />
                </AnimatePresence>
            </div>
        </section>
    )
}
