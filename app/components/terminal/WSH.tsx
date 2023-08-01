import { Window } from '../web-osx/Window';

export type WSHProps = {
  demo?: boolean;
};

export function WSH({ demo }: WSHProps) {
  return <Window preventEvents={demo} />;
}
