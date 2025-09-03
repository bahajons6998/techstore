'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    productId: number;
    productName: string;
}

export default function DeleteProductButton({ productId, productName }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Mahsulotni o\'chirishda xatolik yuz berdi');
            }

            // Muvaffaqiyatli o'chirildi
            router.refresh();
            setShowConfirm(false);
        } catch (error) {
            console.error('O\'chirishda xatolik:', error);
            alert(error instanceof Error ? error.message : 'Mahsulotni o\'chirishda xatolik yuz berdi');
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <button 
                onClick={() => setShowConfirm(true)}
                className="text-red-600 hover:text-red-900"
                type="button"
            >
                O'chirish
            </button>

            {showConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-medium mb-4">Mahsulotni o'chirish</h3>
                        <p className="mb-6">
                            <strong>{productName}</strong> mahsulotini o'chirishni xohlaysizmi?
                            Bu amalni ortga qaytarib bo'lmaydi.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md"
                                disabled={isDeleting}
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'O\'chirilmoqda...' : 'O\'chirish'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}