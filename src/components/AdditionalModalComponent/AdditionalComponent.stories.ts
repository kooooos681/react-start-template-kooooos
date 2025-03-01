import type { Meta, StoryObj } from '@storybook/react';

import { AdditionalComponent } from './AdditionalComponent';

const meta: Meta<typeof AdditionalComponent> = {
  title: 'AdditionalModalComponent',
  component: AdditionalComponent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
