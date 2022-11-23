import React from 'react';
import Posts from './components/posts';

const Main = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  function handler() {
    setIsOpen(prev => !prev);
  }

  return(
    <div> 
      Header
      <button onClick={handler}>버튼</button>
      {isOpen  && <Posts />}
    </div>
  )
}

export default Main;