import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Experiment } from '../experiment';
import { ExperimentService } from '../experiments/experiment.service';
import { Experimenter } from '../experimenter';

@Component({
  selector: 'app-experiment-detail',
  templateUrl: './experiment-detail.component.html',
  styleUrls: [ './experiment-detail.component.css' ]
})
export class ExperimentDetailComponent implements OnInit {
  experiment: Experiment;
  experimenter: Experimenter;
  experimenters = this.experimentService.getExperimenters();
  fieldArray: Array<any> = [];
  field: any = {};
  
  constructor(
    private route: ActivatedRoute,
    private experimentService: ExperimentService,
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

  addExperimenter(experimenter) {
    this.experimentService.addExperimenter(experimenter);
  }
}
