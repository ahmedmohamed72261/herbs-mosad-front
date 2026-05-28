import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

interface TeamMember {
  id: number;
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  bio_en: string;
  bio_ar: string;
  image: string | null;
  linkedin: string | null;
  email: string | null;
  phone: string | null;
}

const Team = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.teamPage;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await api.get('/team-members');
      setTeamMembers(response.data || []);
    } catch (error) {
      setTeamMembers([
        {
          id: 1,
          name_en: 'John Smith',
          name_ar: 'جون سميث',
          position_en: 'CEO & Founder',
          position_ar: 'الرئيس التنفيذي والمؤسس',
          bio_en: 'With over 20 years of experience in the herbs and spices industry.',
          bio_ar: 'مع أكثر من 20 عاماً من الخبرة في صناعة الأعشاب والبهارات.',
          image: null,
          linkedin: 'https://linkedin.com/in/johnsmith',
          email: 'john@herbs.com',
          phone: null
        },
        {
          id: 2,
          name_en: 'Sarah Johnson',
          name_ar: 'سارة جونسون',
          position_en: 'Operations Director',
          position_ar: 'مديرة العمليات',
          bio_en: 'Expert in supply chain and international logistics.',
          bio_ar: 'خبيرة في سلسلة التوريد والخدمات اللوجستية الدولية.',
          image: null,
          linkedin: 'https://linkedin.com/in/sarahjohnson',
          email: 'sarah@herbs.com',
          phone: null
        },
        {
          id: 3,
          name_en: 'Ahmed Hassan',
          name_ar: 'أحمد حسن',
          position_en: 'Quality Manager',
          position_ar: 'مدير الجودة',
          bio_en: 'Ensuring the highest quality standards for all our products.',
          bio_ar: 'ضمان أعلى معايير الجودة لجميع منتجاتنا.',
          image: null,
          linkedin: 'https://linkedin.com/in/ahmedhassan',
          email: 'ahmed@herbs.com',
          phone: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.team.title}>
      {/* Hero Section */}
      <section className="bg-herba-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2d6a4f 0%, transparent 50%)' }}></div>
        <FadeIn className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-green-300 font-medium border border-white/10">
            <span>🌿</span>
            <span>{page.heroBadge}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {t.team.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.team.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="py-20 lg:py-32 bg-herba-light">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card p-8">
                  <div className="skeleton-block w-40 h-40 rounded-[2rem] mx-auto mb-6" />
                  <div className="skeleton-line h-6 mb-3 mx-auto w-3/4" />
                  <div className="skeleton-line h-4 mb-6 mx-auto w-1/2" />
                  <div className="skeleton-block h-16 rounded-2xl mb-4" />
                </div>
              ))}
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="bg-white rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-transparent text-center group">
                  <div className="w-40 h-40 bg-gray-100 rounded-[2rem] mx-auto mb-8 flex items-center justify-center overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-inner relative">
                    {member.image ? (
                      <img
                        src={getAssetUrl(member.image)}
                        alt={language === 'en' ? member.name_en : member.name_ar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3d28] to-[#0a1d0f] flex items-center justify-center text-white flex-col">
                        <span className="text-5xl mb-2 drop-shadow-lg opacity-80">👤</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-herba-dark mb-2">
                    {language === 'en' ? member.name_en : member.name_ar}
                  </h3>
                  <p className="inline-block px-4 py-1.5 bg-herba-green/10 text-herba-green font-bold text-sm rounded-full mb-6">
                    {language === 'en' ? member.position_en : member.position_ar}
                  </p>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    {language === 'en' ? member.bio_en : member.bio_ar}
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-12 h-12 rounded-full bg-herba-light flex items-center justify-center text-gray-500 hover:bg-herba-yellow hover:text-herba-dark transition-colors"
                      >
                        <FiMail className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-herba-light flex items-center justify-center text-gray-500 hover:bg-herba-yellow hover:text-herba-dark transition-colors"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="w-12 h-12 rounded-full bg-herba-light flex items-center justify-center text-gray-500 hover:bg-herba-yellow hover:text-herba-dark transition-colors"
                      >
                        <FiPhone className="w-5 h-5" />
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

export default Team;
