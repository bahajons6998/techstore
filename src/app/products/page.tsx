import { getProducts } from '@/lib/data';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Mahsulotlar</h1>
      <p className="text-gray-600 mb-8">Bizning barcha mahsulotlar katalogi</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
              <UniversalImage
                src={product.imageUrl || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2 h-14">{product.name}</h2>
              <p className="text-gray-600 mb-4 text-sm line-clamp-2 h-10">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat('uz-UZ').format(product.price)} so'm
                </span>
                <Link 
                  href={`/products/${product.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Batafsil
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}