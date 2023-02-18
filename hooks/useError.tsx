import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ErrorContext {
  error: string;
  dispatchError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContext | null>(null);

interface ErrorProps {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProps) => {
  const [error, setError] = useState("");

  const dispatchError = useCallback((message: string) => {
    setError(message);
    // setTimeout(() => {
    //   setError("");
    // }, 5000);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, dispatchError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const errorContext = useContext(ErrorContext);

  if (!errorContext) {
    throw new Error("useError must be used within an ErrorProvider");
  }

  return errorContext;
};
