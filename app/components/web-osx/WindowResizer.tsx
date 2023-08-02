import React, { ReactNode, useState, ComponentProps, useRef, useEffect, forwardRef } from 'react';
import { useCachedState, useReadOnlyCachedState } from '@rain-cafe/react-utils';
import * as styles from './WindowResizer.module.scss';
import classNames from 'classnames';

export type WindowResizerProps = {
  children: ReactNode;
  debug?: boolean;
  className?: string;
  width?: number;
  height?: number;
} & Omit<ComponentProps<'div'>, 'ref'>;

export const WindowResizer = forwardRef(function WindowResizer(
  {
    children,
    debug,
    className: externalClassName,
    width: externalWidth,
    height: externalHeight,
    ...props
  }: WindowResizerProps,
  externalRef: React.MutableRefObject<HTMLDivElement>
) {
  const className = useReadOnlyCachedState(() => {
    return classNames(styles.container, externalClassName);
  }, [externalClassName]);
  const [height, setHeight] = useCachedState(() => externalHeight, [externalHeight]);
  const [width, setWidth] = useCachedState(() => externalWidth, [externalWidth]);
  const [resizer, setResizer] = useState<HTMLDivElement | null>(null);
  const containerRef: React.MutableRefObject<HTMLDivElement> = externalRef || useRef<HTMLDivElement>();

  useEffect(() => {
    const onResize = (e: MouseEvent) => {
      if (resizer.classList.contains(styles.right) || resizer.classList.contains(styles.corner)) {
        setWidth(e.clientX - containerRef.current.getBoundingClientRect().left);
      }

      if (resizer.classList.contains(styles.bottom) || resizer.classList.contains(styles.corner)) {
        setHeight(e.clientY - containerRef.current.getBoundingClientRect().top);
      }
    };

    if (resizer) {
      window.addEventListener('mousemove', onResize, {
        passive: true,
      });
    } else {
      window.removeEventListener('mousemove', onResize);
    }

    return () => window.removeEventListener('mousemove', onResize);
  }, [resizer]);

  const onBeginResize = (e) => {
    e.preventDefault();
    setResizer(e.currentTarget);

    window.addEventListener('mouseup', () => setResizer(null), {
      once: true,
      passive: true,
    });
  };

  return (
    <div
      {...props}
      className={className}
      style={{ width: `${width}px`, height: `${height}px` }}
      data-debug={debug}
      ref={containerRef}
    >
      <div className={classNames(styles.resizer, styles.corner)} onMouseDown={onBeginResize} />
      <div className={classNames(styles.resizer, styles.right)} onMouseDown={onBeginResize} />
      <div className={classNames(styles.resizer, styles.bottom)} onMouseDown={onBeginResize} />
      {children}
    </div>
  );
});
