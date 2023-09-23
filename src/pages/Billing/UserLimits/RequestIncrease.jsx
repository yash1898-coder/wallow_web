import { useRef, useState } from "react"
import { useFormDataValidation } from "../../../hooks/useFormDataValidation"
import { Link } from "react-router-dom"
import { useStore } from "../../../stores/useStore"
import { allowOnlyNumber } from "../../../utils"

export const RequestIncrease = () => {
    const { openToast } = useStore()
    const [formData, setFormData] = useState({
        organizationId: '',
        reason: '',
        amount: '',
    })

    const formRef = useRef()

    const {
        validateInputs,
        makeInputValid,
        errors
    } = useFormDataValidation(formRef)

    const onChange = (e) => {
        const { name, value } = e.target
        makeInputValid(e)
        if (name === 'amount') {
            setFormData(prev => ({ ...prev, [name]: allowOnlyNumber(value) }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    return (
        <div className="container billing-overview">
            <h1 className='fs-700 fw-700 mb'>Wallow Quota Increase Request</h1>
            <p>Quota refers to the maximum amount you can be charged each month. If you need to increase your quota,
                fill out our request form. Requests are typically processed in one business day. Please note, that we only
                process quota increase requests for Pay-As-You-Go customers. We can not process an increase until you
                register a valid payment method.</p>
            <p className="mt">Please note that we only consider your latest requests for quota increase. If you submit more than one
                request, we will disregard the previous ones and process only the most recent one.</p>
            <form style={{ maxWidth: '600px' }} ref={formRef} onSubmit={e => {
                e.preventDefault()
                openToast({ text: "Request submitted!" })
            }}>
                <label htmlFor="email" className="mt fw-500">Email</label>
                <input disabled onChange={onChange}
                    defaultValue={'charlespolanco@gmail.com'} type="text" className={`input ${errors.includes('email') ? 'invalid' : ""}`}
                    id="email" name="email" placeholder="name@gmail.com" />

                <div className="flow" data-spacing="small">
                    <label htmlFor="organizationId" className="mt fw-500">Organization ID (found on <Link className="link inline" to={'/organization/settings'}>
                        Account Org Settings
                    </Link>)</label>
                    <p>Provide the org-id for which you need a quota limit increase.
                        Please, copy/paste the entire string of text, starting with org-</p>
                    <input onChange={onChange}
                        value={formData.organizationId} required type="text" className={`input ${errors.includes('organizationId') ? 'invalid' : ""}`}
                        id="organizationId" name="organizationId" placeholder=" " />
                </div>

                <label htmlFor="reason" className="label fw-500">Describe the reason for requesting more quota</label>
                <textarea onChange={onChange}
                    value={formData.reason} required type="text" className={`input ${errors.includes('reason') ? 'invalid' : ""}`}
                    id="reason" name="reason" placeholder=" " />

                <div className="flow" data-spacing="small">
                    <label htmlFor="amount" className="mt fw-500">Requested monthly quota amount</label>
                    <p>This is the amount you would like to be your monthly limit; you may spend up to this amount and are billed
                        only for actual usage.</p>
                    <input onChange={onChange}
                        value={formData.amount} required type="text" className={`input ${errors.includes('amount') ? 'invalid' : ""}`}
                        id="amount" name="amount" placeholder=" " />
                </div>

                <button onClick={() => validateInputs()}
                    className="button button--green mt">Submit</button>
            </form>
        </div>
    )
}
