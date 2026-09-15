import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {
  
  displayedColumns: string[] = [
    'sno',
    'feedName',
    'type',
    'description',
    'unit',
    'pricePerUnit',
    'action'
  ];

  
  loading = false;
  searchTerm = '';

  feeds: any[] = [];
  filteredFeeds: any[] = [];
  filteredFeedsPaged: any[] = [];

  selectedFeedId:string='';

 
  pageIndex = 0;
  pageSize = 10; 

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  Math = Math;

  constructor(
    private readonly feedService: FeedService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFeeds();
  }

  loadFeeds(): void {
    this.loading = true;
    this.feedService.getAllFeeds().subscribe({
      next: (res: any) => {
        this.feeds = Array.isArray(res) ? res : [];
        this.applyFilter();              // resets pageIndex and slices
        this.loading = false;
      },
      error: (err) => {
        console.error('Feed Error: Could not fetch feeds', err);
        this.loading = false;
      }
    });
  }

  applyFilter(event?: Event): void {
    const value =
      (event && (event.target as HTMLInputElement)?.value?.trim().toLowerCase()) ??
      this.searchTerm?.trim().toLowerCase() ??
      '';

    this.searchTerm = value;

    if (!this.searchTerm) {
      this.filteredFeeds = [...this.feeds];
    } else {
      this.filteredFeeds = this.feeds.filter(f =>
        (f.feedName ?? '').toLowerCase().includes(this.searchTerm)
      );
    }

    this.pageIndex = 0;
    this.applyPageSlice();
  }


  // ---- Slice the current page (same as View Requests) ----
  private applyPageSlice(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.filteredFeedsPaged = this.filteredFeeds.slice(start, end);

    // Feed the mat-table with the current page
    this.dataSource.data = this.filteredFeedsPaged;
  }

  sortData(sort: Sort): void {
    // If no sort is active, keep the current order
    if (!sort.active || sort.direction === '') {
      return;
    }
  
    const isAsc = sort.direction === 'asc';
  
  
    this.filteredFeeds.sort((a: any, b: any) => {
      switch (sort.active) {
        case 'feedName': {
          const aName = (a?.feedName ?? '').toString().trim();
          const bName = (b?.feedName ?? '').toString().trim();
  
          if (!aName && !bName) return 0;
          if (!aName) return isAsc ? 1 : -1;
          if (!bName) return isAsc ? -1 : 1;
  
    
          const cmp = aName.localeCompare(bName, undefined, {
            sensitivity: 'base', 
            ignorePunctuation: true,
            numeric: true       
          });
          return isAsc ? cmp : -cmp;
        }
  
        case 'pricePerUnit': {
          const valA = Number(a?.pricePerUnit?.$numberDecimal ?? a?.pricePerUnit ?? 0);
          const valB = Number(b?.pricePerUnit?.$numberDecimal ?? b?.pricePerUnit ?? 0);
          return isAsc ? valA - valB : valB - valA;
        }
  
        default:
          return 0;
      }
    });
  
    
    this.pageIndex = 0;
    this.applyPageSlice();
  }


  onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPageSlice();
  }
  
  
  editFeed(id: string): void {
    this.router.navigate(['/edit-feed', id]);
  }

  openDeleteDialog(templateRef: TemplateRef<any>, id: string) {

    this.selectedFeedId = id;

    this.dialog.open(templateRef, {
      width: '400px'
    });

  }

  confirmDelete() {
    this.feedService.deleteFeed(this.selectedFeedId).subscribe(() => {
     
      this.feeds = this.feeds.filter(f => f._id !== this.selectedFeedId);
      this.filteredFeeds = this.filteredFeeds.filter(f => f._id !== this.selectedFeedId);
  
      this.applyPageSlice();
  
      this.dialog.closeAll();
    });
  }


}

