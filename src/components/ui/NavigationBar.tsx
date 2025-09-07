'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getLoggedInUser, logout } from "@/app/actions/auth";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function NavigationBar() {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const pathname = usePathname();

	// Foydalanuvchini yuklash funksiyasi
	const fetchUser = useCallback(async () => {
		try {
			setLoading(true);
			const userData = await getLoggedInUser();
			setUser(userData);
		} catch (error) {
			console.error('Error fetching user:', error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	// Har safar sahifa o'zgarganida foydalanuvchini qayta tekshirish
	useEffect(() => {
		fetchUser();
	}, [fetchUser, pathname]); // pathname o'zgarganida qayta tekshirish

	// Logout funksiyasi
	const handleLogout = async () => {
		try {
			// Server-side logout
			await logout();
			
			// Client-side-da foydalanuvchi holatini tozalash
			setUser(null);
			setIsUserMenuOpen(false);
			
			// Login sahifasiga yo'naltirish
			router.push('/login');
		} catch (error) {
			console.error('Logout xatolik:', error);
		}
	};

	// Click-outside handler for user menu
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setIsUserMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Savatni yuklash
	const [cartCount, setCartCount] = useState(0);
	useEffect(() => {
		// Client-side bo'lganda localStorage mavjud
		if (typeof window !== 'undefined') {
			const updateCartCount = () => {
				const cart = JSON.parse(localStorage.getItem('cart') || '[]');
				setCartCount(cart.length);
			};
			
			// Dastlab yuklash
			updateCartCount();
			
			// Storage o'zgarishini kuzatish
			window.addEventListener('storage', updateCartCount);
			return () => {
				window.removeEventListener('storage', updateCartCount);
			};
		}
	}, []);

	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-2xl font-bold text-blue-600">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
							</svg>
							<span>TechStore</span>
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
							Bosh sahifa
						</Link>
						<Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
							Mahsulotlar
						</Link>
						<Link href="/categories" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
							Kategoriyalar
						</Link>
						<Link href="/about" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
							Biz haqimizda
						</Link>
						<Link href="/contact" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
							Aloqa
						</Link>
					</nav>

					{/* User Actions */}
					<div className="hidden md:flex items-center space-x-4">
						{!loading && (
							<>
								<Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
									</svg>
									<span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cartCount}</span>
								</Link>

								{user ? (
									<div className="relative" ref={userMenuRef}>
										<button 
											className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
											onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
										>
											<span>Salom, {user.name}</span>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
											</svg>
										</button>
										{isUserMenuOpen && (
											<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
												<Link href="/profile" prefetch={false} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
													Mening profilim
												</Link>
												<Link href="/orders" prefetch={false} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
													Buyurtmalarim
												</Link>
												{user.role === 'ADMIN' && (
													<Link href="/admin/dashboard" prefetch={false} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
														Admin panel
													</Link>
												)}
												<button 
													onClick={handleLogout}
													className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
												>
													Chiqish
												</button>
											</div>
										)}
									</div>
								) : (
									<Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
										Kirish / Ro'yxatdan o'tish
									</Link>
								)}
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<button
						className="md:hidden flex items-center"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{isMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden py-3 border-t">
						<nav className="flex flex-col space-y-3 mb-4">
							<Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
								Bosh sahifa
							</Link>
							<Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
								Mahsulotlar
							</Link>
							<Link href="/categories" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
								Kategoriyalar
							</Link>
							<Link href="/about" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
								Biz haqimizda
							</Link>
							<Link href="/contact" prefetch={false} className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2">
								Aloqa
							</Link>
						</nav>

						<div className="flex items-center justify-between py-3 border-t">
							<Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
								</svg>
								<span>Savatcha ({cartCount})</span>
							</Link>

							{!loading && (
								<>
									{user ? (
										<div className="flex flex-col space-y-2">
											<span className="text-gray-700 font-medium">Salom, {user.name}</span>
											<div className="flex flex-col space-y-1">
												<Link href="/profile" prefetch={false} className="text-sm text-gray-600 hover:text-blue-600">
													Mening profilim
												</Link>
												<Link href="/orders" prefetch={false} className="text-sm text-gray-600 hover:text-blue-600">
													Buyurtmalarim
												</Link>
												{user.role === 'ADMIN' && (
													<Link href="/admin/dashboard" prefetch={false} className="text-sm text-gray-600 hover:text-blue-600">
														Admin panel
													</Link>
												)}
												<button 
													onClick={handleLogout}
													className="text-sm text-left text-red-600 hover:text-red-700"
												>
													Chiqish
												</button>
											</div>
										</div>
									) : (
										<Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
											Kirish / Ro'yxatdan o'tish
										</Link>
									)}
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	);
}