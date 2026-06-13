import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiDownload, FiFileText, FiRefreshCw } from 'react-icons/fi';

interface Catalog {
  id: number | string;
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
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get('/catalogs');
      const data = response.data?.data || response.data || [];
      setCatalogs(Array.isArray(data) ? data.map((item: any) => item ? { ...item, id: item.id ?? item._id } : null).filter(Boolean) : []);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.catalog.title}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2916] pt-40 pb-28 lg:pt-56 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(214,167,87,0.2),transparent_32rem),radial-gradient(circle_at_20%_80%,rgba(45,106,79,0.3),transparent_28rem)]" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M0 0h1v1H0z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <span className="eyebrow mb-6 inline-flex">📑 {page.heroBadge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
            {t.catalog.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/60">
            {t.catalog.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* Catalog Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="glass-panel rounded-[1.75rem] overflow-hidden">
                  <div className="skeleton-block h-64 rounded-none" />
                  <div className="p-8 space-y-4">
                    <div className="skeleton-line h-6 w-3/4" />
                    <div className="skeleton-line h-4 w-full" />
                    <div className="skeleton-line h-4 w-1/2" />
                    <div className="skeleton-line h-12 w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center">
                <FiFileText className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <p className="text-xl font-black text-[#102116] mb-2">{t.common.error}</p>
              <p className="text-[#566359] mb-8 leading-relaxed">
                {language === 'en' ? 'Unable to load catalogs. Please try again.' : 'تعذر تحميل الكتالوجات. يرجى المحاولة مرة أخرى.'}
              </p>
              <button onClick={fetchCatalogs} className="btn-primary inline-flex">
                <FiRefreshCw className="w-4 h-4" />
                {language === 'en' ? 'Retry' : 'إعادة المحاولة'}
              </button>
            </div>
          ) : catalogs.length === 0 ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#102116]/5 flex items-center justify-center">
                <FiFileText className="w-7 h-7 text-[#566359]" />
              </div>
              <p className="text-xl font-black text-[#102116]">{t.common.noData}</p>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {catalogs.map((catalog) => (
                <StaggerItem key={catalog.id}>
                  <div className="glass-panel rounded-[1.75rem] overflow-hidden group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(16,33,22,0.18)]">
                    <div className="h-64 bg-[#e8ede6] flex items-center justify-center relative overflow-hidden">
                      {catalog.image ? (
                        <img
                          src={getAssetUrl(catalog.image)}
                          alt={language === 'en' ? catalog.title_en : catalog.title_ar}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(214,167,87,0.2),transparent_14rem),linear-gradient(145deg,#dce4d4,#c4d0bc)] flex items-center justify-center">
                          <FiFileText className="w-16 h-16 text-[#102116]/30" />
                        </div>
                      )}
                      {/* Download overlay */}
                      {catalog.file && (
                        <a
                          href={getAssetUrl(catalog.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-gradient-to-t from-[#102116]/80 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        >
                          <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#d6a757] text-[#102116] text-sm font-black shadow-lg">
                            <FiDownload className="w-5 h-5" />
                            {t.catalog.download}
                          </span>
                        </a>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-3">
                        {catalog.version ? (
                          <span className="text-[11px] font-black text-[#2d6a4f] bg-[#2d6a4f]/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                            {`${page.versionLabel} ${catalog.version}`}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="text-[11px] font-bold text-[#566359] uppercase tracking-wider">PDF</span>
                      </div>
                      <h3 className="text-2xl font-black text-[#102116] mb-3">
                        {language === 'en' ? catalog.title_en : catalog.title_ar}
                      </h3>
                      <p className="text-[#566359] leading-relaxed mb-6">
                        {language === 'en' ? catalog.description_en : catalog.description_ar}
                      </p>
                      {catalog.file && (
                        <a
                          href={getAssetUrl(catalog.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-[#2d6a4f] hover:bg-[#0e2916] text-white font-black rounded-xl transition-all duration-300 shadow-lg shadow-[#2d6a4f]/25"
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