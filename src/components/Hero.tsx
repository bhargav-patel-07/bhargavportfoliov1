import { Github, Linkedin, MessageCircle, Slack, Twitter } from 'lucide-react';

const Hero = ({ profile }: { profile: any }) => {
  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: MessageCircle, href: "#", label: "Discord" },
    { icon: Twitter, href: "#", label: "X (Twitter)" },
    { icon: Slack, href: "#", label: "Slack" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">John Doe</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Full-stack developer passionate about creating beautiful, functional web applications
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/50 backdrop-blur-md border border-gray-700/50 hover:border-purple-400/50 transition-all duration-200 hover:scale-110"
                aria-label={social.label}
              >
                <Icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </div>
              </a>
            );
          })}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/projects" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
            View My Work
          </a>
          <a href="https://x.com/your_x_profile" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200">
            Get In Touch
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-200 flex items-center justify-center">
            CV
          </a>
        </div>
        
        {/* Profile Timeline Sections: Education, Experience, Certificates */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[{key: 'education', label: 'Education'}, {key: 'experience', label: 'Experience'}, {key: 'certificates', label: 'Certificates'}].map((section, idx) => (
            <div
              key={section.key}
              className={
                section.key === 'certificates'
                  ? 'bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-[72px] md:mb-0'
                  : 'bg-gray-800/50 border border-gray-700 rounded-lg p-6'
              }
            >
              <h3 className="text-xl font-bold text-white mb-4">{section.label}</h3>
              <ul className="space-y-6">
                {profile[section.key]?.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    {item.icon && <img src={item.icon} alt="icon" className="h-10 w-10 rounded-full border mt-1" />}
                    <div>
                      <div className="font-semibold text-white text-base">{item.title}</div>
                      <div className="text-sm text-purple-300">{item.institution}</div>
                      <div className="text-xs text-gray-400 mb-1">{item.startDate} - {item.endDate}</div>
                      <div className="text-xs text-gray-300">{item.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
