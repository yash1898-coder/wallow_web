import { useState } from "react"

export const useInputValidation = (ref) => {
    const [invalid, setInvalid] = useState(false)

    const checkValidity = () => {
        if (!ref.current.checkValidity() || ref.current.value.length === 0) {
            setInvalid(true)
            return false
        }
        return true
    }

    const makeValid = () => setInvalid(false)
    const makeInvalid = () => setInvalid(true)

    return { checkValidity, invalid, makeValid, makeInvalid }
}
