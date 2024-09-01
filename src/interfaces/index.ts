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
  subject_id: number;
  author_id: number;
  question_text: string;
  question_type: string;
  image_url: string;
  source: string;
}
