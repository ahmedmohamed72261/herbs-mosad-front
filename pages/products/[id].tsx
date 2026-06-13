import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { FadeIn, StaggerGrid, StaggerItem } from '@/components/Motion';
import { PageLoader } from '@/components/Loading';
import { useAppStore } from '@/store';
import { translations } from '@/lib/translations';
import api, { getAssetUrl } from '@/lib/api';
import { FiArrowLeft, FiTag, FiPackage } from 'react-icons/fi';
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
}

interface ProductDetailsProps {
  product: Product | null;
  suggestedProducts: Product[];
}

const ProductDetails = ({ product: initialProduct, suggestedProducts: initialSuggested }: ProductDetailsProps) => {
  const router = useRouter();
  const { language } = useAppStore();
  const t = translations[language];
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>(initialSuggested || []);
  const [loading, setLoading] = useState(!initialProduct);
  const [selectedImage, setSelectedImage] = useState<string | null>(initialProduct?.image || null);

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

  return (
    <Layout title={productName}>
      {/* Back Button */}
      <FadeIn className="py-6 border-b border-gray-200 bg-herba-light/30">
        <div className="container mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-herba-green hover:text-herba-dark font-semibold transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>{language === 'en' ? 'Back' : 'رجوع'}</span>
          </button>
        </div>
      </FadeIn>

      {/* Product Details Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Image Section */}
            <FadeIn className="flex flex-col">
              {/* Main Image */}
              <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-96 flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={getAssetUrl(selectedImage)}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-emerald-100 to-green-100 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-7xl mb-4 block">🌿</span>
                      <span className="text-lg opacity-60 text-green-800 font-medium">{productName}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedImage(product.image)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === product.image
                        ? 'border-herba-green'
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
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? 'border-herba-green'
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
            </FadeIn>

            {/* Details Section */}
            <FadeIn className="flex flex-col justify-center">
              {/* Category & Badge */}
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-herba-green bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
                  <FiTag className="w-4 h-4" />
                  {categoryName}
                </span>
                {product.is_featured && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-lg">
                    <span>★</span>
                    Featured
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-4xl lg:text-5xl font-bold text-herba-dark mb-4 leading-tight">
                {productName}
              </h1>

              {/* Short Description */}
              <p className="text-lg text-gray-600 mb-6 leading-relaxed opacity-90">
                {language === 'en' ? product.short_description_en : product.short_description_ar}
              </p>

              {/* Divider */}
              <div className="w-12 h-1 bg-herba-green rounded-full mb-6"></div>

              {/* Full Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-herba-dark mb-3">
                  {language === 'en' ? 'About this product' : 'عن هذا المنتج'}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {productDesc}
                </p>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                {product.sku && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">SKU</span>
                    <p className="text-lg font-bold text-gray-900">{product.sku}</p>
                  </div>
                )}
                {product.stock !== undefined && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Stock</span>
                    <p className="text-lg font-bold text-gray-900">{product.stock}</p>
                  </div>
                )}
                {product.price && (
                  <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Price</span>
                    <p className="text-lg font-bold text-herba-green">${Number(product.price).toFixed(2)}</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full py-4 px-6 bg-herba-green hover:bg-herba-dark text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <FiPackage className="w-5 h-5" />
                <span>{language === 'en' ? 'Contact for Order' : 'تواصل للطلب'}</span>
              </button>
            </FadeIn>
          </div>

          {/* Suggested Products Section */}
          {suggestedProducts.length > 0 && (
            <div className="pt-12 border-t border-gray-200">
              <FadeIn className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-herba-dark">
                    {language === 'en' ? 'Related Products' : 'منتجات ذات صلة'}
                  </h2>
                  <div className="flex-1 h-1 bg-gradient-to-r from-herba-green to-transparent rounded-full"></div>
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
          )}
        </div>
      </section>
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
