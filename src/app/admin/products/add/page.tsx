import AddProductForm from '@/components/admin/AddProductForm';

export const metadata = {
  title: "Yangi mahsulot qo'shish",
  description: "Do'konimiz uchun yangi mahsulot qo'shish"
};

export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4">
      <AddProductForm />
    </div>
  );
}