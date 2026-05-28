import { useState } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

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
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error(t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout title={t.contact.title}>
      {/* Hero Section */}
      <section className="bg-herba-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2d6a4f 0%, transparent 50%)' }}></div>
        <FadeIn className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className={`inline-flex items-center space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''} bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-green-300 font-medium border border-white/10`}>
            <span>🌿</span>
            <span>{page.heroBadge}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {t.contact.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </FadeIn>
      </section>

      <section className="py-20 lg:py-32 bg-herba-light dark:bg-gray-900">
        <FadeIn className="container mx-auto px-6">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 ${language === 'ar' ? 'lg:flex-row-reverse' : ''}`}>
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-10 lg:p-12 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-herba-dark dark:text-white mb-8">
                {t.contact.sendMessage}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-herba-green focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-herba-green focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                      {t.contact.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-herba-green focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                      {t.contact.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-herba-green focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                    {t.contact.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-herba-green focus:border-transparent outline-none resize-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-8 py-5 bg-herba-yellow text-herba-dark font-bold rounded-2xl hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''} disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 shadow-lg shadow-herba-yellow/20`}
                >
                  <span>{loading ? t.common.loading : t.contact.sendMessage}</span>
                  {!loading && <FiSend className="w-5 h-5" />}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <StaggerGrid className="flex flex-col gap-8">
              <StaggerItem>
                <div className="bg-herba-dark dark:bg-gray-800 text-white p-10 lg:p-12 rounded-[3rem] shadow-xl relative overflow-hidden flex-1">
                  <div className="absolute right-0 top-0 w-64 h-64 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #2d6a4f 0%, transparent 70%)' }}></div>
                  <h2 className="text-3xl font-bold mb-8 relative z-10">
                    {t.contact.contactInfo}
                  </h2>
                  <div className="space-y-8 relative z-10">
                    <div className={`flex items-start space-x-5 ${language === 'ar' ? 'space-x-reverse' : ''} group`}>
                      <div className="w-14 h-14 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-herba-yellow group-hover:text-herba-dark transition-colors flex-shrink-0">
                        <FiMapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">
                          {t.contact.address}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {page.addressText}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-start space-x-5 ${language === 'ar' ? 'space-x-reverse' : ''} group`}>
                      <div className="w-14 h-14 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-herba-yellow group-hover:text-herba-dark transition-colors flex-shrink-0">
                        <FiPhone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">
                          {t.contact.phoneNumber}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          +123 456 7890
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-start space-x-5 ${language === 'ar' ? 'space-x-reverse' : ''} group`}>
                      <div className="w-14 h-14 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-herba-yellow group-hover:text-herba-dark transition-colors flex-shrink-0">
                        <FiMail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">
                          {t.contact.emailAddress}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          info@herba.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-[-20px] bottom-[-20px] text-8xl opacity-20">🌿</div>
                </div>
              </StaggerItem>

              {/* Map Placeholder */}
              <StaggerItem>
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-[3rem] overflow-hidden shadow-inner relative border border-gray-100 dark:border-gray-600">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')" }}></div>
                  <div className="absolute inset-0 bg-herba-dark/20 flex items-center justify-center">
                    <div className={`bg-white px-6 py-3 rounded-full font-bold text-herba-dark shadow-xl flex items-center space-x-2 ${language === 'ar' ? 'space-x-reverse' : ''}`}>
                      <FiMapPin className="text-herba-green" />
                      <span>{page.locationLabel}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
};

export default Contact;
