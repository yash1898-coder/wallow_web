import { useEffect } from 'react'
import { useStore } from '../stores/useStore'
import { useLocation } from 'react-router-dom'

export const useHighlightImpactCard = () => {
    const { setAnimatedImpactCard, animatedImpactCard } = useStore()
    const { hash } = useLocation()

    useEffect(() => {
        setAnimatedImpactCard(undefined)
    }, [])

    if ((hash.includes('#blocker') || hash.includes('#impediment')) && !animatedImpactCard) {
        setAnimatedImpactCard(hash.split('-')[1])
    }
}
