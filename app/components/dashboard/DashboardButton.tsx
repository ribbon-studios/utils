import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import * as styles from './DashboardButton.module.scss';

export type DashboardButtonProps = LinkProps & {
  children?: ReactNode;
  label: string;
};

export function DashboardButton({ children, label, ...props }: DashboardButtonProps) {
  return (
    <Link {...props} className={styles.button}>
      {children}
      <div className={styles.hover}>{label}</div>
    </Link>
  );
}
