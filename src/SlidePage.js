import React, { useContext , useState } from 'react';
import { SlideContext } from './SlideContext';
import image1 from '../src/images/image-1.jpg'
import image2 from '../src/images/image-2.jpg'
import image3 from '../src/images/image3.jpg'
import image4 from '../src/images/image-3.jpg'
import image5 from '../src/images/image-4.jpg'
import fire from '../src/images/fire.jpg'
import HmaBurger from '../src/images/hamburger.png'
import unFire from '../src/images/unfire.png'

const SlidePage = () => {
  const {
    activeLevel,
    slideIndex,
    setActiveLevel,
    setSlideIndex,
    isSlideModalOpen,
    
    nextSlide,
    prevSlide,
    finishLevel,
    finishedLevels
  } = useContext(SlideContext);

  const totalSlides = 5; 
  const slideContent = [
    image1,
    image2,
   image3,
   image4,
   image5,
   
    
  ];
  const [slideChange , setSlideChange] = useState(true)

  const [ham , setHam] = useState(false)
  const arr = [0 ,1 , 2 , 3, 4]
  const handleLevelClick = (level) => {
  
    setSlideChange(false)
    setSlideIndex(level)
    setActiveLevel(level);

    console.log(activeLevel);

    
    
  };
  const handleSlideComplete = () => {
    if (slideIndex === totalSlides - 1) {
      finishLevel();
    } else {
      nextSlide();
    }
  };
  const handleHam = () => {
    setHam(true)
  }

  const handleCloseModal = () => {
    // setSlideModalOpen(false);

  };

  const handleExitSlide = () => {
    setHam(false)
    setSlideChange(true)

  };



  return (
    <div className="h-screen flex justify-center items-center">
        {slideChange ? 
        <div>
         
          {arr.map((level) => (
         
        
         
         
         <div
           key={level}
           onClick={() => handleLevelClick(level)}
           className='my-10'
           style={{
             backgroundColor: activeLevel >= level  ? 'green' : 'transparent',
             color: activeLevel >= level  ? 'white' : 'black',

             marginRight: '10px',
             padding: '5px 10px',
             
             borderRadius: '5px',
             cursor: 'pointer',
           }}
           
           
           
         >
          {activeLevel >= level ?<img className='h-[50px]' src={fire} alt="" /> : <img className='h-[50px]' src={unFire} alt="" /> }
          

           Level {level + 1}
           
           
           
          
         </div>
         
         
        
        
      
       ))}
          
        </div>
        :
      <div className='w-1/2'>
        <div className='flex justify-between'>
        <h1>Slide {slideIndex + 1}</h1>
        <img className='w-[10px] h-[10px] cursor-pointer' src={HmaBurger} alt="" onClick={handleHam}/>
        {ham && 
        <div className='fixed  top-0 left-0 w-full h-full bg-black  pointer-events-auto'> 
          <button className='text-white text-4xl text-center w-full mb-5 ' onClick={() => setHam(false)}>Close</button>
          <button className='text-white text-4xl  text-center w-full ' onClick={handleExitSlide}>EXIT</button>
        </div>
        }
        </div>
    
    <img className='h-[620px] w-full' src={slideContent[slideIndex]} alt={`Slide ${slideIndex + 1} `} />
    {/* {typeof slideContent[slideIndex] === 'string' ? (
        <p>{slideContent[slideIndex]}</p>
      ) : (
        
      )} */}
      <div className='flex justify-between mt-5'>
        <button 
        className=" px-2 py-2" 
        onClick={prevSlide} 
        disabled={slideIndex === 0 || (slideIndex === 0 && !finishedLevels.includes(activeLevel - 1))}
        style={{ backgroundColor: slideIndex ?   '#FDC5F5': '#FEEDFC'}}
        >
        Previous
        
      </button>
      <button className="bg-[#FDC5F5] px-2 py-2" onClick={handleSlideComplete}>
        {slideIndex === totalSlides - 1 ? 'Finish' : 'Next'}
        {setActiveLevel(slideIndex)}
      </button>

      </div>
    
    {isSlideModalOpen && (
      <div>
        <h2>Menu</h2>
        <button onClick={handleCloseModal}>Close</button>
        <button onClick={handleExitSlide}>Exit</button>
      </div>
    )}

      </div>
}
    
  </div>
  );
};

export default SlidePage;