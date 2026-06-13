import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import { FiTarget, FiEye, FiHeart } from 'react-icons/fi';

const About = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.aboutPage;
  const stats = page.stats;

  return (
    <Layout title={t.about.title}>
      {/* Hero Section */}
      <section className="bg-herba-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <img src="/images/breadcrumb.jpg" alt="About us" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2d6a4f 0%, transparent 50%)' }}></div>
        <FadeIn className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-green-300 font-medium border border-white/10">
            <span>🌿</span>
            <span>{page.heroBadge}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {t.about.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="py-20 lg:py-32 bg-herba-light">
        <div className="container mx-auto px-6">
          <FadeIn className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative w-full aspect-square bg-gradient-to-br from-herba-green to-herba-darker rounded-[3rem] flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #0a1d0f 10px), repeating-linear-gradient(#2d6a4f55, #2d6a4f)' }}></div>
                <span className="text-9xl relative z-10 text-white drop-shadow-2xl">🌿</span>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="text-herba-green font-semibold text-sm mb-2 flex items-center space-x-2">
                <span>🌿</span><span>{page.storyBadge}</span>
              </div>
              <h2 className="text-4xl font-bold text-herba-dark mb-6">
                {page.storyTitle}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {page.storyDescriptionOne}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                {page.storyDescriptionTwo}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-herba-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #2d6a4f 0%, transparent 70%)' }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-5xl lg:text-6xl font-bold text-herba-yellow mb-4 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-white/80 font-medium text-lg uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <FadeIn className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-herba-green font-semibold text-sm mb-2 flex items-center justify-center space-x-2">
              <span>🌿</span><span>{page.philosophyBadge}</span>
            </div>
            <h2 className="text-4xl font-bold text-herba-dark">{page.philosophyTitle}</h2>
          </div>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="bg-herba-light p-10 rounded-[2rem] hover:shadow-xl transition-shadow group border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-white rounded-2xl text-herba-green mb-6 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <FiTarget className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-herba-dark mb-4">
                  {t.about.mission}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {page.missionDescription}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-herba-light p-10 rounded-[2rem] hover:shadow-xl transition-shadow group border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-white rounded-2xl text-herba-green mb-6 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <FiEye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-herba-dark mb-4">
                  {t.about.vision}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {page.visionDescription}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-herba-light p-10 rounded-[2rem] hover:shadow-xl transition-shadow group border border-transparent hover:border-gray-100">
                <div className="w-16 h-16 bg-white rounded-2xl text-herba-green mb-6 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <FiHeart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-herba-dark mb-4">
                  {page.valuesTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {page.valuesDescription}
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </FadeIn>
      </section>
    </Layout>
  );
};

export default About;
