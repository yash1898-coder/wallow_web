import { Link, useNavigate } from "react-router-dom"
import { useStore } from "../../stores/useStore"
import { Pfp } from "../../components/Pfp"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getProducts } from "../../api/products"
import { Spinner } from "../../components/Spinner"
import { ErrorMessage } from "../../components/ErrorMessage"
import { useEditProductStore } from "../../stores/useEditProductStore"
import { joinTeam } from "../../api/teams"
import drawing from "../../assets/welcomeProducts.png"
import addProduct from "../../assets/dashboard/welcomeAddProduct.png"
import { useAuthStore } from "../../stores/useAuthStore"
import { useState } from "react"
import { ReactComponent as ArrowDown } from "../../assets/arrow-down.svg"

export const Welcome = () => {
    const { openModal } = useStore()
    const { user } = useAuthStore()
    const [expanded, setExpanded] = useState(false)

    const {
        isLoading,
        error,
        data: products,
    } = useQuery(["products"], getProducts, {
        retry: false,
    })

    return (
        <div
            className="container welcome"
            style={{ paddingBottom: "2rem" }}
        >
            {products?.length > 0 && (
                <div className="flex justify-between welcome__intro">
                    <h1 className="text-center  welcome__title fw-700">
                        Productspaces
                    </h1>

                    <img
                        className="welcome__drawing"
                        src={drawing}
                        alt=""
                    />
                </div>
            )}
            {isLoading ? (
                <Spinner className="welcome__spinner" />
            ) : error ? (
                <ErrorMessage message={error.message} />
            ) : (
                <div className="welcome-cards flow">
                    {products.length > 3
                        ? expanded
                            ? products?.map((product) => (
                                  <Product
                                      key={product.id}
                                      product={product}
                                  />
                              ))
                            : products?.slice(0, 3)?.map((product) => (
                                  <Product
                                      key={product.id}
                                      product={product}
                                  />
                              ))
                        : products?.map((product) => (
                              <Product
                                  key={product.id}
                                  product={product}
                              />
                          ))}
                    {products?.length > 3 && (
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="link dark button-reset"
                            style={{ marginInline: "auto" }}
                        >
                            Show {expanded ? "less" : "more"}
                            <ArrowDown
                                style={{
                                    transform: expanded ? "rotate(180deg)" : "",
                                }}
                            />
                        </button>
                    )}
                </div>
            )}

            {user?.role !== null && (
                <div className="welcome__footer">
                    <div className="flex">
                        <img
                            src={addProduct}
                            alt="A bird carrying a package"
                        />
                        <p className="fw-600">
                            Enhance collaboration and communication within your
                            teams.
                        </p>
                    </div>
                    <button
                        className="button welcome__button"
                        onClick={() => openModal("createProduct")}
                    >
                        CREATE A NEW PRODUCTSPACE
                    </button>
                </div>
            )}
        </div>
    )
}

const Product = ({ product }) => {
    const { openModal, openToast } = useStore()
    const { setEditingProduct } = useEditProductStore()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {
        isLoading: isJoinLoading,
        error: joinTeamError,
        mutate: onJoinTeam,
    } = useMutation((teamId, name) => joinTeam(teamId, name), {
        onSuccess: (res) => {
            queryClient.invalidateQueries(["teams", res.team_id, res.team_name])
            navigate("/dashboard/progress")
            openToast({ text: "Invite accepted!" })
        },
    })

    return (
        <div
            key={product.id}
            className="welcome-card"
        >
            <div className="welcome-card__info">
                <button
                    className="button-reset"
                    onClick={() => {
                        if (product.role.includes("Owner")) {
                            openModal("uploadProductImage")
                            setEditingProduct({
                                ...product,
                                value: product.name,
                            })
                        }
                    }}
                >
                    <Pfp
                        name={product.name}
                        img={product.image}
                    />
                </button>
                <div>
                    <h2 className="fs-500 fw-500">{product.name}</h2>
                    <div
                        className="flex"
                        style={{ "--gap": ".25rem" }}
                    >
                        {/* {product?.teams.map((item) => <TeamFunctionIcon key={item.id} team={item.name} />)} */}
                        <p>
                            {product.teams.length}{" "}
                            {product.teams.length === 1 ? "team" : "teams"}
                        </p>
                    </div>
                </div>
            </div>
            {product.join_link ? (
                <div className="flex">
                    <button
                        onClick={() => {
                            onJoinTeam(
                                product?.join_link
                                    ?.split("/join-team/")[1]
                                    .split("/")[0],
                                product?.join_link
                                    ?.split("/join-team/")[1]
                                    .split("/")[1]
                            )
                            setEditingProduct({
                                ...product,
                                value: product.name,
                                role: product.role,
                            })
                        }}
                        disabled={isJoinLoading}
                        className="welcome-card__button button button--green"
                    >
                        {isJoinLoading && <Spinner />}
                        Join
                    </button>
                    {joinTeamError && (
                        <ErrorMessage message={joinTeamError.message} />
                    )}
                    <button
                        onClick={() => {
                            // setEditingProduct({
                            //     ...product, icon: <Pfp name={product.name} size={'20px'} fontSize={'1rem'} />,
                            //     value: product.name
                            // })
                        }}
                        className="welcome-card__button button button--red"
                    >
                        Reject
                    </button>
                </div>
            ) : (
                <Link
                    onClick={() => {
                        console.log(product)
                        setEditingProduct({
                            ...product,
                            value: product.name,
                        })
                    }}
                    to={"/dashboard/progress"}
                    className="welcome-card__button button"
                >
                    LAUNCH WALLOW
                </Link>
            )}
        </div>
    )
}
