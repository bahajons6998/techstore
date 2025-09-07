import { getProductById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { UniversalImage } from '@/components/ui';
import ProductActions from '@/components/products/ProductActions';

interface ProductPageProps {
    params: {
        id: string;
    };
}

// Product tipini kengaytiramiz
interface ExtendedProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    stock?: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    } | null;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const productId = parseInt(id, 10);
    
    let product: ExtendedProduct | null = null;
    
    // Prisma orqali to'liq ma'lumotlarni olishga harakat qilamiz
    try {
        const productData = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    }
                }
            }
        });
        
        // Decimal tipini number tipiga o'zgartiramiz
        if (productData) {
            product = {
                ...productData,
                price: Number(productData.price)
            } as ExtendedProduct;
        }
    } catch (error) {
        // Agar Prisma bilan xatolik bo'lsa, fallback sifatida getProductById ishlatamiz
        product = await getProductById(productId);
    }

    if (!product) {
        notFound();
    }

    // Product actions komponentiga ko'chirildi

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            <Link
                href="/products"
                className="text-blue-600 hover:underline mb-6 inline-flex items-center gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Barcha mahsulotlarga qaytish
            </Link>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
                <div className="md:flex">
                    {/* Rasm qismi - chap tomonda */}
                    <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {product.imageUrl ? (
                                <UniversalImage
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ma'lumotlar qismi - o'ng tomonda */}
                    <div className="md:w-1/2 p-8">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Mavjud</span>
                            {product.category && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {product.category.name}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
                        
                        <div className="mb-6">
                            <p className="text-4xl font-bold text-blue-600 mb-1">
                                {product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm
                            </p>
                            <p className="text-sm text-gray-500">
                                {product.stock && product.stock > 0 ? `Omborda: ${product.stock} dona` : 'Omborda mavjud emas'}
                            </p>
                        </div>
                        
                        <div className="prose prose-blue max-w-none mb-8 text-gray-700">
                            <p>{product.description}</p>
                        </div>

                        <ProductActions product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}