# E-Commerce Platform with Next.js and Prisma

A comprehensive e-commerce application built with Next.js 15, TypeScript, Tailwind CSS, and Prisma ORM with MySQL database. This project implements a modern online store with product catalog, shopping cart, user authentication, and admin dashboard.

## Technologies Used

### Frontend
- **Next.js 15**: Full-stack React framework with App Router for seamless page routing
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **React**: UI library for building interactive user interfaces
- **Next.js Image Component**: For optimized image loading with universal image support

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Prisma ORM**: Type-safe database access with MySQL
- **MySQL**: Relational database for data storage
- **JWT Authentication**: Secure user authentication
- **Bcrypt**: Password hashing for secure user data

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control

## Project Structure

```
src/
├── app/                      # Next.js App Router directory
│   ├── api/                  # API Routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── products/         # Product management endpoints
│   │   ├── categories/       # Category management endpoints
│   │   ├── upload/           # File upload endpoints
│   │   └── proxy-image/      # Image proxy endpoint
│   ├── admin/                # Admin dashboard pages
│   ├── products/             # Product listing and detail pages
│   ├── cart/                 # Shopping cart page
│   ├── checkout/             # Checkout process
│   └── layout.tsx            # Root layout component
├── components/               # Reusable UI components
│   ├── admin/                # Admin-specific components
│   ├── auth/                 # Authentication components
│   ├── cart/                 # Shopping cart components
│   ├── forms/                # Form components
│   ├── layout/               # Layout components
│   ├── products/             # Product-related components
│   └── ui/                   # UI components (buttons, inputs, etc.)
├── lib/                      # Shared utility functions
│   ├── auth/                 # Authentication utilities
│   ├── prisma.ts             # Prisma client instance
│   └── data.ts               # Data fetching utilities
├── utils/                    # Helper functions
│   └── placeholder.ts        # Image placeholder utility
└── types/                    # TypeScript type definitions
```

## Features

- **User Authentication**: Register, login, and profile management
- **Product Catalog**: Browse products with filtering and searching
- **Product Management**: Admin interface for CRUD operations on products
- **Category Management**: Organize products in categories
- **Shopping Cart**: Add, remove, and update product quantities
- **Image Upload**: Upload product images with validation
- **Universal Image Support**: Display images from any URL with fallback
- **Responsive Design**: Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MySQL 8.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-nextjs.git
   cd ecommerce-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/ecommerce"
   
   # Authentication
   JWT_SECRET="your-secret-key"
   
   # Next.js
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   ```

4. Set up the database with Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Database Setup

The application uses Prisma with MySQL. Make sure you have MySQL installed and running. The schema is defined in `prisma/schema.prisma` and includes models for:

- Users
- Products
- Categories
- Orders

To initialize the database:

```bash
# Create migration
npx prisma migrate dev --name init

# Apply migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed database with initial data (if needed)
npx prisma db seed
```

## Development Guidelines

### Server and Client Components

Next.js 15 uses a hybrid model with Server and Client Components:

- **Server Components**: Use for data fetching, SEO, and static content rendering
- **Client Components**: Use for interactive UI elements with the `'use client'` directive

Example Server Component:
```tsx
// app/products/page.tsx
import ProductList from '@/components/products/ProductList';

export default async function ProductsPage() {
  // Server-side data fetching
  const products = await prisma.product.findMany();
  
  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}
```

Example Client Component:
```tsx
// components/products/AddToCartButton.tsx
'use client';

import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleClick = () => {
    setIsAdding(true);
    // Add to cart logic
  };
  
  return (
    <button 
      onClick={handleClick}
      disabled={isAdding}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
```

### API Routes

API routes are defined in `src/app/api/` directory:

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Products**: `/api/products`, `/api/products/[id]`
- **Categories**: `/api/categories`, `/api/categories/[id]`
- **Image Upload**: `/api/upload`
- **Image Proxy**: `/api/proxy-image`

### Image Handling

The application uses Next.js Image component with a custom proxy for external images:

1. **Local Images**: Stored in `/public/uploads/` directory
2. **External Images**: Fetched through the `/api/proxy-image` endpoint
3. **Placeholder**: SVG placeholder for missing images

## Deployment

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

### Docker Deployment

A Dockerfile is provided for containerized deployment:

```bash
# Build the Docker image
docker build -t ecommerce-nextjs .

# Run the container
docker run -p 3000:3000 ecommerce-nextjs
```

### Database Migration for Production

Before deploying to production, make sure to apply database migrations:

```bash
npx prisma migrate deploy
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify the DATABASE_URL in your .env file
   - Ensure MySQL service is running
   - Check network connectivity to the database server

2. **Image Loading Issues**:
   - Verify external domains are configured in `next.config.js`
   - Check the proxy-image endpoint functionality
   - Ensure upload directory has proper permissions

3. **Client/Server Component Errors**:
   - Remember that hooks can only be used in Client Components
   - Add 'use client' directive to components using browser APIs
   - Don't pass event handlers to Server Components

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment platform
