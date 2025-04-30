import { useContext } from 'react';
import DialogContext from '../context/DialogContext';

export default function CommonConfirm() {
  const { state, clear } = useContext(DialogContext);

  if (!state.confirm) return null;

  return (
    <div>
      <div>
        <p>{state.confirm.message}</p>
        <div>
          <button
            onClick={() => {
              state.confirm?.onCancel?.();
              clear();
            }}
          >
            취소
          </button>
          <button
            onClick={() => {
              state.confirm?.onConfirm();
              clear();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
