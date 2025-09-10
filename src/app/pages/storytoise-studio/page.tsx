import React from 'react';
import StorySectionLayout from '../StorySection';
import { Card } from 'antd'; 

export default function StorytoiseStudioPage() {
  return (
    <StorySectionLayout title="Storytoise-Studio">
      <Card>
        <p className="section-text">
          Welcome to our storytelling section! Here, we share creative and inspiring tales for children, designed to educate and entertain. Discover stories that teach valuable lessons and spark imagination.
        </p>
        <ul className="section-list">
          <li>Original stories for all ages</li>
          <li>Interactive storytelling sessions</li>
          <li>Story writing competitions</li>
        </ul>
      </Card>
    </StorySectionLayout>
  );
}