import React from 'react';
import ReactDOM from 'react-dom'; // Ensure ReactDOM is imported
import { Carousel } from 'antd';

const { createRoot } = ReactDOM;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export const App = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
const mountNode = document.getElementById('root');
const ComponentDemo = App;
createRoot(mountNode).render(<ComponentDemo />);
