import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export type PrismProps = {
  className?: string;
  children: string | string[];
};

export function Prism({ className, children }: PrismProps) {
  return (
    <div className={className}>
      <SyntaxHighlighter
        language="shell"
        style={tomorrow}
        customStyle={{ backgroundColor: 'transparent', padding: 0, margin: 0, font: 'inherit', fontSize: 'inherit' }}
        codeTagProps={{
          style: {
            font: 'inherit',
          },
        }}
        lineProps={{
          style: {
            font: 'inherit',
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
