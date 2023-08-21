import { useState } from 'react';
import { Window } from '../web-osx/Window';
import { WSHInput } from './WSHInput';
import { WSHCommand } from './WSHCommand';

export type WSHProps = {
  demo?: boolean;
};

export function WSH({ demo }: WSHProps) {
  const [commands, setCommands] = useState<string[]>([]);
  return (
    <Window preventEvents={demo}>
      {commands.map((command, index) => (
        <WSHCommand key={index} command={command} />
      ))}
      <WSHInput onSubmit={(value) => setCommands([...commands, value])} />
    </Window>
  );
}
