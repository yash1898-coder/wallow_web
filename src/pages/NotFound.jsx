import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <div className="not-found container text-center flow">
            <h1 className="not-found__status-code  fw-700">404</h1>
            <p className="fs-800 fw-700 not-found__subtitle">Page Not Found</p>
            <p >It seems that page you are looking for no longer exists.</p>

            <Link className="button" style={{ width: 'fit-content', marginInline: 'auto' }}
                to="/">Back to homepage</Link>
        </div>
    )
}
