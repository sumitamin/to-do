// import { render, screen } from '@testing-library/react';
// import App from './App';
import React from 'react'
import Task from './component/task';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import store from "./store/index";
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

Enzyme.configure({adapter: new Adapter()});

describe('add to do', () => {
    it('to changes update state', () => {
      // const handleSubmit = jest.fn();
      const wrapper = shallow(<Provider store={store}><Task /></Provider>);
      const toDoInput = wrapper.find('#input-to-do')
      toDoInput.simulate('change', {target : {value: 'fruit'} })
      expect(toDoInput.state('td')).toEqual('fruit');
    });

    process.stdin.resume();
process.stdin.setEncoding('utf8');

var stdin = '';
process.stdin.on('data', function (chunk) {
  stdin += chunk;
}).on('end', function() {
  var lines = stdin.trim().split('\n');
  for(var i=0; i<lines.length; i++) {
    process.stdout.write(lines[i]);
  }
});


    it('submit form', () => {
      const handleSubmit = jest.fn();
      const wrapper = shallow(<Task />);
      const submitBtn = wrapper.find('#add-task')
      submitBtn.simulate('click')
      expect(handleSubmit).toHaveBeenCalled();
    });
  })