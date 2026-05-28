import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiDownload } from 'react-icons/fi';

interface Catalog {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  file: string | null;
  image: string | null;
  version: string | null;
}

const CatalogPage = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.catalogPage;
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const response = await api.get('/catalogs');
      setCatalogs(response.data || []);
    } catch (error) {
      setCatalogs([
        {
          id: 1,
          title_en: 'Product Catalog 2024',
          title_ar: 'كتالوج المنتجات 2024',
          description_en: 'Complete product catalog featuring all our herbs, spices, and seeds.',
          description_ar: 'كتالوج المنتجات الكامل يضم جميع أعشابنا والبهارات والبذور.',
          file: null,
          image: null,
          version: '1.0'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.catalog.title}>
      {/* Hero Section */}
      <section className="bg-herba-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2d6a4f 0%, transparent 50%)' }}></div>
        <FadeIn className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-green-300 font-medium border border-white/10">
            <span>🌿</span>
            <span>{page.heroBadge}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {t.catalog.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="py-20 lg:py-32 bg-herba-light">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="skeleton-card max-w-2xl mx-auto p-8">
              <div className="skeleton-block h-80 rounded-2xl mb-6" />
              <div className="skeleton-line h-8 mb-4 w-3/4" />
              <div className="skeleton-line h-4 mb-6 w-1/2" />
              <div className="skeleton-line h-12 w-48" />
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {catalogs.map((catalog) => (
                <StaggerItem key={catalog.id}>
                  <div
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-transparent group"
                  >
                  <div className="h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {catalog.image ? (
                      <img
                        src={getAssetUrl(catalog.image || undefined)}
                        alt={language === 'en' ? catalog.title_en : catalog.title_ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a3d28] to-[#0a1d0f] flex items-center justify-center text-white flex-col group-hover:scale-105 transition-transform duration-500">
                         <span className="text-6xl mb-4 drop-shadow-lg">📑</span>
                         <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                      </div>
                    )}
                  </div>
                  <div className="p-10">
                    {catalog.version && (
                      <span className="inline-block px-4 py-1.5 bg-herba-green/10 text-herba-green text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                        {`${page.versionLabel} ${catalog.version}`}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-herba-dark mb-4">
                      {language === 'en' ? catalog.title_en : catalog.title_ar}
                    </h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                      {language === 'en' ? catalog.description_en : catalog.description_ar}
                    </p>
                    {catalog.file && (
                      <a
                        href={getAssetUrl(catalog.file || undefined)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 w-full px-6 py-4 bg-herba-green hover:bg-green-700 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-herba-green/20"
                      >
                        <FiDownload className="w-5 h-5" />
                        <span>{t.catalog.download}</span>
                      </a>
                    )}
                  </div>
                </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CatalogPage;
