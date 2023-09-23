import { Link } from 'react-router-dom'
import { ReactComponent as Arrow } from '../../assets/arrowRightBlue.svg'
import { PartnerLogos } from '../PartnerLogos'

export const Partners = () => {
    return (
        <section className="home-partners container">
            <div className="flow" data-spacing="small">
                <h2 className="fs-800 fw-700 text-center">High performing teams run on Wallow every day</h2>
                <p className="home-partners__subtitle text-center">
                    Powering the world’s best teams, from next-generation teams
                    to established enterprises.
                </p>
                <Link to="/customer-stories" className="link home-partners__link flow__centered">Read customer stories
                    <Arrow />
                </Link>
            </div>
            <PartnerLogos />
        </section>
    )
}
