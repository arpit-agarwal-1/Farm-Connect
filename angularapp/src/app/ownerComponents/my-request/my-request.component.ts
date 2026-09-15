import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Request } from 'src/app/models/request.model';
import { RequestService } from 'src/app/services/request.service';
import { Sort } from '@angular/material/sort'; 
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'livestock', 'quantity', 'status', 'date', 'action'];

  allRequests: Request[] = [];
  filteredRequests: Request[] = [];
  displayedRequests: Request[] = []; // This acts like your "Paged" array

  // Paginator State
  pageIndex: number = 0;
  pageSize: number = 10;
  
  userId: string = '';
  loading: boolean = false;
  private currentSort: Sort | null = null;

  constructor(
    private readonly requestService: RequestService,
    private readonly dialog: MatDialog,
    private readonly authStorage: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.authStorage.getItem('userId');
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.requestService.getRequestsByUserId(this.userId).subscribe({
      next: (data: Request[]) => {
        this.allRequests = Array.isArray(data) ? data : [];
        this.applyFilterLogic(''); // Initialize filter
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  // Changed to handle the search input
  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value?.toLowerCase().trim() || '';
    this.applyFilterLogic(filterValue);
  }

  private applyFilterLogic(searchTerm: string) {
    // 1. Filter
    if (!searchTerm) {
      this.filteredRequests = [...this.allRequests];
    } else {
      this.filteredRequests = this.allRequests.filter(req =>
        (req?.feedId?.feedName || '').toLowerCase().includes(searchTerm)
      );
    }

    // 2. Sort if active
    if (this.currentSort && this.currentSort.direction) {
      this.executeSort(this.currentSort);
    }

    // 3. Reset to first page and slice
    this.pageIndex = 0;
    this.applyPageSlice();
  }

  // Paginator Event Handler (Matches ViewRequestComponent)
  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPageSlice();
  }

  // Slicing logic (Matches ViewRequestComponent)
  private applyPageSlice() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedRequests = this.filteredRequests.slice(start, end);
  }

  sortData(sort: Sort) {
    this.currentSort = sort;
    this.executeSort(sort);
    this.pageIndex = 0; // Reset page on sort
    this.applyPageSlice();
  }

  private executeSort(sort: Sort) {
    if (!sort.active || sort.direction === '') return;

    const isAsc = sort.direction === 'asc';

    this.filteredRequests.sort((a, b) => {
      switch (sort.active) {
        case 'name': {
          const aName = (a?.feedId?.feedName ?? '').toString().trim();
          const bName = (b?.feedId?.feedName ?? '').toString().trim();
          const cmp = aName.localeCompare(bName, undefined, { numeric: true, sensitivity: 'base' });
          return isAsc ? cmp : -cmp;
        }
        case 'quantity': {
          const aVal = Number(a?.quantity ?? 0);
          const bVal = Number(b?.quantity ?? 0);
          return isAsc ? aVal - bVal : bVal - aVal;
        }
        case 'date': {
          const aTime = toTime(a?.requestDate) || 0;
          const bTime = toTime(b?.requestDate) || 0;
          return isAsc ? aTime - bTime : bTime - aTime;
        }
        default: return 0;
      }
    });
  }

  openDeleteConfirm(request: Request, templateRef: TemplateRef<any>) {
    if (request.status === 'Pending') {
      this.dialog.open(templateRef, { width: '400px', data: request });
    }
  }

  confirmDelete(id: string) {
    this.requestService.deleteRequest(id).subscribe({
      next: () => {
        this.loadRequests();
        this.dialog.closeAll();
      },
      error: (err) => console.log(err)
    });
  }

}

function toTime(val: unknown): number | null {
  if (!val) return null;
  if (val instanceof Date) {
    const t = val.getTime();
    return Number.isNaN(t) ? null : t;
  }
  const t = new Date(val as any).getTime();
  return Number.isNaN(t) ? null : t;
}