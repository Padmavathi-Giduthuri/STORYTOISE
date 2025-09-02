import StorySectionLayout from '../StorySection';

export default function OurDetailsPage() {
  return (
    <StorySectionLayout title="Our Details">
      <p className="section-text">
        Storytoise Studio is dedicated to creative education for children. Contact us for more information or to get involved!
      </p>
      <ul className="section-list">
        <li>Email: info@storytoise.com</li>
        <li>Phone: +91-1234567890</li>
        <li>Location: Mumbai, India</li>
      </ul>
    </StorySectionLayout>
  );
}
