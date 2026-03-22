
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';

const dribbblePosts = [
  '/assets/images/dribbble/dribbble1.webp',
  '/assets/images/dribbble/dribbble2.webp',
  '/assets/images/dribbble/dribbble3.webp',
  '/assets/images/dribbble/dribbble4.webp',
  '/assets/images/dribbble/dribbble5.webp',
  '/assets/images/dribbble/dribbble6.webp'
];

const Dribbble = () => {
  return (
    <section id="tr__home__dribbble" className="tr__section py-40 lg:py-60">
      <div className="tr__container max-w-7xl mx-auto px-4">
        <div className="tr__home__dribbble__container">
          
          {/* Left Content */}
          <div className="tr__home__dribbble__wrapper max-w-4xl mb-20 lg:mb-0">
            
            {/* Dribbble Logo */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-16 lg:mb-20"
            >
              <img 
                src="/_next/static/media/dribbble.1a51ca99.webp" 
                alt="Dribbble" 
                className="w-48 lg:w-60 h-auto mx-auto lg:mx-0"
              />
            </motion.div>

            {/* Section Title */}
            <div className="tr__section__title mb-16 lg:mb-20">
              <motion.h4 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-2xl lg:text-4xl font-light leading-tight max-w-2xl"
              >
                Like a lion's roar echoing through <br />the jungle, a hint of our creative <br />minds emerges.
              </motion.h4>
            </div>

            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center lg:text-left"
            >
              <Magnetic>
                <Button href="https://dribbble.com/trionndesign" isExternal className="tr__cursor__hoverable mx-auto lg:mx-0">
                  View Dribbble
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Dribbble Posts Grid */}
          <div className="tr__home__dribbble__posts grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dribbblePosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotate: index % 2 === 0 ? -2 : 2
                }}
                className={`tr__home__dribbble__post tr__home__dribbble__post__${index + 1} overflow-hidden rounded-2xl group relative cursor-pointer`}
              >
                <img 
                  src={post} 
                  alt={`Dribbble post ${index + 1}`}
                  className="w-full h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* View button */}
                <motion.div 
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Button className="!px-8 !py-3 !text-sm tr__cursor__hoverable">
                    View
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dribbble;