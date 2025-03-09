import React from 'react';
import { AuthForm } from './AuthForm';
import { Meta, Story } from '@storybook/react';
import './AuthForm.css';

export default {
  title: 'Forms/AuthForm',
  component: AuthForm,
} as Meta;

const Template: Story = () => <AuthForm />;
export const Default = Template.bind({});
