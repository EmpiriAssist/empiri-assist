import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Experiment } from '../experiment';
import { Role } from '../role';
import { ExperimentService } from '../experiments/experiment.service';
import { ExperimenterService } from '../experimenters/experimenter.service';
import { Experimenter } from '../experimenter';

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: [ './experiment-detail.component.css' ]
})
export class ExperimentDetailComponent implements OnInit {
  experiment: Experiment;
  role = Role;
  experimenters = this.experimentService.getExperimenters();
  fieldArray: Array<any> = [];
  field: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
    private experimenterService: ExperimenterService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getExperiment();
  }

  addFieldValue() {
    this.fieldArray.push(this.field)
    this.field = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  getExperiment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.experimentService.getExperiment(id)
      .subscribe(experiment => this.experiment = experiment);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.experimentService.updateExperiment(this.experiment)
      .subscribe(() => this.goBack());
  }

  addExper(experimenter) {
    this.experimentService.addExperimenter(experimenter);
  }
  deleteExper(experimenter) {
    this.experimentService.deleteExperimenter(experimenter);
  }

  addExperimenter(name: string, email: string, organization: string, role: Role, tasks: string): void {
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
    this.experimentService.addExperimenter({ name, email, organization, role, tasks } as Experimenter);
    
    this.experimentService.updateExperiment(this.experiment);
  }
  deleteExperimenter(experimenter: Experimenter): void {
    this.experimenters = this.experimenters.filter(h => h !== experimenter);
    this.experimenterService.deleteExperimenter(experimenter).subscribe();
  }
}
