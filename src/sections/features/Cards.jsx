import { Card } from '../../components/Card'

export const Cards = ({ cards, title }) => {

    return (
        <section className='features-cards container'>
            <h2 className={`fs-800 fw-700 text-center`}>{title}</h2>
            <div className="cards-grid features-cards__grid">
                {cards.map(item => <Card key={item.title} {...item} />)}
            </div>
        </section>
    )
}
