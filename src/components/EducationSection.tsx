import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const educationData = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Your University Name",
    year: "2020 - 2024",
    description: "Specialized in Machine Learning and Computer Vision",
    icon: GraduationCap,
    color: "from-neon-blue to-neon-purple",
  },
  {
    degree: "AI/ML Certification",
    institution: "Online Platform",
    year: "2023",
    description: "Advanced Deep Learning and Neural Networks",
    icon: Award,
    color: "from-neon-purple to-neon-pink",
  },
  {
    degree: "Computer Vision Specialization",
    institution: "Coursera / Stanford",
    year: "2022",
    description: "Image Processing, Object Detection, Pose Estimation",
    icon: BookOpen,
    color: "from-neon-cyan to-neon-blue",
  },
];

const floatingBooks = [
  { delay: 0, x: "10%", y: "20%" },
  { delay: 0.5, x: "80%", y: "15%" },
  { delay: 1, x: "70%", y: "70%" },
  { delay: 1.5, x: "15%", y: "75%" },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Floating Books Animation */}
      {floatingBooks.map((book, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none opacity-20"
          style={{ left: book.x, top: book.y }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            delay: book.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen className="w-12 h-12 text-neon-blue" />
        </motion.div>
      ))}

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
              Education
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic journey in AI and Computer Science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50,
              }}
              className="relative group perspective-1000"
            >
              {/* Holographic Card */}
              <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 overflow-hidden transform-gpu transition-all duration-500 group-hover:border-neon-blue/50">
                {/* Holographic Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Scan Line Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Holographic Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${edu.color} blur-xl opacity-30`} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${edu.color} p-0.5 mb-6`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                      <edu.icon className="w-8 h-8 text-neon-blue" />
                    </div>
                  </motion.div>

                  {/* Year Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm font-medium mb-4">
                    {edu.year}
                  </div>

                  {/* Degree */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-neon-blue transition-colors">
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <p className="text-muted-foreground mb-3">
                    {edu.institution}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground/70 text-sm">
                    {edu.description}
                  </p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-neon-blue/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-neon-blue/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
