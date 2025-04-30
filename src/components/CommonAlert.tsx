import { useContext } from 'react';
import DialogContext from '../context/DialogContext';

export default function CommonAlert() {
  const { state, clear } = useContext(DialogContext);

  if (!state.alert) return null;

  return (
    <div>
      <div>
        <p>{state.alert.message}</p>
        <button
          onClick={() => {
            state.alert?.onConfirm();
            clear();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}
