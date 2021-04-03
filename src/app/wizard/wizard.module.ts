import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './wizard.component';
import { DecisionTreeFormComponent } from './decision-tree-form/decision-tree-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DecisionTreeFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
