import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = ''

  questions:any
  questionSelected:any
  question:number = 1

  answers:string[] = []
  answersSelected:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
  }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    console.log(this.answers)
  }

  async nextStep() {
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]

    }else { 
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      //verificar opção ganhadora
    }
  }
  //algoritimo para verificar o item que mais aparece dentro de um vetor
  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length 
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }

}
