// Ma'lumotlarni olish uchun utilitalar
// Bu yerda Prisma Client bilan ishlaymiz

// Frontend uchun Product tipi
export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl?: string | null;
};

// Lazy loading usulida Prisma Client olish
// Bu Prisma generate qilinmaganida ham xatolikni oldini oladi
async function getPrismaClient() {
    try {
        const { prisma } = await import('./prisma');
        return { client: prisma, error: null };
    } catch (error) {
        console.error('Prisma Clientni yuklashda xatolik:', error);
        return { client: null, error };
    }
}

// Barcha mahsulotlarni olish
export async function getProducts(): Promise<Product[]> {
    const { client, error } = await getPrismaClient();

    // Agar Prisma Client yuklanmagan bo'lsa demo ma'lumotlar qaytariladi
    if (!client || error) {
        console.warn('Prisma Client mavjud emas, demo ma\'lumotlar qaytarilmoqda');
        return getDemoProducts();
    }

    try {
        const products = await client.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                imageUrl: true
            }
        });

        // Decimal tipdagi narxni number tipiga o'tkazish
        return products.map((product: any) => ({
            ...product,
            price: Number(product.price)
        }));
    } catch (error) {
        console.error('Mahsulotlarni olishda xatolik:', error);
        return getDemoProducts();
    }
}

// ID bo'yicha mahsulotni olish
export async function getProductById(id: number): Promise<Product | null> {
    const { client, error } = await getPrismaClient();

    // Agar Prisma Client yuklanmagan bo'lsa demo ma'lumotlardan qidiramiz
    if (!client || error) {
        console.warn('Prisma Client mavjud emas, demo ma\'lumotlar qaytarilmoqda');
        const demoProducts = getDemoProducts();
        return demoProducts.find(p => p.id === id) || null;
    }

    try {
        const product = await client.product.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                imageUrl: true
            }
        });

        if (!product) return null;

        // Decimal tipdagi narxni number tipiga o'tkazish
        return {
            ...product,
            price: Number(product.price)
        };
    } catch (error) {
        console.error('Mahsulotni olishda xatolik:', error);
        const demoProducts = getDemoProducts();
        return demoProducts.find(p => p.id === id) || null;
    }
}

// Yangi mahsulot qo'shish
export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
    const { client, error } = await getPrismaClient();

    if (!client || error) {
        throw new Error('Ma\'lumotlar bazasi bilan bog\'lanib bo\'lmadi');
    }

    try {
        const product = await client.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl || null,
                stock: 0 // Default qiymat
            }
        });

        return {
            ...product,
            price: Number(product.price)
        };
    } catch (error) {
        console.error('Mahsulot yaratishda xatolik:', error);
        throw new Error('Mahsulot yaratib bo\'lmadi');
    }
}

// Demo ma'lumotlar (ma'lumotlar bazasi sozlanmaganida ishlatiladi)
function getDemoProducts(): Product[] {
    return [
        {
            id: 1,
            name: "Noutbuk",
            price: 8999000,
            description: "Core i7, 16GB RAM, 512GB SSD",
            imageUrl: "/images/laptop.jpg"
        },
        {
            id: 2,
            name: "Smartfon",
            price: 4599000,
            description: "6.7 dyuym ekran, 128GB xotira",
            imageUrl: "/images/smartphone.jpg"
        },
        {
            id: 3,
            name: "Simsiz quloqchinlar",
            price: 899000,
            description: "Aktiv shovqinni yo'q qilish, 24 soat zaryad",
            imageUrl: "/images/headphones.jpg"
        }
    ];
}