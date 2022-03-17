import { Injectable } from '@nestjs/common';
import { QueryRepository } from '../../../neo4j/neo4j.service';
import { Person, PersonInput } from '../../../schema/graphql';

@Injectable()
export class PersonRepository {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createPerson(personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
          CREATE (person:PERSON {name:"${name}", age:"${age}"})
          RETURN person
        `,
      )
      .run();

    if (query?.length > 0) {
      const {
        person: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async deletePerson(id: number) {
    await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH(person)
      WHERE id(person) = ${id}
      DELETE person
    `,
      )
      .run();
    return true;
  }

  async updatePerson(id: number, personInput: PersonInput) {
    const { name, age } = personInput;
    console.log('name ', name, 'age ', age);
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `MATCH (person) 
      WHERE id(person) = ${id}
      SET person.name = "${name}", person.age = "${age}"
      RETURN person`,
      )
      .run();
    if (query?.length > 0) {
      const {
        person: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async getPerson(id: number): Promise<Person> {
    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH(person) 
      WHERE id(person)=${id}
      RETURN person
      `,
      )
      .run();
    console.log('query ', query);
    if (query?.length > 0) {
      const {
        person: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }
}
