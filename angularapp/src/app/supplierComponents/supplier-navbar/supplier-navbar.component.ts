import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-supplier-navbar',
  templateUrl: './supplier-navbar.component.html',
  styleUrls: ['./supplier-navbar.component.css']
})
export class SupplierNavbarComponent implements OnInit {

  userName:string = "";
  
  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;
  
    constructor(
      private readonly router: Router,
      private readonly dialog: MatDialog,
      private readonly snackBar: MatSnackBar,
    ) {}
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
  }
  
   
    openLogoutConfirm(): void {
      const ref = this.dialog.open(this.logoutDialog, {
        width: '380px',
        maxWidth: '95vw',
        disableClose: false,
      });
  
      ref.afterClosed().subscribe((confirmed: boolean) => {
    
        if (confirmed === true) {
          this.performLogout();
        }
        
      });
    }
  
    private performLogout(): void {
     
      localStorage.removeItem('token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_id');
  

      this.snackBar.open('You have been logged out.', 'Close', {
        duration: 2500,
      });
  

      this.router.navigate(['/login']);
    }

}
