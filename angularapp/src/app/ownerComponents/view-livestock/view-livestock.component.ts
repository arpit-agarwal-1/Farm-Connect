import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LivestockService } from '../../services/livestock.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthStorageService } from 'src/app/services/auth-storage.service';

@Component({
  selector: 'app-view-livestock',
  templateUrl: './view-livestock.component.html',
  styleUrls: ['./view-livestock.component.css']
})
export class ViewLivestockComponent implements OnInit {
  displayedColumns: string[] = [
    'sno', 'name', 'species', 'age', 'breed', 'healthCondition', 'location', 'vaccinationStatus', 'action'
  ];

  // Data Arrays
  allLivestock: any[] = [];         // Raw data from DB
  filteredLivestock: any[] = [];    // Data after Search/Filters
  displayedLivestock: any[] = [];   // Data for current page slice

  // Pagination State
  pageIndex: number = 0;
  pageSize: number = 5;

  // Filters State
  searchText = '';
  healthFilter = '';
  vaccinationFilter = '';
  private currentSort: Sort | null = null;

  loading: boolean = false;
  userId: string = '';
  
  // Selection for dialogs
  selectedId = '';
  selectedAttachment = '';
  selectedLivestockName = '';

  constructor(
    private readonly livestockService: LivestockService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly authStorage: AuthStorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.authStorage.getItem('userId');
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.livestockService.getLivestockByUserid(this.userId).subscribe({
      next: (res) => {
        this.allLivestock = res ?? [];
        this.filterData(); // This initializes filtered and displayed arrays
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching livestock:', err);
        this.loading = false;
      }
    });
  }

  // --- Filter Logic ---

  onSearch(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterData();
  }

  applyHealthFilter(event: Event) {
    this.healthFilter = (event.target as HTMLSelectElement).value;
    this.filterData();
  }

  applyVaccinationFilter(event: Event) {
    this.vaccinationFilter = (event.target as HTMLSelectElement).value;
    this.filterData();
  }

  filterData() {
    let filtered = [...this.allLivestock];

    // 1. Text Search
    if (this.searchText) {
      const q = this.searchText.trim();
      filtered = filtered.filter(l =>
        (l.name ?? '').toLowerCase().includes(q) ||
        (l.breed ?? '').toLowerCase().includes(q) ||
        (l.location ?? '').toLowerCase().includes(q)
      );
    }

    // 2. Health Dropdown
    if (this.healthFilter) {
      filtered = filtered.filter(l => l.healthCondition === this.healthFilter);
    }

    // 3. Vaccination Dropdown
    if (this.vaccinationFilter) {
      filtered = filtered.filter(l => l.vaccinationStatus === this.vaccinationFilter);
    }

    this.filteredLivestock = filtered;

    // 4. Sort if active
    if (this.currentSort && this.currentSort.direction) {
      this.executeSort(this.currentSort);
    }

    // 5. Reset to page 1 and slice
    this.pageIndex = 0;
    this.applyPageSlice();
  }

  // --- Pagination Logic ---

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPageSlice();
  }

  private applyPageSlice() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedLivestock = this.filteredLivestock.slice(start, end);
  }

  // --- Sorting Logic ---

  sortData(sort: Sort) {
    this.currentSort = sort;
    this.executeSort(sort);
    this.pageIndex = 0;
    this.applyPageSlice();
  }

  private executeSort(sort: Sort) {
    if (!sort.active || sort.direction === '') return;
    const isAsc = sort.direction === 'asc';

    const healthOrder = ['Healthy', 'In Treatment', 'Sick', ''];
    const vaccOrder = ['Vaccinated', 'Not Vaccinated', ''];

    const rank = (val: string, order: string[]) => {
      const idx = order.indexOf((val || '').trim());
      return idx === -1 ? order.length : idx;
    };

    this.filteredLivestock.sort((a, b) => {
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'age':
          return this.compare(Number(a.age), Number(b.age), isAsc);
        case 'healthCondition':
          return this.compare(rank(a.healthCondition, healthOrder), rank(b.healthCondition, healthOrder), isAsc);
        case 'vaccinationStatus':
          return this.compare(rank(a.vaccinationStatus, vaccOrder), rank(b.vaccinationStatus, vaccOrder), isAsc);
        default:
          return this.compare(a[sort.active], b[sort.active], isAsc);
      }
    });
  }

  private compare(a: any, b: any, isAsc: boolean) {
    const valA = (a ?? '').toString().toLowerCase();
    const valB = (b ?? '').toString().toLowerCase();
    return (valA < valB ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // --- Actions ---

  editLivestock(id: string) {
    this.router.navigate(['/edit-livestock', id]);
  }

  openDeleteDialog(templateRef: TemplateRef<any>, id: string) {
    this.selectedId = id;
    this.dialog.open(templateRef, { width: '400px' });
  }

  confirmDelete() {
    if (this.selectedId) {
      this.livestockService.deleteLivestock(this.selectedId).subscribe({
        next: () => {
          this.allLivestock = this.allLivestock.filter(l => l._id !== this.selectedId);
          this.filterData();
          this.dialog.closeAll();
          this.snackBar.open('Livestock deleted', 'Close', { duration: 2500 });
          this.selectedId = '';
        },
        error: (err) => {
          console.error('Delete Error:', err);
          this.dialog.closeAll();
        }
      });
    }
  }

  openAttachmentDialog(templateRef: TemplateRef<any>, attachment: string, name: string) {
    this.selectedAttachment = attachment;
    this.selectedLivestockName = name;
    this.dialog.open(templateRef, { width: '520px' });
  }
}