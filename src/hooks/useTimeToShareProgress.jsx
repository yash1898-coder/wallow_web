import { useState } from "react"
import { useEffect } from "react"

export const useTimeToShareProgress = (team) => {
    const [timeToShareProgress, setTimeToShareProgress] = useState(false)

    useEffect(() => {
        const isTimeToShareProgress = () => {
            const timeZone = team?.timezone
            const currentDate = new Date().toLocaleString('en-US', { timeZone, hour12: false })
            const currentTime = currentDate.split(', ')[1].replace(' AM', '').replace(' PM', '')
            const currentTimePadded = currentTime.split(':').map(num => num.padStart(2, '0')).join(':') //make sure it's 2 digits between :

            const targetTime = team?.scrum_time
            const duration = team?.duration
            const targetTimeObject = new Date()
            targetTimeObject.setHours(...targetTime.split(':'))
            targetTimeObject.toLocaleString('en-US', { timeZone, hour12: false })

            const currentTimeObject = new Date().toLocaleString('en-US', { timeZone, hour12: false })

            const elapsedMilliseconds = new Date(currentTimeObject) - targetTimeObject
            const elapsedMinutes = elapsedMilliseconds / (1000 * 60)

            if (currentTimePadded < targetTime) {
                setTimeToShareProgress(false)
            } else if (currentTimePadded > targetTime && elapsedMinutes <= duration) {
                setTimeToShareProgress(true)
            } else {
                setTimeToShareProgress(false)
            }
        }

        const interval = setInterval(isTimeToShareProgress, 1000)

        return () => clearInterval(interval)
    }, [team?.duration, team?.scrum_time, team?.timezone])

    return { timeToShareProgress }
}
