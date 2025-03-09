import React from 'react';
import { ProfileForm } from './ProfileForm';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Forms/ProfileForm',
  component: ProfileForm,
} as Meta;

const Template: Story = () => <ProfileForm />;
export const Default = Template.bind({});
