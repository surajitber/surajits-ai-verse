import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "Understanding OpenPose: A Deep Dive into Human Pose Estimation",
    excerpt: "Explore the architecture and implementation details of OpenPose for real-time multi-person pose detection.",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    tags: ["Computer Vision", "Deep Learning"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    title: "Building Emotion Detection Systems with CNN",
    excerpt: "Learn how to build a real-time emotion detection system using Convolutional Neural Networks and facial landmarks.",
    date: "Dec 5, 2024",
    readTime: "12 min read",
    tags: ["AI", "CNN", "Emotion AI"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    title: "Getting Started with YOLOv8 for Object Detection",
    excerpt: "A comprehensive guide to implementing YOLOv8 for real-time object detection in your projects.",
    date: "Nov 28, 2024",
    readTime: "10 min read",
    tags: ["YOLO", "Object Detection"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    gradient: "from-neon-cyan to-neon-blue",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Blog & Articles
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sharing insights, tutorials, and discoveries in AI and Computer Vision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-neon-blue/50 group-hover:shadow-lg group-hover:shadow-neon-blue/10">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80`} />
                  
                  {/* Floating Tags */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-neon-blue/20 text-neon-blue border border-neon-blue/30 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-neon-blue transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-neon-blue hover:text-neon-purple hover:bg-transparent group/btn"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
