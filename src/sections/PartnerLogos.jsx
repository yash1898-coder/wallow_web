import partner1 from "../assets/partners/partner1.webp"
import partner2 from "../assets/partners/partner2.svg"
import partner3 from "../assets/partners/partner3.svg"
import partner4 from "../assets/partners/partner4.svg"
import partner5 from "../assets/partners/partner5.svg"
import partner6 from "../assets/partners/partner6.svg"
import partner7 from "../assets/partners/partner7.png"
import partner8 from "../assets/partners/partner8.webp"

export const PartnerLogos = ({ full = true }) => {
    return (
        <div
            className="partner-logos mt"
            style={{
                justifyContent: full ? "center" : "flex-start",
                marginInline: full ? "auto" : "",
            }}
        >
            <img
                src={partner1}
                alt={"Wallow x unqork"}
            />
            <img
                src={partner2}
                alt={"Wallow x capchase"}
            />
            <img
                src={partner3}
                alt={"Wallow x MANTL"}
            />
            <img
                src={partner4}
                alt={"Wallow x Headway"}
            />
            <img
                src={partner5}
                alt={"Wallow x Blue Apron"}
            />
            {full && (
                <>
                    <img
                        src={partner6}
                        alt={"Wallow x Ava Labs."}
                    />
                    <img
                        src={partner7}
                        alt={"Wallow x Twitch"}
                    />
                    <img
                        src={partner8}
                        alt={"Wallow x --twelve"}
                    />
                </>
            )}
        </div>
    )
}
