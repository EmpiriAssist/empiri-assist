import { Component, OnInit } from '@angular/core';

import { Goal } from '../goal';
import { GoalService } from './goal.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goals: Goal[];

  constructor(private goalService: GoalService) { }

  ngOnInit() {
    this.getGoals();
  }

  getGoals(): void {
    this.goalService.getGoals()
    .subscribe(goals => this.goals = goals);
  }
  add(analyze: string, purpose: string, respect: string, pointOfView: string, context: string): void {
    analyze = analyze.trim();
    purpose = purpose.trim();
    respect = respect.trim();
    pointOfView = pointOfView.trim();
    context = context.trim();
    if (!analyze) { return; }
    this.goalService.addGoal({ analyze, purpose, respect, pointOfView, context} as Goal)
      .subscribe(goal => {
        this.goals.push(goal);
      });
  }
  delete(goal: Goal): void {
    this.goals = this.goals.filter(h => h !== goal);
    this.goalService.deleteGoal(goal).subscribe();
  }
}