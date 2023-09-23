import { useState } from "react"
import { login } from "../api/accounts"
import { useAuthStore } from "../stores/useAuthStore"
import { useMutation } from "react-query"
import { useStore } from "../stores/useStore"

export const useTransferOwnership = (members, memberRef, passwordRef) => {
    const { user } = useAuthStore()
    const { openModal } = useStore()
    const [memberInvalid, setMemberInvalid] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const [password, setPassword] = useState('')
    const [selectedMember, setSelectedMember] = useState(undefined)

    const checkMemberValidity = () => {
        if (!memberRef.current.checkValidity() || memberRef.current.value.length === 0 ||
            !members?.some(m => m['Full Name'] === memberRef.current.value)) {
            setMemberInvalid(true)
            return false
        }
        return true
    }

    const checkPasswordValidity = () => {
        if (!passwordRef.current.checkValidity() || passwordRef.current.value.length === 0) {
            setPasswordInvalid(true)
            return false
        }
        return true
    }
    const makeMemberValid = () => setMemberInvalid(false)
    const makePasswordValid = () => setMemberInvalid(false)

    const onPasswordChange = e => {
        setPassword(e.target.value)
        makePasswordValid()
    }
    const onSelectedMemberChange = (o) => setSelectedMember(o)

    const { isLoading: loginLoading, error, mutate: onCheckPassword } = useMutation(
        () => login({ email: user.email, password }), {
        onSuccess: () => {
            setPasswordInvalid(false)
            if (!memberInvalid && selectedMember) {
                openModal('transferOwnership')
            }
        },
        onError: () => setPasswordInvalid(true)
    })

    return {
        memberInvalid,
        passwordInvalid,
        password,
        onPasswordChange,
        selectedMember,
        onSelectedMemberChange,
        makeMemberValid,
        checkMemberValidity,
        checkPasswordValidity,
        loginLoading,
        error,
        onCheckPassword
    }
}
