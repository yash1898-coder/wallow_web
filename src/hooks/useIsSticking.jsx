import { useEffect, useRef, useState } from "react"

export const useIsSticking = (
    ref,
    observerSettings = { threshold: [1], rootMargin: "-66px 0px 90px 0px" }
) => {
    const [isSticky, setIsSticky] = useState(false)
    const newRef = useRef()
    ref ||= newRef
    // mount
    useEffect(() => {
        const cachedRef = ref.current,
            observer = new IntersectionObserver(([e]) => {
                setIsSticky(e.intersectionRatio < 1)
            }, observerSettings)

        observer.observe(cachedRef)

        // unmount
        return () => {
            observer.unobserve(cachedRef)
        }
    }, [observerSettings, ref])
    return [isSticky, ref, setIsSticky]
}
