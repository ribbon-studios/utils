import { ICommand } from '../../types/command';

class EchoCommand implements ICommand {
  info = {
    name: 'echo',
    usage: '[SHORT-OPTION]... [STRING]...',
    description: 'write arguments to the standard output',
    args: [
      {
        name: 'n',
        type: 'boolean',
        description: 'Do not print the trailing newline character.',
      },
    ],
  };

  process(command: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export const echo = new EchoCommand();
