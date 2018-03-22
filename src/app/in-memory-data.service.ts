import { InMemoryDbService } from 'angular-in-memory-web-api';


/**
TODO: Ultimately this would be moved to a (real) database
**/

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Amy', rating: 3, class: 4, classTeacher: 3, photo: '' },
      { id: 12, name: 'Ben', rating: 4 , class: 2, classTeacher: 5, photo: '' },
      { id: 13, name: 'Cathy', rating: 1 , class: 4, classTeacher: 3, photo: '' },
      { id: 14, name: 'Diana', rating: 4 , class: 5, classTeacher: 8, photo: '' },
      { id: 15, name: 'Elnor', rating: 2 , class: 3, classTeacher: 4, photo: '' },
      { id: 16, name: 'Fraser', rating: 5 , class: 7, classTeacher: 3, photo: '' },
      { id: 17, name: 'Garth', rating: 5 , class: 7, classTeacher: 3, photo: '' },
      { id: 18, name: 'Helda', rating: 3 , class: 3, classTeacher: 4, photo: '' },
      { id: 19, name: 'Isaac', rating: 4 , class: 2, classTeacher: 5, photo: '' },
      { id: 20, name: 'Tim', rating: 2 , class: 1, classTeacher: 6, photo: '' },
    ];
    return {heroes};
  }
}