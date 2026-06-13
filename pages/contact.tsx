import { useState } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';

const Contact = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.contactPage;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact-messages', formData);
      toast.success(t.common.success);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: FiMapPin, label: t.contact.address, value: page.addressText },
    { icon: FiPhone, label: t.contact.phoneNumber, value: '+123 456 7890' },
    { icon: FiMail, label: t.contact.emailAddress, value: 'info@herba.com' },
  ];

  return (
    <Layout title={t.contact.title}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2916] pt-40 pb-28 lg:pt-56 lg:pb-40">
        <img src="/images/breadcrumb.jpg" alt="Contact us" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(214,167,87,0.22),transparent_30rem),radial-gradient(circle_at_80%_80%,rgba(45,106,79,0.35),transparent_28rem)]" />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <span className="eyebrow mb-6 inline-flex">📬 {page.heroBadge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
            {t.contact.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/60">
            {t.contact.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <FadeIn className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="glass-panel rounded-[2rem] p-8 md:p-10">
              <h2 className="text-3xl font-black text-[#102116] mb-2">
                {t.contact.sendMessage}
              </h2>
              <p className="text-[#566359] mb-8">
                {language === 'en'
                  ? 'Fill out the form and our team will get back to you within 24 hours.'
                  : 'املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة.'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#102116] mb-2">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl border border-[#102116]/10 bg-white/60 text-[#102116] focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none transition-all placeholder:text-[#566359]/50"
                      placeholder={language === 'en' ? 'Your name' : 'اسمك'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#102116] mb-2">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 rounded-xl border border-[#102116]/10 bg-white/60 text-[#102116] focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none transition-all placeholder:text-[#566359]/50"
                      placeholder={language === 'en' ? 'your@email.com' : 'بريدك الإلكتروني'}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#102116] mb-2">
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl border border-[#102116]/10 bg-white/60 text-[#102116] focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none transition-all placeholder:text-[#566359]/50"
                      placeholder={language === 'en' ? '+1 234 567 890' : '+٢٠١٠٠٠٠٠٠٠٠'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#102116] mb-2">
                      {t.contact.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl border border-[#102116]/10 bg-white/60 text-[#102116] focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none transition-all placeholder:text-[#566359]/50"
                      placeholder={language === 'en' ? 'How can we help?' : 'كيف يمكننا مساعدتك؟'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#102116] mb-2">
                    {t.contact.message} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-3.5 rounded-xl border border-[#102116]/10 bg-white/60 text-[#102116] focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent outline-none transition-all resize-none placeholder:text-[#566359]/50"
                    placeholder={language === 'en' ? 'Tell us about your requirements...' : 'أخبرنا عن متطلباتك...'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-[#d6a757] hover:bg-[#e3bd72] text-[#102116] font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#d6a757]/25"
                >
                  <span>{loading ? t.common.loading : t.contact.sendMessage}</span>
                  {!loading && <FiSend className="w-5 h-5" />}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div className="glass-panel rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex-1">
                <div className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none">
                  <div className="w-full h-full rounded-full bg-[#d6a757] blur-3xl" />
                </div>
                <h2 className="text-2xl font-black text-[#102116] mb-8">
                  {t.contact.contactInfo}
                </h2>
                <div className="space-y-8 relative z-10">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-14 h-14 rounded-2xl bg-[#102116]/5 text-[#2d6a4f] flex items-center justify-center shrink-0 group-hover:bg-[#d6a757] group-hover:text-[#102116] transition-all duration-300">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="pt-1">
                        <h3 className="font-bold text-[#102116] mb-1 text-sm">
                          {item.label}
                        </h3>
                        <p className="text-[#566359] leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-[2rem] p-8 md:p-10">
                <h3 className="font-black text-[#102116] mb-4">
                  {language === 'en' ? 'Quality Commitment' : 'التزام الجودة'}
                </h3>
                <p className="text-[#566359] text-sm leading-relaxed mb-5">
                  {language === 'en'
                    ? 'Every inquiry is handled by our expert team. We respond to all messages within 24 hours during business days.'
                    : 'يتم التعامل مع كل استفسار من قبل فريق الخبراء لدينا. نرد على جميع الرسائل في غضون 24 ساعة خلال أيام العمل.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['ISO 22000', 'HACCP', 'Organic', 'FSMA'].map((badge) => (
                    <span key={badge} className="inline-flex items-center gap-1 text-xs font-bold text-[#2d6a4f] bg-[#2d6a4f]/10 px-3 py-1.5 rounded-full">
                      <FiCheckCircle className="w-3 h-3" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="h-56 rounded-[2rem] overflow-hidden relative border border-[#102116]/8">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }} />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="glass-panel px-5 py-2.5 rounded-full font-bold text-[#102116] shadow-xl flex items-center gap-2">
                    <FiMapPin className="text-[#2d6a4f]" />
                    <span className="text-sm">{page.locationLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
};

export default Contact;