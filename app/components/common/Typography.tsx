import classnames from 'classnames';
import { PolymorphicPropsWithoutRef } from 'react-polymorphic-types';
import styles from './Typography.module.scss';
import { Link } from 'react-router-dom';
import { useReadOnlyCachedState } from '../../hooks/use-cached-state';

type TypographyValidTypes = 'h1' | 'h2' | 'h3';
type TypographyValidAsTypes = typeof Link | TypographyValidTypes;

interface TypographyOwnProps {
  type: TypographyValidTypes;
  children: React.ReactNode;
  className?: string;
}

export type TypographyProps<T extends TypographyValidAsTypes> = PolymorphicPropsWithoutRef<TypographyOwnProps, T>;

export function Typography<E extends TypographyValidAsTypes>({
  as,
  type,
  children,
  className: externalClassName,
  ...extraProps
}: TypographyProps<E>) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Element = as || type;
  const className = useReadOnlyCachedState(() => {
    return classnames(styles.typography, styles[type], externalClassName);
  }, [type, externalClassName]);

  return (
    <Element {...extraProps} className={className}>
      {children}
    </Element>
  );
}
