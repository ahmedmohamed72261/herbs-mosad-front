import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { PageLoader } from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api from '@/lib/api';
import { FiPackage, FiRefreshCw } from 'react-icons/fi';

interface Product {
  id: number | string;
  name_en: string;
  name_ar: string;
  short_description_en: string;
  short_description_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  category: {
    id: number | string;
    name_en: string;
    name_ar: string;
  };
}

interface Category {
  id: number | string;
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
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  const normalizeItem = (item: any) => item ? { ...item, id: item.id ?? item._id } : null;

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      const data = response.data?.data || response.data || [];
      setCategories(Array.isArray(data) ? data.map(normalizeItem).filter(Boolean) : []);
    } catch (error) {
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const params = selectedCategory ? { category_id: selectedCategory } : {};
      const response = await api.get('/products', { params });
      const data = response.data?.data || response.data || [];
      setProducts(Array.isArray(data) ? data.map(normalizeItem).filter(Boolean) : []);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={t.products.title}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0e2916] pt-40 pb-28 lg:pt-56 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(214,167,87,0.18),transparent_30rem),radial-gradient(circle_at_80%_70%,rgba(45,106,79,0.35),transparent_28rem)]" />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <FadeIn className="container mx-auto px-6 relative z-10 text-center">
          <span className="eyebrow mb-6 inline-flex">🌿 {page.heroBadge}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight">
            {t.products.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/60">
            {page.heroDescription}
          </p>
        </FadeIn>
      </section>

      {/* Products Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-sm font-black text-[#566359] uppercase tracking-widest">
                {t.products.filterByCategory}
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                    !selectedCategory
                      ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/25'
                      : 'bg-[#102116]/5 text-[#566359] hover:bg-[#102116]/10'
                  }`}
                >
                  {t.products.allCategories}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id.toString())}
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                      selectedCategory === category.id.toString()
                        ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/25'
                        : 'bg-[#102116]/5 text-[#566359] hover:bg-[#102116]/10'
                    }`}
                  >
                    {language === 'en' ? category.name_en : category.name_ar}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-panel rounded-[1.75rem] overflow-hidden">
                  <div className="skeleton-block h-56 rounded-none" />
                  <div className="p-6 space-y-4">
                    <div className="skeleton-line h-3 w-1/3" />
                    <div className="skeleton-line h-5 w-3/4" />
                    <div className="skeleton-line h-3 w-full" />
                    <div className="skeleton-line h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center">
                <FiPackage className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <p className="text-xl font-black text-[#102116] mb-2">{t.common.error}</p>
              <p className="text-[#566359] mb-8 leading-relaxed">
                {language === 'en' ? 'Unable to load products. Please try again.' : 'تعذر تحميل المنتجات. يرجى المحاولة مرة أخرى.'}
              </p>
              <button onClick={fetchProducts} className="btn-primary inline-flex">
                <FiRefreshCw className="w-4 h-4" />
                {language === 'en' ? 'Retry' : 'إعادة المحاولة'}
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel rounded-[2rem] max-w-lg mx-auto text-center p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#102116]/5 flex items-center justify-center">
                <FiPackage className="w-7 h-7 text-[#566359]" />
              </div>
              <p className="text-xl font-black text-[#102116]">{t.common.noData}</p>
            </div>
          ) : (
            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard
                    id={product.id}
                    name={language === 'en' ? product.name_en : product.name_ar}
                    category={language === 'en' ? product.category.name_en : product.category.name_ar}
                    description={language === 'en' ? product.short_description_en : product.short_description_ar}
                    image={product.image}
                  />
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;