import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Post from './Post';
import reducer from '../../reducer';
import { postData } from '../../templates/post';

const store = createStore(reducer);

export default {
  title: 'posts/Post',
  component: Post,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  argTypes: {
    handlePostLike: {
      action: 'handlePostLike',
    },
  },
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />;

export const PostWithoutComments = Template.bind({});
PostWithoutComments.args = {
  post: { ...postData },
};

export const PostWithLike = Template.bind({});
PostWithLike.args = {
  post: {
    ...postData,
    content: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    likes: [{ authorId: '' }],
    authorId: {
      ...postData.authorId,
      image: 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    },
  },
};
