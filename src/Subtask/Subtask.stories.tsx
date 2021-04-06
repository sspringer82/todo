import React, { FormEvent } from "react";
import { Story, Meta } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import Subtask, {Props} from './Subtask';

export default {
  title: "Subtask",
  component: Subtask,
} as Meta;

const Template: Story<Props> = (args) => <BrowserRouter><Subtask {...args} /></BrowserRouter>;

export const Empty = Template.bind({});
Empty.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: true, 
    comment: 'Test comment',
    subtask: []
  },
}

export const Simple = Template.bind({});
Simple.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: true, 
    comment: 'Test comment',
    subtask: [{
      id: 1,
      title: 'Task1',
      done: false,
      todoId: 1
    },{
      id: 2,
      title: 'Task2',
      done: true,
      todoId: 1
    }]
  },
}
