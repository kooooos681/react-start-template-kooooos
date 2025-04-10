import type { Meta, StoryObj } from '@storybook/react';
import BasketRow from './BasketRow';

const meta: Meta<typeof BasketRow> = {
  title: 'Components/BasketRow',
  component: BasketRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BasketRow>;

export const Default: Story = {
  args: {
    id: 1,
    title: 'Молоко',
    price: 100,
    count: 2,
    onRemove: (id) => console.log('Remove:', id),
    onIncrement: (id) => console.log('Increment:', id),
    onDecrement: (id) => console.log('Decrement:', id),
  },
}; 