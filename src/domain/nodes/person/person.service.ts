import { Injectable } from '@nestjs/common';
import { Person, PersonInput } from '../../../schema/graphql';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  async getPerson(id: number): Promise<Person> {
    return this.personRepository.getPerson(id);
  }

  async createPerson(personInput: PersonInput): Promise<Person> {
    return this.personRepository.createPerson(personInput);
  }

  async deletePerson(id: number): Promise<boolean> {
    return this.personRepository.deletePerson(id);
  }

  async updatePerson(id: number, personInput: PersonInput): Promise<Person> {
    return this.personRepository.updatePerson(id, personInput);
  }
}
