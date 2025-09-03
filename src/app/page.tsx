import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { getLoggedInUser } from "@/app/actions/auth";
import { UniversalImage } from "@/components/ui";

export default async function Home() {
  const user = await getLoggedInUser();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bizning online do'konimizga xush kelibsiz!
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Eng so'nggi texnologiya mahsulotlarini tanlang va biz sizga tezkor yetkazib beramiz.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button variant="primary" className="px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
                    Mahsulotlarni ko'rish
                  </Button>
                </Link>
                {!user && (
                  <Link href="/login">
                    <Button variant="outline" className="px-8 py-3 text-lg border-2 hover:bg-blue-50 transition-all">
                      Kirish / Ro'yxatdan o'tish
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md h-96 transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/globe.svg"
                  alt="Online do'kon"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mahsulot kategoriyalari
              </span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Eng so'nggi va sifatli mahsulotlarni kategoriyalar bo'yicha tanlang
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/products?category=1" className="block group">
              <div className="p-8 border rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50">
                <div className="mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">Telefonlar</h3>
                <p className="text-gray-600">Eng so'nggi smartfonlar va telefonlar kolleksiyasi.</p>
              </div>
            </Link>
            
            <Link href="/products?category=2" className="block group">
              <div className="p-8 border rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50">
                <div className="mb-4 bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition-colors">Kompyuterlar</h3>
                <p className="text-gray-600">Zamonaviy noutbuklar va stol kompyuterlari.</p>
              </div>
            </Link>
            
            <Link href="/products?category=3" className="block group">
              <div className="p-8 border rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50">
                <div className="mb-4 bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">Aksessuarlar</h3>
                <p className="text-gray-600">Barcha qurilmalar uchun zamonaviy aksessuarlar.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mashhur mahsulotlar
              </span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Bizning eng mashhur va ko'p sotilgan mahsulotlarimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder products */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 bg-gray-100">
                  <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                    Yangi
                  </div>
                  <div className="w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Mahsulot {item}</h3>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="text-xs text-gray-500 ml-1">4.5</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Lorem ipsum dolor sit amet consectetur.</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">1,200,000 so'm</span>
                    <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" className="px-6 py-2 border-2 hover:bg-blue-50 transition-all">
                Barcha mahsulotlarni ko'rish
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Nima uchun bizni tanlashingiz kerak?
              </span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Mijozlarimiz bizni quyidagi afzalliklarimiz uchun tanlashadi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50">
              <div className="mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sifatli mahsulotlar</h3>
              <p className="text-gray-600">Faqat yuqori sifatli va original mahsulotlarni taklif qilamiz. Barcha mahsulotlar sifat nazoratidan o'tkaziladi.</p>
            </div>
            
            <div className="p-8 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50">
              <div className="mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tezkor yetkazib berish</h3>
              <p className="text-gray-600">Buyurtmangizni eng qisqa muddatlarda manzilga yetkazib beramiz. Shahar ichida 24 soat ichida yetkazib berish.</p>
            </div>
            
            <div className="p-8 border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:bg-blue-50">
              <div className="mb-4 bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Mijozlar xizmati</h3>
              <p className="text-gray-600">Har qanday savol bo'yicha 24/7 mijozlar xizmati tayyormiz. Bizga murojaat qiling va biz yordam beramiz.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mijozlarimiz fikrlari
              </span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna id aliquet lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl sit amet nisl."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    M{item}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Mijoz {item}</h4>
                    <p className="text-sm text-gray-500">Doimiy xaridor</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Hoziroq bizning mahsulotlarimizni ko'ring!</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Bizning katalogdagi 10,000+ mahsulotlardan o'zingizga kerakli mahsulotni toping.
          </p>
          <Link href="/products">
            <Button variant="white" className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
              Mahsulotlarni ko'rish
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
