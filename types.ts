export interface TeacherInterface {
  id: string;
  name: string;
  image: string;
  about: string;
  rating: [];
  price: number;
  categories: string[];
}

export interface LessonInterface {
  id: string;
  when: string;
  about: string;
  paid: boolean;
  student: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  teacher: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}
