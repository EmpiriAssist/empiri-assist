import { Component, OnInit } from '@angular/core';
import { Experimenter } from '../experimenter';
import { ExperimenterService } from './experimenter.service';

import { MessageService } from '../message.service';
import { Role } from '../role';

@Component({
  selector: 'app-experimenters',
  templateUrl: './experimenters.component.html',
  styleUrls: ['./experimenters.component.css']
})
export class ExperimentersComponent implements OnInit {
  experimenters: Experimenter[];
  selectedExperimenter: Experimenter;
  role = Role;
  enumKeys=[];
  
    constructor(private experimenterService: ExperimenterService) {}

    ngOnInit() {
      this.getExperimenters();
    }
  
    getExperimenters(): void {
      this.experimenterService.getExperimenters()
      .subscribe(experimenters => this.experimenters = experimenters);
    }
    add(name: string, email: string, organization: string, role: Role, tasks: string): void {
      name = name.trim();
      email = email.trim();
      organization = organization.trim();
      role = role;
      tasks = tasks;
      if (!name) { return; }
      this.experimenterService.addExperimenter({ name, email, organization, role, tasks } as Experimenter)
        .subscribe(experimenter => {
          this.experimenters.push(experimenter);
        });
    }
    delete(experimenter: Experimenter): void {
      this.experimenters = this.experimenters.filter(h => h !== experimenter);
      this.experimenterService.deleteExperimenter(experimenter).subscribe();
    }
  }