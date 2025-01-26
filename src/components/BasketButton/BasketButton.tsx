import React from 'react';
import s from './basketbutton.module.sass';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional click handler
   */
  onClick?: () => void;

  count: number;
}

/**
 * Primary UI component for user interaction
 */
export function BasketButton({ primary = false, size = 'medium', backgroundColor, ...props }: ButtonProps) {
  const count = props.count;
  const mode = primary ? s.primary : s.secondary;
  if (count == 0) {
    return (
      <button type="button" className={[s.button, s[size], mode].join(' ')} style={{ backgroundColor }} {...props}>
        В корзину
      </button>
    );
  }
  return (
    <>
      <button>-</button>
      <input value={props.count}></input>
      <button>+</button>
    </>
  );
}
