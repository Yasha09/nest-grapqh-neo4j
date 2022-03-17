
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PersonInput {
    name: string;
    age?: Nullable<number>;
}

export class Person {
    id: number;
    age?: Nullable<number>;
    name: string;
}

export abstract class IQuery {
    abstract helloWorld(): Nullable<string> | Promise<Nullable<string>>;

    abstract getPerson(id: number): Nullable<Person> | Promise<Nullable<Person>>;
}

export abstract class IMutation {
    abstract createPerson(personInput?: Nullable<PersonInput>): Nullable<Person> | Promise<Nullable<Person>>;

    abstract updatePerson(id: number, personInput?: Nullable<PersonInput>): Person | Promise<Person>;

    abstract deletePerson(id?: Nullable<number>): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
