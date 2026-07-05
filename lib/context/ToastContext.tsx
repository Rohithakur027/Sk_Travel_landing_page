"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle } from "lucide-react";

type ToastType = "success" | "error";

interface ToastState {
  visible: boolean;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const subscribeToClient = (onStoreChange: () => void) => {
  onStoreChange();
  return () => {};
};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Styles are inlined on purpose - keeps the toast pinned in place no matter
// what CSS module scoping or cascade rules are doing elsewhere on the page.

const BASE_STYLE: React.CSSProperties = {
  position: "fixed",
  top: "1.5rem",
  right: "1.5rem",
  zIndex: 2147483647, // max int32 - nothing should ever stack above this
  display: "flex",
  alignItems: "flex-start",
  gap: "0.75rem",
  padding: "1rem 1.25rem",
  borderRadius: "0.75rem",
  boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
  fontSize: "0.95rem",
  fontWeight: 500,
  fontFamily: "Inter, system-ui, sans-serif",
  maxWidth: "400px",
  width: "calc(100vw - 3rem)",
  transition: "opacity 0.35s ease, transform 0.35s ease",
  pointerEvents: "auto",
  overflow: "hidden",
};

const SUCCESS_STYLE: React.CSSProperties = {
  ...BASE_STYLE,
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  color: "#166534",
};

const ERROR_STYLE: React.CSSProperties = {
  ...BASE_STYLE,
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#991b1b",
};

const VISIBLE: React.CSSProperties = {
  opacity: 1,
  transform: "translateX(0)",
};

const HIDDEN: React.CSSProperties = {
  opacity: 0,
  transform: "translateX(40px)",
  pointerEvents: "none",
};

const ACCENT_BAR_SUCCESS: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "4px",
  background: "#22c55e",
};

const ACCENT_BAR_ERROR: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "4px",
  background: "#ef4444",
};

const ICON_STYLE: React.CSSProperties = {
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  marginTop: "1px",
};

const MESSAGE_STYLE: React.CSSProperties = {
  flex: 1,
  lineHeight: 1.5,
};

const CLOSE_BTN_STYLE: React.CSSProperties = {
  flexShrink: 0,
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1.25rem",
  lineHeight: 1,
  padding: "0 0.15rem",
  color: "inherit",
  opacity: 0.5,
};

// ─── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    type: "success",
    message: "",
  });
  const mounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const showToast = useCallback((type: ToastType, message: string) => {
    setToast({ visible: true, type, message });
  }, []);

  // Auto-dismiss after 5 s
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(hideToast, 5000);
    return () => clearTimeout(timer);
  }, [toast.visible, hideToast]);

  const baseStyle = toast.type === "success" ? SUCCESS_STYLE : ERROR_STYLE;
  const visibilityStyle = toast.visible ? VISIBLE : HIDDEN;
  const accentBar = toast.type === "success" ? ACCENT_BAR_SUCCESS : ACCENT_BAR_ERROR;

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            style={{ ...baseStyle, ...visibilityStyle }}
            role="alert"
            aria-live="polite"
            aria-atomic="true"
          >
            <div style={accentBar} />

            <span style={ICON_STYLE}>
              {toast.type === "success" ? (
                <CheckCircle size={20} color="#16a34a" />
              ) : (
                <XCircle size={20} color="#dc2626" />
              )}
            </span>

            <span style={MESSAGE_STYLE}>{toast.message}</span>

            <button
              style={CLOSE_BTN_STYLE}
              onClick={hideToast}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
