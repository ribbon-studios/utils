import classNames from 'classnames';
import * as styles from './MenuButton.module.scss';
import { useReadOnlyCachedState } from '../../hooks/use-cached-state';

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
