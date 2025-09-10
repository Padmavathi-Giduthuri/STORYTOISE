import StorySectionLayout from '../StorySection';
import { Card } from 'antd';

export default function WritersCollaborationPage() {
  return (
    <StorySectionLayout title="Writers-Collaboration">
      <Card>
      <p className="section-text">
        Join our writers-collaboration to read, discuss, and share your favorite stories! Participate in monthly reading challenges and connect with fellow book lovers.
      </p>
      <ul className="section-list">
        <li>Monthly book picks</li>
        <li>Discussion forums</li>
        <li>Book sharing and reviews</li>
      </ul>
      </Card>
    </StorySectionLayout>
  );
}
