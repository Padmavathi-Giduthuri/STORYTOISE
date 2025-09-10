import StorySectionLayout from '../StorySection';
import { Card } from 'antd';

const testimonials = [
	{
		quote: `"Your initiative is the best thing I think. Every school should have this. It is very important to educate children through stories."`,
		author: 'Principal',
		org: 'Educational Institution',
	},
	{
		quote: `"The workshops were engaging and fun. My students loved participating!"`,
		author: 'Teacher',
		org: 'Primary School',
	},
	{
		quote: `"A wonderful way to make learning interactive and meaningful."`,
		author: 'Parent',
		org: 'Community Member',
	},
];

export default function TestimonialsPage() {
	return (
		<StorySectionLayout title="Testimonials">
			<Card>
				<div className="testimonials-list">
					{testimonials.map((t, idx) => (
						<div key={idx} className="testimonial-card">
							<p className="testimonial-quote">{t.quote}</p>
							<div className="testimonial-meta">
								<span className="testimonial-author">{t.author}</span>
								<br />
								<span className="testimonial-org">{t.org}</span>
							</div>
						</div>
					))}
				</div>
			</Card>
		</StorySectionLayout>
	);
}
