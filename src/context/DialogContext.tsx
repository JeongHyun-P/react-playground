import { createContext, useContext, useState, ReactNode } from 'react';

export interface ToastPayload {
  message: string;
}

export interface AlertPayload {
  message: string;
  onConfirm: () => void;
}

export interface ConfirmPayload {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface DialogState {
  toast: ToastPayload | null;
  alert: AlertPayload | null;
  confirm: ConfirmPayload | null;
}

interface DialogContextType {
  state: DialogState;
  $toast: (msg: string) => void;
  $alert: (msg: string, onConfirm?: () => void) => void;
  $confirm: (msg: string, onConfirm?: () => void, onCancel?: () => void) => void;
  clear: () => void;
}

declare global {
  var $toast: DialogContextType['$toast'];
  var $alert: DialogContextType['$alert'];
  var $confirm: DialogContextType['$confirm'];
}

const DialogContext = createContext<DialogContextType>({
  state: { toast: null, alert: null, confirm: null },
  $toast: () => {},
  $alert: () => {},
  $confirm: () => {},
  clear: () => {}
});

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({
    toast: null,
    alert: null,
    confirm: null
  });

  const clear = () => setState({ toast: null, alert: null, confirm: null });

  const contextValue: DialogContextType = {
    state,
    $toast: (msg) => setState((s) => ({ ...s, toast: { message: msg } })),
    $alert: (msg, onConfirm = () => {}) => setState((s) => ({ ...s, alert: { message: msg, onConfirm } })),
    $confirm: (msg, onConfirm = () => {}, onCancel) =>
      setState((s) => ({ ...s, confirm: { message: msg, onConfirm, onCancel } })),
    clear
  };

  globalThis.$toast = contextValue.$toast;
  globalThis.$alert = contextValue.$alert;
  globalThis.$confirm = contextValue.$confirm;

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
}

export default DialogContext;
