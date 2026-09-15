import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['sNo', 'feedName', 'userName',  'quantity', 'status', 'requestDate', 'action'];
  requests: any[] = [];
  filteredRequests: any[] = [];
  filteredRequestsPaged: any[] = [];

  loading = false;
  searchTerm = '';
  pageIndex = 0;
  pageSize = 5;

  constructor(
    private readonly requestService: RequestService
  ) { }

  ngOnInit(): void {
    this.loadAllRequests();
  }


  loadAllRequests() {
    this.loading = true;
    this.requestService.getAllRequests().subscribe({
      next: (res: any) => {
        this.requests = Array.isArray(res) ? res : [];
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching requests', err);
        this.loading = false;
      }
    });
  }

  onSearch(event: any) {
    this.searchTerm = (event?.target?.value ?? '').toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    if (!this.searchTerm) {
      this.filteredRequests = [...this.requests];
    } else {
      this.filteredRequests = this.requests.filter(req =>
        req.feedId?.feedName?.toLowerCase().includes(this.searchTerm)
      );
    }


    if (this.sort?.active && this.sort?.direction) {
      this.executeSort(this.sort.active, this.sort.direction);
    }


    this.pageIndex = 0;
    this.applyPageSlice();
  }

  sortData(sort: Sort) {
    this.executeSort(sort.active, sort.direction);
    this.pageIndex = 0;
    this.applyPageSlice();
  }

  private executeSort(column: string, direction: string) {
    const isAsc = direction === 'asc';
    if (!direction) return;

    this.filteredRequests = [...this.filteredRequests].sort((a, b) => {
      switch (column) {
        case 'quantity':
          return this.compare(a.quantity, b.quantity, isAsc);
        case 'status':
          return this.compare(
            (a.status ?? '').toLowerCase(),
            (b.status ?? '').toLowerCase(),
            isAsc
          );
        case 'feedName':
          return this.compare(
            (a.feedId?.feedName ?? '').toLowerCase(),
            (b.feedId?.feedName ?? '').toLowerCase(),
            isAsc
          );
        case 'requestDate':
          return this.compare(new Date(a.requestDate).getTime(), new Date(b.requestDate).getTime(), isAsc);
        default:
          return 0;
      }
    });
  }



  private compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private applyPageSlice() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.filteredRequestsPaged = this.filteredRequests.slice(start, end);
  }

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPageSlice();
  }

  updateStatus(id: string, newStatus: string) {
    this.loading = true;
    this.requestService.updateRequestStatus(id, newStatus).subscribe({
      next: () => {
        const item = this.requests.find(r => r._id === id);
        if (item) item.status = newStatus;
        this.applyFilter();
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }
}
