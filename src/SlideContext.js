
import React, { createContext, useState, useEffect } from 'react';

export const SlideContext = createContext();

export const SlideProvider = ({ children }) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlideModalOpen, setSlideModalOpen] = useState(false);
  const [finishedLevels, setFinishedLevels] = useState([]);


  useEffect(() => {
    const data = { slideIndex, activeLevel };
    localStorage.setItem('slideData', JSON.stringify(data));
    return () => {
      localStorage.removeItem('slideData');
    };
  }, [slideIndex, activeLevel]);


  useEffect(() => {
    const storedData = localStorage.getItem('slideData');
    if (storedData !== null) {
      const { slideIndex: storedSlideIndex, activeLevel: storedActiveLevel } = JSON.parse(storedData);
      setSlideIndex(storedSlideIndex);
      setActiveLevel(storedActiveLevel);
    }
  }, []);

  const totalSlides = 5; 


  const nextSlide = () => {
    if (slideIndex === totalSlides - 1) {
   
      if (!finishedLevels.includes(activeLevel)) {
        setActiveLevel(prevLevel => prevLevel + 1);
      }
      setSlideIndex(0);
    } else {
      setSlideIndex(prevIndex => prevIndex + 1);
    }
  };
  

  const prevSlide = () => {
    if (slideIndex === 0) {

      if (activeLevel > 1) {
        setActiveLevel(prevLevel => prevLevel - 1);
        setSlideIndex(totalSlides - 1);
      }
    } else {
      setSlideIndex(prevIndex => prevIndex - 1);
    }
  };

  const finishLevel = () => {
    setFinishedLevels(prevLevels => [...prevLevels, activeLevel]);
  };

  return (
    <SlideContext.Provider
      value={{
        activeLevel,
        setActiveLevel,
        slideIndex,
        setSlideIndex,
        isSlideModalOpen,
        setSlideModalOpen,
        finishedLevels,
        setFinishedLevels,
        nextSlide,
        prevSlide,
        finishLevel
      }}
    >
      {children}
    </SlideContext.Provider>
  );
};