import React, { useState } from 'react';
import { Person } from '../types/Person';
import './PersonForm.css';

interface PersonFormProps {
  onSubmit: (person: Omit<Person, 'id' | 'dateAdded'>) => void;
  onClose: () => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    coffeeShop: '',
    drink: '',
    conversationTopics: '',
    notes: '',
    nextSteps: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topics = formData.conversationTopics
      .split(',')
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0);

    onSubmit({
      ...formData,
      conversationTopics: topics,
    });
    setFormData({
      name: '',
      role: '',
      coffeeShop: '',
      drink: '',
      conversationTopics: '',
      notes: '',
      nextSteps: '',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button className="back-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </button>
          <h2>New Coffee Shop Connection</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Their name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role/Background</label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                placeholder="e.g., Software Engineer, Artist, etc."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="coffeeShop">Coffee Shop</label>
              <input
                type="text"
                id="coffeeShop"
                value={formData.coffeeShop}
                onChange={(e) => setFormData({ ...formData, coffeeShop: e.target.value })}
                required
                placeholder="Name of the coffee shop"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="drink">Their Drink</label>
              <div className="drink-input">
                <span className="drink-icon">☕</span>
                <input
                  type="text"
                  id="drink"
                  value={formData.drink}
                  onChange={(e) => setFormData({ ...formData, drink: e.target.value })}
                  required
                  placeholder="e.g., Vanilla Latte, Iced Americano, etc."
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="conversationTopics">Topics Discussed</label>
              <div className="topics-input">
                <input
                  type="text"
                  id="conversationTopics"
                  value={formData.conversationTopics}
                  onChange={(e) => setFormData({ ...formData, conversationTopics: e.target.value })}
                  required
                  placeholder="e.g., Technology, Art, Travel"
                />
                <span className="topics-hint">Separate topics with commas</span>
              </div>
            </div>
            
            <div className="form-group notes-input">
              <label htmlFor="notes">Conversation Notes</label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Key points from your conversation..."
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="nextSteps">Next Steps (Optional)</label>
              <textarea
                id="nextSteps"
                value={formData.nextSteps}
                onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
                placeholder="e.g., Follow up about their art exhibition, share project details..."
                rows={3}
              />
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={onClose} className="cancel-button">
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Save Connection
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 