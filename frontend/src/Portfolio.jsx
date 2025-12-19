import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { 
  Github, ExternalLink, Mail, Code, User, Briefcase, 
  MessageSquare, ChevronRight, Terminal, Star, Send, Loader2
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Portfolio = () => {
  const [data, setData] = useState({
    about: {}, skills: [], projects: [], experience: [], blogs: [], testimonials: []
  });
  const [loading, setLoading] = useState(true);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  useEffect(() => {
    const fetchAll = async () => {
        
      try {
        const [about, skills, projects, exp, blogs, test] = await Promise.all([
          axios.get(`${API_BASE}/about`),
          axios.get(`${API_BASE}/skills`),
          axios.get(`${API_BASE}/projects`),
          axios.get(`${API_BASE}/experience`),
          axios.get(`${API_BASE}/blogs`),
          axios.get(`${API_BASE}/testimonials`),
        ]);
        setData({
          about: about.data || {},
          skills: skills.data || [],
          projects: projects.data || [],
          experience: exp.data || [],
          blogs: blogs.data || [],
          testimonials: test.data || []
        });
      } catch (err) { console.error("Data fetch failed", err); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE}/contact`, contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  if (loading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-blue-500 font-mono text-2xl">Loading_Portfolio...</div>;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-500/30">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent underline decoration-blue-500/30 cursor-default">
            Dev.Portfolio
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['About', 'Skills', 'Projects', 'Blogs', 'Experience','Testimonials', 'Contact'].map(item => (
              <Link key={item} to={item.toLowerCase()} smooth={true} className="hover:text-blue-400 cursor-pointer transition">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* --- HERO / ABOUT --- */}
      <section id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-blue-500 font-mono mb-4 flex items-center gap-2"> <Terminal size={18}/> Hello World, I'm Ananthakrishnan S </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Crafting Digital <br/> <span className="text-slate-500">Experiences.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              {data.about.bio || "Full-stack developer focused on building scalable and beautiful web applications."}
            </p>
            <div className="flex gap-4">
              <Link to="projects" smooth={true} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition cursor-pointer">
                View Work
              </Link>
              <button className="border border-slate-700 hover:border-blue-500 px-8 py-3 rounded-full font-semibold transition">
                Resume
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={data.about.image_url || "https://via.placeholder.com/500"} 
              className="relative rounded-2xl w-full aspect-square object-cover grayscale hover:grayscale-0 transition duration-500" 
              alt="Profile"
            />
          </div>
        </motion.div>
      </section>

      {/* --- SKILLS --- */}
      <section id="skills" className="py-20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 flex justify-center items-center gap-3">
            <Code className="text-blue-500" /> Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.skills.map((skill, i) => (
              <motion.div whileHover={{ y: -5 }} key={i} className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-xl flex flex-col items-center min-w-[120px]">
                <span className="font-bold text-white">{skill.name}</span>
                <span className="text-xs text-slate-500 uppercase mt-1">{skill.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

         <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <Briefcase className="text-blue-500" /> Selected Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col"
            >
              {/* Image Container */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={project.image_url} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                  alt={project.title} 
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                    onClick={() => setSelectedProject(project)}
                    className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition"
                   >
                     View Project Details
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition"
                  >
                    Read Details <ChevronRight size={16}/>
                  </button>
                  
                  <div className="flex gap-3">
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <ExternalLink size={18}/>
                      </a>
                    )}
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <Github size={18}/>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PROJECT MODAL --- */}
       {/* --- PROJECT MODAL --- */}
<AnimatePresence>
  {selectedProject && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={() => setSelectedProject(null)}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-zoom-out"
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        className="relative bg-[#0f172a] border border-slate-800 w-full max-w-5xl max-h-[90vh] md:h-[600px] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
      >
        {/* Close Button (Styled like your screenshot) */}
        <button 
          onClick={() => setSelectedProject(null)}
          className="absolute top-6 right-6 z-20 p-2 bg-slate-800/50 text-white rounded-full hover:bg-slate-700 transition-colors"
        >
          <ChevronRight className="rotate-180" size={20} />
        </button>

        {/* LEFT SIDE: Image (Fixed to show the whole dashboard) */}
        <div className="w-full md:w-3/5 h-64 md:h-full bg-[#1e293b]/30 flex items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-slate-800/50">
          <motion.img 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            src={selectedProject.image_url} 
            className="w-full h-full object-contain drop-shadow-2xl rounded-xl" 
            alt="Project Preview" 
          />
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="w-full md:w-2/5 flex flex-col h-full bg-[#0a0f1d]">
          <div className="p-8 md:p-10 flex flex-col h-full">
            <h2 className="text-4xl font-bold text-white mb-6">
                {selectedProject.title}
            </h2>
            
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {selectedProject.description}
              </p>
            </div>

            {/* Action Buttons (Styled to match your screenshot) */}
            <div className="flex gap-4 mt-6">
              {selectedProject.live_link && (
                <a 
                  href={selectedProject.live_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20"
                >
                  <ExternalLink size={20}/> Demo
                </a>
              )}
              {selectedProject.github_link && (
                <a 
                  href={selectedProject.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-4 rounded-2xl font-bold transition border border-slate-700"
                >
                  <Github size={20}/> Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
   
      {/* --- BLOGS SECTION --- */}
      <section id="blogs" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <MessageSquare className="text-blue-500" /> Articles & Thoughts
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {data.blogs.map((blog, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors group">
              {blog.image_url && (
                <img 
                  src={blog.image_url} 
                  className="w-full md:w-40 h-40 rounded-xl object-cover grayscale group-hover:grayscale-0 transition duration-500" 
                  alt="Blog" 
                />
              )}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {blog.content}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition w-fit"
                >
                  Read More <ChevronRight size={16}/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- BLOG MODAL --- */}
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm cursor-zoom-out"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-slate-800 text-white rounded-full hover:bg-blue-600 transition"
              >
                <ChevronRight className="rotate-180" size={24} />
              </button>

              {/* Blog Details */}
              <div className="p-8 md:p-12">
                {selectedBlog.image_url && (
                  <img 
                    src={selectedBlog.image_url} 
                    className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 border border-slate-800" 
                    alt="Blog Cover" 
                  />
                )}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    {selectedBlog.title}
                </h2>
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
                    <div>
                        <p className="text-white text-sm font-bold">Ananthakrishnan S</p>
                        <p className="text-slate-500 text-xs">Author • Developer</p>
                    </div>
                </div>
                
                {/* The white-space: pre-wrap is key here for your database content */}
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                  {selectedBlog.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* --- EXPERIENCE --- */}
      {/* <section id="experience" className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center flex justify-center items-center gap-3"><User className="text-blue-500" /> Journey</h2>
          <div className="space-y-8 border-l-2 border-slate-800 pl-8 ml-4">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                <span className="text-sm text-blue-500 font-mono">{exp.duration}</span>
                <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                <h4 className="text-slate-400 font-medium">{exp.company}</h4>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* --- HORIZONTAL EXPERIENCE / JOURNEY --- */}
      <section id="experience" className="py-20 bg-slate-900/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center flex justify-center items-center gap-3">
            <User className="text-blue-500" /> My Journey
          </h2>
          
          {/* Scrollable Container */}
          <div className="relative">
            {/* The Horizontal Line (Background) */}
            <div className="absolute top-[31px] left-0 w-full h-0.5 bg-slate-800 z-0" />

            <div className="flex overflow-x-auto pb-12 gap-0 snap-x no-scrollbar">
              {data.experience.length > 0 ? (
                data.experience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="min-w-[300px] md:min-w-[400px] relative z-10 snap-center pr-8"
                  >
                    {/* The Dot on the timeline */}
                    <div className="w-16 h-16 flex items-center justify-start">
                        <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] border-4 border-slate-950" />
                    </div>

                    {/* Content Card */}
                    <div className="mt-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
                      <span className="text-sm text-blue-500 font-mono font-bold tracking-widest uppercase">
                        {exp.duration}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="text-slate-300 font-medium flex items-center gap-2 mt-1">
                        <Briefcase size={14} className="text-slate-500" /> {exp.company}
                      </h4>
                      <p className="text-slate-500 text-sm mt-4 leading-relaxed italic">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-slate-500 italic w-full text-center">No experience data found.</div>
              )}
            </div>
            
            {/* Hint for scrolling */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
                <div className="text-xs text-slate-600 animate-pulse">Swipe horizontally to view more →</div>
            </div>
          </div>
        </div>

        {/* Custom CSS for hiding scrollbar but keeping functionality */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
      </section>
      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 flex justify-center items-center gap-3">
          <Star className="text-yellow-500" /> Kind Words
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.length > 0 ? (
            data.testimonials.map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl relative flex flex-col justify-between"
              >
                {/* Quote Icon Decoration */}
                <span className="text-6xl absolute top-4 left-6 text-slate-800 pointer-events-none select-none">“</span>
                
                <p className="text-slate-300 relative z-10 italic mb-8 leading-relaxed">
                  {t.feedback || "No feedback provided."}
                </p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-slate-800 pt-6">
                  {/* Handle Base64 Image or Fallback to User Icon */}
                  {t.image_url ? (
                    <img 
                      src={t.image_url} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30" 
                      alt={t.name} 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700">
                      <User size={20} />
                    </div>
                  )}
                  
                  <div className="text-left">
                    {/* Fallback for empty name string */}
                    <div className="text-white font-bold">
                      {t.name && t.name.trim() !== "" ? t.name : "Anonymous Client"}
                    </div>
                    <div className="text-blue-500 text-xs font-medium uppercase tracking-wider">
                      {t.position || "Professional"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-10 text-slate-500 italic">
              Testimonials will appear here once added from the CMS.
            </div>
          )}
        </div>
      </section>

      {/* --- REVISED: CONTACT FORM --- */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Let's build something great.</h2>
            <p className="text-slate-400">Have a question or want to work together?</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                required
                type="text" placeholder="Your Name" 
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-blue-500 outline-none"
                value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
              />
              <input 
                required
                type="email" placeholder="Your Email" 
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-blue-500 outline-none"
                value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
              />
            </div>
            <textarea 
              required
              rows="5" placeholder="Your Message" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-blue-500 outline-none"
              value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
            />
            <button 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin"/> : <Send size={20}/>}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && <p className="text-green-500 text-center font-medium">Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="text-red-500 text-center font-medium">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>© {new Date().getFullYear()} Ananthakrishnan S. Developed with React & Node.js</p>
      </footer>
    </div>
  );
};

export default Portfolio;
