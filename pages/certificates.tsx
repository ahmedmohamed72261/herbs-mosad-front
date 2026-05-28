import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';

interface Certificate {
  id: number;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates');
      setCertificates(response.data || []);
    } catch (error) {
      setCertificates([
        {
          id: 1,
          title_en: 'ISO 9001',
          title_ar: 'آيزو 9001',
          description_en: 'Quality Management Certification',
          description_ar: 'شهادة إدارة الجودة',
          image: null,
          issuer: 'International Organization for Standardization',
          issued_date: '2023-01-01'
        },
        {
          id: 2,
          title_en: 'Organic Certification',
          title_ar: 'شهادة عضوية',
          description_en: 'Certified Organic Products',
          description_ar: 'منتجات عضوية معتمدة',
          image: null,
          issuer: 'Organic Certifiers',
          issued_date: '2023-06-01'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.certificates.title}>
      {/* Hero Section */}
      <section className="bg-herba-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2d6a4f 0%, transparent 50%)' }}></div>
        <FadeIn className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-green-300 font-medium border border-white/10">
            <span>🌿</span>
            <span>{page.heroBadge}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {t.certificates.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.certificates.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="py-20 lg:py-32 bg-herba-light">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="skeleton-card p-8">
                  <div className="skeleton-block h-64 rounded-2xl mb-6" />
                  <div className="skeleton-line h-8 mb-4 w-3/4" />
                  <div className="skeleton-line h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((cert) => (
                <StaggerItem key={cert.id}>
                  <div
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-transparent group"
                  >
                  <div className="h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {cert.image ? (
                      <img
                        src={getAssetUrl(cert.image)}
                        alt={language === 'en' ? cert.title_en : cert.title_ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a3d28] to-[#0a1d0f] flex items-center justify-center text-white flex-col group-hover:scale-105 transition-transform duration-500">
                         <span className="text-6xl mb-4 drop-shadow-lg">🏆</span>
                         <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                      </div>
                    )}
                  </div>
                  <div className="p-10">
                    <h3 className="text-3xl font-bold text-herba-dark mb-3">
                      {language === 'en' ? cert.title_en : cert.title_ar}
                    </h3>
                    {cert.issuer && (
                      <p className="inline-block px-4 py-1.5 bg-herba-yellow/10 text-herba-dark font-bold text-sm rounded-full mb-4">
                        {cert.issuer}
                      </p>
                    )}
                    <p className="text-gray-500 leading-relaxed">
                      {language === 'en' ? cert.description_en : cert.description_ar}
                    </p>
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

export default Certificates;
