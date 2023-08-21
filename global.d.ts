declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
  export = content;
}

declare module '*.ts' {
  const content: Record<string, { [key: string]: any }>;
  export default content;
  export = content;
}
