/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // React Compiler (uses babel-plugin-react-compiler, already a devDependency).
    reactCompiler: true,
  },
};

export default nextConfig;
