import { ComponentType } from 'react';

declare module '*.mdx' {
  let MDXComponent: ComponentType<any>;
  export default MDXComponent;
}
