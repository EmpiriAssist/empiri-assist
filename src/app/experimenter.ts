import { Role } from './role';

export class Experimenter {
    id: number;
    name: string;
    email: string;
    organization: string;
    role: Role;
    tasks?: string;
}
