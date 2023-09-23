import billingHistory from "../../assets/dashboard/billingHistory.svg"
import invoices from "../../assets/dashboard/invoices.svg"
import userLimits from "../../assets/dashboard/userLimits.svg"
import preferences from "../../assets/dashboard/preferences.svg"
import pricing from "../../assets/dashboard/pricing.svg"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../stores/useAuthStore"
import { resumeOrganization } from "../../api/accounts"
import { useMutation } from "react-query"
import { useStore } from "../../stores/useStore"
import { useErrorToast } from "../../hooks/useErrorToast"
import { Spinner } from "../../components/Spinner"

export const BillingOverview = () => {
    const { openToast } = useStore()
    const { user, setUser } = useAuthStore()

    const data = [
        // {
        //     title: "Payment method",
        //     subtitle: "Add or change payment method",
        //     href: "/billing/payment-methods",
        //     icon: paymentMethod,
        // },
        {
            title: "Invoices",
            subtitle: "View your organization's invoices",
            href: "/billing/invoices",
            icon: invoices,
        },
        {
            title: "Billing history",
            subtitle: "View past and current invoices",
            href: "/billing/history",
            icon: billingHistory,
        },
        {
            title: "User limits",
            subtitle: "Set monthly user limits",
            href: "/billing/user-limits",
            icon: userLimits,
        },
        {
            title: "Preferences",
            subtitle: "Manage company information",
            href: "/billing/preferences",
            icon: preferences,
        },
        {
            title: "Pricing",
            subtitle: "View pricing and FAQs",
            href: "/pricing",
            icon: pricing,
        },
    ]

    const {
        isLoading,
        error,
        mutate: onSubmit,
    } = useMutation(() => resumeOrganization(), {
        onSuccess: () => {
            openToast({ text: "Account has been resumed!" })
            setUser({ ...user, isCancelled: false })
        },
    })

    useErrorToast(error)

    return (
        <div className="container billing-overview">
            {user.isCancelled === false && (
                <>
                    <h1 className="fs-700 fw-700 mb">Billing Overview</h1>
                    <p className="fs-600 mt fw-700 mb">Pay as you go</p>
                    <p>
                        You'll be billed at the end of each calendar month for
                        usage during that month.
                    </p>
                    {user.role === "Primary Organization Owner" && (
                        <Link
                            style={{ width: "fit-content" }}
                            to={"/billing/cancel-account"}
                            className="button mt"
                        >
                            Cancel account
                        </Link>
                    )}
                    <div className="billing-overview__links">
                        {data.map((item) => (
                            <Link
                                className="billing-overview-link"
                                key={item.title}
                                to={item.href}
                            >
                                <img
                                    src={item.icon}
                                    alt={item.title + " " + "icon"}
                                />
                                <span>
                                    {item.title}
                                    <p className="">{item.subtitle}</p>
                                </span>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {user.isCancelled === true && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit()
                    }}
                >
                    <h1 className="fs-700 fw-700 mb">
                        Your account is cancelled.
                    </h1>
                    {user.role === "Primary Organization Owner" && (
                        <>
                            <p>Would you like to resume it ?</p>
                            <button
                                disabled={isLoading}
                                className="button button--green mt"
                            >
                                {isLoading && <Spinner />}
                                Resume account
                            </button>
                        </>
                    )}
                </form>
            )}
        </div>
    )
}
