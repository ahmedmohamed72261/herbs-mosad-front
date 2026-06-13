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
    name_en: 'Botanical Vitality Complex',
    name_ar: 'Botanical Vitality Complex',
    short_description_en: 'Premium botanical blend for clean daily energy.',
    short_description_ar: 'Premium botanical blend for clean daily energy.',
    image: null,
    category: { name_en: 'Supplements', name_ar: 'Supplements' },
  },
  {
    id: 2,
    name_en: 'Ashwagandha Extract',
    name_ar: 'Ashwagandha Extract',
    short_description_en: 'Adaptogenic extract for calm focus and balance.',
    short_description_ar: 'Adaptogenic extract for calm focus and balance.',
    image: null,
    category: { name_en: 'Extracts', name_ar: 'Extracts' },
  },
  {
    id: 3,
    name_en: 'Ginger Root Extract',
    name_ar: 'Ginger Root Extract',
    short_description_en: 'Warming root extract for digestion and vitality.',
    short_description_ar: 'Warming root extract for digestion and vitality.',
    image: null,
    category: { name_en: 'Extracts', name_ar: 'Extracts' },
  },
];
const heroImage = '/images/hero-section.jpg';
// const heroImage =
//   'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=85&w=1400';
// const labImage =
//   'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=85&w=1100';
  const labImage ='/images/lab.jpg';

const Home = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.homePage;
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

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
    { value: '98%', label: 'Purity verified' },
    { value: '50+', label: 'Export markets' },
    { value: '15+', label: 'Years sourcing' },
  ];

  const qualityCards = [
    { icon: FiShield, title: page.featureCards[0].title, description: page.featureCards[0].description },
    { icon: FiTrendingUp, title: page.featureCards[1].title, description: page.featureCards[1].description },
    { icon: FiFeather, title: page.featureCards[2].title, description: page.featureCards[2].description },
  ];

  return (
    <Layout title={t.home.heroTitle}>
      <section className="relative min-h-screen overflow-hidden bg-[#08140d] pt-28 text-white">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(8,20,13,0.96)_0%,rgba(8,20,13,0.82)_42%,rgba(8,20,13,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(214,167,87,0.28),transparent_28rem)]" />

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
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="glass-panel-dark rounded-3xl p-4">
                  <div className="text-2xl font-black text-[#f3d394]">{metric.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{metric.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12} className="relative hidden min-h-[620px] lg:block">
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
                  <div className="font-black">Clean handling</div>
                  <div className="text-sm text-white/60">Traceable, tested, export-ready.</div>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-[#d6a757]" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

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
              View all products <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <PageLoader className="min-h-[320px] text-white/70" />
          ) : (
            <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <StaggerItem key={product.id}>
                <article className="group overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/20">
                  <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-[#d8dece]">
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
                  <div className="p-3 pt-5">
                    <h3 className="text-2xl font-black">{language === 'en' ? product.name_en : product.name_ar}</h3>
                    <p className="mt-3 min-h-[56px] leading-7 text-white/60">
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

      <section className="section-shell bg-[#fbfaf6]">
        <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(16,33,22,0.18)]">
              <img src={labImage} alt="Botanical quality process" className="h-[560px] w-full object-cover" />
            </div>
            <div className="glass-panel absolute -bottom-8 left-6 right-6 rounded-[2rem] p-5 md:left-auto md:w-80">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#2d6a4f]">{page.infoBadge}</p>
              <p className="mt-2 text-2xl font-black text-[#102116]">From field to refined formula</p>
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
                    <span className="text-xl font-black text-[#2d6a4f]">{[98, 95, 92][index]}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#102116]/10">
                    <div className="h-full rounded-full bg-[#d6a757]" style={{ width: `${[98, 95, 92][index]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[#eef4ed]">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="eyebrow">{page.testimonialsBadge}</span>
            <h2 className="mt-5 text-4xl font-black md:text-6xl">{page.testimonialsTitle}</h2>
            <p className="mt-5 leading-8 text-[#566359]">{page.testimonialsDescription}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-[1fr_1fr_0.72fr]">
            {page.testimonialsItems.map((test) => (
              <div key={test.name} className="glass-panel rounded-[2rem] p-7">
                <div className="mb-5 flex text-[#d6a757]">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-xl font-bold leading-9 text-[#102116]">"{test.text}"</p>
                <div className="mt-8">
                  <p className="font-black">{test.name}</p>
                  <p className="text-sm text-[#667269]">{test.role}</p>
                </div>
              </div>
            ))}
            <div className="flex min-h-[280px] flex-col justify-between rounded-[2rem] bg-[#d6a757] p-7 text-[#102116] shadow-[0_24px_60px_rgba(214,167,87,0.28)]">
              <FiAward className="h-12 w-12" />
              <div>
                <p className="text-5xl font-black">HERBA</p>
                <p className="mt-2 text-xl font-black">{page.trustLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
