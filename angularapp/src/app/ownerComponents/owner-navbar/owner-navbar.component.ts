import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent implements OnInit {

  userName:string = "";

  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {

    this.userName = localStorage.getItem('userName')
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

    localStorage.clear();


    this.snackBar.open('You have been logged out.', 'Close', {
      duration: 2500,
    });
    this.router.navigate(['/login']);
  }
}
