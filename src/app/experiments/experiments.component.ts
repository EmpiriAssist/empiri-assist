import { Component, OnInit } from '@angular/core';

import { Experiment } from '../experiment';
import { ExperimentService } from './experiment.service';
import { MessageService } from '../message.service';
import { Role } from '../role';
import { Experimenter } from '../experimenter';
import { ExperimentersComponent } from '../experimenters/experimenters.component';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  experiments: Experiment[];
  fieldArray: Array<any> = [];
  field: any = {};
  role = Role;
  enumKeys=[];

  constructor(private experimentService: ExperimentService) { }

  addFieldValue() {
    this.fieldArray.push(this.field)
    this.field = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  ngOnInit() {
    this.getExperiments();
  }

  getExperiments(): void {
    this.experimentService.getExperiments()
    .subscribe(experiments => this.experiments = experiments);
  }
  add(name: string, context: string, goal: string, method: string, results: string, conclusions: string,
      analyze: string, purpose: string, respect: string, pointOfView: string, contextGoal: string): void {

    name = name.trim();
    context = context.trim();
    goal = goal.trim();
    method = method.trim();
    results = results.trim();
    conclusions = conclusions.trim();
    analyze = analyze.trim();
    purpose = purpose.trim();
    respect = respect.trim();
    pointOfView = pointOfView.trim();
    contextGoal = contextGoal.trim();

    if (!name) { return; }
    this.experimentService.addExperiment({ name, context, goal, method, results, conclusions, analyze, purpose, respect, pointOfView,
    contextGoal } as Experiment)
      .subscribe(name => {
        this.experiments.push(name);
      });
  }

  delete(experiment: Experiment): void {
    this.experiments = this.experiments.filter(h => h !== experiment);
    this.experimentService.deleteExperiment(experiment).subscribe();
  }
}