
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';

const About = () => {
  return (
    <section className="tr__section tr__home__about py-40 lg:py-60 bg-gradient-to-b from-black to-black/50">
      <div className="tr__container max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="tr__section__title mb-20 lg:mb-32">
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black leading-tight mb-0"
          >
            who <br /> we are
          </motion.h3>
        </div>

        {/* Content Container */}
        <div className="tr__home__about__container grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Main Description */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="-mt-16 lg:-mt-20 mb-16 lg:mb-0"
          >
            <h2 className="text-4xl lg:text-6xl font-black mb-12 lg:mb-16 leading-tight">
              As an award-winning agency within the digital jungle, TRIONN<sup className="text-3xl text-orange-400">®</sup> transcends aesthetics, crafting your vision into a legacy that endures.
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl max-w-lg leading-relaxed opacity-90 mb-12"
            >
              We roar with creativity, staying updated with the latest tech to make your brand a formidable force in the digital wilderness and deliver exceptional website and app experiences.
            </motion.p>

            <Magnetic>
              <Button href="/about" className="tr__cursor__hoverable">
                About us
              </Button>
            </Magnetic>
          </motion.div>

          {/* Stats / Visual Element */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-orange-500/10 via-white/5 to-purple-500/10 rounded-3xl backdrop-blur-xl border border-white/10 p-12 lg:p-16 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 mb-8">
                  20+
                </div>
                <p className="text-xl opacity-75 uppercase tracking-wider">Years Roaring</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-xl" />
            <div className="absolute -bottom-8 left-10 w-24 h-24 bg-gradient-radial from-purple-500/20 to-transparent rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;