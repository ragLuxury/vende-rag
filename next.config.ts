import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.ragdev.com.mx',
        pathname: '/views_yea/uploads/products/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.rag.mx',
        pathname: '/views_yea/uploads/products/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.rag.mx',
        pathname: '/uploads/products/**',
      },
    ],
  },

  async redirects() {
    return [
      // Legacy PHP-site (shop.rag / vende.rag.mx) URLs -> new app equivalents.
      // `permanent: false` -> 307, since these are compatibility shims, not a
      // permanent restructure search engines should cache forever.
      { source: '/cuenta', destination: '/perfil', permanent: false },
      { source: '/cuenta/perfil', destination: '/perfil', permanent: false },
      { source: '/cuenta/perfil/inicio', destination: '/perfil', permanent: false },
      // `has: action=edit` rules must precede their bare-path counterparts below,
      // otherwise the bare rule matches first and swallows the ?action=edit case.
      {
        source: '/cuenta/perfil/direcciones',
        has: [{ type: 'query', key: 'action', value: 'edit' }],
        destination: '/perfil/direccion',
        permanent: false,
      },
      {
        source: '/cuenta/perfil/direcciones',
        destination: '/perfil',
        permanent: false,
      },
      {
        source: '/cuenta/perfil/metodos_de_pago',
        has: [{ type: 'query', key: 'action', value: 'edit' }],
        destination: '/perfil/metodo-pago',
        permanent: false,
      },
      {
        source: '/cuenta/perfil/metodos_de_pago',
        destination: '/perfil',
        permanent: false,
      },
      { source: '/cuenta/perfil/contrato', destination: '/perfil', permanent: false },
      { source: '/cuenta/mis_productos', destination: '/solicitudes', permanent: false },
      { source: '/cuenta/mis_publicaciones', destination: '/publicaciones', permanent: false },
      { source: '/cuenta/mis_ventas', destination: '/mis-ventas', permanent: false },
      { source: '/cuenta/mis_devoluciones', destination: '/devoluciones', permanent: false },
      { source: '/vende', destination: '/', permanent: false },
      { source: '/google.php', destination: '/login', permanent: false },
      { source: '/google-out.php', destination: '/login', permanent: false },
      { source: '/recupera', destination: '/forgot-password', permanent: false },
      { source: '/aviso', destination: '/privacidad', permanent: false },
      { source: '/terminos_consignacion', destination: '/terminos', permanent: false },
    ];
  },
};

export default nextConfig;
