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
  title: string;
  description: string;
  image_url: string;
  source: string;
  options: IOption[];
}

export interface IOption {
  option: number;
  option_text: string;
  is_correct: boolean;
}
