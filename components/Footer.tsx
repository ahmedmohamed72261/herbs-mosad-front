import { motion } from 'motion/react';
import Link from 'next/link';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiArrowRight, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const footerText = {
    eyebrow: language === 'en' ? 'Stay close to the harvest' : 'ابق قريبًا من الحصاد',
    headline:
      language === 'en'
        ? 'Premium botanical updates, sourcing notes, and product releases.'
        : 'تحديثات نباتية فاخرة وملاحظات توريد وإصدارات منتجات جديدة.',
    emailPlaceholder: language === 'en' ? 'Your email address' : 'بريدك الإلكتروني',
    subscribe: language === 'en' ? 'Subscribe' : 'اشترك',
    intro:
      language === 'en'
        ? 'Exporting premium herbs, spices, seeds, and botanical ingredients with careful sourcing, clean handling, and refined presentation.'
        : 'نصدر أعشابًا وتوابل وبذورًا ومكونات نباتية فاخرة بعناية في التوريد، ونظافة في التداول، وجودة في العرض.',
    products: language === 'en' ? 'Products' : t.nav.products,
    company: language === 'en' ? 'Company' : 'الشركة',
    contact: language === 'en' ? 'Contact' : t.nav.contact,
    premiumHerbs: language === 'en' ? 'Premium Herbs' : t.nav.herbs,
    signatureSpices: language === 'en' ? 'Signature Spices' : t.nav.spices,
    naturalSeeds: language === 'en' ? 'Natural Seeds' : t.nav.seeds,
    rights: language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.',
    terms: language === 'en' ? 'Terms' : 'الشروط',
    privacy: language === 'en' ? 'Privacy' : 'الخصوصية',
    faqs: language === 'en' ? 'FAQs' : 'الأسئلة الشائعة',
  };

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/products', label: t.nav.products },
    { href: '/team', label: t.nav.team },
  ];

  const productLinks = [
    { href: '/products?category=1', label: footerText.premiumHerbs },
    { href: '/products?category=2', label: footerText.signatureSpices },
    { href: '/products?category=3', label: footerText.naturalSeeds },
    { href: '/catalog', label: t.nav.catalog },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      role="contentinfo"
      className={`relative overflow-hidden bg-[#08140d] text-white ${language === 'ar' ? 'rtl' : ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(214,167,87,0.22),transparent_28rem),radial-gradient(circle_at_78%_0%,rgba(45,106,79,0.34),transparent_30rem)]" />

      <div className="container relative mx-auto px-6 py-16">
        <div className="glass-panel-dark mb-16 grid gap-8 rounded-[2rem] p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#d6a757]">
              {footerText.eyebrow}
            </p>
            <h3 className="max-w-xl text-3xl font-black leading-tight md:text-4xl">
              {footerText.headline}
            </h3>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row md:items-center">
            <input
              type="email"
              placeholder={footerText.emailPlaceholder}
              className="min-h-[52px] flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-white outline-none transition placeholder:text-white/40 focus:border-[#d6a757]"
            />
            <button className="min-h-[52px] rounded-full bg-[#d6a757] px-7 text-sm font-black text-[#102116] transition hover:bg-[#e6bf73]">
              {footerText.subscribe}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-2 pr-4 ring-1 ring-white/15">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d6a757] text-sm font-black text-[#102116]">H</span>
              <span className="text-lg font-black tracking-[0.22em]">HERBA</span>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-7 text-white/60">
              {footerText.intro}
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, index) => (
                <a key={index} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:border-[#d6a757] hover:bg-[#d6a757] hover:text-[#102116]">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white">{footerText.products}</h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-[#d6a757]">
                    <FiArrowRight className="h-3.5 w-3.5" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white">{footerText.company}</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-[#d6a757]">
                    <FiArrowRight className="h-3.5 w-3.5" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-white">{footerText.contact}</h4>
            <ul className="space-y-5 text-sm text-white/70">
              <li className="flex gap-3">
                <FiMapPin className="mt-1 h-5 w-5 shrink-0 text-[#d6a757]" />
                <span>123 Nature Ave, Green Park, CA 90210</span>
              </li>
              <li className="flex gap-3">
                <FiPhone className="h-5 w-5 shrink-0 text-[#d6a757]" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex gap-3">
                <FiMail className="h-5 w-5 shrink-0 text-[#d6a757]" />
                <span>info@herba.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 Herba Export Company. {footerText.rights}</p>
          <div className="flex gap-5">
            <Link href="#" className="transition hover:text-white">{footerText.terms}</Link>
            <Link href="#" className="transition hover:text-white">{footerText.privacy}</Link>
            <Link href="#" className="transition hover:text-white">{footerText.faqs}</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
