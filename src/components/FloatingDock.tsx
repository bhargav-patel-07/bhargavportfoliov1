import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  orientation = 'horizontal',
}: FloatingDockProps) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} orientation={orientation} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="block md:hidden">
      <div className="absolute inset-x-0 bottom-full mb-2 flex flex-row gap-0 justify-between liquid-glass-effect p-1 rounded-2xl shadow-lg w-full">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className="animate-fade-in flex-grow flex justify-center"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <Link
              to={item.href}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-black hover:bg-neutral-800 transition-colors"
            >
              <div className="h-7 w-7 text-yellow-500 flex items-center justify-center">{item.icon}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  orientation = 'horizontal',
}: {
  items: DockItem[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}) => {
  return (
    <div
      className={cn(
        orientation === 'vertical'
          ? 'mx-0 my-auto flex-col h-auto w-16 items-center gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-3 py-4 md:flex'
          : 'mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3 md:flex',
        className
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  );
};

function IconContainer({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link to={href}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black hover:bg-neutral-800 transition-all duration-200 hover:scale-110"
      >
        {hovered && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-nowrap text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white">
            {title}
          </div>
        )}
        <div className="flex h-6 w-6 items-center justify-center text-yellow-500">
          {icon}
        </div>
      </div>
    </Link>
  );
}
