import img from "../../assets/home/heroImg.png"
import { Button } from "../../components/Button"
import { ReactComponent as Arrow } from "../../assets/arrowRight.svg"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

export const Hero = () => {
    const words = ["development.", "leaders.", "teams."]
    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }, 4000)

        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="home-hero container">
            <h1 className="fs-900 fw-700 home-hero-title">
                Made for product{" "}
                <span className="home-hero-title__animation-wrapper">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={Math.random()}
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{
                                ease: "anticipate",
                                duration: 0.5,
                            }}
                        >
                            {words[currentWordIndex]}
                        </motion.span>
                    </AnimatePresence>
                </span>
                <br /> Built for productivity.
            </h1>
            <p className="home-hero__subtitle fw-500 text-center mt">
                Real-time cross-functional collaboration, blocker and impediment
                management.
            </p>

            <Button
                href={"/signup"}
                className="home-hero__button mt"
            >
                Get Wallow Free
                <Arrow />
            </Button>

            <div className="home-hero__imgs ">
                <img
                    className="preview-img"
                    src={img}
                    alt=""
                />
            </div>
        </section>
    )
}
