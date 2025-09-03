'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number | null;
}

export default function EditProductForm({ params }: { params: { id: string } }) {
    // params obyektini to'liq ishlating
    const resolvedParams = use(params as unknown as Promise<{ id: string }>);
    const [product, setProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const productId = resolvedParams.id;


    async function fetchData() {
        try {
            // Kategoriyalarni yuklash
            const categoriesResponse = await fetch('/api/categories');
            const categoriesData = await categoriesResponse.json();

            // Mahsulot ma'lumotlarini yuklash
            const productResponse = await fetch(`/api/products/${productId}`);
            
            if (!productResponse.ok) {
                throw new Error('Mahsulot ma\'lumotlarini olishda xatolik');
            }
            
            const productData = await productResponse.json();
            
            setProduct(productData);
            
            if (categoriesData.categories) {
                setCategories(categoriesData.categories);
            } else if (Array.isArray(categoriesData)) {
                setCategories(categoriesData);
            }
            
            console.log('Mahsulot ma\'lumotlari:', productData);
            console.log('Categories:', categoriesData);

        } catch (err) {
            console.error('Ma\'lumotlarni yuklashda xatolik:', err);
            setError('Ma\'lumotlarni yuklashda xatolik yuz berdi');
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        // ProductId o'zgargan vaqtda ishga tushsin
        fetchData();
    }, [productId]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError('');

        try {
            const productData = {
                name: formData.get('name'),
                description: formData.get('description'),
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                categoryId: formData.get('categoryId') ? parseInt(formData.get('categoryId') as string) : null,
            };

            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Mahsulotni yangilashda xatolik yuz berdi');
            }

            router.push('/admin/products');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Mahsulotni yangilashda xatolik yuz berdi');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Yuklanmoqda...</div>;
    }

    if (error && !product) {
        return (
            <div className="bg-red-100 p-4 rounded-md text-red-700">
                {error}
            </div>
        );
    }

    if (!product) {
        return <div>Mahsulot topilmadi</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Mahsulotni tahrirlash</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <form action={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Mahsulot nomi *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                defaultValue={product.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                                Kategoriya
                            </label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                defaultValue={product.categoryId || ''}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Narxi *
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                min="0"
                                step="0.01"
                                required
                                defaultValue={product.price}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                Miqdori *
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                min="0"
                                required
                                defaultValue={product.stock}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Tavsif *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                required
                                defaultValue={product.description}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}