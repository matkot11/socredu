interface subjectInterface {
  name: string;
  category: string;
}

export interface TeacherInterface {
  id: string;
  name: string;
  image: string;
  about: string;
  rating: number;
  price: number;
  subjects: subjectInterface[];
}
