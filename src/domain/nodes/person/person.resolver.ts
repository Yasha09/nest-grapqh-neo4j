import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person, PersonInput } from '../../../schema/graphql';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}
  @Query()
  async getPerson(@Args('id') id: number): Promise<Person> {
    return await this.personService.getPerson(id);
  }

  @Mutation()
  async createPerson(
    @Args('personInput') personInput: PersonInput,
  ): Promise<Person> {
    return this.personService.createPerson(personInput);
  }

  @Mutation()
  async updatePerson(
    @Args('id') id: number,
    @Args('personInput') personInput: PersonInput,
  ): Promise<Person> {
    console.log('1111111');
    console.log('personInput ', personInput);
    console.log('id ', id);
    return this.personService.updatePerson(id, personInput);
  }

  @Mutation()
  async deletePerson(@Args('id') id: number): Promise<boolean> {
    return this.personService.deletePerson(id);
  }
}
