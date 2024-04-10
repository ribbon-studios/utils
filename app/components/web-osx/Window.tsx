import { ReactNode, useRef, useState } from 'react';
import { useDidUpdateEffect } from '@ribbon-studios/react-utils';
import * as styles from './Window.module.scss';
import { Menu } from './Menu';
import classNames from 'classnames';
import { WindowResizer } from './WindowResizer';
import { isNullable } from '../../utils/guards';

export type WindowProps = {
  children?: ReactNode;
  preventEvents?: boolean;
};

export function Window({ children, preventEvents }: WindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);

  useDidUpdateEffect(() => {
    if (isNullable(containerRef.current) || isNullable(windowRef.current)) return;

    const containerElement = containerRef.current;
    const windowElement = windowRef.current;

    const { top, left, right, bottom } = containerElement.getBoundingClientRect();

    if (zoom) {
      windowElement.style.position = 'fixed';
    }

    windowElement
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
          windowElement.style.borderRadius = '0';
          windowElement.style.top = '0';
          windowElement.style.left = '0';
          windowElement.style.right = '0';
          windowElement.style.bottom = '0';
        } else {
          windowElement.style.borderRadius = '';
          windowElement.style.position = '';
          windowElement.style.top = '';
          windowElement.style.left = '';
          windowElement.style.right = '';
          windowElement.style.bottom = '';
        }
      });
  }, [zoom, containerRef, windowRef]);

  return (
    <WindowResizer
      className={classNames(styles.container, preventEvents && styles.preventEvents)}
      ref={containerRef}
      debug
    >
      <div className={styles.window} ref={windowRef}>
        <Menu onZoom={() => setZoom(!zoom)} />
        <div className={styles.content}>{children}</div>
      </div>
    </WindowResizer>
  );
}
