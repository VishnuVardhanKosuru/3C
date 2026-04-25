import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { AIAssistant } from '../components/AIAssistant';

export default function AIPage() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.45 }}
      >
        <div className="glass-panel p-6 md:p-8" style={{ maxWidth:720 }}>
          <AIAssistant />
        </div>
      </motion.div>
    </Layout>
  );
}
