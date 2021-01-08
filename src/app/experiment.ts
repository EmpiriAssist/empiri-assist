import { Abstract } from "./abstract";
import { Experimenter } from './experimenter';
import { Goal } from './goal';

export class Experiment{
    id: number;
    name: String;
    abstract: Abstract;
    goal: Goal;
    experimenters: Experimenter[];
}