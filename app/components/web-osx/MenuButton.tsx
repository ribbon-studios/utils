import classNames from 'classnames';
import * as styles from './MenuButton.module.scss';

export type MenuButtonProps = {
  color: 'red' | 'yellow' | 'green';
  onClick?: () => void;
};

export function MenuButton({ color, onClick }: MenuButtonProps) {
  return <div className={classNames(styles.button, styles[color])} onClick={onClick} />;
}
