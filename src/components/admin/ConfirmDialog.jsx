import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Eliminar', loading = false }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md glass-card rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-red-500/20 p-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-white/70">{message}</p>
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="ghost" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={onConfirm}
                    loading={loading}
                  >
                    {confirmLabel}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
