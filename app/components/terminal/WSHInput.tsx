import { KeyboardEvent, useCallback, useState } from 'react';
import * as styles from './WSHInput.module.scss';
import { History } from '../../services/history';
import { Prism } from '../common/Prism';

export type WSHInputProps = {
  onSubmit?: (value: string) => void;
};

export function WSHInput({ onSubmit }: WSHInputProps) {
  const [value, setValue] = useState('');

  const onSubmitInternal = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>, value: string, ignore: boolean = false) => {
      e.preventDefault();

      if (!ignore) {
        History.add(value);
      }

      onSubmit?.(value);
      setValue('');
    },
    [onSubmit]
  );

  return (
    <div className={styles.container}>
      <Prism className={styles.prism}>{value}</Prism>
      <textarea
        className={styles.input}
        spellCheck={false}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyDown={(e) => {
          const { metaKey, ctrlKey, key } = e;

          if (metaKey && key === 'k') {
            // CMD + K - Clears out the terminal window
            onSubmitInternal(e, 'clear', true);
          } else if (ctrlKey && key === 'u') {
            // Ctrl + U - Clears out the current line
            e.preventDefault();

            setValue('');
          } else if (key === 'ArrowUp') {
            // Up - Navigates to the prior history
            e.preventDefault();

            setValue(History.next());
          } else if (key === 'ArrowDown') {
            // Up - Navigates to more current history
            e.preventDefault();

            setValue(History.previous() ?? '');
          } else if (key === 'Enter') {
            // Enter - Submits the current input

            onSubmitInternal(e, value);
          }
        }}
      />
    </div>
  );
}
