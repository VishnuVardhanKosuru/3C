import { useState, useEffect } from 'react';

export function useIdeas() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('creatorhq_ideas');
    if (stored) setIdeas(JSON.parse(stored));
  }, []);

  const saveIdeas = (updated) => {
    setIdeas(updated);
    localStorage.setItem('creatorhq_ideas', JSON.stringify(updated));
  };

  const addIdea = (text) => {
    if (!text.trim()) return false;
    const newIdea = {
      id: Date.now(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newIdea, ...ideas];
    saveIdeas(updated);
    return true;
  };

  const deleteIdea = (id) => {
    const updated = ideas.filter((i) => i.id !== id);
    saveIdeas(updated);
  };

  return { ideas, addIdea, deleteIdea };
}
