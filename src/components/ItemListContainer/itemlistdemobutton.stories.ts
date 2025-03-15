import type { Meta, StoryObj } from '@storybook/react';
import { ItemListDemoButton } from './ItemList_Demo_Button';

const meta: Meta<typeof ItemListDemoButton> = {
  title: 'ItemListDemoButton',
  component: ItemListDemoButton,
};

export default meta;
type Story = StoryObj<typeof ItemListDemoButton>;

export const Primary: Story = {};
