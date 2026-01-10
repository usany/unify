import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // compiler: {
  //   styledComponents: true,
  // },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
