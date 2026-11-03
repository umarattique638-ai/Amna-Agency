"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Btn } from "./controls";
import { toast as globalToast } from "@/lib/toast";

/* ─────────────── Toasts ─────────────── */
type ToastFn = (text: string, tone?: "success" | "error" | "info", description?: string) => void;
const showToast: ToastFn = (text, tone = "success", description) => void globalToast[tone](text, description);
/** Dashboard shortcut for the global top-center toast. */
export const useToast = () => showToast;

/* ─────────────── Confirm dialog ─────────────── */
type ConfirmOpts = { title: string; text: string; confirmLabel?: string };
const ConfirmCtx = createContext<(o: ConfirmOpts) => Promise<boolean>>(async () => false);
export const useConfirm = () => useContext(ConfirmCtx);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<(ConfirmOpts & { resolve: (v: boolean) => void }) | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const confirm = useCallback((o: ConfirmOpts) => new Promise<boolean>((resolve) => setDialog({ ...o, resolve })), []);

  useEffect(() => {
    if (dialog) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [dialog]);

  const close = (v: boolean) => {
    dialog?.resolve(v);
    setDialog(null);
  };

  return (
    <ConfirmCtx.Provider value={confirm}>
        {children}

        <dialog
          ref={dialogRef}
          onCancel={(e) => {
            e.preventDefault();
            close(false);
          }}
          className="m-auto w-[min(92vw,420px)] rounded-2xl p-0 shadow-2xl backdrop:bg-fg/40 backdrop:backdrop-blur-sm"
        >
          {dialog && (
            <div className="p-6">
              <p className="text-lg font-bold">{dialog.title}</p>
              <p className="mt-2 text-sm text-mute">{dialog.text}</p>
              <div className="mt-6 flex justify-end gap-2">
                <Btn variant="secondary" onClick={() => close(false)}>Cancel</Btn>
                <Btn variant="danger" onClick={() => close(true)}>{dialog.confirmLabel ?? "Delete"}</Btn>
              </div>
            </div>
          )}
        </dialog>
    </ConfirmCtx.Provider>
  );
}
