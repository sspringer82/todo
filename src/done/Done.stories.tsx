import React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DoneComponent, {Props} from './Done';

export default {
  title: 'Done',
  component: DoneComponent,
} as Meta;

const Template: Story<Props> = (args) => <DoneComponent {...args} />;

export const Done = Template.bind({});
Done.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: true
  },
  onSave: action('saved') as any
}

export const NotDone = Template.bind({});
NotDone.args = {
  todo: {
    id: 1,
    title: 'Test',
    done: false
  },
  onSave: action('saved') as any

}