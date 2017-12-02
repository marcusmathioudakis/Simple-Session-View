import React from 'react';
import ReactDOM from 'react-dom';
import EffectControl from './EffectControl';
import { shallow } from 'enzyme';

it('shallow render without crashing', () => {
  const div = document.createElement('div');
  shallow(<EffectControl />);
});



