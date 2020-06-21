import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogClose, MatDialogConfig,MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cardName:String = 'Enter task';
  response:card = new card();

    commentList:String[] = [];

  constructor( public dailogRef: MatDialogRef<CardComponent>,@Inject(MAT_DIALOG_DATA) public data:any) {
        
    if(this.data.task == 'edit'){
      console.log('we came here')
    this.cardName = this.data.header;
    this.commentList= this.data.content.map(e =>{ return e});
    //this.commentList.push(this.data.content);
      
      console.log(this.cardName)
      console.log(this.commentList)
  }
   }
  
  



     onNoClick():void{
      this.dailogRef.close();
    }

  ngOnInit() {
    
   
  }

  addComment(parm){
    console.log(parm)
    this.commentList.push(parm);

    
  }

  deleteFunction(){

    this.response.title = this.cardName;
     this.response.content = this.commentList;
    
    this.dailogRef.close({event:'delete',data:this.response})

  }

  closeModal(){
  
     this.response.title = this.cardName;
     this.response.content = this.commentList;
    
    this.dailogRef.close({event:'close',data:this.response})
  }

}


export class card{
  title:String
  content:String[]
}
