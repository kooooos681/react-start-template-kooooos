import type { Meta, StoryObj } from '@storybook/react';
import { ItemListDemoObserver } from './ItemList_Demo_Observer';

const meta: Meta<typeof ItemListDemoObserver> = {
  title: 'ItemListDemoObserver',
  component: ItemListDemoObserver,
};

export default meta;
type Story = StoryObj<typeof ItemListDemoObserver>;

export const Primary: Story = {};
