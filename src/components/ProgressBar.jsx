import { motion } from "framer-motion"

export const ProgressBar = ({ completed, text = "%" }) => {
    return (
        <div className="progress-bar">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completed}%` }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                className="progress-bar__inner"
            >
                <p
                    className="progress-bar__percent"
                    style={{ color: completed === 0 ? "#000" : "" }}
                >
                    {completed}
                    {text}
                </p>
            </motion.div>
        </div>
    )
}
