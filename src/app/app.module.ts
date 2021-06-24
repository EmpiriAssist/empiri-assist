import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

//ngx-translate
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InternationalizationModule } from './internationalization/internationalization.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { AbstractsComponent } from './abstracts/abstracts.component';
import { ExperimentersComponent } from './experimenters/experimenters.component';
import { GoalsComponent } from './goals/goals.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { ExperimentDetailComponent } from './experiment-detail/experiment-detail.component';
import { WizardComponent } from './wizard/wizard.component';
import { DecisionTreeFormComponent } from './wizard/decision-tree-form/decision-tree-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatSliderModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    // ngx-translate and the loader module
    HttpClientModule,
    InternationalizationModule.forRoot({ locale_id: 'en-US' }), // iniating with default language: en-US
    TranslateModule.forRoot({

      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, passThruUnknownUrl: true }
    ),

    BrowserAnimationsModule
  ],
  providers: [],
  declarations: [
    AppComponent,
    DashboardComponent,
    AbstractsComponent,
    ExperimentersComponent,
    GoalsComponent,
    ExperimentsComponent,
    ExperimentDetailComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    WizardComponent,
    DecisionTreeFormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }