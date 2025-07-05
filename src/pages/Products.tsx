import { GridPattern } from '@/components/ui/grid-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star } from 'lucide-react';
import { FloatingDock } from '@/components/FloatingDock';
import { House, Info, Monitor, User, Package } from 'lucide-react';
import { PinContainer } from '@/components/ui/3d-pin';

const Products = () => {
  const dockItems = [
    { title: 'Home', icon: <House className="h-4 w-4" />, href: '/' },
    { title: 'Projects', icon: <Monitor className="h-4 w-4" />, href: '/projects' },
    { title: 'Products', icon: <Package className="h-4 w-4" />, href: '/products' },
    { title: 'Blog', icon: <Info className="h-4 w-4" />, href: '/blog' },
    { title: 'Hire Me', icon: <User className="h-4 w-4" />, href: '/hire' },
  ];

  const products = [
    {
      id: 1,
      name: "Task Manager Pro",
      description: "A comprehensive task management application with team collaboration features.",
      features: ["Team Collaboration", "Real-time Updates", "Advanced Analytics", "API Integration"],
      rating: 4.8,
      users: "2.5k+ users",
      githubUrl: "https://github.com/dummy/task-manager-pro"
    },
    {
      id: 2,
      name: "Code Snippet Organizer",
      description: "Organize and share your code snippets with syntax highlighting and search.",
      features: ["Syntax Highlighting", "Cloud Sync", "Team Sharing", "VS Code Extension"],
      rating: 4.9,
      users: "1.8k+ users",
      githubUrl: "https://github.com/dummy/code-snippet-organizer"
    },
    {
      id: 3,
      name: "Portfolio Builder",
      description: "Create stunning developer portfolios with customizable templates.",
      features: ["Custom Templates", "SEO Optimized", "Analytics Dashboard", "Custom Domain"],
      rating: 4.7,
      users: "5.2k+ users",
      githubUrl: "https://github.com/dummy/portfolio-builder"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pb-32">
      {/* Grid Pattern Background - Full coverage */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="absolute inset-0 h-full w-full stroke-white/10"
      />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 custom-title-font">
              My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto josefin-sans-font">
              Discover the digital products I've built to solve real-world problems and enhance productivity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <PinContainer
                key={product.id}
                title={product.name}
                href={undefined}
              >
                <div className="flex flex-col p-4 tracking-tight text-slate-100/80 w-full h-72">
                  <h3 className="font-bold text-lg mb-2 libertinus-math-regular">{product.name}</h3>
                  <div className="text-base font-normal josefin-sans-font mb-2">
                    <span className="text-slate-300">{product.description}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-700/30 to-blue-700/30 text-purple-200 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end items-center mt-auto">
                    <a
                      href={product.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-semibold shadow"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0 0 14.25 4.5h-7.5A2.25 2.25 0 0 0 4.5 6.75v10.5A2.25 2.25 0 0 0 6.75 19.5h7.5a2.25 2.25 0 0 0 2.25-2.25v-3.75m0 0L9.75 15m6.75-3-6.75 6.75" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </PinContainer>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Dock - Vertical, 24px from left side, only on desktop */}
      <div className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col items-center">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="vertical"
        />
      </div>
      {/* Floating Dock - Horizontal, bottom center, only on mobile */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 flex md:hidden justify-center w-full px-4">
        <FloatingDock 
          items={dockItems}
          desktopClassName="liquid-glass-effect bg-gray-900/80 backdrop-blur-md border border-gray-700"
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

export default Products;
