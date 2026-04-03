// src/env.d.ts

/// <reference types="vite/client" />

declare module '*.svg' {
  const src: string;
  export default src; // permite import logo from './logo.svg'
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent; // permite import Logo from './logo.svg?react'
}