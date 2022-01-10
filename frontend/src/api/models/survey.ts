export interface QuestionType {
  id: number;
  name: string;
}

export interface QuestionOption {
  correct: boolean;
  id: number;
  name: string;
}

export interface AnswersSurvey {
  id: number;
  status: AnswerSurveyStatus;
  user_id: number;
}

export interface Question {
  id: number;
  name: string;
  question_type: QuestionType;
  options?: Array<QuestionOption>;
}

export interface Survey {
  answers_surveys: AnswersSurvey[] | null;
  current_answers_survey: AnswersSurvey | null;
  id: number;
  name: string;
  description: string;
  questions: Array<Question>;
  survey_subject_id: number;
}

export enum AnswerSurveyStatus {
  NotStarted = 'Not started',
  Started = 'Started',
  Completed = 'Completed',
}
