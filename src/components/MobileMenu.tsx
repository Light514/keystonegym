'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { NavLink } from './NavLink';
import { LanguageSwitcher } from './LanguageSwitcher';
import { KeystoneIcon } from './icons/KeystoneIcon';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const nav = useTranslations('nav');

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '#philosophy', label: nav('philosophy') },
    { href: '#coaches', label: nav('coaches') },
    { href: '#training', label: nav('training') },
    { href: '#join', label: nav('join') },
    { href: '#support', label: nav('support') },
    { href: '/auth/login', label: nav('memberPortal') },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] z-[101] flex flex-col border-l border-[#D4AF37]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <KeystoneIcon className="w-6 h-6" />
                <span className="font-sans font-black text-lg tracking-tighter">KEYSTONE</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center p-6">
              <ul className="space-y-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <NavLink
                      href={item.href}
                      onClick={handleLinkClick}
                      directTap
                      className="text-2xl font-mono uppercase tracking-wider text-zinc-300 hover:text-[#D4AF37] transition-colors block py-2"
                    >
                      {item.label.toUpperCase()}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500 text-sm font-mono">Language</span>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
