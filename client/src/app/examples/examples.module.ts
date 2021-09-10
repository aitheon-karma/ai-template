import { NgModule } from '@angular/core';

import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesListComponent } from './examples-list/examples-list.component';
import { ExamplesFormComponent } from './examples-form/examples-form.component';
import { CoreClientModule } from '@aitheon/core-client';

@NgModule({
  imports: [
    CoreClientModule,
    ExamplesRoutingModule
  ],
  declarations: [ExamplesListComponent, ExamplesFormComponent],
  providers: []
})
export class ExamplesModule { }
