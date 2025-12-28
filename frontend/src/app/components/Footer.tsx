'use client'

// import * as React from "react";
// import { motion } from "framer-motion";
// import { Facebook, Instagram, Twitter, Youtube, ArrowUp } from "lucide-react";

// const socialLinks = [
//   { icon: Facebook, href: "#", label: "Facebook" },
//   { icon: Instagram, href: "#", label: "Instagram" },
//   { icon: Twitter, href: "#", label: "Twitter" },
//   { icon: Youtube, href: "#", label: "YouTube" },
// ];

// const footerLinks = {
//   explore: [
//     { name: "Our Menu", href: "#menu" },
//     { name: "About Us", href: "#about" },
//     { name: "Gallery", href: "#gallery" },
//     { name: "Private Events", href: "#" },
//   ],
//   support: [
//     { name: "Contact", href: "#contact" },
//     { name: "Reservations", href: "#" },
//     { name: "Gift Cards", href: "#" },
//     { name: "Careers", href: "#" },
//   ],
// };

// export const Footer: React.FC = () => {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="bg-charcoal pt-10 pb-4">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
//           {/* Brand */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <h3 className="text-3xl font-display font-bold text-gradient-gold mb-4">
//               La Maison
//             </h3>
//             <p className="text-muted-foreground mb-3 leading-relaxed">
//               Experience the art of fine dining in an atmosphere of timeless elegance.
//               Every meal is a celebration.
//             </p>
//             <div className="flex gap-3">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//                 >
//                   <social.icon className="h-5 w-5" />
//                 </a>
//               ))}
//             </div>
//           </motion.div>

//           {/* Explore Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//           >
//             <h4 className="text-lg font-display font-semibold text-foreground mb-3">
//               Explore
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.explore.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     className="text-muted-foreground hover:text-primary transition-colors"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Support Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <h4 className="text-lg font-display font-semibold text-foreground mb-3">
//               Support
//             </h4>
//             <ul className="space-y-3">
//               {footerLinks.support.map((link) => (
//                 <li key={link.name}>
//                   <a
//                     href={link.href}
//                     className="text-muted-foreground hover:text-primary transition-colors"
//                   >
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Opening Hours */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <h4 className="text-lg font-display font-semibold text-foreground mb-3">
//               Opening Hours
//             </h4>
//             <ul className="space-y-3 text-muted-foreground">
//               <li className="flex justify-between">
//                 <span>Monday - Thursday</span>
//                 <span className="text-foreground">5pm - 10pm</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Friday</span>
//                 <span className="text-foreground">5pm - 11pm</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Saturday</span>
//                 <span className="text-foreground">12pm - 11pm</span>
//               </li>
//               <li className="flex justify-between">
//                 <span>Sunday</span>
//                 <span className="text-foreground">12pm - 9pm</span>
//               </li>
//             </ul>
//           </motion.div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//           <p className="text-muted-foreground text-sm text-center md:text-left">
//             © {new Date().getFullYear()} La Maison. All rights reserved.
//           </p>
          
//           <div className="flex items-center gap-6 text-sm text-muted-foreground">
//             <a href="#" className="hover:text-foreground transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-foreground transition-colors">
//               Terms of Service
//             </a>
//           </div>

//           <button
//             onClick={scrollToTop}
//             className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
//             aria-label="Scroll to top"
//           >
//             <ArrowUp className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// };

import React from 'react'
import { AIAssistant } from './AI-Assistant'

export default function Footer() {
  return (
    <AIAssistant />
  )
}
