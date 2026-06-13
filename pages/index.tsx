import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { PageLoader } from '@/components/Loading';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiFeather,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiGlobe,
  FiBriefcase,
  FiCoffee,
  FiHeart,
  FiSun,
  FiPackage,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';

interface Product {
  id: number;
  name_en: string;
  name_ar: string;
  short_description_en: string;
  short_description_ar: string;
  image: string | null;
  category: {
    name_en: string;
    name_ar: string;
  };
}

const fallbackProducts: Product[] = [
  {
    id: 1,
    name_en: 'Premium Egyptian Chamomile',
    name_ar: 'بابونج مصري فاخر',
    short_description_en: 'High-grade whole chamomile flowers, ideal for tea blending and extractions.',
    short_description_ar: 'زهور بابونج كاملة عالية الجودة، مثالية لخلط الشاي والمستخلصات.',
    image: null,
    category: { name_en: 'Dried Flowers', name_ar: 'زهور مجففة' },
  },
  {
    id: 2,
    name_en: 'Organic Basil Leaves',
    name_ar: 'أوراق ريحان عضوية',
    short_description_en: 'Aromatic rubbed basil leaves processed for maximum essential oil retention.',
    short_description_ar: 'أوراق ريحان عطرية مجروشة ومعالجة لأقصى احتفاظ بالزيت العطري.',
    image: null,
    category: { name_en: 'Herbs', name_ar: 'أعشاب' },
  },
  {
    id: 3,
    name_en: 'Coriander Seeds',
    name_ar: 'بذور كزبرة',
    short_description_en: 'Clean, sortex-quality coriander seeds perfect for spice mills and culinary use.',
    short_description_ar: 'بذور كزبرة نظيفة ومفرزة عالية الجودة مثالية لمطاحن التوابل والاستخدام الطهي.',
    image: null,
    category: { name_en: 'Seeds', name_ar: 'بذور' },
  },
];

const heroImage = '/images/agriculture-healthy-food.jpg';
const labImage = '/images/lab.jpg';

const Home = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.homePage;
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products');
      const products = response.data.data?.slice(0, 3) || [];
      setFeaturedProducts(products.length ? products : fallbackProducts);
    } catch (error) {
      setFeaturedProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    { value: '200+', label: language === 'en' ? 'Products' : 'منتج' },
    { value: '50+', label: language === 'en' ? 'Export Markets' : 'سوق تصدير' },
    { value: '30+', label: language === 'en' ? 'Years Sourcing' : 'سنة خبرة' },
    { value: '98%', label: language === 'en' ? 'Purity Verified' : 'نقاء معتمد' },
  ];

  const qualityCards = [
    { icon: FiShield, title: page.featureCards[0].title, description: page.featureCards[0].description },
    { icon: FiTrendingUp, title: page.featureCards[1].title, description: page.featureCards[1].description },
    { icon: FiAward, title: page.featureCards[2].title, description: page.featureCards[2].description },
  ];

  const industries = [
    { icon: FiCoffee, title: language === 'en' ? 'Tea & Infusions' : 'الشاي والمشروبات', desc: language === 'en' ? 'Premium dried flowers and herbs for global tea blenders.' : 'زهور وأعشاب مجففة فاخرة لخلاطي الشاي العالميين.' },
    { icon: FiPackage, title: language === 'en' ? 'Food Manufacturing' : 'صناعة الأغذية', desc: language === 'en' ? 'Bulk spices and seeds for commercial culinary production.' : 'بهارات وبذور سائبة للإنتاج الطهي التجاري.' },
    { icon: FiHeart, title: language === 'en' ? 'Cosmetics & Beauty' : 'مستحضرات التجميل', desc: language === 'en' ? 'Botanical raw materials for natural skincare and beauty.' : 'مواد خام نباتية للعناية الطبيعية بالبشرة والجمال.' },
    { icon: FiBriefcase, title: language === 'en' ? 'Pharmaceuticals' : 'الأدوية', desc: language === 'en' ? 'Certified medicinal herbs meeting strict pharmacopoeia standards.' : 'أعشاب طبية معتمدة تلبي معايير دستور الأدوية الصارمة.' },
  ];

  const categories = [
    { title: t.nav.herbs, icon: FiFeather, link: '/products?category=1', bg: 'bg-[#102116]' },
    { title: t.nav.spices, icon: FiSun, link: '/products?category=2', bg: 'bg-[#2d6a4f]' },
    { title: t.nav.seeds, icon: FiGlobe, link: '/products?category=3', bg: 'bg-[#d6a757]' },
    { title: t.nav.driedFlowers, icon: FiStar, link: '/products?category=4', bg: 'bg-[#6f5121]' },
  ];

  return (
    <Layout title={t.home.heroTitle}>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden bg-[#08140d] pt-28 text-white">
        <video 
          src="/images/ORGANIC HERBS CO.mp4" 
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          className="absolute inset-0 h-full w-full object-cover opacity-50" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,20,13,0.96)_0%,rgba(8,20,13,0.7)_42%,rgba(8,20,13,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(214,167,87,0.28),transparent_28rem)]" />
        
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className="absolute bottom-8 right-8 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition border border-white/10 hover:bg-black/60 hover:scale-110"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <FiVolumeX className="h-6 w-6" /> : <FiVolume2 className="h-6 w-6" />}
        </button>

        <div className="container relative mx-auto grid min-h-[calc(100vh-7rem)] items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.88fr]">
          <FadeIn className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f3d394] backdrop-blur-xl">
              <FiAward className="h-4 w-4" />
              {page.heroBadge}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal md:text-7xl lg:text-8xl">
              {page.heroTitleLine1}
              <span className="block text-[#d6a757]">{page.heroTitleLine2}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              {page.heroDescription}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/products" className="btn-primary">
                {t.home.heroCta} <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20">
                {page.discoverMore} <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {/* <FadeIn delay={0.12} className="relative hidden min-h-[620px] lg:block">
            <div className="animate-float-slow absolute right-4 top-4 h-[520px] w-[390px] overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 shadow-[0_30px_110px_rgba(0,0,0,0.34)] backdrop-blur-xl">
              <img src={labImage} alt="Premium botanical ingredients" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08140d]/82 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f3d394]">{page.heroProductLabel}</p>
                <h2 className="text-4xl font-black leading-tight">
                  {page.heroProductTitleLine1}
                  <span className="block">{page.heroProductTitleLine2}</span>
                </h2>
              </div>
            </div>
            <div className="animate-float-delayed glass-panel-dark absolute bottom-16 left-2 w-72 rounded-[2rem] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#d6a757] text-[#102116]">
                  <FiCheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-black">{language === 'en' ? 'Clean handling' : 'تداول نظيف'}</div>
                  <div className="text-sm text-white/60">{language === 'en' ? 'Traceable, tested, export-ready.' : 'قابل للتتبع، مختبر، جاهز للتصدير.'}</div>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-[#d6a757]" />
              </div>
            </div>
          </FadeIn> */}
        </div>
      </section>

      {/* 2. EXPORT STATS STRIP */}
      <section className="bg-[#102116] py-12 border-b border-white/10">
        <div className="container mx-auto px-6">
          <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            {metrics.map((metric, i) => (
              <div key={i} className={`text-center ${language === 'ar' ? 'border-l-0 border-r border-white/10 first:border-r-0' : ''}`}>
                <div className="text-4xl lg:text-5xl font-black text-[#d6a757] mb-2">{metric.value}</div>
                <div className="text-sm font-bold uppercase tracking-widest text-white/60">{metric.label}</div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* 3. INDUSTRIES SERVED */}
      <section className="section-shell bg-[#fbfaf6]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="eyebrow">{page.promoTitleBefore} {page.promoTitleHighlight} {page.promoTitleAfter}</span>
            <h2 className="mt-5 text-4xl font-black md:text-5xl text-[#102116] max-w-3xl mx-auto leading-tight">
              {page.promoDescription}
            </h2>
          </div>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <StaggerItem key={i}>
                <div className="glass-panel p-8 rounded-[2rem] h-full text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto bg-[#eef4ed] text-[#2d6a4f] rounded-2xl flex items-center justify-center mb-6">
                    <ind.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-[#102116] mb-3">{ind.title}</h3>
                  <p className="text-[#566359] leading-relaxed">{ind.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-24 bg-[#eef4ed]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="eyebrow">{page.featuredBadge}</span>
              <h2 className="mt-5 text-4xl font-black text-[#102116]">{t.products.title}</h2>
            </div>
            <Link href="/products" className="btn-primary">
              {t.common.viewAll} <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link href={cat.link} key={i}>
                <div className={`relative h-64 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden group ${cat.bg} transition-transform hover:-translate-y-2`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <cat.icon className="w-10 h-10 text-white/80 relative z-10" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-white">{cat.title}</h3>
                    <span className="inline-flex items-center gap-2 text-white/80 text-sm font-bold mt-2 group-hover:text-white group-hover:gap-3 transition-all">
                      {t.common.viewAll} <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="section-shell bg-[#f6f4ee]">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1fr]">
            <div>
              <span className="eyebrow">{page.formulaBadge}</span>
              <h2 className="mt-5 text-4xl font-black leading-tight text-[#102116] md:text-6xl">{t.home.whyChooseUs}</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#566359]">{page.formulaDescription}</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {page.standards.map((item) => (
                  <div key={item} className="glass-panel flex items-center gap-3 rounded-2xl p-4 text-sm font-bold">
                    <FiCheckCircle className="h-5 w-5 shrink-0 text-[#2d6a4f]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {qualityCards.map((feature, index) => (
                <div key={feature.title} className="glass-panel group rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/75">
                  <div className="flex gap-5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#102116] text-[#d6a757] transition group-hover:rotate-3">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#d6a757]">0{index + 1}</p>
                      <h3 className="text-xl font-black text-[#102116]">{feature.title}</h3>
                      <p className="mt-2 leading-7 text-[#566359]">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESSING JOURNEY */}
      <section className="section-shell bg-[#fbfaf6]">
        <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(16,33,22,0.18)]">
              <img src={labImage} alt="Botanical quality process" className="h-[560px] w-full object-cover" />
            </div>
            <div className="glass-panel absolute -bottom-8 left-6 right-6 rounded-[2rem] p-5 md:left-auto md:w-80">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2d6a4f]">{page.infoBadge}</p>
              <p className="mt-2 text-2xl font-black text-[#102116]">{language === 'en' ? 'Farm to Port Excellence' : 'التميز من المزرعة للميناء'}</p>
            </div>
          </div>
          <div>
            <span className="eyebrow">{page.infoBadge}</span>
            <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{page.infoTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-[#566359]">{page.infoDescription}</p>
            <div className="mt-9 space-y-5">
              {page.progressItems.map((item, index) => (
                <div key={item.title} className="glass-panel rounded-[1.6rem] p-5">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-black">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#667269]">{item.description}</p>
                    </div>
                    <span className="text-xl font-black text-[#2d6a4f]">{[100, 98, 100][index]}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#102116]/10">
                    <div className="h-full rounded-full bg-[#d6a757]" style={{ width: `${[100, 98, 100][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FEATURED PRODUCTS */}
      <section className="section-shell bg-[#102116] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,167,87,0.22),transparent_28rem),radial-gradient(circle_at_90%_55%,rgba(45,106,79,0.42),transparent_30rem)]" />
        <div className="container relative mx-auto px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f3d394]">
                {page.featuredBadge}
              </span>
              <h2 className="mt-5 text-4xl font-black md:text-6xl">{t.home.featuredProducts}</h2>
              <p className="mt-4 max-w-2xl leading-8 text-white/60">{page.featuredDescription}</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-black text-[#f3d394] transition hover:text-white">
              {t.common.viewAll} <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <PageLoader className="min-h-[320px] text-white/70" />
          ) : (
            <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <StaggerItem key={product.id}>
                <article className="group overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/20 h-full flex flex-col">
                  <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-[#d8dece] shrink-0">
                    {product.image ? (
                      <img src={getAssetUrl(product.image)} alt={language === 'en' ? product.name_en : product.name_ar} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_40%_35%,rgba(214,167,87,0.42),transparent_13rem),linear-gradient(135deg,#315b3c,#08140d)]">
                        <FiFeather className="h-16 w-16 text-[#f3d394]" />
                      </div>
                    )}
                    <div className="absolute left-4 top-4 rounded-full bg-[#d6a757] px-3 py-1 text-xs font-black text-[#102116]">
                      {language === 'en' ? product.category.name_en : product.category.name_ar}
                    </div>
                  </div>
                  <div className="p-3 pt-5 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black line-clamp-1">{language === 'en' ? product.name_en : product.name_ar}</h3>
                    <p className="mt-3 leading-7 text-white/60 line-clamp-2 flex-grow">
                      {language === 'en' ? product.short_description_en : product.short_description_ar}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">{page.featuredTagPrimary}</span>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
                        {page.featuredTagSecondary[index] ?? page.featuredTagSecondary[0]}
                      </span>
                    </div>
                  </div>
                </article>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section-shell bg-[#eef4ed]">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow">{page.testimonialsBadge}</span>
            <h2 className="mt-5 text-4xl font-black md:text-6xl">{page.testimonialsTitle}</h2>
            <p className="mt-5 leading-8 text-[#566359]">{page.testimonialsDescription}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-[1fr_1fr_0.72fr]">
            {page.testimonialsItems.map((test) => (
              <div key={test.name} className="glass-panel rounded-[2rem] p-7 flex flex-col">
                <div className="mb-5 flex text-[#d6a757]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-xl font-bold leading-9 text-[#102116] flex-grow">"{test.text}"</p>
                <div className="mt-8">
                  <p className="font-black">{test.name}</p>
                  <p className="text-sm text-[#667269]">{test.role}</p>
                </div>
              </div>
            ))}
            <div className="flex min-h-[280px] flex-col justify-between rounded-[2rem] bg-[#d6a757] p-7 text-[#102116] shadow-[0_24px_60px_rgba(214,167,87,0.28)]">
              <FiGlobe className="h-12 w-12" />
              <div>
                <p className="text-[28px] font-black leading-none tracking-tight">ORGANIC HERBS</p>
                <p className="mt-1 text-[11px] font-bold tracking-[0.2em] uppercase text-[#102116]/60">Company</p>
                <p className="mt-3 text-lg font-bold">{page.trustLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section-shell bg-[#fbfaf6]">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">{page.faqBadge}</span>
            <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">{page.faqTitle}</h2>
            <p className="mt-5 leading-8 text-[#566359]">{page.faqDescription}</p>
            <div className="mt-8 rounded-[2rem] bg-[#102116] p-7 text-white">
              <h3 className="text-2xl font-black">{page.faqCardTitle}</h3>
              <p className="mt-3 text-white/60">{page.faqCardDescription}</p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d6a757] px-5 py-3 text-sm font-black text-[#102116]">
                {page.faqCardCta} <FiArrowRight />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {page.faqs.map((faq, index) => (
              <div key={faq.question} className={`overflow-hidden rounded-[1.5rem] border transition ${faqOpen === index ? 'border-[#d6a757]/60 bg-white/80 shadow-xl shadow-[#102116]/10' : 'border-[#102116]/10 bg-white/60'}`}>
                <button
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left font-black text-[#102116]"
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  {faqOpen === index ? <FiChevronUp className="h-5 w-5 shrink-0 text-[#2d6a4f]" /> : <FiChevronDown className="h-5 w-5 shrink-0 text-[#667269]" />}
                </button>
                {faqOpen === index && <div className="px-6 pb-6 leading-8 text-[#566359]">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
