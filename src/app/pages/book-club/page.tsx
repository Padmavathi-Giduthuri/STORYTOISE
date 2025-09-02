import StorySectionLayout from '../StorySection';

export default function BookClubPage() {
  return (
    <StorySectionLayout title="Book Club">
      <p className="section-text">
        Join our Book Club to read, discuss, and share your favorite stories! Participate in monthly reading challenges and connect with fellow book lovers.
      </p>
      <ul className="section-list">
        <li>Monthly book picks</li>
        <li>Discussion forums</li>
        <li>Book sharing and reviews</li>
      </ul>
    </StorySectionLayout>
  );
}
