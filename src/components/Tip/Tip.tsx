import React, { FC, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import cn from 'clsx';
import s from './Tip.module.sass';
import { createPortal } from 'react-dom';

export type TipProps = {
  className?: string;
  children: React.ReactElement;
  title: React.ReactNode;
  container?: HTMLElement;
};

export enum TipType {
  mount,
  visible,
  unmount,
  invisible,
}

export type TipAction =
  | { type: TipType.mount }
  | { type: TipType.visible }
  | { type: TipType.unmount }
  | { type: TipType.invisible };

export type TipState = {
  visible: boolean;
  mount: boolean;
};

const reducer = (state: TipState, action: TipAction): TipState => {
  switch (action.type) {
    case TipType.invisible:
      return { ...state, mount: true, visible: false };
    case TipType.mount:
      return { ...state, mount: true, visible: false };
    case TipType.visible:
      return { ...state, mount: true, visible: true };
    case TipType.unmount:
      return { ...state, mount: false, visible: false };
    default:
      throw new Error('Unhandled action type');
  }
};

export type TipPosition = {
  top: number;
  left: number;
};

export enum TipPlace {
  top = 'top',
  bottom = 'bottom',
}

export const Tip: FC<TipProps> = ({ className, children, title, container = document.body }) => {
  const [state, dispatch] = useReducer(reducer, { mount: false, visible: false });
  const [position, setPosition] = useState<TipPosition>({ left: 0, top: 0 });
  const [place, setPlace] = useState<TipPlace>(TipPlace.top);
  const tip = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);

  const timeoutId = useRef<number>();

  const onMouseEnter = () => {
    clearTimeout(timeoutId.current);
    dispatch({ type: TipType.mount });
    setTimeout(() => dispatch({ type: TipType.visible }), 0);

    const rect = holder.current?.getBoundingClientRect();
    const rectContainer = container.getBoundingClientRect();

    if (rect) {
      setPosition({
        left: rect.x + Math.round(rect.width / 2) - rectContainer.x,
        top: rect.y - rectContainer.y,
      });
    }
  };

  const onMouseLeave = () => {
    timeoutId.current = window.setTimeout(() => {
      dispatch({ type: TipType.invisible });
      setTimeout(() => dispatch({ type: TipType.unmount }), 0);
    }, 1000);
  };

  useLayoutEffect(() => {
    if (tip.current && state.mount) {
      const rect = tip.current.getBoundingClientRect();
      const rectHolder = holder.current?.getBoundingClientRect();
      if (rect.top < 8 && rectHolder) {
        setPlace(TipPlace.bottom);
        setPosition((v) => ({ ...v, top: v.top + rectHolder.height }));
      } else {
        setPlace(TipPlace.top);
      }
    }
  }, [state.mount]);

  useEffect(() => {
    if (!state.mount) setPlace(TipPlace.top);
  }, [state.mount]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const rect = holder.current?.getBoundingClientRect();
      const rectContainer = container.getBoundingClientRect();

      if (rect) {
        setPosition({
          left: rect.x + Math.round(rect.width / 2) - rectContainer.x,
          top: rect.y - rectContainer.y,
        });
      }
    });

    if (holder.current) {
      observer.observe(holder.current);
    }

    return () => observer.disconnect();
  }, [container]);

  return (
    <>
      {state.mount &&
        createPortal(
          <div
            ref={tip}
            style={position}
            onMouseEnter={() => clearTimeout(timeoutId.current)}
            onMouseLeave={onMouseLeave}
            className={cn(s.root, s[place], state.visible && s.visible, className)}
          >
            {title}
          </div>,
          container
        )}
      {React.cloneElement(children, {
        ref: holder,
        onMouseEnter,
        onMouseLeave,
      })}
    </>
  );
};
