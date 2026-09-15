import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Farm Connect';

  role:any='';
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  get isOwner():boolean{
    return this.role==="owner";
  }
  get isSupplier():boolean{
    return this.role ==='supplier';
  }
  

}
