import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiTarget, FiEye, FiHeart, FiAward, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.aboutPage;
  const stats = page.stats;

  const standards = language === 'en'
    ? ['ISO 22000 Certified', 'HACCP Compliant', 'Organic Certified', 'Sortex Cleaned', 'Lab Tested', 'Traceable Supply']
    : ['معتمد ISO 22000', 'متوافق مع HACCP', 'عضوي معتمد', 'مفرز آلياً', 'مختبر معملياً', 'سلسلة توريد قابلة للتتبع'];

  return (
    <Layout title={t.about.title}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2916] pt-40 pb-28 lg:pt-56 lg:pb-40">
        <img src="/images/breadcrumb.jpg" alt="About us" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(214,167,87,0.28),transparent_32rem),radial-gradient(circle_at_20%_80%,rgba(45,106,79,0.4),transparent_28rem)]" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <span className="eyebrow mb-6 inline-flex">🌿 {page.heroBadge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
            {t.about.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/60">
            {t.about.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <FadeIn className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(16,33,22,0.18)]">
                <img src="/images/about.jpg" alt="About Organic Herbs Co" className="w-full h-[520px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2916]/60 via-transparent to-transparent" />
              </div>
              <div className="glass-panel absolute -bottom-6 -right-6 rounded-[2rem] p-5 shadow-xl max-w-[200px]">
                <div className="text-3xl font-black text-[#d6a757]">30+</div>
                <div className="text-sm font-bold text-[#566359] uppercase tracking-wider">
                  {language === 'en' ? 'Years of Excellence' : 'سنوات من التميز'}
                </div>
              </div>
            </div>
            <div>
              <span className="eyebrow mb-5 inline-flex">{page.storyBadge}</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#102116] leading-tight mb-6">
                {page.storyTitle}
              </h2>
              <p className="text-[#566359] leading-relaxed text-lg mb-5">
                {page.storyDescriptionOne}
              </p>
              <p className="text-[#566359] leading-relaxed text-lg">
                {page.storyDescriptionTwo}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {standards.slice(0, 3).map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d6a4f] bg-[#2d6a4f]/10 px-3.5 py-2 rounded-full">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-[#0e2916] py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(214,167,87,0.12),transparent_28rem),radial-gradient(circle_at_80%_20%,rgba(45,106,79,0.2),transparent_26rem)]" />
        <div className="container mx-auto px-6 relative z-10">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-black text-[#d6a757] mb-3 drop-shadow-lg">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-white/60 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32">
        <FadeIn className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="eyebrow mb-5 inline-flex">{page.philosophyBadge}</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#102116] max-w-2xl mx-auto leading-tight">
              {page.philosophyTitle}
            </h2>
          </div>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="glass-panel p-10 rounded-[2rem] h-full group hover:-translate-y-1.5 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-[#102116] text-[#d6a757] flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform">
                  <FiTarget className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#102116] mb-4">
                  {t.about.mission}
                </h3>
                <p className="text-[#566359] leading-relaxed">
                  {page.missionDescription}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="glass-panel p-10 rounded-[2rem] h-full group hover:-translate-y-1.5 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-[#102116] text-[#d6a757] flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform">
                  <FiEye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#102116] mb-4">
                  {t.about.vision}
                </h3>
                <p className="text-[#566359] leading-relaxed">
                  {page.visionDescription}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="glass-panel p-10 rounded-[2rem] h-full group hover:-translate-y-1.5 transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-[#102116] text-[#d6a757] flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform">
                  <FiHeart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#102116] mb-4">
                  {page.valuesTitle}
                </h3>
                <p className="text-[#566359] leading-relaxed">
                  {page.valuesDescription}
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#0e2916] py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(214,167,87,0.18),transparent_30rem),radial-gradient(circle_at_30%_70%,rgba(45,106,79,0.25),transparent_28rem)]" />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <FiAward className="w-12 h-12 text-[#d6a757] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white max-w-3xl mx-auto leading-tight">
            {language === 'en' ? 'Ready to Partner with Us?' : 'هل أنت مستعد للشراكة معنا؟'}
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto">
            {language === 'en' ? 'Let\'s discuss how our premium botanical ingredients can elevate your products.' : 'دعنا نناقش كيف يمكن لمكوناتنا النباتية الممتازة أن ترتقي بمنتجاتك.'}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="/contact" className="btn-primary">
              {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
            </a>
            <a href="/products" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/20">
              {language === 'en' ? 'Browse Products' : 'تصفح المنتجات'}
            </a>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
};

export default About;