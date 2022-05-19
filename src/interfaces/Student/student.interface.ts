export interface IStudent {
  id: string;
  name: string;
  birth_date: Date;
  address: string;
  class_id: string;
  relatives_id: string;
  entered_at: Date;
  lefted_at: Date;
  created_at: Date;
}

export interface IStudentCreation {
  name: string;
  birth_date: Date;
  address: string;
  entered_at: Date;
  lefted_at: Date;
  created_at: Date;
}
