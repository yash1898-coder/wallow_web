import design from "./assets/home/design.png"
import engineering from "./assets/home/engineering.png"
import hr from "./assets/home/HR.png"
import finance from "./assets/home/finance.png"
import marketing from "./assets/home/marketing.png"
import product from "./assets/home/product.png"
import operations from "./assets/home/operations.png"
import visa from "./assets/dashboard/visa.png"
import mastercard from "./assets/dashboard/mastercard.png"
import americanExpress from "./assets/dashboard/americanExpress.png"
import discover from "./assets/dashboard/discover.png"
import { ReactComponent as ArrowDown } from "./assets/arrow-down.svg"

export const today = new Date()

export const formatCurrency = (number) => {
    const formatter = new Intl.NumberFormat("en", {
        currency: "USD",
        style: "currency",
    })
    return formatter.format(number)
}

export const stringToDate = (dateString) => {
    let dateObject
    if (dateString?.includes("T")) {
        dateObject = new Date(dateString)
    } else {
        dateObject = new Date(Date.parse(dateString + "T00:00:00"))
    }

    return dateObject
}

export const formatDateExact = (date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
    })

    return formatter.format(date)
}

export const formatDateTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp)
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()

    let ampm = "AM"
    let formattedHours = hours

    if (hours >= 12) {
        ampm = "PM"
        formattedHours = hours === 12 ? 12 : hours - 12
    }

    if (formattedHours === 0) {
        formattedHours = 12
    }

    const formattedMinutes = minutes.toString().padStart(2, "0")

    return `${formattedHours}:${formattedMinutes} ${ampm}`
}
export const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    })
    return formatter.format(date)
}
export const formatDateLong = (date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    })
    return formatter.format(date)
}
export const formatDateShort = (date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        year: "2-digit",
        month: "2-digit",
    })

    return formatter.format(date)
}
export const formatDateVeryShort = (date) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        month: "short",
    })

    return formatter.format(date)
}

export const fadeIn = {
    show: { opacity: 1 },
    hidden: { opacity: 0 },
}

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length)
}

export const teamIconLookup = (type) => {
    const lookup = {
        design,
        engineering,
        product,
        marketing,
        operations,
        hr,
        finance,
    }
    return lookup[type]
}

export const getMonth = (count) => {
    const formatter = new Intl.DateTimeFormat(undefined, { month: "short" })
    const date = new Date()
    date.setMonth(date.getMonth() - count)
    return formatter.format(date)
}

export const getYearOfMonths = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    const pastMonths = []

    for (let i = 0; i < 12; i++) {
        const targetMonth = currentMonth - i

        if (targetMonth >= 0) {
            pastMonths.push(months[targetMonth])
        } else {
            // Wrap around to the end of the months array
            const wrappedTargetMonth = targetMonth + months.length
            pastMonths.push(months[wrappedTargetMonth])
        }
    }

    return pastMonths
}

export const getPastMonthDay = (count) => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "long",
    })
    const date = new Date()
    date.setMonth(date.getMonth() - 1, 0)
    date.setDate(date.getDate() + count)
    return formatter.format(date)
}
export const getLastDayOfMonth = () => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "long",
    })
    const date = new Date()
    date.setMonth(date.getMonth(), 0)
    date.setDate(date.getDate())
    return formatter.format(date)
}

export const allowOnlyNumber = (value) => value.replace(/\D/g, "")

export const emailRegex = "^[a-zA-Z0-9._+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"

export const getAverage = (arr) => {
    if (arr.length < 1) return "No data for"
    return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
}

export const getChartVisualIndicators = (score) => {
    if (score >= 0.25 && score <= 1.0) {
        return {
            score: "positive",
            color: { item: "#00D959", line: "#00D959" },
            icon: (
                <ArrowDown
                    style={{ rotate: "180deg" }}
                    fill={"currentColor"}
                />
            ),
        }
    } else if (score >= -0.25 && score <= 0.25) {
        return {
            score: "neutral",
            color: { item: "#FFD700", line: "#FFD700" },
            icon: "",
        }
    } else if (score >= -1.0 && score <= -0.25) {
        return {
            score: "negative",
            color: { item: "#D9003D", line: "#D9003D" },
            icon: <ArrowDown fill={"currentColor"} />,
        }
    } else {
        return {
            score: "negative",
            color: { item: "#121212", line: "#121212" },
            icon: "",
        }
    }
}

export const pageSpinnerStyle = {
    position: "absolute",
    left: "50%",
    translate: "-50% 0",
    top: "30%",
}

export const teamDurationLookup = (value) => {
    const lookup = {
        15: "00:15:00",
        30: "00:30:00",
        45: "00:45:00",
        60: "1:00:00",
    }
    return { value: lookup[value] }
}
export const teamDurationReverseLookup = (value) => {
    const lookup = {
        "00:15:00": 15,
        "00:30:00": 30,
        "00:45:00": 45,
        "1:00:00": 60,
    }
    return { value: lookup[value] }
}

export const getGroupedByDate = (data) => {
    const grouped = {}
    data.forEach((item) => {
        const { created_at } = item
        const created_at_to_0 = new Date(created_at.setHours(0, 0, 0, 0))

        if (!grouped[created_at_to_0]) {
            grouped[created_at_to_0] = []
        }

        grouped[created_at_to_0].push(item)
    })

    return grouped
}

export const getGroupedByUpdatedDate = (data) => {
    const grouped = {}
    data.forEach((item) => {
        const { updated_at } = item
        const updated_at_to_0 = new Date(updated_at.setHours(0, 0, 0, 0))

        if (!grouped[updated_at_to_0]) {
            grouped[updated_at_to_0] = []
        }

        grouped[updated_at_to_0].push(item)
    })

    return grouped
}

export const hasLastMonthData = (data) => {
    return Object.keys(data).some((date) => {
        const itemDate = new Date(date)
        const currentDate = new Date()
        const lastMonthDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        )

        return itemDate <= lastMonthDate
    })
}

const hasTodayData = (data) => {
    return Object.keys(data).some((date) => {
        const itemDate = new Date(date)
        const todayDate = new Date()
        return itemDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)
    })
}
const hasYesterdayData = (data) => {
    const currentDate = new Date()
    const yesterdayDate = new Date(currentDate)
    yesterdayDate.setDate(currentDate.getDate() - 1)

    const yesterdayDay = yesterdayDate.getDate()
    const yesterdayMonth = yesterdayDate.getMonth()
    const yesterdayYear = yesterdayDate.getFullYear()

    return Object.keys(data).some((date) => {
        const itemDate = new Date(date)
        const itemDay = itemDate.getDate()
        const itemMonth = itemDate.getMonth()
        const itemYear = itemDate.getFullYear()

        return (
            itemDay === yesterdayDay &&
            itemMonth === yesterdayMonth &&
            itemYear === yesterdayYear
        )
    })
}

const hasLastWeekData = (data) => {
    return Object.keys(data).some((date) => {
        const itemDate = new Date(date)
        const currentDate = new Date()
        const lastWeekDate = new Date(currentDate)
        lastWeekDate.setDate(currentDate.getDate() - 7)

        return itemDate <= lastWeekDate
    })
}

export const getJumpToOptions = (data) => {
    const grouped = getGroupedByDate(data)
    let options = []
    if (hasTodayData(grouped)) {
        options = [
            ...options,
            {
                value: "Today",
            },
        ]
    }
    if (hasLastMonthData(grouped)) {
        options = [
            ...options,
            {
                value: "Last month",
            },
        ]
    }
    if (hasLastWeekData(grouped)) {
        options = [
            ...options,
            {
                value: "Last week",
            },
        ]
    }
    if (hasYesterdayData(grouped)) {
        options = [
            ...options,
            {
                value: "Yesterday",
            },
        ]
    }

    return options
}

export const getJumpToOptionsUpdatedAt = (data) => {
    const grouped = getGroupedByUpdatedDate(data)
    let options = []
    if (hasTodayData(grouped)) {
        options = [
            ...options,
            {
                value: "Today",
            },
        ]
    }
    if (hasLastMonthData(grouped)) {
        options = [
            ...options,
            {
                value: "Last month",
            },
        ]
    }
    if (hasLastWeekData(grouped)) {
        options = [
            ...options,
            {
                value: "Last week",
            },
        ]
    }
    if (hasYesterdayData(grouped)) {
        options = [
            ...options,
            {
                value: "Yesterday",
            },
        ]
    }

    return options
}

export const onJumpTo = (timePeriod, data, container = null) => {
    const currentDate = new Date()
    let targetDate

    if (timePeriod === "Today") {
        targetDate = new Date(currentDate)
    } else if (timePeriod === "Yesterday") {
        targetDate = new Date(currentDate)
        targetDate.setDate(targetDate.getDate() - 1)
    } else if (timePeriod === "Last week") {
        targetDate = new Date(currentDate)
        targetDate.setDate(targetDate.getDate() - 7)
    } else if (timePeriod === "Last month") {
        targetDate = new Date(currentDate)
        targetDate.setMonth(targetDate.getMonth() - 1)
    }

    const groupedItems = getGroupedByDate(data)

    for (const date in groupedItems) {
        const itemDate = new Date(date)
        if (itemDate.setHours(0, 0, 0, 0) >= targetDate.setHours(0, 0, 0, 0)) {
            const sectionElement = document.getElementById(
                targetDate.setHours(0, 0, 0, 0)
            )
            if (container) {
                let position = sectionElement.getBoundingClientRect()
                container.scrollTo(
                    position.left,
                    position.top + window.scrollY - 200
                )
                sectionElement.scrollIntoView({ behavior: "smooth" })
            } else if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: "smooth" })
            }
            break
        }
    }
}
export const onJumpToUpdatedAt = (timePeriod, data, container = null) => {
    const currentDate = new Date()
    let targetDate

    if (timePeriod === "Today") {
        targetDate = new Date(currentDate)
    } else if (timePeriod === "Yesterday") {
        targetDate = new Date(currentDate)
        targetDate.setDate(targetDate.getDate() - 1)
    } else if (timePeriod === "Last week") {
        targetDate = new Date(currentDate)
        targetDate.setDate(targetDate.getDate() - 7)
    } else if (timePeriod === "Last month") {
        targetDate = new Date(currentDate)
        targetDate.setMonth(targetDate.getMonth() - 1)
    }

    const groupedItems = getGroupedByUpdatedDate(data)

    for (const date in groupedItems) {
        const itemDate = new Date(date)
        if (itemDate.setHours(0, 0, 0, 0) >= targetDate.setHours(0, 0, 0, 0)) {
            const sectionElement = document.getElementById(
                targetDate.setHours(0, 0, 0, 0)
            )
            if (container) {
                let position = sectionElement.getBoundingClientRect()
                container.scrollTo(
                    position.left,
                    position.top + window.scrollY - 200
                )
                sectionElement.scrollIntoView({ behavior: "smooth" })
            } else if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: "smooth" })
            }
            break
        }
    }
}

export function truncate(str, max) {
    return str.length > max ? str.substr(0, max - 1) + "…" : str
}

export const getCSSVariable = (variable) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

export const getRandClr = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const arraysAreEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2)
}

export const onChartResize = (chart) => chart.resize()

export const chartDropdownOptions = [
    { range: "0.1 - 1.0", title: "Positive", color: "#0F9D58" },
    { range: "-0.1 - 0.1", title: "Neutral", color: "#F4B400" },
    { range: "-1.0 - -0.1", title: "Negative", color: "#DB4437" },
]

export const getLastFourDigits = (cardNumber) => {
    if (typeof cardNumber === "string" && cardNumber.length >= 4) {
        return cardNumber.slice(-4)
    } else {
        // Handle invalid input (e.g., if the card number is not a string or is less than 4 characters)
        return "Invalid card number"
    }
}

export const getCardType = (number) => {
    if (/^4\d{15}$/.test(number)) {
        return { src: visa, alt: "Visa" }
    } else if (/^5[1-5]\d{14}$/.test(number)) {
        return { src: mastercard, alt: "Mastercard" }
    } else if (/^3[47]\d{13}$/.test(number)) {
        return { src: americanExpress, alt: "American Express" }
    } else if (/^(6011|65\d{2}|64[4-9]\d)\d{12}|(62\d{14})$/.test(number)) {
        return { src: discover, alt: "Discover" }
    } else {
        return undefined
    }
}

export const containsSpecialChars = (inputString) => {
    // eslint-disable-next-line no-useless-escape
    const specialCharsRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return specialCharsRegex.test(inputString)
}

export const getCurrentTimestamp = () => {
    const currentDate = new Date()
    const year = currentDate.getUTCFullYear()
    const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getUTCDate()).padStart(2, "0")
    const hours = String(currentDate.getUTCHours()).padStart(2, "0")
    const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0")
    const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0")

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000000Z`
}

export const addLeadingZeroToDate = (date) => {
    const [year, month] = date.split("-")
    const formattedMonth = month.padStart(2, "0")
    return `${year}-${formattedMonth}`
}

export const getTodayOrYesterdayDate = (date) => {
    const currentDate = new Date()
    const yesterdayDate = new Date(currentDate)
    yesterdayDate.setDate(currentDate.getDate() - 1)

    if (date.toDateString() === currentDate.toDateString()) {
        return "Today"
    } else if (date.toDateString() === yesterdayDate.toDateString()) {
        return "Yesterday"
    } else {
        return formatDateLong(date)
    }
}

export function setFirstStringToEmptyIfStartsWithSecond(
    firstString,
    secondString
) {
    if (firstString.startsWith(secondString)) {
        firstString = ""
    }
    if (firstString.split("@").length > 2) {
        return `${getBeforeLastAt(firstString)}@${secondString}`
    } else {
        return `${firstString.split("@")[0]}@${secondString}`
    }
}

function getBeforeLastAt(inputString) {
    const lastAtIndex = inputString.lastIndexOf("@")

    if (lastAtIndex !== -1) {
        return inputString.substring(0, lastAtIndex)
    } else {
        return inputString
    }
}

export function isDateToday(dateString) {
    const date = new Date(dateString)
    const today = new Date()

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    )
}
