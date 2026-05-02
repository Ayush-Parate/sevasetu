import * as React from "react";

type AsyncState<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

/**
 * Runs `fn` once on mount and exposes `reload`. Uses a ref so callers can pass
 * inline lambdas without unstable dependency-array pitfalls.
 */
export function useAsync<T>(fn: () => Promise<T>) {
  const [state, setState] = React.useState<AsyncState<T>>({
    loading: true,
    error: null,
    data: null,
  });

  const fnRef = React.useRef(fn);
  fnRef.current = fn;

  const execute = React.useCallback(async () => {
    setState({ loading: true, error: null, data: null });
    try {
      const data = await fnRef.current();
      setState({ loading: false, error: null, data });
    } catch (e) {
      const err = e instanceof Error ? e : new Error("Request failed");
      setState({ loading: false, error: err, data: null });
    }
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setState({ loading: true, error: null, data: null });
      try {
        const data = await fnRef.current();
        if (!cancelled) setState({ loading: false, error: null, data });
      } catch (e) {
        const err = e instanceof Error ? e : new Error("Request failed");
        if (!cancelled) setState({ loading: false, error: err, data: null });
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...state, reload: execute };
}

