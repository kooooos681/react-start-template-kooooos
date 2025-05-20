import type { Meta, StoryObj } from '@storybook/react';
import BasketList from './BasketList';

const meta: Meta<typeof BasketList> = {
  title: 'Components/BasketList',
  component: BasketList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BasketList>;

const handleRemove = (id: string) => console.log('Remove', id);
const handleIncrement = (id: string) => console.log('Increment', id);
const handleDecrement = (id: string) => console.log('Decrement', id);

export const Default: Story = {
  args: {
    products: [
      {
        id: '1',
        title: 'Молоко',
        price: 100,
        count: 2,
        onRemove: handleRemove,
        onIncrement: handleIncrement,
        onDecrement: handleDecrement,
      },
      {
        id: '2',
        title: 'Хлеб',
        price: 50,
        count: 1,
        onRemove: handleRemove,
        onIncrement: handleIncrement,
        onDecrement: handleDecrement,
      },
    ],
  },
}; 