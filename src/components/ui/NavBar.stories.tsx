import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import NavBar from './NavBar';
import reducer from '../../reducer';

const store = createStore(reducer);

export default {
  title: 'UI/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
    },
    hasBounceOnScroll: {
      control: {
        options: [true, false],
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const NavBarWithLogo = Template.bind({});

export const NavBarWithNoLogo = Template.bind({});
NavBarWithNoLogo.args = {
  hasLogo: false,
  backgroundColor: 'lightgrey',
};
