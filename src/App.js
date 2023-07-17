import React from 'react';

import SlidePage from './SlidePage';
import { SlideProvider } from './SlideContext';

const App = () => {
  return (

      <SlideProvider>
        <SlidePage />
      </SlideProvider>

  );
};

export default App;
