import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedbackcopy: Feedback;
  errMess: string;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'Firstname is a required field',
      'minlength': 'Firstname should be atleast 2 characters long',
      'maxlength': 'Firstname should be less than 25 characters'
    },
    'lastname': {
      'required': 'Lastname is a required field',
      'minlength': 'Lastname should be atleast 2 characters long',
      'maxlength': 'Lastname should be less than 25 characters'
    },
    'telnum': {
      'required': 'Telephone Number is a required field',
      'pattern': 'Telephone Number must contain only numbers'
    },
    'email': {
      'required': 'Email is a required field',
      'email': 'Enter a valid email address'
    }
  };

  isLoading: boolean;
  isShowingResponse: boolean;

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder) {
      this.createForm();
      this.isLoading = false;
      this.isShowingResponse = false;
    }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    // Used to reset form validaiton messages.
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback => {
          this.feedback = feedback;
          console.log(this.feedback);
        } ,
        errmess => {
          this.feedback = null;
          this.feedbackcopy = null;
          this.errMess = <any>errmess;
        } ,
        () => {
          this.isShowingResponse = true;
          setTimeout(() => {
              this.isShowingResponse = true;
              this.isLoading = false;
            } , 5000
          );
        });
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
