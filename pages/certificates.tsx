import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem, motion, AnimatePresence } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiAward, FiRefreshCw, FiX, FiExternalLink, FiCalendar } from 'react-icons/fi';

interface Certificate {
  id: number | string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  issuer: string | null;
  issued_date: string | null;
}

const Certificates = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.certificatesPage;
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get('/certificates');
      const data = response.data?.data || response.data || [];
      setCertificates(Array.isArray(data) ? data.map((item: any) => item ? { ...item, id: item.id ?? item._id } : null).filter(Boolean) : []);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch { return dateStr; }
  };

  return (
    <Layout title={t.certificates.title}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2916] pt-40 pb-28 lg:pt-56 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(214,167,87,0.22),transparent_30rem),radial-gradient(circle_at_30%_70%,rgba(45,106,79,0.35),transparent_28rem)]" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.25\'%3E%3Cpath d=\'M50 50c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <span className="eyebrow mb-6 inline-flex">🏆 {page.heroBadge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
            {t.certificates.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/60">
            {t.certificates.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* Certificates Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="glass-panel rounded-[1.75rem] overflow-hidden">
                  <div className="skeleton-block h-64 rounded-none" />
                  <div className="p-8 space-y-4">
                    <div className="skeleton-line h-7 w-2/3" />
                    <div className="skeleton-line h-4 w-1/3" />
                    <div className="skeleton-line h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center">
                <FiAward className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <p className="text-xl font-black text-[#102116] mb-2">{t.common.error}</p>
              <p className="text-[#566359] mb-8 leading-relaxed">
                {language === 'en' ? 'Unable to load certificates. Please try again.' : 'تعذر تحميل الشهادات. يرجى المحاولة مرة أخرى.'}
              </p>
              <button onClick={fetchCertificates} className="btn-primary inline-flex">
                <FiRefreshCw className="w-4 h-4" />
                {language === 'en' ? 'Retry' : 'إعادة المحاولة'}
              </button>
            </div>
          ) : certificates.length === 0 ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#102116]/5 flex items-center justify-center">
                <FiAward className="w-7 h-7 text-[#566359]" />
              </div>
              <p className="text-xl font-black text-[#102116]">{t.common.noData}</p>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert) => (
                <StaggerItem key={cert.id}>
                  <button
                    onClick={() => setSelected(cert)}
                    className="w-full text-left group"
                  >
                    <div className="glass-panel rounded-[1.75rem] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(16,33,22,0.18)]">
                      <div className="h-64 bg-[#e8ede6] flex items-center justify-center relative overflow-hidden">
                        {cert.image ? (
                          <img
                            src={getAssetUrl(cert.image)}
                            alt={language === 'en' ? cert.title_en : cert.title_ar}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(214,167,87,0.18),transparent_14rem),linear-gradient(145deg,#dce4d4,#c4d0bc)] flex items-center justify-center">
                            <div className="text-center">
                              <FiAward className="w-20 h-20 text-[#d6a757]/60 mx-auto mb-2" />
                              <span className="text-sm font-bold text-[#102116]/40 uppercase tracking-wider">
                                {language === 'en' ? cert.title_en : cert.title_ar}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#d6a757] to-transparent opacity-60" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                          <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-[#102116] text-sm font-black shadow-xl">
                            <FiExternalLink className="w-4 h-4" />
                            {language === 'en' ? 'View Certificate' : 'عرض الشهادة'}
                          </span>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-2xl font-black text-[#102116]">
                            {language === 'en' ? cert.title_en : cert.title_ar}
                          </h3>
                          <FiAward className="w-7 h-7 text-[#d6a757] shrink-0" />
                        </div>
                        {cert.issuer && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#d6a757] bg-[#d6a757]/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-4">
                            <FiAward className="w-3.5 h-3.5" />
                            {cert.issuer}
                          </span>
                        )}
                        <p className="text-[#566359] leading-relaxed mt-4 line-clamp-2">
                          {language === 'en' ? cert.description_en : cert.description_ar}
                        </p>
                      </div>
                    </div>
                  </button>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </section>

      {/* Certificate Preview Dialog */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-[#102116] flex items-center justify-center hover:bg-white transition-all shadow-lg"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-[1fr_1.2fr]">
                {/* Image Side */}
                <div className="relative min-h-[280px] md:min-h-full bg-[#e8ede6] overflow-hidden">
                  {selected.image ? (
                    <img
                      src={getAssetUrl(selected.image)}
                      alt={language === 'en' ? selected.title_en : selected.title_ar}
                      className="w-full h-full absolute inset-0 object-cover"
                    />
                  ) : (
                    <div className="w-full h-full absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(214,167,87,0.25),transparent_16rem),linear-gradient(145deg,#dce4d4,#c4d0bc)] flex items-center justify-center">
                      <FiAward className="w-24 h-24 text-[#d6a757]/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-black/30 md:via-transparent md:to-transparent" />
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-black text-[#102116] leading-tight mb-4">
                      {language === 'en' ? selected.title_en : selected.title_ar}
                    </h2>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {selected.issuer && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#2d6a4f] bg-[#2d6a4f]/10 px-3.5 py-2 rounded-full uppercase tracking-widest">
                          <FiAward className="w-3.5 h-3.5" />
                          {selected.issuer}
                        </span>
                      )}
                      {selected.issued_date && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#566359] bg-[#102116]/5 px-3.5 py-2 rounded-full">
                          <FiCalendar className="w-3.5 h-3.5" />
                          {formatDate(selected.issued_date)}
                        </span>
                      )}
                    </div>

                    <div className="prose max-w-none">
                      <p className="text-[#566359] leading-relaxed text-base md:text-lg">
                        {language === 'en' ? selected.description_en : selected.description_ar}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#102116]/8 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#566359] uppercase tracking-wider">
                      {language === 'en' ? 'Quality Certified' : 'شهادة جودة'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#d6a757]">
                      <FiAward className="w-4 h-4" />
                      ORGANIC HERBS CO
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Certificates;