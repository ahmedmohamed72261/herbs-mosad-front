import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { PageLoader } from '@/components/Loading';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiArrowLeft, FiCheckCircle, FiShield, FiTruck, FiMapPin, FiLayers, FiDroplet, FiAward, FiCloud, FiArchive, FiClock, FiSend } from 'react-icons/fi';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Product {
  id: number;
  name_en: string;
  name_ar: string;
  short_description_en: string;
  short_description_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  images: string[] | null;
  category: {
    id: number;
    name_en: string;
    name_ar: string;
  };
  price?: number | string;
  sku?: string;
  stock?: number;
  is_featured?: boolean;
  origin?: string;
  form?: string;
  color?: string;
  purity?: string;
  moisture?: string;
  packaging?: string;
  shelf_life?: string;
  certifications?: string[];
  export_availability?: string;
}

interface ProductDetailsProps {
  product: Product | null;
  suggestedProducts: Product[];
}

const specIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  origin: FiMapPin,
  form: FiLayers,
  color: FiDroplet,
  purity: FiAward,
  moisture: FiCloud,
  packaging: FiArchive,
  shelf_life: FiClock,
  export_availability: FiSend,
};

const ProductDetails = ({ product: initialProduct, suggestedProducts: initialSuggested }: ProductDetailsProps) => {
  const router = useRouter();
  const { language } = useAppStore();
  const t = translations[language];
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>(initialSuggested || []);
  const [loading, setLoading] = useState(!initialProduct);
  const [selectedImage, setSelectedImage] = useState<string | null>(initialProduct?.image || null);

  interface ProductSpec {
    label: string;
    key: string;
  }

  const specFields: ProductSpec[] = [
    { label: language === 'en' ? 'Origin' : 'بلد المنشأ', key: 'origin' },
    { label: language === 'en' ? 'Form' : 'الشكل', key: 'form' },
    { label: language === 'en' ? 'Color' : 'اللون', key: 'color' },
    { label: language === 'en' ? 'Purity' : 'النقاء', key: 'purity' },
    { label: language === 'en' ? 'Moisture' : 'الرطوبة', key: 'moisture' },
    { label: language === 'en' ? 'Packaging' : 'التغليف', key: 'packaging' },
    { label: language === 'en' ? 'Shelf Life' : 'مدة الصلاحية', key: 'shelf_life' },
    { label: language === 'en' ? 'Export Availability' : 'التوفر للتصدير', key: 'export_availability' },
  ];

  useEffect(() => {
    if (!initialProduct && id) {
      fetchProduct();
    }
  }, [id, language, initialProduct]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/products/${id}`);
      const prod = response.data?.data || response.data;
      setProduct(prod);
      setSelectedImage(prod.image);

      if (prod.category?.id) {
        fetchSuggestedProducts(prod.category.id, prod.id);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestedProducts = async (categoryId: number, excludeId: number) => {
    try {
      const response = await api.get('/products', { params: { category_id: categoryId } });
      const products = (response.data?.data || response.data || []).filter(
        (p: Product) => p.id !== excludeId
      );
      setSuggestedProducts(products.slice(0, 3));
    } catch (error) {
      setSuggestedProducts([]);
    }
  };

  if (loading) {
    return (
      <Layout title={t.products.title}>
        <div className="min-h-screen flex items-center justify-center">
          <PageLoader />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title={t.products.title}>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <span className="text-6xl mb-4 opacity-50">😔</span>
          <p className="text-xl font-bold text-gray-500 mb-6">{t.common.noData}</p>
          <button
            onClick={() => router.push('/products')}
            className="flex items-center gap-2 px-6 py-3 bg-herba-green hover:bg-herba-dark text-white font-semibold rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
        </div>
      </Layout>
    );
  }

  const productName = language === 'en' ? product.name_en : product.name_ar;
  const productDesc = language === 'en' ? product.description_en : product.description_ar;
  const categoryName = language === 'en' ? product.category?.name_en : product.category?.name_ar;
  const price = Number(product.price);
  const hasPrice = price > 0;

  return (
    <Layout title={productName}>
      {/* Breadcrumb */}
      <div className="bg-herba-light/30 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 py-4 text-sm">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-herba-green transition-colors">
              {language === 'en' ? 'Home' : 'الرئيسية'}
            </button>
            <span className="text-gray-300">/</span>
            <button onClick={() => router.push('/products')} className="text-gray-500 hover:text-herba-green transition-colors">
              {language === 'en' ? 'Products' : 'المنتجات'}
            </button>
            <span className="text-gray-300">/</span>
            <span className="text-herba-dark font-semibold truncate max-w-[200px]">{productName}</span>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
            {/* Image Section */}
            <FadeIn className="lg:sticky lg:top-24 lg:self-start">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[4/3] flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none" />
                {selectedImage ? (
                  <img
                    src={getAssetUrl(selectedImage)}
                    alt={productName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-7xl mb-4 block">🌿</span>
                      <span className="text-lg opacity-60 text-green-800 font-medium">{productName}</span>
                    </div>
                  </div>
                )}
                {product.is_featured && (
                  <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 bg-amber-400/90 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                    <span>★</span>
                    <span>{language === 'en' ? 'Featured' : 'مميز'}</span>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setSelectedImage(product.image)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === product.image
                        ? 'border-herba-green ring-2 ring-herba-green/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {product.image ? (
                      <img
                        src={getAssetUrl(product.image)}
                        alt="Main"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl">🌿</div>
                    )}
                  </button>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === img
                          ? 'border-herba-green ring-2 ring-herba-green/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={getAssetUrl(img)}
                        alt={`Gallery ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <FiShield className="w-5 h-5 text-herba-green" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider text-center leading-tight">
                    {language === 'en' ? 'Premium Quality' : 'جودة عالية'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <FiCheckCircle className="w-5 h-5 text-herba-green" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider text-center leading-tight">
                    {language === 'en' ? 'Certified' : 'معتمد'}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <FiTruck className="w-5 h-5 text-herba-green" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider text-center leading-tight">
                    {language === 'en' ? 'Worldwide Ship' : 'شحن عالمي'}
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Details Section */}
            <FadeIn className="flex flex-col">
              {/* Category & Badge */}
              <div className="mb-4 flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-herba-green bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                  {categoryName}
                </span>
                {hasPrice && (
                  <span className="inline-flex items-center text-2xl font-black text-herba-dark">
                    ${price.toFixed(2)}
                    <span className="ml-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      / {language === 'en' ? 'kg' : 'كجم'}
                    </span>
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-4xl lg:text-5xl font-black text-herba-dark mb-4 leading-tight">
                {productName}
              </h1>

              {/* Short Description */}
              <p className="text-base text-gray-500 mb-8 leading-relaxed border-l-4 border-herba-green/30 pl-4 italic">
                &ldquo;{language === 'en' ? product.short_description_en : product.short_description_ar}&rdquo;
              </p>

              {/* Full Description */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-herba-dark mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-herba-green" />
                  {language === 'en' ? 'About this product' : 'عن هذا المنتج'}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {productDesc}
                </p>
              </div>

              {/* Product Specifications */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-herba-dark mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-herba-green" />
                  {language === 'en' ? 'Specifications' : 'المواصفات'}
                </h3>
                <div className="rounded-2xl border border-gray-200 divide-y divide-gray-100">
                  {specFields.map((field) => {
                    const value = (product as any)[field.key];
                    if (!value || (Array.isArray(value) && value.length === 0)) return null;
                    return (
                      <div key={field.key} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded-md bg-herba-green/10">
                            {(() => {
                              const Icon = specIcons[field.key];
                              return Icon ? <Icon className="w-3.5 h-3.5 text-herba-green" /> : null;
                            })()}
                          </span>
                          {field.label}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 text-right">
                          {value}
                        </span>
                      </div>
                    );
                  })}
                  {product.certifications && product.certifications.length > 0 && (
                    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-md bg-herba-green/10">
                          <FiCheckCircle className="w-3.5 h-3.5 text-herba-green" />
                        </span>
                        {language === 'en' ? 'Certifications' : 'الشهادات'}
                      </span>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {product.certifications.map((cert: string, i: number) => (
                          <span key={i} className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={(() => {
                  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201102737769';
                  const msg = language === 'en'
                    ? `Hello! I'm interested in ${productName}.%0A%0AProduct Details:%0A- Category: ${categoryName}%0A${hasPrice ? `- Price: $${price.toFixed(2)}/kg%0A` : ''}${product.origin ? `- Origin: ${product.origin}%0A` : ''}${product.form ? `- Form: ${product.form}%0A` : ''}${product.certifications?.length ? `- Certifications: ${product.certifications.join(', ')}` : ''}%0A%0ACould you please provide more details and pricing?`
                    : `مرحباً، أنا مهتم بـ ${productName}.%0A%0Aتفاصيل المنتج:%0A- التصنيف: ${categoryName}%0A${hasPrice ? `- السعر: $${price.toFixed(2)}/كجم%0A` : ''}${product.origin ? `- بلد المنشأ: ${product.origin}%0A` : ''}${product.form ? `- الشكل: ${product.form}%0A` : ''}${product.certifications?.length ? `- الشهادات: ${product.certifications.join(', ')}` : ''}%0A%0Aهل يمكنكم تزويدي بمزيد من التفاصيل والأسعار؟`;
                  return `https://wa.me/${phone}?text=${msg}`;
                })()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 bg-gradient-to-r from-herba-green to-emerald-700 hover:from-herba-dark hover:to-herba-dark text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <FiTruck className="w-5 h-5" />
                <span>{language === 'en' ? 'Request a Quote' : 'طلب عرض سعر'}</span>
              </a>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <section className="py-20 bg-herba-light/30 border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="relative">
              <FadeIn>
                <div className="text-center mb-12">
                  <span className="text-xs font-bold text-herba-green uppercase tracking-[0.2em]">
                    {language === 'en' ? 'You might also like' : 'قد يعجبك أيضاً'}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-herba-dark mt-2">
                    {language === 'en' ? 'Related Products' : 'منتجات ذات صلة'}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
                    {language === 'en'
                      ? `Explore more products in the ${categoryName} category`
                      : `استكشف المزيد من المنتجات في فئة ${categoryName}`}
                  </p>
                </div>

                <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {suggestedProducts.map((prod) => (
                    <StaggerItem key={prod.id}>
                      <ProductCard
                        id={prod.id}
                        name={language === 'en' ? prod.name_en : prod.name_ar}
                        category={language === 'en' ? prod.category?.name_en : prod.category?.name_ar}
                        description={language === 'en' ? prod.short_description_en : prod.short_description_ar}
                        image={prod.image}
                        isFeatured={prod.is_featured}
                      />
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </FadeIn>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await api.get('/products?limit=1000');
    const products = response.data?.data || response.data || [];
    
    const paths = products.map((product: Product) => ({
      params: { id: product.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking', // ISR - generate on demand if not pre-built
    };
  } catch (error) {
    console.error('Error fetching products for static paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<ProductDetailsProps> = async ({ params }) => {
  try {
    const productId = params?.id;
    
    // Fetch main product
    const productResponse = await api.get(`/products/${productId}`);
    const product = productResponse.data?.data || productResponse.data;

    if (!product) {
      return { notFound: true };
    }

    // Fetch suggested products from same category
    let suggestedProducts: Product[] = [];
    if (product.category?.id) {
      try {
        const suggestedResponse = await api.get('/products', {
          params: { category_id: product.category.id },
        });
        const allSuggested = suggestedResponse.data?.data || suggestedResponse.data || [];
        suggestedProducts = allSuggested.filter((p: Product) => p.id !== product.id).slice(0, 3);
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      }
    }

    // Ensure price is a number
    if (product.price) {
      product.price = Number(product.price);
    }

    return {
      props: {
        product,
        suggestedProducts,
      },
      revalidate: 3600, // ISR - revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
      revalidate: 60, // Retry after 1 minute if error
    };
  }
};

export default ProductDetails;
