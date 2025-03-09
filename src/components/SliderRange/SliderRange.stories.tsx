import type { Meta, StoryObj } from '@storybook/react';

import { SliderRange, SliderRangeProps } from './SliderRange';
import { ComponentInfo } from '../ComponentInfo';
import React, { useState } from 'react';

const Wrapper = (props: SliderRangeProps) => {
  const [value, onChange] = useState<any>(0);
  return (
    <ComponentInfo
      fullWidth
      title="SliderRange"
      desc={`Этот слайдер можно перемещать как на сенсорном, так и на обычном устройстве`}
    >
      <SliderRange {...props} value={value} onChange={onChange} />
    </ComponentInfo>
  );
};

const meta: Meta<typeof SliderRange> = {
  title: 'SliderRange',
  component: Wrapper,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    min: -100,
    max: 100,
  },
};