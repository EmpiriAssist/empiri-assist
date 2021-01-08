import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Abstract } from './abstract';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {

    const goals = [
      { id: 41, analyze: 'analyze', purpose: 'purpose', respect: 'respect', pointOfView: 'pointOfView', context: 'context' },
      { id: 42, analyze: 'A', purpose: 'P', respect: 'R', pointOfView: 'P', context: 'C' },
      { id: 43, analyze: 'Prueba', purpose: 'Prueba', respect: 'Prueba', pointOfView: 'Prueba', context: 'Prueba' }
    ];

    const experimenters = [
      { id: 31, name: 'Nombre', email: 'Email', organization: 'Organización', role: 'Rol', tasks: 'Tareas' },
      { id: 32, name: 'Prueba', email: 'Prueba', organization: 'Prueba', role: 'Prueba', tasks: 'Prueba' },
      { id: 33, name: 'N', email: 'E', organization: 'O', role: 'R', tasks: 'T' },
    ];

    const abstracts = [
      { id: 21, context: 'Prueba', goal: 'Prueba', method: 'Prueba', results: 'Prueba', conclusions: 'Prueba' },
      { id: 22, context: 'A', goal: 'B', method: 'C', results: 'D', conclusions: 'E' },
      { id: 23, context: 'CONT', goal: 'GOAL', method: 'METH', results: 'RESUL', conclusions: 'CONCL' }
    ];
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    return {goals, experimenters, abstracts, heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

//  genId(heroes: Hero[]): number {
//    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
//  }
  genId(abstracts: Abstract[]): number {
    return abstracts.length > 0 ? Math.max(...abstracts.map(abstract => abstract.id)) + 1 : 11;
  }

  
}
