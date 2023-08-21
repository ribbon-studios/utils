export interface ICommand {
  info: ICommand.Info;
  process: (command: string) => Promise<string>;
}

export namespace ICommand {
  export type Info = {
    name: string;
    usage: string;
    description: string;
    args: {
      name: string;
      type: string;
      description: string;
    }[];
  };

  export type ProcessOptions = {
    args: any[];
    input?: string;
    commands: ICommand[];
  };
}
