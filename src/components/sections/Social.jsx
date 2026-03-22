import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';

const socialLinks = [
  {
    name: 'Dribbble',
    href: 'https://dribbble.com/trionndesign',
    icon: '/assets/images/socials/dribble.svg'
  },
  {
    name: 'LinkedIn',
    href: 'http://www.linkedin.com/company/2715714',
    icon: '/assets/images/socials/linkedin.svg'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/trionndesign/',
    icon: '/assets/images/socials/instagram.svg'
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/TrionnDesign',
    icon: '/assets/images/socials/behance.svg'
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/trionnagency/',
    icon: '/assets/images/socials/facebook.svg'
  }
];

const Social = () => {
  return (
    <section className="tr__section tr__social py-40 lg:py-60">
      <div className="tr__container max-w-4xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="tr__section__title mb-20 lg:mb-32">
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black leading-tight"
          >
            join our <br />jungle <br /> trek
          </motion.h3>
        </div>

        {/* Social Links */}
        <div className="space-y-8 lg:space-y-12">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="tr__social__item tr__cursor__hoverable block group"
            >
              <div className="flex items-center justify-between py-6 px-4 lg:px-8 border-b border-white/10 hover:border-white/30 transition-all duration-500">
                <h2 className="text-3xl lg:text-4xl font-bold group-hover:translate-x-4 transition-transform duration-500">
                  {social.name}
                </h2>
                <motion.img 
                  src={social.icon}
                  alt={social.name}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;