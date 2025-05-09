import React from 'react';
import { useState } from 'react';
import { Person } from '../types/Person';
import { PersonForm } from './PersonForm';
import './PersonList.css';

interface PersonListProps {
  onAddPerson: (person: Person) => void;
  onClearAll: () => void;
  people: Person[];
}

interface FlowerCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const FLOWER_CATEGORIES: FlowerCategory[] = [
  {
    id: 'rose',
    name: 'Rose',
    icon: '🌹',
    color: '#e11d48',
    description: 'High Priority Tasks'
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    icon: '🌻',
    color: '#eab308',
    description: 'Creative Projects'
  },
  {
    id: 'tulip',
    name: 'Tulip',
    icon: '🌷',
    color: '#ec4899',
    description: 'Personal Goals'
  },
  {
    id: 'lotus',
    name: 'Lotus',
    icon: '🪷',
    color: '#8b5cf6',
    description: 'Mindfulness Tasks'
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    icon: '🌸',
    color: '#fda4af',
    description: 'Quick Tasks'
  }
];

export const PersonList = ({ onAddPerson, onClearAll, people }: PersonListProps) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getTasksByCategory = (categoryId: string) => {
    return people.filter(person => person.flowerCategory === categoryId);
  };

  return (
    <div className="person-list-container">
      <div className="person-list-header">
        <div>
          <h1>GrowFlow</h1>
          <p>Organize your tasks by flower categories</p>
        </div>
        <button className="clear-button" onClick={onClearAll}>
          Clear All
        </button>
      </div>

      <div className="flower-categories">
        {FLOWER_CATEGORIES.map(category => (
          <button
            key={category.id}
            className="flower-button"
            style={{ color: category.color }}
            onClick={() => {
              setSelectedCategory(category.id);
              setShowForm(true);
            }}
            title={`${category.name} - ${category.description}`}
            data-count={getTasksByCategory(category.id).length}
          >
            {category.icon}
          </button>
        ))}
      </div>

      {showForm && selectedCategory && (
        <PersonForm
          onSubmit={(person) => {
            onAddPerson({
              ...person,
              flowerCategory: selectedCategory,
              id: Date.now().toString(),
              dateAdded: new Date().toISOString()
            });
            setShowForm(false);
            setSelectedCategory(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setSelectedCategory(null);
          }}
          category={FLOWER_CATEGORIES.find(c => c.id === selectedCategory)!}
        />
      )}
    </div>
  );
}; 