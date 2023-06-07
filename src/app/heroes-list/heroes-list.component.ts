import { Component, OnInit } from '@angular/core';
import { ListService } from '../list-service';
import { Todo } from '../models/Todo';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
})
export class HeroesListComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private listservice: ListService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      isChecked: [false],
    });
  }
  listitem: undefined | Todo[];
  listdata: undefined | Todo;
  listMessage: undefined | string;
  public itemId!: any;
  ngOnInit() {
    this.listservice.todoList().subscribe((list) => {
      this.listitem = list;
      console.log(list);
    });

    this.itemId = this.activatedroute.snapshot.paramMap.get('id');

    this.itemId &&
      this.listservice.getlist(this.itemId).subscribe((item) => {
        this.listdata = item;
      });
  }

  onCheckboxChange() {
    if (this.myForm.get('isChecked')?.value) {
      this.submitForm();
    }
  }

  submitForm() {
    if (this.listdata) {
      var listid = this.listdata.id;
    }
    this.listservice
      .updateList(listid, this.myForm.value)
      .subscribe((result) => {
        this.listMessage = 'Product has updated';
      });
    setTimeout(() => {
      this.listMessage = undefined;
    }, 3000);
  }
}
