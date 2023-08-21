import * as styles from './WSHCommand.module.scss';
import { useReadOnlyCachedState } from '@rain-cafe/react-utils';
import { CommandService } from '../../services/command';
import { Prism } from '../common/Prism';

export type WSHCommandProps = {
  command: string;
};

export function WSHCommand({ command }: WSHCommandProps) {
  const result = useReadOnlyCachedState(() => CommandService.process(command), [command]);

  return (
    <div className={styles.container}>
      <Prism className={styles.prism}>{command}</Prism>
      <Prism className={styles.prism}>{result}</Prism>
    </div>
  );
}
