import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthStorageService } from 'src/app/services/auth-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;


  role: 'anonymous' | 'owner' | 'supplier' = 'anonymous';

  menuOpen = false;
  elevated = false;

  userName: string = '';
  userEmail: string = '';


  constructor(private readonly router: Router, private readonly snackBar: MatSnackBar, private authStorage: AuthStorageService, private readonly dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadRole();
  }

  openLogoutConfirm(): void {
    const ref = this.dialog.open(this.logoutDialog, {
      width: '380px',
      maxWidth: '95vw',
      disableClose: false,
    });

    ref.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed === true) {
        this.logout();
      }

    });
  }
  loadRole() {
    // const raw = localStorage.getItem('role');
    const raw = this.authStorage.getItem('role');
    console.log(raw);
    if (!raw) return;
    this.userName = this.authStorage.getItem('userName');
    this.userEmail = this.authStorage.getItem('email');

    // const data = JSON.parse(raw);

    this.role = (raw === 'owner' || raw === 'supplier')
      ? raw
      : 'anonymous';

    // this.user = data.user || {};

  }

  toggleMenu() { this.menuOpen = true; }
  closeMenu() { this.menuOpen = false; }

  logout() {
    localStorage.clear();
    this.authStorage.clear();
    this.role = 'anonymous';
    this.closeMenu();
    this.userName = '';
    this.userEmail = '';
    this.snackBar.open('You have been logged out.', 'Close', {
      duration: 2500,
    });
    this.router.navigate(['/home']);
  }

  initials(): string {
    if (!this.userName) return 'U';
    const parts = this.userName.trim().split(' ');
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.elevated = (window.scrollY || 0) > 2;
  }
}
