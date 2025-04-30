import { useEffect, useContext } from 'react';
import DialogContext from '../context/DialogContext';

export default function CommonToast() {
  const { state, clear } = useContext(DialogContext);

  useEffect(() => {
    if (state.toast) {
      const timeout = setTimeout(clear, 3000);
      return () => clearTimeout(timeout);
    }
  }, [state.toast]);

  if (!state.toast) return null;

  return (
    <div>
      {state.toast.message}
    </div>
  );
}
