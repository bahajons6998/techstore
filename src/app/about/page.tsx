import React from 'react';
import Link from 'next/link';
import { UniversalImage } from '@/components/ui';

export const metadata = {
  title: 'Biz haqimizda | TechStore',
  description: 'TechStore elektron do\'koni haqida ma\'lumot, qulayliklar va imkoniyatlar'
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Sarlavha qismi */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Biz haqimizda</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          TechStore - zamonaviy texnologiyalar va yuqori sifatli mahsulotlar taqdim etuvchi ishonchli onlayn do'kon
        </p>
      </div>

      {/* Asosiy ma'lumot qismi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bizning maqsadimiz</h2>
          <p className="text-gray-600 mb-6">
            TechStore 2023-yilda ta'sis etilgan bo'lib, asosiy maqsadimiz O'zbekiston bozorida yuqori sifatli texnologik mahsulotlarni qulay narxlarda taqdim etishdir. Biz foydalanuvchilarga zamonaviy xarid tajribasini taqdim etamiz va onlayn savdoni yanada qulayroq qilish uchun doimo yangi imkoniyatlarni joriy etamiz.
          </p>
          <p className="text-gray-600">
            Bizning professional jamoamiz eng so'nggi texnologik trendlarni kuzatadi va faqat eng yaxshi mahsulotlarni tanlab oladi. Bizning maqsadimiz - mijozlarimizning texnologik ehtiyojlarini qondirish va ularga yuqori darajadagi xizmat ko'rsatishdir.
          </p>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <UniversalImage 
            src="/about-team.jpg" 
            alt="TechStore jamoasi" 
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Platforma haqida ma'lumot */}
      <div className="bg-gray-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Bizning saytimiz haqida</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Zamonaviy texnologiyalar</h3>
            <p className="text-gray-600">
              Saytimiz eng zamonaviy web texnologiyalar asosida qurilgan: Next.js 15, TypeScript, Prisma ORM va MySQL ma'lumotlar bazasi. Bu texnologiyalar tufayli saytimiz tez ishlaydi va foydalanuvchilarga eng yaxshi tajribani taqdim etadi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Xavfsiz to'lov tizimi</h3>
            <p className="text-gray-600">
              TechStore-da barcha to'lovlar xavfsiz amalga oshiriladi. Biz zamonaviy JWT autentifikatsiya tizimidan foydalanamiz va foydalanuvchi ma'lumotlarini himoya qilish uchun eng yuqori darajadagi xavfsizlik standartlariga rioya qilamiz.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Qulay to'lov usullari</h3>
            <p className="text-gray-600">
              Mijozlarimiz uchun har xil to'lov usullarini taqdim etamiz. Naqd pul va karta orqali to'lovlarni qabul qilamiz, bu esa xaridorlarimizga o'zlari uchun eng qulay usulni tanlash imkonini beradi.
            </p>
          </div>
        </div>
      </div>

      {/* Saytning imkoniyatlari */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Saytimizning asosiy imkoniyatlari</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Foydalanuvchilar uchun</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Qulay ro'yxatdan o'tish va kirish tizimi</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Mahsulotlar katalogida qulay qidiruv va filtrlash</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Savatchani boshqarish imkoniyati</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Qulay buyurtma berish jarayoni</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Shaxsiy buyurtmalar tarixini kuzatish</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Responsiv dizayn - mobil qurilmalarga moslashgan interfeys</span>
            </li>
          </ul>
        </div>
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Administratorlar uchun</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Boshqaruv paneli orqali mahsulotlarni boshqarish</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Kategoriyalarni yaratish va tahrirlash</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Buyurtmalarni kuzatish va boshqarish</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Buyurtma statusini yangilash (Kutilmoqda, Ishlanmoqda, Yo'lda, Yetkazildi, Bekor qilindi)</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Foydalanuvchilar ro'yxatini ko'rish va boshqarish</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Tahliliy ma'lumotlar va statistikalarni ko'rish</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Texnik tafsilotlar */}
      <div className="bg-blue-50 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Saytning texnik tafsilotlari</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Next.js 15 (App Router)</li>
              <li>TypeScript</li>
              <li>React Hooks</li>
              <li>Suspense & React Server Components</li>
              <li>TailwindCSS</li>
              <li>Inter & Roboto Mono shriftlari</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Next.js API Routes</li>
              <li>Edge Runtime</li>
              <li>Prisma ORM</li>
              <li>MySQL ma'lumotlar bazasi</li>
              <li>JWT autentifikatsiya</li>
              <li>Bcrypt parollarni shifrlashtirish</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Xususiyatlar</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Optimallashtirilgan rasmlar</li>
              <li>SEO-do'stona sahifalar</li>
              <li>Server & Client komponentlar</li>
              <li>Real-time ma'lumot yangilanishi</li>
              <li>Progressiv Web App (PWA)</li>
              <li>Cookies-ga asoslangan sessiyalar</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Deployment</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Vercel/Netlify hosting</li>
              <li>Continuous Integration</li>
              <li>Continuous Deployment</li>
              <li>Avtomatik optimizatsiya</li>
              <li>Content Delivery Network (CDN)</li>
              <li>HTTPS xavfsizlik</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bog'lanish qismi */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bizga bog'laning</h2>
        <p className="text-gray-600 mb-6">
          Savollaringiz yoki takliflaringiz bo'lsa, biz bilan bog'lanishingiz mumkin. Bizning jamoa sizga yordam berishdan mamnun bo'ladi.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Bog'lanish sahifasiga o'tish
        </Link>
      </div>
    </div>
  );
}