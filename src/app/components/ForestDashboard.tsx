import { Sprout, TreePine, Bike, Trash2, Lock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  zone: number;
}

interface ForestDashboardProps {
  userName: string;
  completedTasks: Task[];
  totalTasks: number;
  onNextTask: () => void;
}

export function ForestDashboard({ userName, completedTasks, totalTasks, onNextTask }: ForestDashboardProps) {
  const progress = Math.round((completedTasks.length / totalTasks) * 100);
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-sky-100 to-emerald-50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur border-b border-emerald-200">
        <h1 className="text-2xl font-semibold text-emerald-900">
          Velkommen, {userName}! 🇩🇰
        </h1>
        <p className="text-emerald-700 mt-1">Your forest is {progress}% grown</p>
      </div>

      {/* Forest Visualization */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center p-8">
            {/* Isometric Plot Background */}
            <div 
              className="absolute w-[600px] h-[400px] bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-900/20 rounded-lg"
              style={{
                transform: 'rotateX(60deg) rotateZ(-45deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(0,0,0,0.05)_20px,rgba(0,0,0,0.05)_22px)] opacity-30"></div>
            </div>

            {/* Trees Grid */}
            <div className="relative z-10 grid grid-cols-4 gap-8">
              {Array.from({ length: 12 }).map((_, index) => {
                const task = completedTasks[index];
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-end h-32 animate-in fade-in zoom-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: '600ms'
                    }}
                  >
                    {task ? (
                      <div className="relative group cursor-pointer">
                        {/* Tree visual based on zone */}
                        {task.zone === 1 && (
                          <div className="relative">
                            <TreePine 
                              className="w-16 h-16 text-emerald-700 drop-shadow-lg transition-transform group-hover:scale-110" 
                            />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-800 rounded-full blur-sm opacity-50"></div>
                          </div>
                        )}
                        {task.zone === 2 && (
                          <div className="relative">
                            <TreePine 
                              className="w-20 h-20 text-emerald-600 drop-shadow-xl transition-transform group-hover:scale-110" 
                            />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-5 bg-amber-800 rounded-full blur-sm opacity-50"></div>
                          </div>
                        )}
                        {task.zone === 3 && (
                          <div className="relative">
                            <TreePine 
                              className="w-24 h-24 text-emerald-500 drop-shadow-2xl transition-transform group-hover:scale-110" 
                            />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-amber-800 rounded-full blur-sm opacity-50"></div>
                            {/* Birds for canopy level */}
                            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🐦</div>
                          </div>
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-emerald-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                          {task.title}
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        {index === completedTasks.length ? (
                          // Next available spot - show sprout
                          <Sprout className="w-12 h-12 text-emerald-400 animate-pulse drop-shadow" />
                        ) : (
                          // Empty spot
                          <div className="w-8 h-8 rounded-full bg-amber-300/30 border-2 border-dashed border-amber-500/50"></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-8 opacity-50">
          <Bike className="w-12 h-12 text-blue-600" />
        </div>
        <div className="absolute bottom-8 right-8 opacity-50">
          <Trash2 className="w-10 h-10 text-green-700" />
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="px-6 py-6 bg-white border-t border-emerald-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-emerald-700 whitespace-nowrap">{progress}%</span>
            </div>
            <p className="text-sm text-gray-600">
              {completedTasks.length} of {totalTasks} seeds planted
            </p>
          </div>
          
          <button
            onClick={onNextTask}
            className="ml-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <Sprout className="w-5 h-5" />
            Next Seed
          </button>
        </div>
      </div>
    </div>
  );
}
