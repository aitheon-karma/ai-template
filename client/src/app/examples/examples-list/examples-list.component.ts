import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ExamplesRestService, Example } from '@aitheon/template';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'ai-examples-list',
  templateUrl: './examples-list.component.html',
  styleUrls: ['./examples-list.component.scss']
})
export class ExamplesListComponent implements OnInit {

  examples: Example[];
  loading = false;

  exampleModalRef: BsModalRef;
  @ViewChild('exampleModal') exampleModal: TemplateRef<any>;

  constructor(
    private examplesRestService: ExamplesRestService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.examplesRestService.list().subscribe((examples: Example[]) => {
      this.examples = examples;
      this.loading = false;
    }, (err: any) => {
      this.toastr.error(err);
      this.loading = false;
    });
  }

  openDialog() {
    this.exampleModalRef = this.modalService.show(this.exampleModal);
  }

  onCloseDialog() {
    this.exampleModalRef.hide();
  }

  onSaved(example: Example) {
    this.exampleModalRef.hide();
    this.examples.push(example);
  }

}
