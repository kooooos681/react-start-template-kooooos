import React from 'react';
import { ProductForm } from './ProductForm';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Forms/ProductForm',
  component: ProductForm,
} as Meta;

const Template: Story = () => <ProductForm />;
export const Default = Template.bind({});
