import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Example, ExamplesRestService } from '@aitheon/template';

@Component({
  selector: 'ai-examples-form',
  templateUrl: './examples-form.component.html',
  styleUrls: ['./examples-form.component.scss']
})
export class ExamplesFormComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSaved: EventEmitter<Example> = new EventEmitter<Example>();

  example: Example;
  exampleForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  isNew: boolean;

  constructor(
    private examplesRestService: ExamplesRestService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: { [key: string]: any }) => {
      const exampleId = params['exampleId'];
      if (exampleId === 'new' || !exampleId) {
        this.isNew = true;
        this.example = new Example();
        this.buildForm(this.example);
      } else {
        this.isNew = false;
        this.loading = true;
        this.examplesRestService.getById(exampleId).subscribe((example: Example) => {
          this.example = example;
          this.loading = false;
          this.buildForm(this.example);
        });
      }
    });
  }


  loadExample(exampleId: string) {
    this.loading = true;
    this.examplesRestService.getById(exampleId).subscribe((example: Example) => {
      this.example = example;
      this.buildForm(this.example);
      this.loading = false;
    }, (err) => {
      this.loading = false;
      this.toastr.error(err);
    });
  }

  buildForm(example: Example) {
    this.exampleForm = this.fb.group({
      name: [example.name, [Validators.required]],
      description: [example.description, [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.exampleForm.invalid) {
      return;
    }
    const example = Object.assign({}, this.example, this.exampleForm.value);

    this.error = null;
    if (!example._id) {
      this.examplesRestService.create(example).subscribe((e: Example) => {
        this.submitted = false;
        this.example = e;
        this.isNew = false;
        this.onSaved.emit(this.example);
        this.toastr.success('Example saved');
      }, (err) => {
        this.submitted = false;
        this.error = err;
      });
    } else {
      this.examplesRestService.update(example._id, example).subscribe(() => {
        this.submitted = false;
        this.example = example;
        this.onSaved.emit(this.example);
        this.toastr.success('Example updated');
      }, (err) => {
        this.submitted = false;
        this.error = err;
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/examples');
  }

  remove() {
    this.examplesRestService.remove(this.example._id).subscribe(() => {
      this.toastr.success('Example deleted');
      this.router.navigate(['/examples']);
    }, (err) => {
      this.error = err;
    });
  }

}
