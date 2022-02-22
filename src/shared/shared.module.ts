import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [ 
    CommonModule, 
    MaterialModule, 
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    CommonModule, 
    MaterialModule, 
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
})
export class SharedModule {}