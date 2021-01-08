import { Component, OnInit } from '@angular/core';

import { Abstract } from '../abstract';
import { AbstractService } from './abstract.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-abstracts',
  templateUrl: './abstracts.component.html',
  styleUrls: ['./abstracts.component.css']
})
export class AbstractsComponent implements OnInit {
  abstracts: Abstract[];

  constructor(private abstractService: AbstractService) { }

  ngOnInit() {
    this.getAbstracts();
  }

  getAbstracts(): void {
    this.abstractService.getAbstracts()
    .subscribe(abstracts => this.abstracts = abstracts);
  }
  add(context: string, goal: string, method: string, results: string, conclusions: string): void {
    context = context.trim();
    goal = goal.trim();
    method = method.trim();
    results = results.trim();
    conclusions = conclusions.trim();
    if (!context) { return; }
    this.abstractService.addAbstract({ context, goal, method, results, conclusions } as Abstract)
      .subscribe(abstract => {
        this.abstracts.push(abstract);
      });
  }
  delete(abstract: Abstract): void {
    this.abstracts = this.abstracts.filter(h => h !== abstract);
    this.abstractService.deleteAbstract(abstract).subscribe();
  }
}