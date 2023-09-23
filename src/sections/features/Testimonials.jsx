
import { Testimonial } from '../../components/Testimonial'

export const Testimonials = ({ testimonials, sectionIntro }) => {

    return (
        <section className='features-testimonials container'>
            {sectionIntro}
            <div className="features-testimonials__grid">
                {testimonials.map((item, idx) => <Testimonial key={idx} {...item} />)}
            </div>
        </section>
    )
}
