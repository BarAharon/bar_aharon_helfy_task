import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/task-list.css';

const TaskCarousel = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayTasks, setDisplayTasks] = useState([]);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (tasks.length === 0) {
      setDisplayTasks([]);
      return;
    }

    const extendedTasks = [
      ...tasks.slice(-3),
      ...tasks,          
      ...tasks.slice(0, 3)
    ];
    
    setDisplayTasks(extendedTasks);
    setCurrentIndex(3); 
  }, [tasks]);

  const goToNext = () => {
    if (isTransitioning || tasks.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (isTransitioning || tasks.length === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (currentIndex >= tasks.length + 3) {
      setCurrentIndex(3);
    }
    else if (currentIndex <= 2) {
      setCurrentIndex(tasks.length + 2);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning, tasks.length]);

  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks yet...</p>;
  }

  return (
    <div className="carousel-container">
      <button 
        className="carousel-btn prev" 
        onClick={goToPrev}
        disabled={isTransitioning}
        aria-label="Previous task"
      >
        ‹
      </button>

      <div 
        className="carousel-wrapper"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`carousel-track ${isTransitioning ? 'transitioning' : 'no-transition'}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayTasks.map((task, index) => (
            <div key={`${task.id}-${index}`} className="carousel-slide">
              <TaskItem
                task={task}
                onTaskUpdated={onTaskUpdated}
                onTaskDeleted={onTaskDeleted}
              />
            </div>
          ))}
        </div>
      </div>

      <button 
        className="carousel-btn next" 
        onClick={goToNext}
        disabled={isTransitioning}
        aria-label="Next task"
      >
        ›
      </button>

      <div className="carousel-indicators">
        {tasks.map((_, index) => (
          <button
            key={index}
            className={`indicator ${
              ((currentIndex - 3 + tasks.length) % tasks.length) === index ? 'active' : ''
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index + 3);
              }
            }}
            aria-label={`Go to task ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCarousel;