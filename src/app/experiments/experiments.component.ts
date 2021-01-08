import { Component, OnInit } from '@angular/core';

import { Experiment } from '../experiment';
import { ExperimentService } from './experiment.service';
import { GoalService } from '../goals/goal.service';
import { AbstractService } from '../abstracts/abstract.service';
import { MessageService } from '../message.service';
import { Goal } from '../goal';
import { Role } from '../role';
import { Abstract } from '../abstract';
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

  constructor(private experimentService: ExperimentService,
              private goalService: GoalService,
              private abstractService: AbstractService) { }

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
  add(name: String, context: String, aGoal: String, method: String, results: string, conclusions: string,
      analyze: String, purpose: String, respect: String, pointOfView: String, gContext: String,
      eName: String, email: String, organization: String, role: Role, tasks: String): void {

    name = name.trim();
    //Abstract
    const abstract: Abstract = new Abstract();
    abstract.context = context.trim();
    abstract.goal = aGoal.trim();
    abstract.method = method.trim();
    abstract.results = results.trim();
    abstract.conclusions = conclusions.trim();

    //Goal
    const goal: Goal = new Goal();
    goal.analyze = analyze.trim();
    goal.purpose = purpose.trim();
    goal.respect = respect.trim();
    goal.pointOfView = pointOfView.trim();
    goal.context = gContext.trim();
    //Experimenter
    const experimenter: Experimenter = new Experimenter();
    experimenter.name = eName.trim();
    experimenter.email = email.trim();
    experimenter.organization = organization.trim();
    experimenter.role = role;
    experimenter.tasks = tasks.trim();
    //Experimenters
    const experimenters: Experimenter[] = [];

    experimenters.push(experimenter);

    if (!name) { return; }
    this.experimentService.addExperiment({ name, abstract, goal, experimenters } as Experiment)
      .subscribe(name => {
        this.experiments.push(name);
      });
  }

  delete(experiment: Experiment): void {
    this.experiments = this.experiments.filter(h => h !== experiment);
    this.experimentService.deleteExperiment(experiment).subscribe();
  }
}