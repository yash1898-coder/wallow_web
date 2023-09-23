import { useQuery } from "react-query"
import { joinProduct } from "../../api/products"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useStore } from "../../stores/useStore"
import { Spinner } from "../../components/Spinner"
import { pageSpinnerStyle } from "../../utils"
import { ErrorMessage } from "../../components/ErrorMessage"

export const JoinProduct = () => {
    const { openToast } = useStore()
    const { id, name } = useParams()
    const navigate = useNavigate()

    const { error, isLoading } = useQuery(
        ["products", id, name],
        () => joinProduct(id, name),
        {
            retry: false,
            onSuccess: () => {
                navigate("/dashboard")
                openToast({ text: "Invite accepted!" })
            },
        }
    )

    return (
        <div
            style={{
                display: "grid",
                placeContent: "center",
                minHeight: "80vh",
            }}
        >
            {error && (
                <>
                    <ErrorMessage
                        className="fs-500 fw-500"
                        message={`Error: ${error.message}`}
                    />
                    <Link
                        to={"/dashboard"}
                        className="button mt"
                        style={{ width: "fit-content", marginInline: "auto" }}
                    >
                        Back to dashboard
                    </Link>
                </>
            )}

            {isLoading && <Spinner style={pageSpinnerStyle} />}
        </div>
    )
}
