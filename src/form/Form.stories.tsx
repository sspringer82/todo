import React, { FormEvent } from "react";
import { Story, Meta } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import Form, {Props} from './Form';

export default {
  title: "Form",
  component: Form,
} as Meta;

const Template: Story<Props> = (args) => <BrowserRouter><Form {...args} /></BrowserRouter>;

export const WithoutSubtask = Template.bind({});
WithoutSubtask.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: true, 
    comment: 'Test comment',
    due: '2024-06-31T06:06',
    categoryId: '',
    created: '2021-06-31T06:06'
  },
  onSubmit: async (e: FormEvent) => {
    e.preventDefault();
    action('submitted')(e);
  }
}