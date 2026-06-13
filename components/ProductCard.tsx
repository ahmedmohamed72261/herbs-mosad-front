import { FC } from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getAssetUrl } from '@/lib/api';

interface ProductCardProps {
  id: number | string;
  name: string;
  category: string;
  description: string;
  image: string | null;
  isFeatured?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  category,
  description,
  image,
  isFeatured = false,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <article className="group relative h-full cursor-pointer">
        <div className="glass-panel h-full rounded-[1.75rem] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(16,33,22,0.18)] flex flex-col">
          {/* Image Section */}
          <div className="relative overflow-hidden h-56 flex items-center justify-center bg-[#e8ede6]">
            {isFeatured && (
              <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 bg-[#d6a757] text-[#102116] px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg">
                <span>★</span>
                <span>Featured</span>
              </div>
            )}

            {image ? (
              <img
                src={getAssetUrl(image)}
                alt={name}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(circle_at_40%_30%,rgba(214,167,87,0.25),transparent_12rem),linear-gradient(145deg,#dce4d4,#c4d0bc)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2 transition-transform duration-500 group-hover:scale-125">🌿</div>
                  <span className="text-xs font-bold text-[#102116]/40 uppercase tracking-wider">{name}</span>
                </div>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#102116]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="inline-flex items-center gap-2 text-sm font-black text-white">
                View details <FiArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <span className="inline-block text-[11px] font-black text-[#2d6a4f] bg-[#2d6a4f]/10 px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
                {category}
              </span>
              <h3 className="text-lg font-black text-[#102116] leading-snug line-clamp-2 group-hover:text-[#2d6a4f] transition-colors duration-300">
                {name}
              </h3>
              <p className="text-sm text-[#566359] leading-relaxed mt-2 line-clamp-2 flex-grow">
                {description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#102116]/8">
              <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider">Learn more</span>
              <div className="w-8 h-8 rounded-full bg-[#2d6a4f]/10 group-hover:bg-[#2d6a4f] text-[#2d6a4f] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1.5">
                <FiArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;