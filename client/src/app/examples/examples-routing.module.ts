import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplesListComponent } from './examples-list/examples-list.component';
import { ExamplesFormComponent } from './examples-form/examples-form.component';

const routes: Routes = [
  {
    path: 'examples', component: ExamplesListComponent
  },
  {
    path: 'examples/:exampleId', component: ExamplesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
