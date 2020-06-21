import { Component, OnInit, Input , ViewChild, ElementRef} from '@angular/core';
import {  Output,EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatDialogClose, MatDialogConfig,MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import {CardComponent} from '../card/card.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

 

  //@ViewChild('trigger') trigger:ElementRef;
  @Input() set Name(listName:string) {
    this.currListName = listName;
  }
  @Output() deleteList:EventEmitter<String> = new EventEmitter();

  currListName:String;
  currCardsList:card[] = [];


  //for the modal to open

  //  modal:ElementRef = document.querySelector(".modal");
  //  trigger:any = document.querySelector(".trigger");
  //  closeButton:any = document.querySelector(".close-button");

  guideCard :card = {

    title:'Lets Get Started',
    content:['add List','+ add a task', 'preview - save edit and delete']
  }

  constructor(public matDialog: MatDialog) { 

    //this.currListName = this.listName;
  //this.addNewCard();

    
  
  }

  ngOnInit() {

    console.log(this.currListName + 'ngoninit')

    if(this.currListName == 'Guide')
      this.currCardsList.push(this.guideCard);
      else
      this.currCardsList.push({title:'Let\'s start!',content:[]})
    
  }
 
 



  deleteListMethod(){
    console.log('delete')
    this.deleteList.emit(this.currListName);
  }

  async addNewCard(){
  
     //  console.log('add new card reached')
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.height = "400px";
    dialogConfig.width = "400px";
    dialogConfig.data = { task:'add',header:'Lets be productive', description:''}

     await this.matDialog.open(CardComponent,dialogConfig).afterClosed().subscribe(res=>{

      console.log(JSON.stringify(res.data))

      

      this.currCardsList.push({
         title:res.data.title,
         content:res.data.content
       })
     });


    
    

  }


  async openPreview(index){

    console.log(index)
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.height = "300px";
    dialogConfig.width = "300px";
    dialogConfig.data = { task:'edit',header:this.currCardsList[index].title, content:this.currCardsList[index].content}
  
    await this.matDialog.open(CardComponent,dialogConfig).afterClosed().subscribe(res=>{

      try{
      console.log(JSON.stringify(res.data))
       if(res.event == 'close'){
       this.currCardsList[index].title = res.data.title;
       this.currCardsList[index].content = res.data.content 
      }else if(res.event == 'delete'){

        this.currCardsList.splice(index,1);

        if(this.currCardsList.length == 0){
          this.currCardsList.push({title:'great Job!! we are all done!' ,content:[]})
        }
 
        console.log(JSON.stringify(this.currCardsList))

      }

      // this.currCardsList.push({
      //    title:res.data.title,
      //    content:res.data.content
      //  })
    
    } catch(error){console.log(error + 'i guess you are closing the modal by clicking out side')}
       
     }, error =>{ 
        console.log('wwoow someething messed ups' + error)
     } );


  }

  drop(event: CdkDragDrop<string[]>) {

    console.log('previous continaer' + JSON.stringify(event.previousContainer.data))
    console.log('event current container' + JSON.stringify(event.container.data))
    console.log('previous Index' + JSON.stringify(event.previousIndex))
    console.log('current index' + JSON.stringify(event.currentIndex))
    console.log('current list  in whic dropp happened' + this.currListName)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }



  

}

export class card{
  title:String
  content:String[]
}
