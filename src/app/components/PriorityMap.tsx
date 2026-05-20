import { Lock, Check, ChevronRight, Sprout, Building2, Users } from 'lucide-react';

interface Zone {
  id: number;
  title: string;
  subtitle: string;
  icon: 'sprout' | 'building' | 'users';
  tasks: string[];
  unlocked: boolean;
  completed: number;
}

interface PriorityMapProps {
  zones: Zone[];
  onSelectZone: (zoneId: number) => void;
  currentZone: number | null;
}

export function PriorityMap({ zones, onSelectZone, currentZone }: PriorityMapProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sprout':
        return Sprout;
      case 'building':
        return Building2;
      case 'users':
        return Users;
      default:
        return Sprout;
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-emerald-50 to-sky-50 overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-6 bg-white/80 backdrop-blur border-b border-emerald-200">
        <h1 className="text-3xl font-semibold text-emerald-900">Growth Map</h1>
        <p className="text-emerald-700 mt-2">Your journey through Danish integration</p>
      </div>

      {/* Vertical Timeline */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-300 via-emerald-400 to-gray-300"></div>

          {/* Zones */}
          <div className="space-y-8">
            {zones.map((zone, index) => {
              const Icon = getIcon(zone.icon);
              const progress = zone.tasks.length > 0 ? Math.round((zone.completed / zone.tasks.length) * 100) : 0;
              const isActive = currentZone === zone.id;
              
              return (
                <div
                  key={zone.id}
                  className={`relative transition-all duration-300 ${
                    !zone.unlocked ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-0 z-10">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                        zone.unlocked
                          ? zone.completed === zone.tasks.length
                            ? 'bg-emerald-500 border-emerald-600 shadow-lg shadow-emerald-300'
                            : 'bg-white border-emerald-500 shadow-lg'
                          : 'bg-gray-200 border-gray-300'
                      }`}
                    >
                      {zone.unlocked ? (
                        zone.completed === zone.tasks.length ? (
                          <Check className="w-8 h-8 text-white" />
                        ) : (
                          <Icon className="w-8 h-8 text-emerald-600" />
                        )
                      ) : (
                        <Lock className="w-7 h-7 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="ml-24">
                    <button
                      onClick={() => zone.unlocked && onSelectZone(zone.id)}
                      disabled={!zone.unlocked}
                      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-emerald-50 border-emerald-400 shadow-xl scale-105'
                          : zone.unlocked
                          ? 'bg-white border-emerald-200 hover:border-emerald-300 hover:shadow-lg hover:scale-102'
                          : 'bg-gray-50 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-emerald-600">
                              Priority {zone.id}
                            </span>
                            {!zone.unlocked && (
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                Locked
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                            {zone.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{zone.subtitle}</p>

                          {/* Task List Preview */}
                          {zone.unlocked && (
                            <div className="space-y-2 mb-4">
                              {zone.tasks.slice(0, 3).map((task, taskIndex) => (
                                <div key={taskIndex} className="flex items-center gap-2 text-sm">
                                  <div className={`w-2 h-2 rounded-full ${
                                    taskIndex < zone.completed ? 'bg-emerald-500' : 'bg-gray-300'
                                  }`}></div>
                                  <span className={taskIndex < zone.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                                    {task}
                                  </span>
                                </div>
                              ))}
                              {zone.tasks.length > 3 && (
                                <p className="text-xs text-gray-500 ml-4">
                                  +{zone.tasks.length - 3} more tasks
                                </p>
                              )}
                            </div>
                          )}

                          {/* Progress Bar */}
                          {zone.unlocked && (
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-emerald-700">
                                {zone.completed}/{zone.tasks.length}
                              </span>
                            </div>
                          )}
                        </div>

                        {zone.unlocked && (
                          <ChevronRight className="w-6 h-6 text-emerald-600 flex-shrink-0 ml-4" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            💡 Pro-Tip for Newcomers
          </h4>
          <p className="text-blue-800 text-sm leading-relaxed">
            In Denmark, "Trust" is the secret currency. Many rules (like the lack of turnstiles on trains) 
            rely on the honor system. By completing these tasks and "planting trees," you're building 
            your Trust Score within the community.
          </p>
        </div>
      </div>
    </div>
  );
}
