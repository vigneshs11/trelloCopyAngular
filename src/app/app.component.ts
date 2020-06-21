import { Component } from '@angular/core';
//import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trello';


 

  lists:any = ['Guide'];

  addList(){

    this.lists.push('List' + parseInt(this.lists.length + 1)  )

    console.log(this.lists)
  }

  removeList(data){

    console.log(this.lists.indexOf(data) + 'is supposed to be deleted')
    this.lists.splice(this.lists.indexOf(data),1)

   this.lists = [...this.lists]
   console.log(...this.lists)
    
  }
}
