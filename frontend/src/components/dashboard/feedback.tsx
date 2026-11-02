"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Btn } from "./controls";
import { cn } from "@/lib/utils";

/* ─────────────── Toasts ─────────────── */
type Toast = { id: number; text: string; tone: "success" | "error" };
const ToastCtx = createContext<(text: string, tone?: Toast["tone"]) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

/* ─────────────── Confirm dialog ─────────────── */
type ConfirmOpts = { title: string; text: string; confirmLabel?: string };
const ConfirmCtx = createContext<(o: ConfirmOpts) => Promise<boolean>>(async () => false);
export const useConfirm = () => useContext(ConfirmCtx);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dialog, setDialog] = useState<(ConfirmOpts & { resolve: (v: boolean) => void }) | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toast = useCallback((text: string, tone: Toast["tone"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

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
    <ToastCtx.Provider value={toast}>
      <ConfirmCtx.Provider value={confirm}>
        {children}

        <div aria-live="polite" className="fixed right-4 bottom-4 z-[100] flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={cn(
                "animate-[toastIn_.3s_ease-out] rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg",
                t.tone === "success" ? "bg-fg" : "bg-red-600",
              )}
            >
              {t.tone === "success" ? "✓ " : "⚠ "}
              {t.text}
            </div>
          ))}
        </div>

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
        <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
      </ConfirmCtx.Provider>
    </ToastCtx.Provider>
  );
}
