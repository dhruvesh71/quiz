import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Questions } from 'src/app/interfaces/questions';
import { UserSelectedAnswers } from 'src/app/interfaces/userSelectedAnswers';
import { AppService } from 'src/app/services/app.service';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css'],
})
export class ContestComponent implements OnInit {

  public selectedOption: string;
  private allQuestions: Questions;
  public displayedQuestion: string;
  public displayedOption: string[];
  public displayedAnswer: string;
  public displayedFact: string;
  public questionIndex: number = 0;
  public score: number = 0;
  public timer: number = 15;
  private userSelectedAnswer: UserSelectedAnswers[] = [];

  // Message Flags
  public displaySelectOneMessage: boolean = false;
  public displayIncorrectOptionMessage: boolean = false;
  public displayCorrectOptionMessage: boolean = false;
  public disableNextQuestion: boolean = false;

  // Interval related objects
  private nextQuestionInterval;
  private timerInterval;

  constructor(private appService: AppService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.appService.fetchQuestions().subscribe((response) => {
      this.allQuestions = response;
      this.mapQuestions();
    });

    this.setTimerInterval();
    this.setNextQuestionInterval();
  }

  /*
   * Method will check whether the answer submitted is correct or not.
   * If not then display error message else enable the next question button.
   */
  public submitAnswer(): void {

    if (!this.selectedOption) {

      this.displaySelectOneMessage = true;

    } else if (!(this.selectedOption === this.displayedAnswer)) {

      this.displaySelectOneMessage = false;
      this.displayIncorrectOptionMessage = true;
      this.disableNextQuestion = true;
      this.clearIntervals();
      this.noteUserSelectedAnswers();

    } else {
      this.displaySelectOneMessage = false;
      this.displayCorrectOptionMessage = true;
      this.disableNextQuestion = true;
      this.clearIntervals();
      this.noteUserSelectedAnswers();

      this.score = this.score + 100;
    }
  }

  /*
   * Method will map the next question data and will also Clear the time intervals and reinitiate on next question.
   * If the question reaches to 5 then the method will open a popup which display's the use score.
   */
  public nextQuestion(): void {

    if (!this.selectedOption) {
      this.noteUserSelectedAnswers();
    }

    if (this.questionIndex < 4) {

      this.displaySelectOneMessage = false;
      this.displayIncorrectOptionMessage = false;
      this.displayCorrectOptionMessage = false;
      this.disableNextQuestion = false;

      this.questionIndex++;
      this.mapQuestions();

      this.timer = 15;
      this.setTimerInterval();
      this.setNextQuestionInterval();

    } else {

      this.clearIntervals();

      this.dialog.open(ScoreComponent, {
        id: "scoreDialog",
        width: "90%",
        height: "90%",
        disableClose: true,
        data: {
          score: this.score,
          userSelectedAnswer: this.userSelectedAnswer
        }
      })
    }


  }

  /*
   * Method to map the question, option and the answer in order to display to UI.
   */
  private mapQuestions(): void {
    this.displayedQuestion = this.allQuestions.questions[this.questionIndex].question;
    this.displayedOption = this.allQuestions.questions[this.questionIndex].option;
    this.displayedAnswer = this.allQuestions.questions[this.questionIndex].answer;
    this.displayedFact = this.allQuestions.questions[this.questionIndex].fact;
    this.selectedOption = '';
  }

  /*
   * Method to Set the timer for remaining time to user.
   */
  private setTimerInterval() {

    this.timerInterval = setInterval(() => {

      if (this.timer <= 0) {
        this.timer = 15;
      } else {
        this.timer--;
      }
    }, 1000);
  }

  /*
   * Method to set the interval for the next question if no user action occur.
   */
  private setNextQuestionInterval() {

    this.nextQuestionInterval = setInterval(() => {
      this.nextQuestion();
    }, 16000);
  }

  /*
   * Method to clear the intervals.
   */
  private clearIntervals() {
    clearInterval(this.timerInterval);
    clearInterval(this.nextQuestionInterval);
  }

  private noteUserSelectedAnswers() {

    this.userSelectedAnswer.push({
      question: this.displayedQuestion,
      answer: this.displayedAnswer,
      selectedOption: this.selectedOption
    });
  }
}
