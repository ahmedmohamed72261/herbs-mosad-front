import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiLinkedin, FiMail, FiRefreshCw, FiUsers } from 'react-icons/fi';

interface TeamMember {
  id: number | string;
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
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await api.get('/team-members');
      const data = response.data?.data || response.data || [];
      setTeamMembers(Array.isArray(data) ? data.map((item: any) => item ? { ...item, id: item.id ?? item._id } : null).filter(Boolean) : []);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.team.title}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2916] pt-40 pb-28 lg:pt-56 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,167,87,0.15),transparent_32rem),radial-gradient(circle_at_70%_80%,rgba(45,106,79,0.3),transparent_28rem)]" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.3\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <span className="eyebrow mb-6 inline-flex">👥 {page.heroBadge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
            {t.team.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/60">
            {t.team.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* Team Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-panel rounded-[1.75rem] overflow-hidden p-8">
                  <div className="skeleton-block w-36 h-36 rounded-full mx-auto mb-6" />
                  <div className="skeleton-line h-6 w-2/3 mx-auto mb-3" />
                  <div className="skeleton-line h-4 w-1/2 mx-auto mb-6" />
                  <div className="skeleton-line h-4 w-full mb-2" />
                  <div className="skeleton-line h-4 w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center">
                <FiUsers className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <p className="text-xl font-black text-[#102116] mb-2">{t.common.error}</p>
              <p className="text-[#566359] mb-8 leading-relaxed">
                {language === 'en' ? 'Unable to load team members. Please try again.' : 'تعذر تحميل أعضاء الفريق. يرجى المحاولة مرة أخرى.'}
              </p>
              <button onClick={fetchTeamMembers} className="btn-primary inline-flex">
                <FiRefreshCw className="w-4 h-4" />
                {language === 'en' ? 'Retry' : 'إعادة المحاولة'}
              </button>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#102116]/5 flex items-center justify-center">
                <FiUsers className="w-7 h-7 text-[#566359]" />
              </div>
              <p className="text-xl font-black text-[#102116]">{t.common.noData}</p>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="glass-panel rounded-[1.75rem] p-8 text-center group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(16,33,22,0.18)]">
                    {/* Avatar */}
                    <div className="relative w-36 h-36 mx-auto mb-6">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#e8ede6] ring-4 ring-[#d6a757]/20 group-hover:ring-[#d6a757]/40 transition-all duration-500">
                        {member.image ? (
                          <img
                            src={getAssetUrl(member.image)}
                            alt={language === 'en' ? member.name_en : member.name_ar}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(214,167,87,0.15),transparent_10rem),linear-gradient(145deg,#dce4d4,#c4d0bc)] flex items-center justify-center">
                            <span className="text-5xl opacity-60">👤</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-black text-[#102116] mb-2">
                      {language === 'en' ? member.name_en : member.name_ar}
                    </h3>

                    {/* Position */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#2d6a4f] bg-[#2d6a4f]/10 px-4 py-2 rounded-full uppercase tracking-widest mb-5">
                      {language === 'en' ? member.position_en : member.position_ar}
                    </span>

                    {/* Bio */}
                    <p className="text-[#566359] leading-relaxed mb-7 min-h-[48px]">
                      {language === 'en' ? member.bio_en : member.bio_ar}
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-3 pt-5 border-t border-[#102116]/8">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="w-11 h-11 rounded-full bg-[#102116]/5 hover:bg-[#d6a757] text-[#566359] hover:text-[#102116] flex items-center justify-center transition-all duration-300 group/btn"
                        >
                          <FiMail className="w-5 h-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-[#102116]/5 hover:bg-[#d6a757] text-[#566359] hover:text-[#102116] flex items-center justify-center transition-all duration-300 group/btn"
                        >
                          <FiLinkedin className="w-5 h-5" />
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