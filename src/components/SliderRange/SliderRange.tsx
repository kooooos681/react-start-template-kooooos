import React, { FC, useMemo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { SliderRangeInput } from './SliderRangeInput';
import { getValueByCursor, getValueInRange } from './helpers';
import s from './SliderRange.module.sass';

export type SliderRangeProps = {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

export const SliderRange: FC<SliderRangeProps> = ({ className, value, onChange, min, max }) => {
  const range = max - min;
  const containerRef = useRef<HTMLDivElement>(null);
  const [valueRange, setValueRange] = useState(getValueInRange(value, { min, max }));

  useEffect(() => {
    setValueRange(getValueInRange(value, { min, max }));
  }, [value, min, max]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (containerRef.current) {
        setValueRange(getValueInRange(value, { min, max }));
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, min, max]);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      onChange(getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: e.clientX, rootClientX: rect.x }));
    }
  };

  const { onStart } = useMemo(() => {
    let rect: DOMRect;

    const move = (clientX: number) => {
      onChange(getValueByCursor({ max, min, rootWidth: rect.width, cursorClientX: clientX, rootClientX: rect.x }));
    };

    const mousemove = (e: MouseEvent) => move(e.clientX);
    const touchmove = (e: TouchEvent) => move(e.touches[0].clientX);

    const end = () => {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchend', end);
    };

    return {
      onStart: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('touchmove', touchmove);
        window.addEventListener('mouseup', end);
        window.addEventListener('touchend', end);
      },
    };
  }, [max, min, onChange]);

  return (
    <div ref={containerRef} className={cn(s.root, className)}>
      <div onMouseDown={onStart} onTouchStart={onStart} className={s.field} onClick={onClick}>
        <div className={s.runner} style={{ left: ((valueRange - min) / range) * 100 + '%' }}></div>
      </div>
      <SliderRangeInput value={valueRange} onChange={onChange} min={min} max={max} />
    </div>
  );
};
