import React from 'react';
import ReactDOM from 'react-dom';
import SamplePlayer from './SamplePlayer';
import { shallow } from 'enzyme';

it('shallow render without crashing', () => {
  const div = document.createElement('div');
  shallow(<SamplePlayer />);
});



