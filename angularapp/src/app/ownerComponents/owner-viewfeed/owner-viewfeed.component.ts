import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Feed } from 'src/app/models/feed.model';
import { FeedService } from 'src/app/services/feed.service';
import { LivestockService } from 'src/app/services/livestock.service';
import { RequestService } from 'src/app/services/request.service';
import { Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-owner-viewfeed',
  templateUrl: './owner-viewfeed.component.html',
  styleUrls: ['./owner-viewfeed.component.css']
})
export class OwnerViewfeedComponent implements OnInit {
  @ViewChild('requestDialog') requestDialog!: TemplateRef<any>;

  displayedColumns: string[] = ['sno', 'name', 'type', 'description', 'unit', 'price', 'action'];

  allFeeds: Feed[] = [];
  filteredFeeds: Feed[] = [];
  displayedFeeds: Feed[] = []; // This acts as your paged slice

  loading: boolean = false;
  
  // Paginator State
  pageIndex: number = 0;
  pageSize: number = 5;

  requestForm: FormGroup;
  selectedFeed?: Feed;
  livestockOptions: any[] = [];
  userId: string = '';

  private currentSort: Sort | null = null;

  constructor(
    private readonly fb: FormBuilder,
    public dialog: MatDialog,
    private readonly feedService: FeedService,
    private readonly requestService: RequestService,
    private readonly livestockService: LivestockService,
    private readonly snackBar: MatSnackBar,
    private readonly authStorage: AuthStorageService
  ) {
    this.requestForm = this.fb.group({
      livestockId: ['', Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.userId = this.authStorage.getItem('userId') || '';
    this.loadInitialData();
  }

  loadInitialData() {
    this.loading = true;

    // Load Livestock for the dropdown
    this.livestockService.getLivestockByUserid(this.userId).subscribe({
      next: (data) => { this.livestockOptions = data; },
      error: () => { this.loading = false; }
    });

    // Load Feeds
    this.feedService.getAllFeeds().subscribe({
      next: (data) => {
        this.allFeeds = Array.isArray(data) ? data : [];
        this.applyFilterLogic(''); // Initialize view
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value?.toLowerCase().trim() || '';
    this.applyFilterLogic(filterValue);
  }

  private applyFilterLogic(searchTerm: string) {
    // 1. Filter
    if (!searchTerm) {
      this.filteredFeeds = [...this.allFeeds];
    } else {
      this.filteredFeeds = this.allFeeds.filter(feed =>
        (feed.feedName || '').toLowerCase().includes(searchTerm) ||
        (feed.description || '').toLowerCase().includes(searchTerm)
      );
    }

    // 2. Sort
    if (this.currentSort && this.currentSort.direction) {
      this.executeSort(this.currentSort);
    }

    // 3. Reset to first page and slice
    this.pageIndex = 0;
    this.applyPageSlice();
  }

  // Paginator Event Handler
  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPageSlice();
  }

  private applyPageSlice() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedFeeds = this.filteredFeeds.slice(start, end);
  }

  sortData(sort: Sort) {
    this.currentSort = sort;
    this.executeSort(sort);
    this.pageIndex = 0;
    this.applyPageSlice();
  }

  private executeSort(sort: Sort) {
    if (!sort.active || sort.direction === '') return;

    const isAsc = sort.direction === 'asc';

    this.filteredFeeds.sort((a, b) => {
      switch (sort.active) {
        case 'name': {
          const aName = (a?.feedName ?? '').toString().trim();
          const bName = (b?.feedName ?? '').toString().trim();
          const cmp = aName.localeCompare(bName, undefined, { numeric: true, sensitivity: 'base' });
          return isAsc ? cmp : -cmp;
        }
        case 'price': {
          const aVal = toNumber(a?.pricePerUnit);
          const bVal = toNumber(b?.pricePerUnit);
          return isAsc ? aVal - bVal : bVal - aVal;
        }
        default: return 0;
      }
    });
  }

  openRequestForm(feed: Feed) {
    this.selectedFeed = feed;
    this.requestForm.reset();
    this.dialog.open(this.requestDialog, { width: '400px' });
  }

  confirmRequest() {
    if (this.requestForm.valid && this.selectedFeed?._id && this.userId) {
      const payload = {
        feedId: this.selectedFeed._id,
        userId: this.userId,
        livestockId: this.requestForm.value.livestockId,
        quantity: this.requestForm.value.quantity,
        status: 'Pending',
        requestDate: new Date().toISOString()
      };

      this.requestService.addRequest(payload).subscribe({
        next: () => {
          this.dialog.closeAll();
          this.snackBar.open('Request Sent Successfully!', 'Close', { duration: 2500 });
        },
        error: () => alert('Error sending request')
      });
    } else {
      this.requestForm.markAllAsTouched();
    }
  }
}

function toNumber(pricePerUnit: any): number {
  if (pricePerUnit == null) return 0;

  const decimal = pricePerUnit.$numberDecimal ?? pricePerUnit;

  const n = Number(decimal);
  return Number.isNaN(n) ? 0 : n;
}