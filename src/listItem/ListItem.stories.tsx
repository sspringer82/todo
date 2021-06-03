import React, { FormEvent } from "react";
import { Story, Meta } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import ListItem, {Props} from './ListItem';

export default {
  title: "ListItem",
  component: ListItem,
} as Meta;

const Template: Story<Props> = (args) => <BrowserRouter><ListItem {...args} /></BrowserRouter>;

export const SimpleNotDone = Template.bind({});
SimpleNotDone.args = {
  todo: {
    id: 1, 
    title: 'Test',
    done: false, 
    due: '2024-06-31T06:06',
    created: '2021-06-31T06:06'
  },
  canEdit: true,
  onDelete: action('delete'),
  onSave: action('save') as any,
  editModeEnabled: false,
  onEditModeEnable: action('enable edit mode')
};

export const SimpleDone = Template.bind({});
SimpleDone.args = {
  todo: {
    id: 1, 
    title: 'Test',
    done: true,
    due: '2024-06-31T06:06',
    created: '2021-06-31T06:06'
  },
  canEdit: true,
  onDelete: action('delete'),
  onSave: action('save') as any,
  editModeEnabled: false,
  onEditModeEnable: action('enable edit mode')
};


export const WithoutEdit = Template.bind({});
WithoutEdit.args = {
  todo: {
    id: 1, 
    title: 'Test',
    done: true,
    due: '2024-06-31T06:06',
    created: '2021-06-31T06:06'
  },
  canEdit: false,
  onDelete: action('delete'),
  onSave: action('save') as any,
  editModeEnabled: false,
  onEditModeEnable: action('enable edit mode')
};

export const InlineEdit = Template.bind({});
InlineEdit.args = {
  todo: {
    id: 1, 
    title: 'Test',
    done: true,
    due: '2024-06-31T06:06',
    created: '2021-06-31T06:06'
  },
  canEdit: false,
  onDelete: action('delete'),
  onSave: action('save') as any,
  editModeEnabled: true,
  onEditModeEnable: action('enable edit mode')
};