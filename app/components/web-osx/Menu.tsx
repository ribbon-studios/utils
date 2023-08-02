import * as styles from './Menu.module.scss';
import { MenuButton } from './MenuButton';

export type MenuProps = {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
};

export function Menu({ onClose, onMinimize, onZoom }: MenuProps) {
  return (
    <div className={styles.menu}>
      <MenuButton color="red" onClick={onClose} />
      <MenuButton color="yellow" onClick={onMinimize} />
      <MenuButton color="green" onClick={onZoom} />
    </div>
  );
}
