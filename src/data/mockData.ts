
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  image?: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration and admin dashboard.',
    image: 'photo-1649972904349-6e44c42644a7',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    image: 'photo-1488590528505-98d2b5aba04b',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts and charts.',
    image: 'photo-1461749280684-dccba630e2f6',
    technologies: ['React', 'Chart.js', 'OpenWeather API'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    id: '4',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for social media performance tracking.',
    image: 'photo-1486312338219-ce68d2c6f44d',
    technologies: ['Next.js', 'D3.js', 'PostgreSQL'],
    githubUrl: 'https://github.com'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Server Components',
    excerpt: 'Learn how to use React Server Components to build faster, more efficient web applications.',
    content: `React Server Components represent a paradigm shift in how we think about React applications. They allow us to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.

## What are Server Components?

Server Components are a new type of React component that runs on the server. Unlike traditional React components that run on the client, Server Components are rendered on the server and sent to the client as static HTML.

## Benefits

1. **Reduced Bundle Size**: Server Components don't add to your JavaScript bundle
2. **Better Performance**: Less client-side JavaScript means faster load times
3. **Direct Database Access**: You can access your database directly from Server Components

## Getting Started

To get started with Server Components, you'll need to use a framework that supports them, such as Next.js 13+ with the app directory.

\`\`\`jsx
// This is a Server Component
export default function BlogPost({ id }) {
  const post = await fetchPost(id); // This runs on the server
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

Server Components are the future of React development, offering better performance and developer experience.`,
    date: '2024-01-15',
    tags: ['React', 'Next.js', 'Performance'],
    image: 'photo-1581091226825-a6a2a5aee158'
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    excerpt: 'Best practices for designing and implementing scalable REST APIs using Node.js and Express.',
    content: `Building scalable APIs is crucial for modern web applications. In this post, we'll explore best practices for creating robust, maintainable APIs with Node.js.

## Architecture Principles

1. **Separation of Concerns**: Keep your routes, controllers, and business logic separate
2. **Error Handling**: Implement comprehensive error handling strategies
3. **Validation**: Always validate input data
4. **Authentication**: Secure your endpoints properly

## Code Structure

\`\`\`javascript
// controllers/userController.js
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
\`\`\`

## Performance Optimization

- Use caching strategies (Redis)
- Implement pagination
- Optimize database queries
- Use compression middleware

These practices will help you build APIs that can handle growth and maintain performance under load.`,
    date: '2024-01-10',
    tags: ['Node.js', 'API', 'Backend'],
    image: 'photo-1487058792275-0ad4aaf24ca7'
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to Use What',
    excerpt: 'A comprehensive guide to understanding the differences between CSS Grid and Flexbox.',
    content: `CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Understanding when to use each one is key to creating efficient layouts.

## Flexbox: One-Dimensional Layouts

Flexbox excels at:
- Aligning items in a single direction
- Distributing space along one axis  
- Creating responsive navigation bars
- Centering content

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## CSS Grid: Two-Dimensional Layouts

CSS Grid is perfect for:
- Complex layouts with rows and columns
- Overlapping elements
- Card-based designs
- Full page layouts

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## When to Use What

- **Use Flexbox** for component-level layouts
- **Use Grid** for page-level layouts
- **Combine both** for maximum flexibility

The key is understanding that these tools complement each other rather than compete.`,
    date: '2024-01-05',
    tags: ['CSS', 'Layout', 'Frontend'],
    image: 'photo-1498050108023-c5249f4df085'
  }
];
