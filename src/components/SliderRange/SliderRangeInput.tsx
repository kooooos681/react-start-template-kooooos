import React from 'react';
import cn from 'clsx';
import s from './SliderRangeInput.module.sass';

export type SliderRangeInputProps = {
  className?: string;
  onChange: (value: number) => void;
  value: number;
  min: number;
  max: number;
};

export const SliderRangeInput = ({ className, value, onChange, min, max }: SliderRangeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _value = Number(e.target.value.replace(/[^\d-]/g, ''));

    onChange(_value);
  };

  return (
    <input type="number" min={min} max={max} className={cn(s.root, className)} value={value} onChange={handleChange} />
  );
};
