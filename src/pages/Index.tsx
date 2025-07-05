import { GridPattern } from '@/components/ui/grid-pattern';
import Hero from '@/components/Hero';
import { FloatingDock } from '@/components/FloatingDock';
import { House, Info, Monitor, User, Package, Eye } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { useEffect, useState } from 'react';
import { TechStack } from '../components/TechStack';

const defaultProfile = {
  profileImage: '',
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
    slack: '',
    discord: '',
    gmail: '',
  },
  cvLink: '',
  education: [
    {
      icon: "🎓",
      title: "B.Tech in Computer Science",
      institution: "IIT Bombay",
      startDate: "2018",
      endDate: "2022",
      description: "Graduated with First Class Honors. Specialized in AI and Web Development."
    }
  ],
  experience: [
    {
      icon: "💼",
      title: "Frontend Developer",
      institution: "Infosys Ltd.",
      startDate: "2022",
      endDate: "2024",
      description: "Worked on modern React applications and UI/UX for enterprise clients."
    }
  ],
  certificates: [
    {
      icon: "🏆",
      title: "AWS Certified Solutions Architect",
      institution: "Amazon Web Services",
      startDate: "2023",
      endDate: "2023",
      description: "Credential ID: AWS-1234. Demonstrated expertise in cloud architecture."
    }
  ]
};

const Index = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('profile');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile({
          education: parsed.education || [],
          experience: parsed.experience || [],
          certificates: parsed.certificates || [],
          profileImage: parsed.profileImage || '',
          socialLinks: parsed.socialLinks || {
            linkedin: '',
            github: '',
            twitter: '',
            slack: '',
            discord: '',
            gmail: '',
          },
          cvLink: parsed.cvLink || ''
        });
      } catch {
        setProfile(defaultProfile);
      }
    }
  }, []);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('visitorCount') || '0', 10) + 1;
    localStorage.setItem('visitorCount', count.toString());
    setVisitorCount(count);
  }, []);

  const dockItems = [
    { title: 'Home', icon: <House className="h-4 w-4" />, href: '/' },
    { title: 'Projects', icon: <Monitor className="h-4 w-4" />, href: '/projects' },
    { title: 'Products', icon: <Package className="h-4 w-4" />, href: '/products' },
    { title: 'Blog', icon: <Info className="h-4 w-4" />, href: '/blog' },
    { title: 'Hire Me', icon: <User className="h-4 w-4" />, href: '/hire' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Visitor Counter - Top Left */}
      <div className="fixed top-4 left-4 z-50 flex items-center bg-black/60 px-3 py-1 rounded-full shadow-lg">
        <Eye className="w-5 h-5 text-yellow-400 mr-2" />
        <span className="font-bold text-lg">{visitorCount}</span>
      </div>
      {/* Grid Pattern Background - Full coverage */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        className="absolute inset-0 h-full w-full stroke-white/10"
      />
      {/* Centered Welcome + TechStack Section */}
      <div className="relative z-20 flex flex-col items-center justify-center mx-auto mt-8 mb-4 max-w-4xl min-h-[260px] w-full bg-transparent">
      {/* Profile Image */}
        {profile.profileImage && (
          <div className="flex justify-center mb-4">
          <img
              src={profile.profileImage}
            alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-red-500 shadow-lg object-cover bg-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}
          />
        </div>
      )}
        <CardContainer>
          <CardBody>
            <CardItem className="bg-white/10 rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold custom-title-font mb-2">Welcome to My Portfolio</h2>
              <p className="josefin-sans-font text-lg text-slate-200">Explore my work, products, and blog with a modern 3D card effect!</p>
            </CardItem>
          </CardBody>
        </CardContainer>
        <div className="mt-0 w-full">
          <TechStack />
                </div>
      </div>
      {/* Main Content - Only Hero for Home */}
      <div className="relative z-10">
        <Hero profile={profile} />
        {/* Social Links and CV Button */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-4 mb-4">
            {profile.socialLinks.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-3 hover:bg-blue-700 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v5.62z"/></svg>
              </a>
            )}
            {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-3 hover:bg-gray-800 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5c-6.62 0-12 5.38-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576 4.765-1.587 8.2-6.086 8.2-11.385 0-6.62-5.38-12-12-12z"/></svg>
              </a>
            )}
            {profile.socialLinks.discord && (
              <a href={profile.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-3 hover:bg-indigo-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.0371c-1.4712.2492-3.0103.8227-4.8852 1.5152a.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276c-.598.3428-1.2205.6447-1.8733.8923a.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5218 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6601a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189Zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>
            )}
            {profile.socialLinks.gmail && (
              <a href={`mailto:${profile.socialLinks.gmail}`} className="bg-white/10 rounded-full p-3 hover:bg-red-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065 2.4 6.15V18a2 2 0 0 0 2 2h15.2a2 2 0 0 0 2-2V6.15l-9.6 6.915zm9.6-9.6A2 2 0 0 0 19.6 3.6H4.4a2 2 0 0 0-2 2v.45l9.6 6.915 9.6-6.915v-.45z"/></svg>
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-3 hover:bg-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482c-4.086-.205-7.713-2.164-10.141-5.144-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.457-2.548z"/></svg>
              </a>
            )}
            {profile.socialLinks.slack && (
              <a href={profile.socialLinks.slack} target="_blank" rel="noopener noreferrer" className="bg-white/10 rounded-full p-3 hover:bg-pink-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5.1 15.9a2.1 2.1 0 1 1-2.1-2.1h2.1v2.1zm1.05 0a2.1 2.1 0 1 1 4.2 0v5.25a2.1 2.1 0 1 1-4.2 0zm2.1-10.8a2.1 2.1 0 1 1 2.1 2.1V5.1H8.25zm0-1.05a2.1 2.1 0 1 1-4.2 0V5.1a2.1 2.1 0 1 1 4.2 0zm10.8 2.1a2.1 2.1 0 1 1 2.1 2.1h-2.1V5.1zm-1.05 0a2.1 2.1 0 1 1-4.2 0V5.1a2.1 2.1 0 1 1 4.2 0zm-2.1 10.8a2.1 2.1 0 1 1-2.1-2.1h5.25a2.1 2.1 0 1 1 0 4.2zm0-2.1a2.1 2.1 0 1 1 0-4.2h5.25a2.1 2.1 0 1 1 0 4.2zm-8.7-2.1a2.1 2.1 0 1 1 0-4.2h5.25a2.1 2.1 0 1 1 0 4.2zm0-2.1a2.1 2.1 0 1 1 0-4.2H5.1a2.1 2.1 0 1 1 0 4.2zm10.8 2.1a2.1 2.1 0 1 1 0-4.2h2.1a2.1 2.1 0 1 1 0 4.2z"/></svg>
              </a>
                      )}
                    </div>
          {profile.cvLink && (
            <a href={profile.cvLink} target="_blank" rel="noopener noreferrer" className="border border-blue-400 text-blue-400 px-6 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition">
              CV
            </a>
          )}
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

export default Index;
