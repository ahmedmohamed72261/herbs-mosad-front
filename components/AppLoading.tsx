import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '@/store';

interface AppLoadingProps {
  show: boolean;
}

export default function AppLoading({ show }: AppLoadingProps) {
  const { language } = useAppStore();
  const label = language === 'ar' ? 'جاري التحميل...' : 'Loading...';

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-[#d6a757]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full w-1/3 bg-gradient-to-r from-[#d6a757] via-[#e3bd72] to-[#d6a757]"
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#08140d]/30 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-live="polite"
            aria-busy="true"
          >
            <motion.div
              className="flex flex-col items-center gap-4 rounded-3xl border border-white/25 bg-[#102116]/85 px-10 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-14 w-14">
                <div
                  className="absolute inset-0 rounded-full border-2 border-white/15"
                  aria-hidden
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d6a757] border-r-[#e3bd72]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-black text-[#d6a757]">H</span>
                </div>
              </div>
              <p className="text-sm font-semibold tracking-wide text-white/80">{label}</p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
