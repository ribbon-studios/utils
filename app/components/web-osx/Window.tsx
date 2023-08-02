import { ReactNode, useRef, useState } from 'react';
import { useDidUpdateEffect, useReadOnlyCachedState } from '@rain-cafe/react-utils';
import * as styles from './Window.module.scss';
import { Menu } from './Menu';
import classNames from 'classnames';
import { WindowResizer } from './WindowResizer';

export type WindowProps = {
  children?: ReactNode;
  preventEvents?: boolean;
};

export function Window({ children, preventEvents }: WindowProps) {
  const containerRef = useRef<HTMLDivElement>();
  const windowRef = useRef<HTMLDivElement>();
  const [zoom, setZoom] = useState(false);

  const className = useReadOnlyCachedState(() => {
    return classNames(styles.container, preventEvents && styles.preventEvents);
  }, [preventEvents]);

  useDidUpdateEffect(() => {
    const { top, left, right, bottom } = containerRef.current.getBoundingClientRect();

    if (zoom) {
      windowRef.current.style.position = 'fixed';
    }

    windowRef.current
      .animate(
        [
          {
            top: `${top}px`,
            left: `${left}px`,
            bottom: `${window.innerHeight - bottom}px`,
            right: `${window.innerWidth - right}px`,
            borderRadius: '6px',
          },
          {
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            borderRadius: '0',
          },
        ],
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          direction: zoom ? 'normal' : 'reverse',
        }
      )
      .finished.then(() => {
        if (zoom) {
          windowRef.current.style.borderRadius = '0';
          windowRef.current.style.top = '0';
          windowRef.current.style.left = '0';
          windowRef.current.style.right = '0';
          windowRef.current.style.bottom = '0';
        } else {
          windowRef.current.style.borderRadius = '';
          windowRef.current.style.position = '';
          windowRef.current.style.top = '';
          windowRef.current.style.left = '';
          windowRef.current.style.right = '';
          windowRef.current.style.bottom = '';
        }
      });
  }, [zoom]);

  return (
    <WindowResizer className={className} ref={containerRef} debug>
      <div className={styles.window} ref={windowRef}>
        <Menu onZoom={() => setZoom(!zoom)} />
        {children}
      </div>
    </WindowResizer>
  );
}
