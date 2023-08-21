import { ICommand } from '../types/command.js';
import * as rawCommands from './commands/*.ts';

export function isCommand(thing: any): thing is ICommand {
  return Boolean(thing.info);
}

const commands = Object.values(rawCommands).reduce(
  (output, entry) => ({
    ...output,
    ...Object.values(entry)
      .filter(isCommand)
      .reduce(
        (commands, command) => ({
          ...commands,
          [command.info.name]: command,
        }),
        {}
      ),
  }),
  {} as Record<string, ICommand>
);

console.log(commands);

export class CommandService {
  static process(command: string): string {
    return command;
  }
}
