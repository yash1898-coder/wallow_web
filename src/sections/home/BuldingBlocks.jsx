import visualize from "../../assets/home/visualize.png"
import build from "../../assets/home/build.png"
import retrospectives from "../../assets/home/retrospectives.png"
import buildingBlock1 from "../../assets/home/buildingBlock1Preview.png"
import buildingBlocksDrawing from "../../assets/lookingDownDrawing.png"
import buildingBlock2 from "../../assets/home/buildingBlock2Preview.png"
import buildingBlock3 from "../../assets/home/buildingBlock3Preview.png"
import { BuldingBlock } from "../../components/BuldingBlock"
import { SectionIntro } from "../../components/SectionIntro"

export const BuldingBlocks = () => {
    const data = [
        {
            icon: visualize,
            title: "Visualize team delivery experiences",
            subtitle:
                "Effortlessly monitor delivery sentiment, identifying opportunities to elevate team morale and code quality, ultimately enhancing overall experiences.",
            wide: true,
            preview: buildingBlock1,
            previewAlt: "",
        },
        {
            icon: build,
            title: "Build and support any product",
            subtitle:
                "Create your teams - align them to products to track work progress and monitor delivery experiences.",
            preview: buildingBlock2,
            previewAlt: "",
        },
        {
            icon: retrospectives,
            title: "Retrospectives ",
            subtitle:
                "Retrospective derived from delivery experiences —  quickly assess what’s working, and what could’ve been better.",
            preview: buildingBlock3,
            previewAlt: "",
        },
    ]

    return (
        <section className="home-building-blocks container">
            <SectionIntro
                drawing={{
                    src: buildingBlocksDrawing,
                    alt: "",
                    overlapLevel: 1,
                    position: "left",
                }}
                title={{ text: "Powerful building blocks", center: true }}
            />
            <div className="home-building-blocks__grid">
                {data.map((item) => (
                    <BuldingBlock
                        key={item.title}
                        {...item}
                    />
                ))}
            </div>
        </section>
    )
}
