import { PolymorphicPropsWithoutRef } from 'react-polymorphic-types';
import { useReadOnlyCachedState } from '@rain-cafe/react-utils';
import classnames from 'classnames';
import styles from './Typography.module.scss';

export const TypographyDefaultElement = 'h2';

type TypographyTypes = 'h1' | 'h2' | 'h3';

interface TypographyOwnProps<T extends TypographyTypes> {
  type?: T;
  children: React.ReactNode;
  className?: string;
}

export type TypographyProps<
  T extends TypographyTypes,
  E extends React.ElementType = typeof TypographyDefaultElement
> = PolymorphicPropsWithoutRef<TypographyOwnProps<T>, E>;

export function Typography<
  T extends TypographyTypes = typeof TypographyDefaultElement,
  E extends React.ElementType = T
>({ as, type, children, className: externalClassName, ...extraProps }: TypographyProps<T, E>) {
  const Element: React.ElementType = as ?? type ?? TypographyDefaultElement;

  const className = useReadOnlyCachedState(() => {
    return classnames(styles.typography, styles[type as string], externalClassName);
  }, [type, externalClassName]);

  return (
    <Element {...extraProps} className={className}>
      {children}
    </Element>
  );
}
