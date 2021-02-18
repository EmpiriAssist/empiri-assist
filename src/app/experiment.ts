import { Experimenter } from './experimenter';

export class Experiment{
    id: number;
    name: string;
    context: string;
    goal: string;
    method: string;
    results: string;
    conclusions: string;
    analyze: string;
    purpose: string;
    respect: string;
    pointOfView: string;
    contextGoal: string;
    experimenters?: Experimenter[];
}