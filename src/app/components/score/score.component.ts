import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserSelectedAnswers } from 'src/app/interfaces/userSelectedAnswers';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  public userSelectedAnswer: UserSelectedAnswers[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private dialog: MatDialog) {

    this.userSelectedAnswer = this.data.userSelectedAnswer
  }

  ngOnInit(): void {
  }

  /*
   * Method will remove email from session, close the popup and navigate to home page.
   */
  public navigateToHomePage(): void {

    sessionStorage.removeItem('email');
    this.dialog.getDialogById('scoreDialog').close();
    this.router.navigateByUrl('/');
  }

}
