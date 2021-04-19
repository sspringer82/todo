import React, { FormEvent } from "react";
import { Story, Meta } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import InlineForm, {Props} from './InlineForm';

export default {
  title: "List/Form",
  component: InlineForm,
} as Meta;

const Template: Story<Props> = (args) => <BrowserRouter><InlineForm {...args} /></BrowserRouter>;

export const New = Template.bind({});
New.args = {
  onSave: action('saved') as any
}

export const Edit = Template.bind({});
Edit.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: false,
    comment: 'lala'
  },
  onSave: action('saved') as any
}