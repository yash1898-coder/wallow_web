import { Pfp } from "../../../components/Pfp"
import { Tooltip } from "../../../components/Tooltip"
import { truncate } from "../../../utils"
import { useQuery } from "react-query"
import { getProductMembers } from "../../../api/products"
import { useEditProductStore } from "../../../stores/useEditProductStore"
import { Spinner } from "../../../components/Spinner"

export const MeetTeam = () => {
    const { editingProduct } = useEditProductStore()

    const { isLoading, data: members } = useQuery(
        ["products", "members", editingProduct?.id],
        () => getProductMembers(editingProduct?.id),
        {
            retry: false,
        }
    )

    return (
        <div
            className="container flow"
            style={{ paddingBlock: "2.5rem" }}
        >
            <h1 className="fs-700 fw-600">Meet the team</h1>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="members-table">
                    <div className="members-table__caption">
                        <p>
                            {members.length}{" "}
                            {members.length === 1 ? "member" : "members"}
                        </p>
                        <button className="button-reset link">
                            Export full member list
                        </button>
                    </div>
                    <div className="members-table__header">
                        <h3>
                            <span className="members-table__header-item">
                                Full name
                            </span>
                        </h3>
                        <h3>
                            <span className="members-table__header-item">
                                Email address
                            </span>
                        </h3>
                        <h3>
                            <span className="members-table__header-item">
                                Account type
                            </span>
                        </h3>
                        <h3>
                            <span className="members-table__header-item">
                                Status
                            </span>
                        </h3>
                    </div>
                    <div className="members-table__body">
                        {members.length === 0 ? (
                            <p style={{ margin: ".75rem" }}>No members yet.</p>
                        ) : (
                            members.map((item, idx) => {
                                const fullName = item["Full Name"]

                                return (
                                    <div
                                        key={idx}
                                        className="font-semibold text-white members-table__row"
                                    >
                                        <div className="fw-600">
                                            <span className="justify-between members-table__row-item">
                                                <span className="members-table__header-item--mobile">
                                                    Full name
                                                </span>
                                                <span className="flex members-table__name">
                                                    <Pfp
                                                        name={item["Full Name"]}
                                                        img={
                                                            item?.profile_image
                                                        }
                                                    />
                                                    {fullName.length > 15 ? (
                                                        <Tooltip
                                                            text={fullName}
                                                        >
                                                            {truncate(
                                                                fullName,
                                                                15
                                                            )}
                                                        </Tooltip>
                                                    ) : (
                                                        truncate(fullName, 15)
                                                    )}
                                                </span>
                                            </span>
                                        </div>
                                        <p>
                                            <span className="members-table__row-item">
                                                <span className="members-table__header-item--mobile">
                                                    Email address
                                                </span>
                                                {item.email}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="members-table__row-item">
                                                <span className="members-table__header-item--mobile">
                                                    Account type
                                                </span>
                                                {item.account_type}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="members-table__row-item">
                                                <span className="members-table__header-item--mobile">
                                                    Status
                                                </span>
                                                {item.is_active
                                                    ? "Active"
                                                    : "Deactivated"}
                                            </span>
                                        </p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
