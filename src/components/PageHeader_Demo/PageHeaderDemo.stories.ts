import type { Meta, StoryObj } from '@storybook/react';

import { PageHeaderDemo } from './PageHeaderDemo';

const meta: Meta<typeof PageHeaderDemo> = {
  title: 'PageHeaderDemo',
  component: PageHeaderDemo,
};

export default meta;
type Story = StoryObj<typeof PageHeaderDemo>;

export const Primary: Story = {};
