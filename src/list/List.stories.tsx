import React from "react";
import { Story, Meta } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import List, {Props} from './List';
import { Todo } from '../Todo';

export default {
  title: "List",
  component: List,
} as Meta;

const Template: Story<Props> = (args) => <BrowserRouter><List {...args} /></BrowserRouter>;

export const WithoutSubtask = Template.bind({});
WithoutSubtask.args = {
  todos: [{
    id: 1,
    title: 'Test',
    done: true, 
    comment: 'Test comment',
    due: '2024-06-31T06:06',
    categoryId: '',
    created: '2021-06-31T06:06'
  }, {
    id: 2,
    title: 'Test',
    done: false, 
    comment: 'Test comment',
    due: '2024-06-31T06:06',
    categoryId: '',
    created: '2021-06-31T06:06'
  }],
  save: action('saved') as any,
  remove: action('removed') as any
}

export const WithSubtask = Template.bind({});
WithSubtask.args = {
  todos: [{
    id: 1,
    title: 'Test',
    done: true, 
    comment: 'Test comment',
    due: '2024-06-31T06:06',
    categoryId: '',
    created: '2021-06-31T06:06',
    subtasks: [
      {
        id: 1,
        title: 'Foo',
        done: false,
        todoId: 1,
        created: '2021-06-31T06:06'
      }
    ]
  }, {
    id: 2,
    title: 'Test',
    done: false, 
    comment: 'Test comment',
    due: '2024-06-31T06:06',
    categoryId: '',
    created: '2021-06-31T06:06'
  }],
  save: action('saved') as any,
  remove: action('removed') as any
}