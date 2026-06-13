import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiArrowRight, FiChevronDown, FiGlobe, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, theme, setLanguage, toggleTheme } = useAppStore();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/products', label: t.nav.products, dropdown: true },
    { href: '/certificates', label: t.nav.certificates},
    { href: '/catalog', label: t.nav.catalog },
    { href: '/team', label: t.nav.team },
    { href: '/contact', label: t.nav.contact },
  ];

  const productsDropdown = [
    { href: '/products?category=1', label: t.nav.herbs },
    { href: '/products?category=2', label: t.nav.spices },
    { href: '/products?category=3', label: t.nav.seeds },
    { href: '/products?category=4', label: t.nav.driedFlowers },
    { href: '/products?category=5', label: t.nav.herbalTeas },
  ];

  const shopNow = t.homePage.shopNow.replace(' ->', '').replace('->', '');

  return (
    <motion.div
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-300 md:px-8"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-2xl transition-all duration-300 ${
          isScrolled
            ? 'border-white/35 bg-[#102116]/85 shadow-[0_18px_55px_rgba(16,33,22,0.24)]'
            : 'border-white/25 bg-[#102116]/35'
        }`}
      >
        <Link href="/" className="group flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-2 pr-5 text-white ring-1 ring-white/20 transition duration-300 hover:bg-white/20 hover:ring-white/40">
          <div className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#d6a757] to-[#b38842] shadow-[0_0_15px_rgba(214,167,87,0.4)]">
            <span className="text-sm font-black text-[#102116] tracking-tighter">OH</span>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#102116] bg-[#2d6a4f]"></div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[15px] font-black tracking-[0.18em] leading-none text-white">ORGANIC HERBS</span>
            <span className="text-[9px] font-bold tracking-[0.3em] leading-none text-[#d6a757] uppercase mt-0.5">Company</span>
          </div>
        </Link>

        <div className={`hidden items-center space-x-3 lg:flex ${language === 'ar' ? 'space-x-reverse' : ''}`}>
          {navLinks.map((link) => (
            <div key={link.href} className="relative group">
              {link.dropdown ? (
                <div className={`flex cursor-pointer items-center space-x-1 rounded-full px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                  <span>{link.label}</span>
                  <FiChevronDown className="h-4 w-4" />
                  <div className={`invisible absolute top-full mt-4 w-52 translate-y-2 overflow-hidden rounded-2xl border border-white/20 bg-[#102116]/95 p-2 opacity-0 shadow-2xl shadow-[#102116]/25 backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${language === 'ar' ? 'right-0' : 'left-0'}`}>
                    {productsDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.href} className="rounded-full px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className={`hidden items-center space-x-3 text-white/90 lg:flex ${language === 'ar' ? 'space-x-reverse' : ''}`}>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="rounded-full p-2 transition hover:bg-white/10 hover:text-white"
            title="Change language"
          >
            <FiGlobe className="h-5 w-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition hover:bg-white/10 hover:text-white"
            title="Toggle theme"
          >
            {theme === 'light' ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
          </button>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-[#d6a757] px-5 py-2.5 text-sm font-black text-[#102116] shadow-lg shadow-[#d6a757]/25 transition hover:-translate-y-0.5 hover:bg-[#e6bf73]">
            {shopNow} <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full p-2 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mx-auto mt-4 max-w-7xl rounded-3xl border border-white/20 bg-[#102116]/92 p-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-white/90 hover:bg-white/10 ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="font-semibold">{link.label}</span>
                      <FiChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isProductsOpen && (
                      <div className={`mt-2 space-y-1 ${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                        {productsDropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block rounded-xl px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-semibold text-white/90 hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className={`flex items-center gap-2 pt-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex-1 rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10"
                title="Change language"
              >
                <FiGlobe className="inline h-5 w-5 mr-2 align-middle" />
                {language === 'en' ? 'AR' : 'EN'}
              </button>
              <button
                onClick={toggleTheme}
                className="flex-1 rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white/90 transition hover:bg-white/10"
                title="Toggle theme"
              >
                {theme === 'light' ? <FiMoon className="inline h-5 w-5 mr-2 align-middle" /> : <FiSun className="inline h-5 w-5 mr-2 align-middle" />}
                {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </div>
            <div className="pt-2">
              <Link href="/products" className="block rounded-2xl bg-[#d6a757] py-3 text-center font-black text-[#102116]">
                {shopNow}
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
