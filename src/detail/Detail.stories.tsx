import React from "react";
import { Story, Meta } from "@storybook/react";
import DetailComponent, { Props } from "./Detail";
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: "Detail",
  component: DetailComponent,
} as Meta;

const Template: Story<Props> = (args) => <BrowserRouter><DetailComponent {...args} /></BrowserRouter>;

export const WithoutSubtask = Template.bind({});
WithoutSubtask.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: true, 
    comment: 'Test comment',
    due: '2024-06-31T06:06',
    created: '2021-06-31T06:06',
    categoryId: '',
  },
  onSave: action('saved') as any
}

export const WithSubtask = Template.bind({});
WithSubtask.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: true,
    created: '2021-06-31T06:06',
    due: '2024-06-31T06:06',
    categoryId: '',
    subtasks: [
      {id: 1, title: 'Subtask1', done: true, todoId: 1, created: '2021-06-31T06:06'},
      {id: 2, title: 'Subtask2', done: false, todoId: 1, created: '2021-06-31T06:06'},
      {id: 3, title: 'Subtask3', done: false, todoId: 1, created: '2021-06-31T06:06'}
    ]
  },
  onSave: action('saved') as any
}
