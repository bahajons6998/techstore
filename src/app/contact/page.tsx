import { submitForm } from '@/actions/forms';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Biz bilan bog'laning</h1>
      
      <form action={submitForm}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Ismingiz
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Xabar
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <Button type="submit" variant="primary">
          Yuborish
        </Button>
      </form>
    </div>
  );
}