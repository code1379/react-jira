import React, { Component, ReactNode } from "react";

/**
 * props 属性
 * children
 * fallbackRender 当异常发生的时候显示什么
 */

// interface ErrorBoundaryProps {
//   // children: ReactNode;
//   fallbackRender: (props: { error: Error | null }) => React.ReactElement;
// }

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export default class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { fallbackRender, children } = this.props;
    const { error } = this.state;
    if (error) {
      return fallbackRender({ error });
    } else {
      return children;
    }
  }
}
