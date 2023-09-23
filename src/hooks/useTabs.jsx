import { useState } from "react"

export const useTabs = (tabs) => {
    const [currTab, setCurrTab] = useState(tabs[0])
    const onTabChange = (tab) => setCurrTab(tab)

    return { tabs, currTab, onTabChange, setCurrTab }
}
