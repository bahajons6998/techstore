import EditProductForm from '@/components/admin/products/EditProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15 da params async/Promise
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <EditProductForm productId={productId} />
        </div>
    );
}