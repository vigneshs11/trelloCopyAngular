import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
//import { MatIconModule } from '@angular/material/icon';
//import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CardComponent } from './card/card.component';

import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {
      path: '',
      component: AppComponent,  
  },{

    path:'list',
    component:ListComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    DragDropModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[CardComponent]
})
export class AppModule { }
