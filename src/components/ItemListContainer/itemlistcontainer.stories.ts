import type { Meta, StoryObj } from '@storybook/react';
import { ItemListContainer } from './ItemListContainer';

const meta: Meta<typeof ItemListContainer> = {
  title: 'ItemListContainer',
  component: ItemListContainer,
};

export default meta;
type Story = StoryObj<typeof ItemListContainer>;

export const Primary: Story = {};
