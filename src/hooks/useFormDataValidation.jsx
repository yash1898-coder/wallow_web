import { useState } from "react"

export const useFormDataValidation = (formRef) => {
    const [errors, setErrors] = useState([])

    const makeInputValid = (e) => {
        const { name } = e.target
        setErrors(prev => prev.filter(errName => errName !== name))
    }

    const validateInputs = () => {
        if (formRef.current) {
            const inputs = formRef.current.querySelectorAll('.input')
            inputs.forEach((input) => {
                if (!input.checkValidity() || input.value.length === 0) {
                    setErrors(prev => [...prev, input.name])
                    setErrors(prev => [...new Set(prev)])
                } else if (input.checkValidity() && input.value.length !== 0) {
                    setErrors(prev => [...new Set(prev.filter(name => name !== input.name))])
                }
            })
        }
    }

    return {
        errors,
        makeInputValid,
        validateInputs
    }
}
