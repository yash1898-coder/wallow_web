import { Link } from "react-router-dom"
import { useEditProductStore } from "../stores/useEditProductStore"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import caret from "../assets/caret.svg"
import { getTeams } from "../api/teams"
import { useQuery } from "react-query"

export const DashboardSlider = () => {
    const { editingProduct } = useEditProductStore()
    const { data: teamsList } = useQuery(
        ["teams", editingProduct.id],
        () => getTeams(editingProduct.id),
        { retry: false }
    )

    const slider = [
        ...(teamsList?.map((t) => ({
            label: t.name,
            href: `/dashboard/teams/${t.id}`,
        })) ?? []),
        {
            label: "Product News",
            href: "/dashboard/product-news",
        },
        {
            label: "Product Artifacts",
            href: "/dashboard/product-artifacts",
        },
        {
            label: "Technology Stack",
            href: "/dashboard/tech-stack",
        },
        {
            label: "Technology News",
            href: "/dashboard/tech-news",
        },
        {
            label: "Customer Feedback",
            href: "/dashboard/customer-feedback",
        },
        {
            label: "Team Feedback",
            href: "/dashboard/team-feedback",
        },
    ]

    return (
        <div className="dashboard-slider-wrapper">
            <span className="button-prev">
                <button className="icon-button ">
                    <img
                        src={caret}
                        alt="caret"
                    />
                </button>
            </span>
            <Swiper
                className="dashboard-slider"
                spaceBetween={16}
                navigation={{
                    prevEl: ".button-prev",
                    nextEl: ".button-next",
                }}
                slidesPerView={"auto"}
                modules={[FreeMode, Navigation]}
            >
                {slider.map((item) => (
                    <SwiperSlide key={item.label}>
                        <Link
                            draggable={false}
                            to={item.href}
                        >
                            {item.label}
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <span className="button-next">
                <button className="icon-button ">
                    <img
                        src={caret}
                        alt="caret"
                    />
                </button>
            </span>
        </div>
    )
}
