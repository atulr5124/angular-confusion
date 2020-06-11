import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DishComment } from '../shared/dishComment';
import { of } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { visibility, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {

  // @Input()
  dish: Dish;
  errMsg: string;
  dishIds: string[];
  prev: string;
  next: string;
  dishCopy: Dish;
  visibility = 'shown';

  commentForm: FormGroup;
  comment: DishComment;
  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'author': '',
    'comment': ''
  };

  validattionMessages = {
    'author': {
      'required': 'Author name is a required attribute',
      'minLength': 'Name should be atleast 2 characters long',
      'maxLength': 'Name should not be more than 25 characters'
    },
    'comment': {
      'required': 'Comment is a required attribute'
    }
  };
    
  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location,
              private fb: FormBuilder,
              @Inject('BASE_URL') private BASE_URL) { 
                this.createForm();
              }

  ngOnInit() {
    this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id']);}))
        .subscribe(dish => { this.dish = dish; this.dishCopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errMsg => this.errMsg = errMsg);
    // this.dishService.getDish(id)
    //   .then((dish) => this.dish = dish);
    // this.dishService.getDish(id)
    //   .subscribe((dish) => this.dish = dish);
    // console.log(this.dish);
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5],
      comment: ['', [Validators.required]]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) { return; }
    const form = this.commentForm;
    for(const field in this.formErrors) {
      if(this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validattionMessages[field];
          for(const key in control.errors) {
            if(control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    const date = new Date();
    this.comment.date = date.toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
        .subscribe(dish => {
          this.dish = dish;
          this.dishCopy = dish;
        },
        errMsg => {this.dish = null; this.dishCopy = null; this.errMsg = <any>errMsg});
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      date: ''
    });
    this.commentFormDirective.resetForm({rating: 5});
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
