import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LivestockService } from '../../services/livestock.service';
import { Livestock } from 'src/app/models/livestock.model';
import { AuthStorageService } from 'src/app/services/auth-storage.service';

@Component({
  selector: 'app-livestock-form',
  templateUrl: './livestock-form.component.html',
  styleUrls: ['./livestock-form.component.css']
})
export class LivestockFormComponent implements OnInit {
  
  livestockForm!: FormGroup;
  isEditMode = false;
  livestockId!: any;

  previewImage: string | null = null;

  successMessage = '';
  showSuccess = false; 

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly livestockService: LivestockService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authStorage:AuthStorageService
  ) {}

  ngOnInit(): void {

    const userId = this.authStorage.getItem('userId');

    this.livestockForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      breed: ['', Validators.required],
      healthCondition: ['', Validators.required],
      location: ['', Validators.required],
      vaccinationStatus: ['', Validators.required],
      attachment: [''],  
      userId: [userId]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.livestockId = params['id'];
        this.loadLivestock();
      }
    });
  }

  loadLivestock() {
    this.livestockService.getLivestockById(this.livestockId).subscribe((data: Livestock) => {
      this.livestockForm.patchValue({
        name: data.name,
        species: data.species,
        age: data.age,
        breed: data.breed,
        healthCondition: data.healthCondition,
        location: data.location,
        vaccinationStatus: data.vaccinationStatus,
        attachment: data.attachment
      });

      this.previewImage = data.attachment;
    });
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Only images allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Max 5MB allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.previewImage = base64;

      this.livestockForm.patchValue({
        attachment: base64
      });
    };

    reader.readAsDataURL(file);
  }

  removeImage() {
    this.previewImage = null;
    this.livestockForm.patchValue({ attachment: '' });

    this.fileInput.nativeElement.value = '';
  }

  onSubmit() {

    if (this.livestockForm.invalid) {
      this.livestockForm.markAllAsTouched();
      return;
    }

    const livestockData: Livestock = this.livestockForm.value;

    if (this.isEditMode) {

      this.livestockService.updateLivestock(this.livestockId, livestockData)
        .subscribe(() => {
          this.successMessage = 'Livestock Updated Successfully!';
          this.showSuccess = true;
        });

    } else {

      this.livestockService.addLivestock(livestockData)
        .subscribe(() => {
          this.successMessage = 'Livestock Added Successfully!';
          this.livestockForm.reset();
          this.previewImage = null;
          this.showSuccess = true;
        });
    }
  }


  cancelBtn(){
    this.router.navigate(['/view-livestock'])
  }

  closeSuccess() {
    this.showSuccess = false;
    this.router.navigate(['/view-livestock']); 
  }
}