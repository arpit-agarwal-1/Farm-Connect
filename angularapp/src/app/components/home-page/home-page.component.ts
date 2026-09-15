import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from 'src/app/services/auth-storage.service';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private readonly authStorage: AuthStorageService) { }

  role: any = '';
  ngOnInit(): void {
    this.role = this.authStorage.getItem('token');
  }

  get loggedIn():boolean{
    return !!this.authStorage.getItem('token');
  }
  get isOwner(): boolean {
    return this.role === "owner";
  }
  get isSupplier(): boolean {
    return this.role === 'supplier';
  }


  features = [
    {
      icon: 'monitor_heart',
      title: 'Livestock Health',
      desc: 'Monitor vital signs and track health history for every animal in your care.',
    },
    {
      icon: 'trending_up',
      title: 'Market Prices',
      desc: 'Real-time updates on crop and livestock prices to help you sell at the right time.',
    },
    {
      icon: 'groups',
      title: 'Community Advice',
      desc: 'Connect with a global network of farmers and agricultural experts.',
    },
    {
      icon: 'notifications_active',
      title: 'Smart Reminders',
      desc: 'Never miss a vaccination, harvest window, or maintenance task again.',
    },
  ];








}
