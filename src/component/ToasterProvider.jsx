"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster 
      position="bottom-right" 
      toastOptions={{ 
        style: { background: '#333', color: '#fff' },
        success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
        error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } }
      }} 
    />
  );
}
