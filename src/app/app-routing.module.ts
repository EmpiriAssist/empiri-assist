import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbstractsComponent } from './abstracts/abstracts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { WizardComponent } from './wizard/wizard.component';
import { ExperimentersComponent } from './experimenters/experimenters.component';
import { GoalsComponent } from './goals/goals.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { ExperimentDetailComponent } from './experiment-detail/experiment-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'wizard', component: WizardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'experiment/:id', component: ExperimentDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'experimenters', component: ExperimentersComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'abstracts', component: AbstractsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
