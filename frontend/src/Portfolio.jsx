import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  Github, ExternalLink, Mail, Code, User, Briefcase,
  MessageSquare, ChevronRight, Terminal, Star, Send, Loader2
} from 'lucide-react';
import { AnimatePresence } from "framer-motion";

// ─── HARDCODED DATA FROM RESUME ───────────────────────────────────────────────

const ABOUT = {
  name: "Ananthakrishnan S",
  tagline: "Full-Stack Developer & AI Enthusiast",
  bio: "A passionate and driven full stack developer with a strong focus on building intelligent systems that address real-world challenges. Skilled in full-stack web development, machine learning, and database design, with a proven ability to integrate software engineering and AI to deliver innovative, user-centric solutions.",
  email: "ananthakrishnans075@gmail.com",
  phone: "9656538685",
  linkedin: "https://linkedin.com/in/ANANTHAKRISHNAN-S",
  github: "https://github.com/ArjunAK1234",
  image_url: "https://via.placeholder.com/500",
};

const SKILLS = [
  { name: "Python",       category: "Language" },
  { name: "JavaScript",   category: "Language" },
  { name: "Go",           category: "Language" },
  { name: "PHP",          category: "Language" },
  { name: "C / C++",      category: "Language" },
  { name: "Java",         category: "Language" },
  { name: "SQL",          category: "Language" },
  { name: "React",        category: "Frontend" },
  { name: "Angular",      category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js",      category: "Backend" },
  { name: "Express.js",   category: "Backend" },
  { name: "Flask",        category: "Backend" },
  { name: "Go / Gin",     category: "Backend" },
  { name: "MySQL",        category: "Database" },
  { name: "PostgreSQL",   category: "Database" },
  { name: "MongoDB",      category: "Database" },
  { name: "Firebase",     category: "Database" },
  { name: "Flutter",      category: "Mobile" },
  { name: "Android Studio", category: "Mobile" },
  { name: "GCP",          category: "Cloud" },
  { name: "Vercel",       category: "Cloud" },
  { name: "Postman",      category: "Tools" },
  { name: "DroneKit",     category: "IoT / Robotics" },
  { name: "MAVLink",      category: "IoT / Robotics" },
];

const PROJECTS = [
  {
    title: "Autonomous GPS-Based Delivery Drone",
    description:
      "Developed an autonomous GPS-based delivery drone using Pixhawk 2.4.8 for automated navigation, payload drop, and return-to-home operation. Implemented a mobile web interface to send real-time GPS coordinates and trigger autonomous delivery missions. Designed Python-based flight control using DroneKit and MAVLink with a servo-based payload release mechanism.",
    tags: ["Python", "DroneKit", "PyMAVLink", "Flask", "JavaScript", "Pixhawk", "GPS", "IoT"],
    date: "December 2025",
    image_url: "https://via.placeholder.com/600x400?text=Delivery+Drone",
    github_link: "",
    live_link: "",
  },
  {
    title: "ACM Recruitment Portal",
    description:
      "Built a full-stack recruitment portal using React + Tailwind CSS (Frontend) and PHP + PostgreSQL (Backend) with secure REST APIs, authentication, role-based access, task management, submissions, and application status tracking. Implemented admin and student dashboards with a complete recruitment workflow and responsive UI.",
    tags: ["React", "Tailwind CSS", "PHP", "PostgreSQL", "REST API"],
    date: "July 2025",
    image_url: "https://via.placeholder.com/600x400?text=ACM+Portal",
    github_link: "",
    live_link: "",
  },
  {
    title: "Learning Management System",
    description:
      "Developed a Learning Management System for students where teachers can create courses, assignments, and quizzes, monitor student progress, grade assignments, and add points. Students can view courses, download resources, submit assignments, view grades, attend quizzes, and track their own progress.",
    tags: ["Go", "React", "MongoDB", "Express", "Firebase"],
    date: "May 2025",
    image_url: "https://via.placeholder.com/600x400?text=LMS",
    github_link: "",
    live_link: "",
  },
  {
    title: "Parkinson's Disease Monitoring System (IoT)",
    description:
      "Developed an IoT-based Parkinson's monitoring wearable device that records tremor data continuously and sends it to a mobile app used by caretakers or family members. High tremor events are saved to the cloud with immediate alerts dispatched.",
    tags: ["C", "Flutter", "Firebase", "ESP32", "IoT Sensors"],
    date: "April 2025",
    image_url: "https://via.placeholder.com/600x400?text=Parkinsons+IoT",
    github_link: "",
    live_link: "",
  },
  {
    title: "Train Ticket Booking Website",
    description:
      "Developed a mock train ticket booking website featuring OTP-based user authentication, train search and filtering, ticket booking with passenger detail management, a simulated payment workflow, and automatic generation of downloadable e-tickets — a complete end-to-end booking experience.",
    tags: ["HTML", "CSS", "JavaScript", "MongoDB", "Express"],
    date: "December 2024",
    image_url: "https://via.placeholder.com/600x400?text=Train+Booking",
    github_link: "",
    live_link: "",
  },
  {
    title: "Teacher Points Portal",
    description:
      "Developed a Teacher Points Portal using Go, Gin, and MongoDB to manage events, roles, and teacher assignments with auto-allocation, personalized dashboards, leaderboard tracking, notifications, and CSV report generation.",
    tags: ["Go", "Gin", "React", "MongoDB"],
    date: "September 2024",
    image_url: "https://via.placeholder.com/600x400?text=Teacher+Portal",
    github_link: "",
    live_link: "",
  },
];

const EXPERIENCE = [
  {
    role: "Flutter Intern",
    company: "Amrita CREATE",
    duration: "July 2025 – Present",
    description:
      "Migrated the legacy Indian Sign Language web platform into a cross-platform mobile application using Flutter. Designed and implemented an accessibility-first UI tailored for the hard-of-hearing community. Developed interactive sign language learning modules and educational mini-games.",
  },
  {
    role: "Project Trainee",
    company: "Kerala Water Authority (PHD, Kollam)",
    duration: "Oct 2025 – Nov 2025",
    description:
      "Developed Smart Automated Pumping System (SAPS) for automated water pump control and monitoring. Performed system requirement analysis, module design, implementation, testing, and documentation. Implemented SMS-based monitoring for real-time system status updates.",
  },
  {
    role: "Web Master & Treasurer",
    company: "ACM Student Chapter, Amrita",
    duration: "Oct 2023 – Present",
    description:
      "Managing club websites and server-side infrastructure. Active app and web development member.",
  },
];

const BLOGS = [
  {
    title: "NASA Space Apps Challenge 2024",
    content:
      "Developed a website for displaying details of Geomagnetic Storms and sending location-based alerts to users. The project combined real-time space weather data with a clean web interface to raise awareness of solar activity impacts.",
    image_url: "",
  },
  {
    title: "ACM Summer School 2025",
    content:
      "Coordinated the ACM Summer School program, managing sessions and logistics to ensure smooth execution. Taught Python fundamentals to school students, introducing programming concepts through hands-on exercises, and guided students in developing problem-solving skills and building a strong foundation in computer science.",
    image_url: "",
  },
];

const TESTIMONIALS = [];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const Portfolio = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Replace with your real contact endpoint if needed
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // await axios.post(`${API_BASE}/contact`, contactForm);
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-blue-500/30">

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent underline decoration-blue-500/30 cursor-default">
            Dev.Portfolio
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {['About', 'Skills', 'Projects', 'Blogs', 'Experience', 'Testimonials', 'Contact'].map(item => (
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
            <h2 className="text-blue-500 font-mono mb-4 flex items-center gap-2">
              <Terminal size={18} /> Hello World, I'm {ABOUT.name}
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Crafting Digital <br /> <span className="text-slate-500">Experiences.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              {ABOUT.bio}
            </p>
            <div className="flex gap-4">
              <Link to="projects" smooth={true} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition cursor-pointer">
                View Work
              </Link>
              <a href={ABOUT.github} target="_blank" rel="noopener noreferrer" className="border border-slate-700 hover:border-blue-500 px-8 py-3 rounded-full font-semibold transition flex items-center gap-2">
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src={ABOUT.image_url}
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
            {SKILLS.map((skill, i) => (
              <motion.div whileHover={{ y: -5 }} key={i} className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-xl flex flex-col items-center min-w-[120px]">
                <span className="font-bold text-white">{skill.name}</span>
                <span className="text-xs text-slate-500 uppercase mt-1">{skill.category}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <Briefcase className="text-blue-500" /> Selected Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group flex flex-col"
            >
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
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-blue-500 font-mono mb-1">{project.date}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, t) => (
                    <span key={t} className="text-xs bg-slate-800 text-blue-400 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition"
                  >
                    Read Details <ChevronRight size={16} />
                  </button>
                  <div className="flex gap-3">
                    {project.live_link && (
                      <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <ExternalLink size={18} />
                      </a>
                    )}
                    {project.github_link && (
                      <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PROJECT MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-zoom-out"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="relative bg-[#0f172a] border border-slate-800 w-full max-w-5xl max-h-[90vh] md:h-[600px] overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-20 p-2 bg-slate-800/50 text-white rounded-full hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight className="rotate-180" size={20} />
                </button>
                <div className="w-full md:w-3/5 h-64 md:h-full bg-[#1e293b]/30 flex items-center justify-center p-4 md:p-8 border-b md:border-b-0 md:border-r border-slate-800/50">
                  <motion.img
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    src={selectedProject.image_url}
                    className="w-full h-full object-contain drop-shadow-2xl rounded-xl"
                    alt="Project Preview"
                  />
                </div>
                <div className="w-full md:w-2/5 flex flex-col h-full bg-[#0a0f1d]">
                  <div className="p-8 md:p-10 flex flex-col h-full">
                    <div className="text-blue-500 font-mono text-sm mb-2">{selectedProject.date}</div>
                    <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {selectedProject.tags.map((tag, t) => (
                        <span key={t} className="text-xs bg-slate-800 text-blue-400 px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="flex-grow overflow-y-auto pr-2">
                      <p className="text-slate-400 text-base leading-relaxed">{selectedProject.description}</p>
                    </div>
                    <div className="flex gap-4 mt-6">
                      {selectedProject.live_link && (
                        <a href={selectedProject.live_link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20">
                          <ExternalLink size={20} /> Demo
                        </a>
                      )}
                      {selectedProject.github_link && (
                        <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-4 rounded-2xl font-bold transition border border-slate-700">
                          <Github size={20} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* --- BLOGS --- */}
      <section id="blogs" className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <MessageSquare className="text-blue-500" /> Articles & Thoughts
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {BLOGS.map((blog, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-colors group">
              {blog.image_url && (
                <img src={blog.image_url} className="w-full md:w-40 h-40 rounded-xl object-cover grayscale group-hover:grayscale-0 transition duration-500" alt="Blog" />
              )}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">{blog.content}</p>
                </div>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="text-blue-400 text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition w-fit"
                >
                  Read More <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BLOG MODAL */}
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedBlog(null)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm cursor-zoom-out" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl no-scrollbar">
              <button onClick={() => setSelectedBlog(null)} className="absolute top-6 right-6 z-10 p-2 bg-slate-800 text-white rounded-full hover:bg-blue-600 transition">
                <ChevronRight className="rotate-180" size={24} />
              </button>
              <div className="p-8 md:p-12">
                {selectedBlog.image_url && <img src={selectedBlog.image_url} className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8 border border-slate-800" alt="Blog Cover" />}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{selectedBlog.title}</h2>
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">A</div>
                  <div>
                    <p className="text-white text-sm font-bold">Ananthakrishnan S</p>
                    <p className="text-slate-500 text-xs">Author · Developer</p>
                  </div>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-serif">{selectedBlog.content}</p>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* --- EXPERIENCE --- */}
      <section id="experience" className="py-20 bg-slate-900/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center flex justify-center items-center gap-3">
            <User className="text-blue-500" /> My Journey
          </h2>
          <div className="relative">
            <div className="absolute top-[31px] left-0 w-full h-0.5 bg-slate-800 z-0" />
            <div className="flex overflow-x-auto pb-12 gap-0 snap-x no-scrollbar">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[300px] md:min-w-[400px] relative z-10 snap-center pr-8"
                >
                  <div className="w-16 h-16 flex items-center justify-start">
                    <div className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] border-4 border-slate-950" />
                  </div>
                  <div className="mt-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
                    <span className="text-sm text-blue-500 font-mono font-bold tracking-widest uppercase">{exp.duration}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                    <h4 className="text-slate-300 font-medium flex items-center gap-2 mt-1">
                      <Briefcase size={14} className="text-slate-500" /> {exp.company}
                    </h4>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed italic">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4 md:hidden">
              <div className="text-xs text-slate-600 animate-pulse">Swipe horizontally to view more →</div>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}` }} />
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 flex justify-center items-center gap-3">
          <Star className="text-yellow-500" /> Kind Words
        </h2>
        {TESTIMONIALS.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl relative flex flex-col justify-between">
                <span className="text-6xl absolute top-4 left-6 text-slate-800 pointer-events-none select-none">"</span>
                <p className="text-slate-300 relative z-10 italic mb-8 leading-relaxed">{t.feedback}</p>
                <div className="flex items-center gap-4 mt-auto border-t border-slate-800 pt-6">
                  {t.image_url ? (
                    <img src={t.image_url} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30" alt={t.name} />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 border border-slate-700"><User size={20} /></div>
                  )}
                  <div className="text-left">
                    <div className="text-white font-bold">{t.name || "Anonymous Client"}</div>
                    <div className="text-blue-500 text-xs font-medium uppercase tracking-wider">{t.position || "Professional"}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-slate-500 italic">Testimonials will appear here once added.</div>
        )}
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Let's build something great.</h2>
            <p className="text-slate-400">Have a question or want to work together?</p>
            <p className="text-slate-500 text-sm mt-2">{ABOUT.email} · {ABOUT.phone}</p>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input required type="text" placeholder="Your Name" className="bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-blue-500 outline-none" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
              <input required type="email" placeholder="Your Email" className="bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-blue-500 outline-none" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
            </div>
            <textarea required rows="5" placeholder="Your Message" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:border-blue-500 outline-none" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
            <button disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2">
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && <p className="text-green-500 text-center font-medium">Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="text-red-500 text-center font-medium">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a href={ABOUT.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><Github size={20} /></a>
          <a href={`mailto:${ABOUT.email}`} className="hover:text-white transition"><Mail size={20} /></a>
        </div>
        <p>© {new Date().getFullYear()} Ananthakrishnan S. Developed with React & Node.js</p>
      </footer>
    </div>
  );
};

export default Portfolio;
