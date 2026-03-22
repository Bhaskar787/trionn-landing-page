
import { motion } from 'framer-motion';
import Magnetic from '../common/Magnetic';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="tr__footer relative pb-20 lg:pb-32">
      <div className="tr__footer__wrapper">
        
        {/* CTA Section */}
        <div className="tr__section__title tr__container max-w-7xl mx-auto px-4 mb-20 lg:mb-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <motion.h3 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl lg:text-7xl font-black leading-tight"
            >
              time to <br /> roar!
            </motion.h3>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="tr__section__title__right"
            >
              <Magnetic>
                <Button href="/contact" className="tr__cursor__hoverable !bg-gradient-to-r !from-orange-500 !to-pink-500 !border-orange-400 hover:!from-orange-600 hover:!to-pink-600 mb-0">
                  Let's talk!
                </Button>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Mobile CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="tr__container max-w-7xl mx-auto px-4 lg:hidden mb-16"
        >
          <Magnetic>
            <Button href="/contact" className="tr__cursor__hoverable w-full lg:w-auto mx-auto block max-w-md !bg-gradient-to-r !from-orange-500 !to-pink-500">
              Let's talk!
            </Button>
          </Magnetic>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="tr__container max-w-7xl mx-auto px-4 mb-16 lg:mb-24"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </motion.div>

        {/* Contact Info */}
        <div className="tr__container max-w-7xl mx-auto px-4">
          <div className="tr__footer__contact grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 lg:mb-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="tr__footer__contact__block"
            >
              <span className="text-sm uppercase tracking-wider opacity-75 mb-2 block">Email</span>
              <h4 className="text-2xl font-bold">
                <Magnetic>
                  <a href="mailto:hello@trionn.com" className="tr__cursor__hoverable hover:text-orange-400 transition-colors">
                    hello@trionn.com
                  </a>
                </Magnetic>
              </h4>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="tr__footer__contact__block"
            >
              <span className="text-sm uppercase tracking-wider opacity-75 mb-2 block">Call</span>
              <h4 className="text-2xl font-bold">
                <Magnetic>
                  <a href="tel:+919824182099" className="tr__cursor__hoverable hover:text-orange-400 transition-colors">
                    +91 98241 82099
                  </a>
                </Magnetic>
              </h4>
            </motion.div>

            <div className="hidden xl:block" /> {/* Spacer */}

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="tr__footer__contact__block lg:text-right"
            >
              <span className="text-sm uppercase tracking-wider opacity-75 mb-2 block">Teams</span>
              <h4 className="text-2xl font-bold">
                <Magnetic>
                  <a href="https://teams.live.com/l/invite/FEAyRbepvsvnUG_8QE" className="tr__cursor__hoverable hover:text-orange-400 transition-colors">
                    Talk to Trionn
                  </a>
                </Magnetic>
              </h4>
            </motion.div>
          </div>

          {/* Final Divider */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-12 lg:mb-16"
          />
        </div>

        {/* Copyright */}
        <div className="tr__container max-w-7xl mx-auto px-4">
          <div className="tr__footer__copyright flex flex-col lg:flex-row justify-between items-center py-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg opacity-75 mb-4 lg:mb-0"
            >
              © 2025 TRIONN<sup className="text-xl text-orange-400">®</sup>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center"
            >
              <Magnetic>
                <a href="#top" className="tr__cursor__hoverable p-4 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Logo Masking */}
      <div className="tr__masking fixed bottom-0 left-0 w-full h-32 lg:h-40 pointer-events-none z-40">
        <div className="tr__masking__wrapper h-full flex items-end">
          <motion.img 
            src="/_next/static/media/footer-logo.7dd398e2.svg"
            alt="TRIONN"
            className="w-full h-24 lg:h-32 object-contain opacity-10"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;