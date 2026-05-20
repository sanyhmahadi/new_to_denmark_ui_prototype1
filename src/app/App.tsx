import { useState, useEffect } from 'react';
import { Home, Map, Menu, X } from 'lucide-react';
import { ForestDashboard } from './components/ForestDashboard';
import { PriorityMap } from './components/PriorityMap';
import { LearningModule } from './components/LearningModule';
import { RewardModal } from './components/RewardModal';
import { allTasks, Task } from './data/tasks';

type Screen = 'dashboard' | 'map';

interface CompletedTask {
  id: string;
  title: string;
  completed: boolean;
  zone: number;
}

interface Zone {
  id: number;
  title: string;
  subtitle: string;
  icon: 'sprout' | 'building' | 'users';
  tasks: string[];
  unlocked: boolean;
  completed: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [lastCompletedTask, setLastCompletedTask] = useState<Task | null>(null);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const userName = "Alex";

  // Calculate completed tasks
  const completedTasks: CompletedTask[] = completedTaskIds.map(id => {
    const task = allTasks.find(t => t.id === id);
    return {
      id,
      title: task?.title || '',
      completed: true,
      zone: task?.zone || 1
    };
  });

  // Calculate zones
  const zones: Zone[] = [
    {
      id: 1,
      title: 'The Root System',
      subtitle: 'Survival Essentials',
      icon: 'sprout',
      tasks: allTasks.filter(t => t.zone === 1).map(t => t.title),
      unlocked: true,
      completed: completedTaskIds.filter(id => 
        allTasks.find(t => t.id === id)?.zone === 1
      ).length
    },
    {
      id: 2,
      title: 'The Trunk',
      subtitle: 'Work & Social Rules',
      icon: 'building',
      tasks: allTasks.filter(t => t.zone === 2).map(t => t.title),
      unlocked: completedTaskIds.filter(id => 
        allTasks.find(t => t.id === id)?.zone === 1
      ).length >= allTasks.filter(t => t.zone === 1).length,
      completed: completedTaskIds.filter(id => 
        allTasks.find(t => t.id === id)?.zone === 2
      ).length
    },
    {
      id: 3,
      title: 'The Canopy',
      subtitle: 'Culture & Connection',
      icon: 'users',
      tasks: allTasks.filter(t => t.zone === 3).map(t => t.title),
      unlocked: completedTaskIds.filter(id => 
        allTasks.find(t => t.id === id)?.zone === 2
      ).length >= allTasks.filter(t => t.zone === 2).length,
      completed: completedTaskIds.filter(id => 
        allTasks.find(t => t.id === id)?.zone === 3
      ).length
    }
  ];

  // Get next task
  const getNextTask = (): Task | null => {
    // Find first uncompleted task in unlocked zones
    for (const zone of zones) {
      if (zone.unlocked) {
        const nextTask = allTasks.find(
          task => task.zone === zone.id && !completedTaskIds.includes(task.id)
        );
        if (nextTask) return nextTask;
      }
    }
    return null;
  };

  const handleNextTask = () => {
    const nextTask = getNextTask();
    if (nextTask) {
      setSelectedTask(nextTask);
      setMobileMenuOpen(false);
    }
  };

  const handleCompleteTask = () => {
    if (!selectedTask) return;

    // Check if completing this task will level up a zone
    const currentZone = zones.find(z => z.id === selectedTask.zone);
    const totalTasksInZone = allTasks.filter(t => t.zone === selectedTask.zone).length;
    const completedInZone = completedTaskIds.filter(id => 
      allTasks.find(t => t.id === id)?.zone === selectedTask.zone
    ).length;

    const willLevelUp = completedInZone + 1 === totalTasksInZone;
    
    setCompletedTaskIds([...completedTaskIds, selectedTask.id]);
    setLastCompletedTask(selectedTask);
    setIsLevelUp(willLevelUp);
    
    if (willLevelUp && currentZone) {
      setNewLevel(`${currentZone.title} Complete!`);
    }
    
    setSelectedTask(null);
    setShowReward(true);
  };

  const handleSelectZone = (zoneId: number) => {
    setSelectedZone(zoneId);
    // Find first uncompleted task in this zone
    const nextTask = allTasks.find(
      task => task.zone === zoneId && !completedTaskIds.includes(task.id)
    );
    if (nextTask) {
      setSelectedTask(nextTask);
    }
  };

  return (
    <div className="size-full flex flex-col bg-white overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold text-gray-900">New to Denmark</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <nav className="p-4 space-y-2">
              <button
                onClick={() => {
                  setCurrentScreen('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentScreen === 'dashboard'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Your Forest</span>
              </button>
              <button
                onClick={() => {
                  setCurrentScreen('map');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentScreen === 'map'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Map className="w-5 h-5" />
                <span className="font-medium">Growth Map</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-emerald-900">New to Denmark</h1>
            <p className="text-sm text-gray-600 mt-1">Your Integration Journey 🇩🇰</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentScreen === 'dashboard'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Your Forest</span>
            </button>
            <button
              onClick={() => setCurrentScreen('map')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentScreen === 'map'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Map className="w-5 h-5" />
              <span className="font-medium">Growth Map</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200">
              <p className="text-sm text-emerald-900 font-semibold mb-1">
                🌱 Progress
              </p>
              <p className="text-xs text-emerald-700">
                {completedTasks.length} of {allTasks.length} tasks completed
              </p>
              <div className="mt-2 h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(completedTasks.length / allTasks.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {currentScreen === 'dashboard' ? (
            <ForestDashboard
              userName={userName}
              completedTasks={completedTasks}
              totalTasks={allTasks.length}
              onNextTask={handleNextTask}
            />
          ) : (
            <PriorityMap
              zones={zones}
              onSelectZone={handleSelectZone}
              currentZone={selectedZone}
            />
          )}
        </main>
      </div>

      {/* Learning Module Modal */}
      {selectedTask && (
        <LearningModule
          task={selectedTask}
          onComplete={handleCompleteTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* Reward Modal */}
      {showReward && lastCompletedTask && (
        <RewardModal
          task={lastCompletedTask}
          isLevelUp={isLevelUp}
          newLevel={newLevel}
          onClose={() => {
            setShowReward(false);
            setIsLevelUp(false);
            setNewLevel('');
          }}
        />
      )}
    </div>
  );
}
