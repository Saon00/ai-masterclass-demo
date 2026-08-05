export interface Chapter {
  id: number;
  title: string;
  topic: string;
  videoTitle: string;
  duration: string;
  description: string;
  keyTakeaways: string[];
  transcript: string;
  iconName: string;
}

export interface Question {
  id: number;
  chapterId: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CourseProgress {
  currentChapterIndex: number;
  currentQuestionIndex: number;
  quizStreak: number;
  highestQuizQuestion: number;
  completedChapters: boolean[];
}
