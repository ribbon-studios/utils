import classNames from 'classnames';
import { useReadOnlyCachedState } from '@rain-cafe/react-utils';
import * as styles from './MenuButton.module.scss';

export type MenuButtonProps = {
  color: 'red' | 'yellow' | 'green';
  onClick?: () => void;
};

export function MenuButton({ color, onClick }: MenuButtonProps) {
  const className = useReadOnlyCachedState(() => {
    return classNames(styles.button, styles[color]);
  }, [color]);

  return <div className={className} onClick={onClick} />;
}
