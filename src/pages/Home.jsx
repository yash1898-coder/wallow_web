import { Quote } from "../sections/Quote"
import { BuldingBlocks } from "../sections/home/BuldingBlocks"
import { Features } from "../sections/home/Features"
import { Hero } from "../sections/home/Hero"
import { Partners } from "../sections/home/Partners"
import { Teams } from "../sections/home/Teams"
import { UsageWays } from "../sections/home/UsageWays"
import { CTA } from "../sections/home/CTA"
import capchase from '../assets/partners/partner2.svg'
import avaLabs from '../assets/partners/partner6.svg'

export const Home = () => {
    return (
        <>
            <Hero />
            <Partners />
            <Features />
            <Quote title={`We got rid of synchronous meetings because of what Wallow does for us.`}
                img={capchase}
                alt={'capchase logo'}
            />
            <BuldingBlocks />
            <Quote title={`Wallow helps us quickly stay informed on work progress.`}
                img={avaLabs}
                alt={'Ava Labs. logo'}
            />
            <Teams />
            <UsageWays />
            <CTA />
        </>
    )
}
