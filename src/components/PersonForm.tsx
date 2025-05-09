import React, { useState } from 'react';
import { Person } from '../types/Person';
import './PersonForm.css';

interface PersonFormProps {
  onSubmit: (person: Omit<Person, 'id' | 'dateAdded'>) => void;
  onCancel: () => void;
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
  };
}

export const PersonForm = ({ onSubmit, onCancel, category }: PersonFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    topics: '',
    notes: '',
    followUpDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      topics: formData.topics.split(',').map(topic => topic.trim()).filter(Boolean),
      flowerCategory: category.id
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ borderColor: category.color }}>
        <div className="modal-header">
          <button className="back-button" onClick={onCancel} style={{ borderColor: category.color, color: category.color }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </button>
          <div className="form-title">
            <h2 style={{ color: category.color }}>Add New {category.name} Task</h2>
            <p>{category.description}</p>
          </div>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter task name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Priority Level</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="High, Medium, or Low"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="topics">Categories (comma-separated)</label>
            <input
              type="text"
              id="topics"
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              placeholder="e.g., Development, Design, Planning"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Task Details</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter task details and requirements"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="followUpDate">Due Date</label>
            <input
              type="date"
              id="followUpDate"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel} style={{ borderColor: category.color, color: category.color }}>
              Cancel
            </button>
            <button type="submit" className="submit-button" style={{ backgroundColor: category.color }}>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 