import React, { useState } from 'react';
import { Person } from '../types/Person';
import './PersonList.css';

interface PersonListProps {
  persons: Person[];
  onAddPerson: () => void;
  onClearAll: () => void;
}

export const PersonList: React.FC<PersonListProps> = ({ persons, onAddPerson, onClearAll }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearAll = () => {
    if (showConfirm) {
      onClearAll();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="person-list-container">
      <div className="person-list-header">
        <div className="header-content">
          <h1>Coffee Shop Convo</h1>
          <p className="subtitle">Document your coffee shop connections</p>
        </div>
        <div className="header-actions">
          {persons.length > 0 && (
            <button 
              className="clear-button" 
              onClick={handleClearAll}
              title={showConfirm ? "Click again to confirm" : "Clear all connections"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
              {showConfirm ? "Confirm Clear" : "Clear All"}
            </button>
          )}
          <button className="add-button" onClick={onAddPerson}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            New Connection
          </button>
        </div>
      </div>
      
      <div className="person-list">
        {persons.length === 0 ? (
          <div className="no-persons">
            <p>No connections yet. Start documenting your coffee shop conversations!</p>
            <p className="tip">Tip: Click the + button to add your first connection.</p>
          </div>
        ) : (
          persons.map((person) => (
            <div key={person.id} className="person-card">
              <div className="card-header">
                <h2>{person.name}</h2>
                <span className="role-badge">{person.role}</span>
              </div>
              <div className="coffee-info">
                <p className="coffee-shop">📍 {person.coffeeShop}</p>
                <p className="drink">☕ {person.drink}</p>
              </div>
              <div className="topics">
                <h3>Topics Discussed:</h3>
                <div className="topic-tags">
                  {person.conversationTopics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
              <p className="notes">{person.notes}</p>
              {person.nextSteps && (
                <div className="next-steps">
                  <h3>Next Steps:</h3>
                  <p>{person.nextSteps}</p>
                </div>
              )}
              <p className="date-added">Met on {new Date(person.dateAdded).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 