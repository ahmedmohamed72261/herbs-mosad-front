import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { PageLoader } from '@/components/Loading';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';

interface Product {
  id: number;
  name_en: string;
  name_ar: string;
  short_description_en: string;
  short_description_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  category: {
    id: number;
    name_en: string;
    name_ar: string;
  };
}

interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  slug: string;
}

const Products = () => {
  const { language } = useAppStore();
  const t = translations[language];
  const page = t.productsPage;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data || []);
    } catch (error) {
      setCategories([
        { id: 1, name_en: 'Herbs', name_ar: 'أعشاب', slug: 'herbs' },
        { id: 2, name_en: 'Spices', name_ar: 'بهارات', slug: 'spices' },
        { id: 3, name_en: 'Seeds', name_ar: 'بذور', slug: 'seeds' }
      ]);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = selectedCategory ? { category_id: selectedCategory } : {};
      const response = await api.get('/products', { params });
      setProducts(response.data.data || []);
    } catch (error) {
      setProducts([
        {
          id: 1,
          name_en: 'Dried Mint',
          name_ar: 'نعناع مجفف',
          short_description_en: 'Premium dried mint',
          short_description_ar: 'نعناع مجفف ممتاز',
          description_en: 'High quality dried mint leaves',
          description_ar: 'أوراق نعناع مجففة عالية الجودة',
          image: null,
          category: { id: 1, name_en: 'Herbs', name_ar: 'أعشاب' }
        },
        {
          id: 2,
          name_en: 'Cinnamon',
          name_ar: 'قرفة',
          short_description_en: 'Fresh cinnamon',
          short_description_ar: 'قرفة طازجة',
          description_en: 'Organic cinnamon sticks',
          description_ar: 'أعواد قرفة عضوية',
          image: null,
          category: { id: 2, name_en: 'Spices', name_ar: 'بهارات' }
        },
        {
          id: 3,
          name_en: 'Black Seeds',
          name_ar: 'حبة البركة',
          short_description_en: 'Natural black seeds',
          short_description_ar: 'حبة بركة طبيعية',
          description_en: 'Premium black seeds',
          description_ar: 'حبة بركة ممتازة',
          image: null,
          category: { id: 3, name_en: 'Seeds', name_ar: 'بذور' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.products.title}>
      {/* Hero Section */}
      <section className="bg-herba-dark pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #2d6a4f 0%, transparent 50%)' }}></div>
        <FadeIn className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-green-300 font-medium border border-white/10">
            <span>🌿</span>
            <span>{page.heroBadge}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            {t.products.title}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {page.heroDescription}
          </p>
        </FadeIn>
      </section>

      <section className="py-20 bg-herba-light">
        <FadeIn className="container mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-xl font-bold text-herba-dark">
              {t.products.filterByCategory}
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                  !selectedCategory
                    ? 'bg-herba-green text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {t.products.allCategories}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id.toString())}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                    selectedCategory === category.id.toString()
                      ? 'bg-herba-green text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {language === 'en' ? category.name_en : category.name_ar}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

          {loading ? (
            <PageLoader className="min-h-[400px]" />
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <span className="text-6xl mb-4 block opacity-50">🌿</span>
              <p className="text-xl font-bold text-gray-500">{t.common.noData}</p>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <div className="bg-white rounded-3xl p-6 text-left group hover:shadow-xl transition-all border border-gray-100 hover:border-transparent relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-herba-dark text-xl">{language === 'en' ? product.name_en : product.name_ar}</h3>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">{language === 'en' ? product.category.name_en : product.category.name_ar}</span>
                      </div>
                    </div>
                    <div className="h-64 bg-gray-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                      {product.image ? (
                        <img
                          src={getAssetUrl(product.image)}
                          alt={language === 'en' ? product.name_en : product.name_ar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a3d28] to-[#0a1d0f] flex items-center justify-center text-white flex-col">
                          <span className="text-4xl mb-2">🌿</span>
                          <span className="text-sm opacity-50 text-center px-4">{language === 'en' ? product.name_en : product.name_ar}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {language === 'en' ? product.short_description_en : product.short_description_ar}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-bold text-herba-dark bg-herba-light border border-gray-100 px-3 py-1.5 rounded-full">
                        {page.tags[0]}
                      </span>
                      <span className="text-xs font-bold text-herba-dark bg-herba-light border border-gray-100 px-3 py-1.5 rounded-full">
                        {page.tags[1]}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
      </section>
    </Layout>
  );
};

export default Products;
