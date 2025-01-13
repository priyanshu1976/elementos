import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Image from 'next/image'
import { FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

export function SpeakersSection() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.CircleGeometry(0.5, 32),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.ConeGeometry(0.5, 0.8, 3) // Triangle
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0xFFFFFF, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xFF1493, 
        wireframe: true,
        transparent: true,
        opacity: 0.8
      })
    ];

    // Create more shapes in a larger grid
    for (let i = -10; i < 10; i++) {
      for (let j = -10; j < 10; j++) {
        const geometryIndex = Math.floor(Math.random() * geometries.length);
        const materialIndex = Math.floor(Math.random() * materials.length);
        
        const shape = new THREE.Mesh(geometries[geometryIndex], materials[materialIndex]);
        
        // Position in grid with some randomization
        shape.position.x = i * 1.5 + (Math.random() - 0.5);
        shape.position.y = j * 1.5 + (Math.random() - 0.5);
        shape.position.z = (Math.random() - 0.5) * 5;

        // Random rotation
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;

        // Add custom properties for animation
        shape.userData = {
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          floatSpeed: Math.random() * 0.005,
          floatOffset: Math.random() * Math.PI * 2,
          originalY: shape.position.y
        };

        shapes.push(shape);
        scene.add(shape);
      }
    }

    camera.position.z = 15;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      shapes.forEach((shape) => {
        // Rotation animation
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.rotationSpeed;

        // Floating animation
        shape.position.y = shape.userData.originalY + Math.sin(time + shape.userData.floatOffset) * 0.3;
      });

      // Slowly rotate entire scene
      scene.rotation.y += 0.001;
      scene.rotation.x = Math.sin(time * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      shapes.forEach(shape => {
        scene.remove(shape);
        shape.geometry.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach(m => m.dispose());
        } else {
          shape.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  const speakers = [
    {
      name: "YASH AWIDRA",
      role: "Software Engineer@Mercedes-Benz | 200K+ @LinkedIn | Career & LinkedIn Coach | Stand-up comedian",
      description: "A multifaceted professional, he excels as a Software Engineer at Mercedes-Benz, a Career & LinkedIn Coach, and a passionate advocate for personal branding. Also a Stand-up Comedian, Teacher, Public Speaker, and Author, he shares valuable insights on career growth and personal development with humor and authenticity.",
      image: "/yash.jpg",
      linkedin: "https://www.linkedin.com/in/yash-awidra-63a4b21a6/"
    },
    {
      name: "VIKRAM GAUR",
      role: "LinkedIn Top Voice '24 | Google Cloud Facilitator | SDE @ EY",
      description: "Vikram Gaur is a LinkedIn Top Voice 2024, SDE at EY, and a Google Cloud Certified Engineer, blending expertise in cloud computing with a passion for tech communities. As a Google Cloud Facilitator and active member of GDG Indore and GirlScript Ireland, he inspires and empowers developers worldwide.",
      image: "/vikram.jpg",
      linkedin: "https://www.linkedin.com/in/vikram-gaur-0252aa185/"
    },
  ]

  return (
    <section id="speakers" className="relative bg-black">
      {/* Three.js canvas container */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 -z-10 bg-black"
        style={{ 
          opacity: 1,
          backgroundImage: 'radial-gradient(circle at center, rgba(255,20,147,0.2) 0%, rgba(0,0,0,1) 70%)'
        }}
      />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 md:py-24 relative"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 relative inline-block"
          >
            Meet Our{" "}
            <span className="text-[#FF0B7B] relative">
              Speakers
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-2 left-0 h-1 bg-[#FF0B7B]/30"
              ></motion.div>
            </span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          >
            Learn from the best in the industry, with a touch of humor and expertise.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05 }}
              className="group relative overflow-hidden"
            >
              {/* Card Background with Gradient and Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] transform transition-all duration-500 group-hover:scale-105">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#FF0B7B]/5"></div>
              </div>
              
              {/* Animated Border Effect */}
              <div className="absolute inset-0 border-2 border-[#FF0B7B]/30 rounded-2xl">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#FF0B7B]/0 via-[#FF0B7B]/20 to-[#FF0B7B]/0 animate-shimmer"></div>
              </div>
              
              {/* Content Container */}
              <div className="relative p-8 rounded-2xl backdrop-blur-sm">
                {/* Speaker Image with Animation - Removed glow effect */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 relative group"
                >
                  {/* Profile image container - Simplified */}
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#FF0B7B]/50 transform transition-all duration-300 group-hover:scale-110 relative z-10">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                    />
                  </div>
                </motion.div>

                {/* Speaker Info with Enhanced Animations */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center relative"
                >
                  {/* Animated Name with Glow Effect */}
                  <motion.h3 
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold text-white mb-2 relative inline-block"
                  >
                    <span className="relative z-10 group-hover:text-[#FF0B7B] transition-colors duration-300">
                      {speaker.name}
                    </span>
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF0B7B] to-transparent"
                    />
                  </motion.h3>

                  {/* Animated Role with Slide Effect */}
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-[#FF0B7B] text-sm font-medium mb-4 transform transition-all duration-300 group-hover:scale-105"
                  >
                    {speaker.role}
                  </motion.p>

                  {/* Description with Fade Effect */}
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-gray-400 text-sm leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-300"
                  >
                    {speaker.description}
                  </motion.p>

                  {/* Enhanced LinkedIn Button */}
                  <motion.a
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,11,123,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF0B7B] via-pink-500 to-[#FF0B7B] text-white px-6 py-3 rounded-full text-sm font-bold 
                               shadow-[0_0_15px_rgba(255,11,123,0.3)] 
                               transition-all duration-300"
                  >
                    <FaLinkedin className="text-lg animate-bounce" />
                    <span className="relative inline-block">
                      Connect on LinkedIn
                      <motion.div
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-0 left-0 h-[1px] bg-white/50"
                      />
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default SpeakersSection;
