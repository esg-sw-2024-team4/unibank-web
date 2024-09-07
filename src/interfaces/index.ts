export const PATHS = {
  home: '/',
  subjectById: '/subjects',
  write: '/write',
  edit: '/edit',
  notFound: '/404',
} as const;

export interface IMetadata {
  total: number;
}

export interface IMResponse<T> {
  metadata: IMetadata;
  data: T[];
}

export interface ISResponse<T> {
  data: T;
}

export interface ISubject {
  id: number;
  name: string;
  description: string;
}

export interface IProblem {
  id: number;
  isOwned?: boolean;
  answerSubmittedPreviously?: number;
  isFavorite?: boolean;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  options: IOption[];
}

export interface IRequestBodyProblem {
  id: number;
  subject_id: number;
  title: string;
  description: string;
  image_url: string;
  source: string;
  options: IRequestBodyOption[];
}

export interface IOption {
  option: number;
  optionText: string;
  isCorrect: boolean;
}

export interface IRequestBodyOption {
  option: number;
  option_text: string;
  is_correct: boolean;
}

export interface IPropsEditQuestion extends IProblem {
  subjectId: number;
  subjectName: string;
}
