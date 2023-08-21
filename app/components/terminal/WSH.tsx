import { Window } from '../web-osx/Window';
import { WSHInput } from './WSHInput';

export type WSHProps = {
  demo?: boolean;
};

export function WSH({ demo }: WSHProps) {
  return (
    <Window preventEvents={demo}>
      <WSHInput />
    </Window>
  );
}
