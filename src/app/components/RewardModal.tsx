import { motion } from 'motion/react';
import { Sprout, TreePine, Award, Star, Zap } from 'lucide-react';

interface RewardModalProps {
  task: {
    title: string;
    zone: number;
  };
  isLevelUp: boolean;
  newLevel?: string;
  onClose: () => void;
}

export function RewardModal({ task, isLevelUp, newLevel, onClose }: RewardModalProps) {
  const getRewardDetails = () => {
    switch (task.zone) {
      case 1:
        return {
          title: 'Root Established!',
          icon: Sprout,
          color: 'emerald',
          message: 'A sturdy Oak sapling appears in your forest.',
          bg: 'from-emerald-500 to-emerald-600'
        };
      case 2:
        return {
          title: 'Trunk Growing Strong!',
          icon: TreePine,
          color: 'blue',
          message: 'Your forest is expanding with solid foundations.',
          bg: 'from-blue-500 to-blue-600'
        };
      case 3:
        return {
          title: 'Branching Out!',
          icon: Star,
          color: 'purple',
          message: 'Birds begin to inhabit your forest canopy!',
          bg: 'from-purple-500 to-purple-600'
        };
      default:
        return {
          title: 'Seed Planted!',
          icon: Sprout,
          color: 'emerald',
          message: 'Your forest is growing!',
          bg: 'from-emerald-500 to-emerald-600'
        };
    }
  };

  const reward = getRewardDetails();
  const Icon = reward.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebratory Header */}
        <div className={`bg-gradient-to-r ${reward.bg} px-6 py-8 text-center relative overflow-hidden`}>
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white/10"
          />
          
          {/* Floating Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -50],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Zap className="w-4 h-4 text-yellow-300" />
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
              <Icon className={`w-12 h-12 text-${reward.color}-600`} />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {reward.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 text-lg"
          >
            {task.title}
          </motion.p>
        </div>

        {/* Reward Content */}
        <div className="px-6 py-6 space-y-4">
          <div className={`bg-${reward.color}-50 border border-${reward.color}-100 rounded-lg p-4 text-center`}>
            <p className="text-gray-700">{reward.message}</p>
          </div>

          {isLevelUp && newLevel && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-yellow-900 text-lg">Level Up!</h3>
              </div>
              <p className="text-center text-yellow-800 font-semibold">{newLevel}</p>
            </motion.div>
          )}

          {/* Trust Score Info */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-blue-900 text-center">
              🤝 <span className="font-semibold">Trust Score +1</span>
              <br />
              <span className="text-blue-700 text-xs">
                You're building trust within the Danish community!
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className={`w-full px-6 py-3 bg-gradient-to-r ${reward.bg} hover:opacity-90 text-white rounded-lg font-semibold transition-opacity shadow-lg`}
          >
            Continue Growing 🌱
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
