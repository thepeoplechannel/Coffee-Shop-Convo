import React, { useState } from 'react';
import { Person } from '../types/Person';

interface GardenProps {
  people: Person[];
}

const FLOWER_CATEGORIES = [
  {
    id: 'rose',
    name: 'Rose',
    icon: '🌹',
    color: '#e11d48'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    icon: '🌻',
    color: '#eab308'
  },
  {
    id: 'tulip',
    name: 'Tulip',
    icon: '🌷',
    color: '#ec4899'
  },
  {
    id: 'lotus',
    name: 'Lotus',
    icon: '🌸',
    color: '#8b5cf6'
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    icon: '🌸',
    color: '#fda4af'
  }
];

export const Garden = ({ people }: GardenProps) => {
  const [selectedTask, setSelectedTask] = useState<Person | null>(null);

  const getRandomPosition = () => {
    return {
      left: `${Math.random() * 80 + 10}%`,
      bottom: `${Math.random() * 60 + 10}%`,
      transform: `rotate(${Math.random() * 30 - 15}deg) scale(${0.8 + Math.random() * 0.4})`
    };
  };

  return (
    <div className="garden-container">
      <div className="garden-title">Task Garden</div>
      <div className="garden-background">
        <div className="clouds" />
        <div className="grass" />
        {people.map((person, index) => {
          const category = FLOWER_CATEGORIES.find(c => c.id === person.flowerCategory);
          if (!category) return null;

          return (
            <div
              key={person.id}
              className="garden-flower"
              style={{
                ...getRandomPosition(),
                color: category.color,
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => setSelectedTask(person)}
            >
              {category.icon}
            </div>
          );
        })}
      </div>

      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <button className="back-button" onClick={() => setSelectedTask(null)}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              <h2>{selectedTask.name}</h2>
              <button className="close-button" onClick={() => setSelectedTask(null)}>×</button>
            </div>
            <div className="task-details">
              <div className="task-info">
                <span className="role-badge" style={{ backgroundColor: `${FLOWER_CATEGORIES.find(c => c.id === selectedTask.flowerCategory)?.color}20`, color: FLOWER_CATEGORIES.find(c => c.id === selectedTask.flowerCategory)?.color }}>
                  {selectedTask.role}
                </span>
                <div className="topics-list">
                  {selectedTask.topics.map((topic, index) => (
                    <span key={index} className="topic-badge" style={{ borderColor: FLOWER_CATEGORIES.find(c => c.id === selectedTask.flowerCategory)?.color }}>
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="notes" style={{ borderLeftColor: FLOWER_CATEGORIES.find(c => c.id === selectedTask.flowerCategory)?.color }}>
                  <strong>Notes:</strong> {selectedTask.notes}
                </div>
                <div className="follow-up">
                  <span>Due: {new Date(selectedTask.followUpDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 