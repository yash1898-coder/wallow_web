import { useState } from "react"

export const usePasswordsValidation = (formRef) => {
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [errors, setErrors] = useState([])

    const makeInputValid = (e) => {
        const { name } = e.target
        setErrors(prev => prev.filter(errName => errName !== name))
    }

    const validateInputs = () => {
        if (formRef.current) {
            const inputs = formRef.current.querySelectorAll('.input')
            const password1 = formRef.current.querySelector('[name="password1"]')
            const password2 = formRef.current.querySelector('[name="password2"]')
            inputs.forEach((input) => {
                if (!input.checkValidity() || input.value.length === 0) {
                    setErrors(prev => [...prev, input.name])
                    setErrors(prev => [...new Set(prev)])
                } else if (input.checkValidity() && input.value.length !== 0) {
                    setErrors(prev => [...new Set(prev.filter(name => name !== input.name))])
                }
            })

            if (password1.value !== password2.value) {
                setPasswordsMatch(false)
            } else {
                setPasswordsMatch(true)
            }
        }

    }

    const onPasswordChange = (e) => {
        const { name, value } = e.target
        if (name === 'password1') {
            if (value === formRef.current.password2.value) {
                setPasswordsMatch(true)
            } else {
                setPasswordsMatch(false)
            }
        } else if (name === 'password2') {
            if (value === formRef.current.password1.value) {
                setPasswordsMatch(true)
            } else {
                setPasswordsMatch(false)
            }
        }
    }


    return { passwordsMatch, onPasswordChange, validateInputs, errors, makeInputValid }
}
