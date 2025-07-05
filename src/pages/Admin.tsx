import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';
import { technologies as initialTechnologies, Technology } from '../data/technologies';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AdminBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  image?: string;
}

interface AdminProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface AdminProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  users: string;
  githubUrl?: string;
  image?: string;
}

export async function getTechnologies() {
  const { data, error } = await supabase.from('technologies').select('*');
  if (error) throw error;
  return data;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [profile, setProfile] = useState({
    picture: '',
    skills: [],
    links: {
      github: '',
      x: '',
      slack: '',
      linkedin: '',
      discord: '',
    },
    cvUrl: '',
    education: [],
    experience: [],
    certificates: [],
  });
  const [hireMeStats, setHireMeStats] = useState([
    { icon: 'Users', value: '10+', label: 'Happy Clients' },
    { icon: 'CheckCircle', value: '15+', label: 'Projects Completed' },
    { icon: 'Clock', value: '5+', label: 'Years Experience' },
    { icon: 'Users', value: '2+', label: 'Years Corporate Experience' },
  ]);
  const [hireMeServices, setHireMeServices] = useState([
    { title: 'Web Development', description: 'Full-stack web applications using modern technologies', features: ['React/Next.js', 'Node.js/Express', 'Database Design', 'API Development'] },
    { title: 'Ai Engineer', description: 'Devlopes Ai Agents', features: ['Python Programming', 'Numpy, Pandas, Matplotlib', 'Basic Machine Learning (scikit-learn)', 'Data Cleaning & Preprocessing', 'Linear Algebra & Probability Basics', 'Understanding of Neural Networks', 'Data Handling', 'Git & Version Control'] },
  ]);
  const [hireMeMessages, setHireMeMessages] = useState([]);
  const [techs, setTechs] = useState<Technology[]>(initialTechnologies);
  const [form, setForm] = useState<Partial<Technology>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string>('');
  const [profileLinks, setProfileLinks] = useState({
    linkedin: '',
    github: '',
    twitter: '',
    slack: '',
    discord: '',
    gmail: '',
    cvLink: '',
  });

  // Simple authentication (in a real app, use proper authentication)
  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      loadData();
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid password. Try 'admin123'",
        variant: "destructive",
      });
    }
  };

  const loadData = () => {
    // Load from localStorage or initialize with empty arrays
    const savedPosts = localStorage.getItem('adminPosts');
    const savedProjects = localStorage.getItem('adminProjects');
    const savedProducts = localStorage.getItem('adminProducts');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  };

  const savePosts = (newPosts: AdminBlogPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('adminPosts', JSON.stringify(newPosts));
  };

  const saveProjects = (newProjects: AdminProject[]) => {
    setProjects(newProjects);
    localStorage.setItem('adminProjects', JSON.stringify(newProjects));
  };

  const saveProducts = (newProducts: AdminProduct[]) => {
    setProducts(newProducts);
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
  };

  const handleSavePost = (post: AdminBlogPost) => {
    if (editingPost) {
      const updatedPosts = posts.map(p => p.id === post.id ? post : p);
      savePosts(updatedPosts);
      toast({
        title: "Post Updated",
        description: "Blog post has been updated successfully!",
      });
    } else {
      const newPost = { ...post, id: Date.now().toString() };
      savePosts([...posts, newPost]);
      toast({
        title: "Post Created",
        description: "New blog post has been created successfully!",
      });
    }
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    savePosts(updatedPosts);
    toast({
      title: "Post Deleted",
      description: "Blog post has been deleted successfully!",
    });
  };

  const handleSaveProject = (project: AdminProject) => {
    if (editingProject) {
      const updatedProjects = projects.map(p => p.id === project.id ? project : p);
      saveProjects(updatedProjects);
      toast({
        title: "Project Updated",
        description: "Project has been updated successfully!",
      });
    } else {
      const newProject = { ...project, id: Date.now().toString() };
      saveProjects([...projects, newProject]);
      toast({
        title: "Project Created",
        description: "New project has been created successfully!",
      });
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
    toast({
      title: "Project Deleted",
      description: "Project has been deleted successfully!",
    });
  };

  const handleSaveProduct = (product: AdminProduct) => {
    if (editingProduct) {
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      saveProducts(updatedProducts);
      toast({ title: 'Product Updated', description: 'Product updated successfully!' });
    } else {
      const newProduct = { ...product, id: Date.now().toString() };
      saveProducts([...products, newProduct]);
      toast({ title: 'Product Created', description: 'New product created successfully!' });
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    saveProducts(updatedProducts);
    toast({ title: 'Product Deleted', description: 'Product deleted successfully!' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.icon || !form.color) return;
    if (editId) {
      setTechs(techs.map(t => t.id === editId ? { ...t, ...form, id: editId } as Technology : t));
      setEditId(null);
    } else {
      setTechs([...techs, { ...form, id: form.name!.toLowerCase().replace(/\s/g, '') } as Technology]);
    }
    setForm({});
  };

  const handleEdit = (id: string) => {
    const tech = techs.find(t => t.id === id);
    if (tech) {
      setForm(tech);
      setEditId(id);
    }
  };

  const handleDelete = (id: string) => {
    setTechs(techs.filter(t => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({});
    }
  };

  // Profile image upload handler
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        // Optionally, save to localStorage or backend here
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileLinks({ ...profileLinks, [e.target.name]: e.target.value });
  };

  const handleUpdateProfileLinks = () => {
    setProfile(prev => ({
      ...prev,
      socialLinks: { ...profileLinks },
      cvLink: profileLinks.cvLink,
    }));
    alert('Social & CV links updated!'); // Replace with toast if available
  };

  const handleUpdateProfileImage = () => {
    setProfile(prev => ({
      ...prev,
      profileImage: profileImage,
    }));
    alert('Profile image updated!'); // Replace with toast if available
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your password to access the admin panel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="Enter admin password"
                  />
                  <p className="text-sm text-gray-500 mt-1">Hint: admin123</p>
                </div>
                <Button onClick={handleLogin} className="w-full">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Admin <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Panel</span>
            </h1>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="hireme">Hire Me</TabsTrigger>
              <TabsTrigger value="technologies">Technologies</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileTimelineManager
                profile={profile}
                setProfile={setProfile}
              />
              <div className="p-6 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Profile Image</h2>
                <div className="mb-6 flex flex-col items-center">
                  {profileImage && (
                    <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-red-500 shadow-lg object-cover mb-2" />
                  )}
                  <input type="file" accept="image/*" onChange={handleProfileImageChange} className="mb-2" />
                  <button onClick={handleUpdateProfileImage} className="bg-blue-600 text-white px-3 py-1 rounded">Update Profile Image</button>
                </div>
              </div>
              <div className="p-6 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Social & CV Links</h2>
                <div className="mb-6 grid grid-cols-1 gap-3">
                  <input name="linkedin" placeholder="LinkedIn URL" value={profileLinks.linkedin} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <input name="github" placeholder="GitHub URL" value={profileLinks.github} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <input name="twitter" placeholder="Twitter URL" value={profileLinks.twitter} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <input name="slack" placeholder="Slack URL" value={profileLinks.slack} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <input name="discord" placeholder="Discord URL" value={profileLinks.discord} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <input name="gmail" placeholder="Gmail Address" value={profileLinks.gmail} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <input name="cvLink" placeholder="CV Google Drive Link" value={profileLinks.cvLink} onChange={handleProfileLinksChange} className="border px-2 py-1" />
                  <button onClick={handleUpdateProfileLinks} className="bg-blue-600 text-white px-3 py-1 rounded mt-2">Update Links</button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <BlogPostManager
                posts={posts}
                editingPost={editingPost}
                onSave={handleSavePost}
                onEdit={setEditingPost}
                onDelete={handleDeletePost}
                onCancelEdit={() => setEditingPost(null)}
              />
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <ProjectManager
                projects={projects}
                editingProject={editingProject}
                onSave={handleSaveProject}
                onEdit={setEditingProject}
                onDelete={handleDeleteProject}
                onCancelEdit={() => setEditingProject(null)}
              />
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <ProductManager
                products={products}
                editingProduct={editingProduct}
                onSave={handleSaveProduct}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
                onCancelEdit={() => setEditingProduct(null)}
              />
            </TabsContent>

            <TabsContent value="hireme" className="space-y-6">
              <HireMeAdminPanel
                stats={hireMeStats}
                setStats={setHireMeStats}
                services={hireMeServices}
                setServices={setHireMeServices}
                messages={hireMeMessages}
                setMessages={setHireMeMessages}
              />
            </TabsContent>

            <TabsContent value="technologies" className="space-y-6">
              <div className="p-6 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Manage Technologies</h2>
                <div className="mb-6">
                  <input name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} className="border px-2 py-1 mr-2" />
                  <input name="icon" placeholder="Icon URL" value={form.icon || ''} onChange={handleChange} className="border px-2 py-1 mr-2" />
                  <input name="color" placeholder="Color" value={form.color || ''} onChange={handleChange} className="border px-2 py-1 mr-2" />
                  <button onClick={handleAddOrUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">
                    {editId ? 'Update' : 'Add'}
                  </button>
                  {editId && <button onClick={() => { setEditId(null); setForm({}); }} className="ml-2 text-sm text-gray-500">Cancel</button>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {techs.map(tech => (
                    <div key={tech.id} className="flex items-center bg-gray-100 rounded p-2">
                      <img src={tech.icon} alt={tech.name} className="w-6 h-6 mr-2" />
                      <span className="flex-1 font-semibold">{tech.name}</span>
                      <button onClick={() => handleEdit(tech.id)} className="text-blue-600 mr-2">Edit</button>
                      <button onClick={() => handleDelete(tech.id)} className="text-red-600">Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Blog Post Manager Component
const BlogPostManager = ({ posts, editingPost, onSave, onEdit, onDelete, onCancelEdit }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    image: ''
  });

  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        tags: editingPost.tags.join(', '),
        image: editingPost.image || ''
      });
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        image: ''
      });
    }
  }, [editingPost]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editingPost,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: formData.image
    });
    setFormData({ title: '', excerpt: '', content: '', tags: '', image: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                required
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, JavaScript, Tutorial"
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {formData.image && <img src={formData.image} alt="Blog" className="mt-2 h-24 rounded" />}
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              {editingPost && (
                <Button type="button" variant="outline" onClick={onCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {posts.map((post: AdminBlogPost) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(post)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDelete(post.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Project Manager Component
const ProjectManager = ({ projects, editingProject, onSave, onEdit, onDelete, onCancelEdit }: any) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    image: ''
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        technologies: editingProject.technologies.join(', '),
        githubUrl: editingProject.githubUrl || '',
        liveUrl: editingProject.liveUrl || '',
        image: editingProject.image || ''
      });
    } else {
      setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', image: '' });
    }
  }, [editingProject]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editingProject,
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
      image: formData.image
    });
    setFormData({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', image: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="technologies">Technologies (comma separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
              />
            </div>
            <div>
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://yourproject.com"
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {formData.image && <img src={formData.image} alt="Project" className="mt-2 h-24 rounded" />}
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingProject ? 'Update Project' : 'Create Project'}
              </Button>
              {editingProject && (
                <Button type="button" variant="outline" onClick={onCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {projects.map((project: AdminProject) => (
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDelete(project.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Product Manager Component
const ProductManager = ({ products, editingProduct, onSave, onEdit, onDelete, onCancelEdit }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: '',
    users: '',
    githubUrl: '',
    image: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        features: editingProduct.features.join(', '),
        users: editingProduct.users,
        githubUrl: editingProduct.githubUrl || '',
        image: editingProduct.image || ''
      });
    } else {
      setFormData({ name: '', description: '', features: '', users: '', githubUrl: '', image: '' });
    }
  }, [editingProduct]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...editingProduct,
      name: formData.name,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      users: formData.users,
      githubUrl: formData.githubUrl,
      image: formData.image
    });
    setFormData({ name: '', description: '', features: '', users: '', githubUrl: '', image: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingProduct ? 'Edit Product' : 'Create New Product'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="features">Features (comma separated)</Label>
              <Input id="features" value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} placeholder="Feature1, Feature2" required />
            </div>
            <div>
              <Label htmlFor="users">Users</Label>
              <Input id="users" value={formData.users} onChange={e => setFormData({ ...formData, users: e.target.value })} placeholder="2.5k+ users" required />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" value={formData.githubUrl} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/username/repo" />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {formData.image && <img src={formData.image} alt="Product" className="mt-2 h-24 rounded" />}
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editingProduct ? 'Update Product' : 'Create Product'}</Button>
              {editingProduct && <Button type="button" variant="outline" onClick={onCancelEdit}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        {products.map((product: AdminProduct) => (
          <Card key={product.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {product.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{product.users}</div>
                  {product.githubUrl && (
                    <a href={product.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-600 underline">GitHub</a>
                  )}
                  {product.image && (
                    <img src={product.image} alt="Product" className="mt-2 h-16 rounded" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDelete(product.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Profile Timeline Manager Component
const ProfileTimelineManager = ({ profile, setProfile }: any) => {
  // Helper for all three sections
  const sections = [
    { key: 'education', label: 'Education' },
    { key: 'experience', label: 'Experience' },
    { key: 'certificates', label: 'Certificates' },
  ];
  const [editing, setEditing] = useState<{ section: string, index: number | null }>({ section: '', index: null });
  const [form, setForm] = useState({
    icon: '',
    title: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, icon: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };
  const handleEdit = (section: string, index: number) => {
    setEditing({ section, index });
    setForm(profile[section][index]);
  };
  const handleDelete = (section: string, index: number) => {
    const updated = [...profile[section]];
    updated.splice(index, 1);
    setProfile({ ...profile, [section]: updated });
  };
  const handleSubmit = (section: string) => {
    const updated = [...profile[section]];
    if (editing.index !== null) {
      updated[editing.index] = form;
    } else {
      updated.push(form);
    }
    setProfile({ ...profile, [section]: updated });
    setEditing({ section: '', index: null });
    setForm({ icon: '', title: '', institution: '', startDate: '', endDate: '', description: '' });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {sections.map(({ key, label }) => (
        <div key={key} className="bg-white rounded-lg p-4 shadow">
          <h3 className="text-lg font-bold mb-4">{label}</h3>
          <ul className="space-y-4 mb-4">
            {profile[key].map((item: any, idx: number) => (
              <li key={idx} className="flex items-center gap-3">
                {item.icon && <img src={item.icon} alt="icon" className="h-10 w-10 rounded-full border" />}
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.institution}</div>
                  <div className="text-xs text-gray-400">{item.startDate} - {item.endDate}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleEdit(key, idx)}>Edit</Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(key, idx)} className="text-red-600">Delete</Button>
              </li>
            ))}
          </ul>
          <form onSubmit={e => { e.preventDefault(); handleSubmit(key); }} className="space-y-2">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <Input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Institution/Company/Issuer" value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} required />
            <div className="flex gap-2">
              <Input placeholder="Start Date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
              <Input placeholder="End Date (or Present)" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
            </div>
            <Textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <Button type="submit">{editing.section === key && editing.index !== null ? 'Update' : 'Add'} {label.slice(0, -1)}</Button>
            {editing.section === key && editing.index !== null && (
              <Button type="button" variant="outline" onClick={() => { setEditing({ section: '', index: null }); setForm({ icon: '', title: '', institution: '', startDate: '', endDate: '', description: '' }); }}>Cancel</Button>
            )}
          </form>
        </div>
      ))}
    </div>
  );
};

// Hire Me Admin Panel Component
const HireMeAdminPanel = ({ stats, setStats, services, setServices, messages, setMessages }: any) => {
  // CRUD for stats
  const [statForm, setStatForm] = useState({ icon: '', value: '', label: '' });
  const [editingStat, setEditingStat] = useState<number | null>(null);
  const handleStatSubmit = (e: any) => {
    e.preventDefault();
    if (editingStat !== null) {
      const updated = [...stats];
      updated[editingStat] = statForm;
      setStats(updated);
      setEditingStat(null);
    } else {
      setStats([...stats, statForm]);
    }
    setStatForm({ icon: '', value: '', label: '' });
  };
  const handleStatDelete = (idx: number) => {
    const updated = [...stats];
    updated.splice(idx, 1);
    setStats(updated);
  };
  // CRUD for services
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', features: '' });
  const [editingService, setEditingService] = useState<number | null>(null);
  const handleServiceSubmit = (e: any) => {
    e.preventDefault();
    const featuresArr = serviceForm.features.split(',').map((f: string) => f.trim()).filter((f: string) => f);
    if (editingService !== null) {
      const updated = [...services];
      updated[editingService] = { ...serviceForm, features: featuresArr };
      setServices(updated);
      setEditingService(null);
    } else {
      setServices([...services, { ...serviceForm, features: featuresArr }]);
    }
    setServiceForm({ title: '', description: '', features: '' });
  };
  const handleServiceDelete = (idx: number) => {
    const updated = [...services];
    updated.splice(idx, 1);
    setServices(updated);
  };
  // Messages table
  const handleDeleteMessage = (idx: number) => {
    const updated = [...messages];
    updated.splice(idx, 1);
    setMessages(updated);
  };
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-2">Stats</h3>
        <ul className="mb-2">
          {stats.map((stat: any, idx: number) => (
            <li key={idx} className="flex gap-2 items-center mb-1">
              <span>{stat.icon}</span>
              <span>{stat.value}</span>
              <span>{stat.label}</span>
              <Button size="sm" variant="outline" onClick={() => { setEditingStat(idx); setStatForm(stat); }}>Edit</Button>
              <Button size="sm" variant="outline" onClick={() => handleStatDelete(idx)} className="text-red-600">Delete</Button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleStatSubmit} className="flex gap-2 mb-4">
          <Input placeholder="Icon (Users, CheckCircle, etc.)" value={statForm.icon} onChange={e => setStatForm({ ...statForm, icon: e.target.value })} required />
          <Input placeholder="Value" value={statForm.value} onChange={e => setStatForm({ ...statForm, value: e.target.value })} required />
          <Input placeholder="Label" value={statForm.label} onChange={e => setStatForm({ ...statForm, label: e.target.value })} required />
          <Button type="submit">{editingStat !== null ? 'Update' : 'Add'}</Button>
          {editingStat !== null && <Button type="button" variant="outline" onClick={() => { setEditingStat(null); setStatForm({ icon: '', value: '', label: '' }); }}>Cancel</Button>}
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Services</h3>
        <ul className="mb-2">
          {services.map((service: any, idx: number) => (
            <li key={idx} className="mb-1">
              <span className="font-semibold">{service.title}</span> - {service.description} <br />
              <span className="text-xs">{service.features.join(', ')}</span>
              <Button size="sm" variant="outline" onClick={() => { setEditingService(idx); setServiceForm({ ...service, features: service.features.join(', ') }); }}>Edit</Button>
              <Button size="sm" variant="outline" onClick={() => handleServiceDelete(idx)} className="text-red-600">Delete</Button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleServiceSubmit} className="flex flex-col gap-2 mb-4">
          <Input placeholder="Title" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} required />
          <Input placeholder="Description" value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} required />
          <Input placeholder="Features (comma separated)" value={serviceForm.features} onChange={e => setServiceForm({ ...serviceForm, features: e.target.value })} required />
          <div className="flex gap-2">
            <Button type="submit">{editingService !== null ? 'Update' : 'Add'}</Button>
            {editingService !== null && <Button type="button" variant="outline" onClick={() => { setEditingService(null); setServiceForm({ title: '', description: '', features: '' }); }}>Cancel</Button>}
          </div>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Messages</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg: any, idx: number) => (
              <tr key={idx} className="border-b">
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.company}</td>
                <td>{msg.message}</td>
                <td><Button size="sm" variant="outline" onClick={() => handleDeleteMessage(idx)} className="text-red-600">Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
