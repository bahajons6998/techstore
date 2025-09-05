/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      'olcha.uz',
      'cdn.asaxiy.uz',
      'images.uzum.uz',
      'texnomart.uz',
      'mediapark.uz',
      'example.com',
      'images.pexels.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'cdn.amazonaws.com',
      'images.amazon.com',
      'storage.googleapis.com',
      'images.google.com',
      'cloudinary.com',
      'res.cloudinary.com',
      'via.placeholder.com',
      'placehold.co',
      'dummyimage.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'i.imgur.com',
      'localhost',
      '127.0.0.1',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

module.exports = nextConfig;