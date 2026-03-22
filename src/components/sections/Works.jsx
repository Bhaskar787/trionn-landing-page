
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';
import { worksData } from '../../data/works'; // ✅ Import from data file

const Works = () => {
  return (
    <section id="works" className="tr__section tr__home__works relative py-40 lg:py-60 overflow-hidden">
      <div className="tr__container max-w-7xl mx-auto px-4">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tr__section__title flex flex-col lg:flex-row justify-between items-start lg:items-center mb-24 lg:mb-32 gap-12"
        >
          <div className="tr__section__title__left flex-1">
            <motion.h3 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl lg:text-7xl font-black mb-8 leading-tight"
            >
              recent <br className="lg:block hidden" /> work
            </motion.h3>
            <motion.h4 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-light max-w-2xl leading-relaxed"
            >
              In the creative wilderness, <br />clients find our work truly <br className="lg:block hidden" />beloved.
            </motion.h4>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="tr__section__title__right flex-shrink-0"
          >
            <Magnetic>
              <Button href="/work" className="tr__cursor__hoverable">
                Explore work
              </Button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {worksData.slice(0, 3).map((work, index) => ( // ✅ Show only first 3
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="tr__work group cursor-pointer"
              whileHover={{ y: -10 }} // ✅ Added smooth hover lift
            >
              
              {/* Work Info */}
              <div className="tr__work__info mb-12 lg:mb-16">
                <div className="space-y-6">
                  
                  {/* Title */}
                  <div className="tr__work__info__row">
                    <Magnetic>
                      <a 
                        href={work.link} 
                        className="tr__cursor__hoverable inline-block group-hover:translate-y-[-2px] transition-all duration-300"
                      >
                        <motion.h2 
                          className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 group-hover:from-orange-400 group-hover:to-orange-500 transition-all duration-500 leading-tight"
                          whileHover={{ scale: 1.02 }}
                        >
                          {work.title}
                        </motion.h2>
                      </a>
                    </Magnetic>
                  </div>

                  {/* Description */}
                  <div className="tr__work__info__row">
                    <motion.p 
                      className="text-xl opacity-75 leading-relaxed max-w-md"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {work.description}
                    </motion.p>
                  </div>

                  {/* CTA */}
                  <div className="tr__work__info__row">
                    <Magnetic>
                      <Button href={work.link} className="tr__cursor__hoverable w-full lg:w-auto">
                        View project →
                      </Button>
                    </Magnetic>
                  </div>
                </div>
              </div>

              {/* Work Image */}
              <motion.div 
                className="tr__work__image overflow-hidden rounded-3xl group-hover:rounded-2xl transition-all duration-700 relative bg-gradient-to-br from-gray-900/50 to-transparent"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <a href={work.link} className="tr__cursor__hoverable block relative z-10">
                  <motion.div 
                    className="relative w-full h-80 lg:h-96 overflow-hidden"
                  >
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 hover:brightness-110"
                      loading="lazy"
                    />
                    
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm" />
                    
                    {/* Category badge */}
                    <motion.div 
                      className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl text-sm font-bold border border-white/30 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/30"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {work.category}
                    </motion.div>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA + View All */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-32 lg:hidden pt-16 border-t border-white/10"
        >
          <Magnetic>
            <Button href="/work" className="tr__cursor__hoverable mx-auto max-w-sm">
              View all work →
            </Button>
          </Magnetic>
        </motion.div>

        {/* Desktop View All (Hidden on Mobile) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden lg:block text-center mt-24 pt-16 border-t border-white/10"
        >
          <Magnetic>
            <Button href="/work" className="tr__cursor__hoverable mx-auto">
              View all projects
            </Button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Background elements - Enhanced */}
      <div className="absolute top-1/4 right-0 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-radial from-orange-500/5 via-transparent to-orange-500/2 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-radial from-purple-500/5 via-transparent to-purple-500/2 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 lg:w-60 lg:h-60 border border-white/5 rounded-full -z-10 animate-ping" />
    </section>
  );
};

export default Works;