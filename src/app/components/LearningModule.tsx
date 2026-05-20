import { useState } from 'react';
import { X, Lightbulb, CheckCircle2, XCircle, ArrowRight, BookOpen, Brain } from 'lucide-react';
import { Task, QuizQuestion } from '../data/tasks';

interface LearningModuleProps {
  task: Task;
  onComplete: () => void;
  onClose: () => void;
}

export function LearningModule({ task, onComplete, onClose }: LearningModuleProps) {
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz'>('content');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuiz = task.quiz[currentQuizIndex];
  const totalQuestions = task.quiz.length;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === currentQuiz.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < totalQuestions - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz complete
      if (correctAnswers + (selectedAnswer === currentQuiz.correctAnswer ? 1 : 0) >= Math.ceil(totalQuestions * 0.6)) {
        onComplete();
      }
    }
  };

  const getZoneColor = (zone: number) => {
    switch (zone) {
      case 1:
        return 'emerald';
      case 2:
        return 'blue';
      case 3:
        return 'purple';
      default:
        return 'emerald';
    }
  };

  const color = getZoneColor(task.zone);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 px-6 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {currentStep === 'content' ? (
              <BookOpen className="w-6 h-6 text-white" />
            ) : (
              <Brain className="w-6 h-6 text-white" />
            )}
            <h2 className="text-2xl font-semibold text-white">{task.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-3 bg-gray-50 border-b">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 'content' ? `bg-${color}-500 text-white` : `bg-${color}-100 text-${color}-700`
              }`}>
                1
              </div>
              <span className={currentStep === 'content' ? 'font-semibold text-gray-900' : 'text-gray-500'}>
                Learn
              </span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded">
              <div 
                className={`h-full bg-${color}-500 rounded transition-all duration-500`}
                style={{ width: currentStep === 'quiz' ? '100%' : '50%' }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep === 'quiz' ? `bg-${color}-500 text-white` : `bg-gray-200 text-gray-500`
              }`}>
                2
              </div>
              <span className={currentStep === 'quiz' ? 'font-semibold text-gray-900' : 'text-gray-500'}>
                Quiz
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {currentStep === 'content' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Description */}
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {task.content.description}
                </p>
              </div>

              {/* Tips */}
              <div className={`bg-${color}-50 rounded-xl p-5 border border-${color}-100`}>
                <h3 className={`font-semibold text-${color}-900 mb-3 flex items-center gap-2`}>
                  <Lightbulb className="w-5 h-5" />
                  Key Tips
                </h3>
                <ul className="space-y-2">
                  {task.content.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className={`text-${color}-500 mt-1 flex-shrink-0`}>•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Myth vs Reality */}
              {task.content.mythVsReality && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Myth vs. Reality</h3>
                  {task.content.mythVsReality.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="font-semibold text-red-900 text-sm">MYTH</span>
                        </div>
                        <p className="text-sm text-gray-700">{item.myth}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-900 text-sm">REALITY</span>
                        </div>
                        <p className="text-sm text-gray-700">{item.reality}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Quiz Progress */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Question {currentQuizIndex + 1} of {totalQuestions}
                </p>
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: totalQuestions }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-1 rounded ${
                        index < currentQuizIndex
                          ? `bg-${color}-500`
                          : index === currentQuizIndex
                          ? `bg-${color}-300`
                          : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentQuiz.question}
                </h3>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuiz.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuiz.correctAnswer;
                    const showResult = showExplanation;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showResult
                            ? isCorrect
                              ? 'bg-green-50 border-green-500'
                              : isSelected
                              ? 'bg-red-50 border-red-500'
                              : 'bg-white border-gray-200'
                            : isSelected
                            ? `bg-${color}-50 border-${color}-500`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showResult
                              ? isCorrect
                                ? 'bg-green-500 border-green-500'
                                : isSelected
                                ? 'bg-red-500 border-red-500'
                                : 'border-gray-300'
                              : isSelected
                              ? `bg-${color}-500 border-${color}-500`
                              : 'border-gray-300'
                          }`}>
                            {showResult && (isCorrect || isSelected) && (
                              isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              ) : (
                                <XCircle className="w-4 h-4 text-white" />
                              )
                            )}
                          </div>
                          <span className="flex-1 text-gray-900">{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-2`}>
                  <h4 className={`font-semibold text-${color}-900 mb-2`}>Explanation</h4>
                  <p className="text-gray-700">{currentQuiz.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          {currentStep === 'content' ? (
            <>
              <div className="text-sm text-gray-600">
                Read carefully - there's a quiz next!
              </div>
              <button
                onClick={() => setCurrentStep('quiz')}
                className={`px-6 py-3 bg-${color}-600 hover:bg-${color}-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2`}
              >
                Take Quiz
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600">
                {showExplanation ? (
                  currentQuizIndex < totalQuestions - 1 ? (
                    'Continue to next question'
                  ) : (
                    correctAnswers + (selectedAnswer === currentQuiz.correctAnswer ? 1 : 0) >= Math.ceil(totalQuestions * 0.6)
                      ? '🎉 You passed! Plant your seed'
                      : '❌ Not quite - review and try again'
                  )
                ) : (
                  'Select your answer'
                )}
              </div>
              {showExplanation && (
                <button
                  onClick={handleNextQuestion}
                  className={`px-6 py-3 bg-${color}-600 hover:bg-${color}-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2`}
                >
                  {currentQuizIndex < totalQuestions - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    'Finish'
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
