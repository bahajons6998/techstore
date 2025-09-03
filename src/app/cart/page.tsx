import CartItems from '@/components/cart/CartItems';

export const metadata = {
  title: 'Savatcha | Internet Magazin',
  description: 'Sizning savatchangizdagi mahsulotlar'
};

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Savatcha</h1>
      <CartItems />
    </div>
  );
}
