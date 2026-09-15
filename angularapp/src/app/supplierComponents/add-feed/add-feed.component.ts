import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-add-feed',
  standalone: false,
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.css']
})
export class AddFeedComponent implements OnInit {

  feedForm!: FormGroup;

  isEditMode = false;

  feedId!: string;

  constructor(

    private readonly fb: FormBuilder,

    private readonly feedService: FeedService,

    private readonly router: Router,

    private readonly route: ActivatedRoute,

    private readonly dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.feedForm = this.fb.group({

      feedName: ['', Validators.required],

      type: ['', Validators.required],

      description: ['', Validators.required],

      unit: ['', Validators.required],

      pricePerUnit: ['', Validators.required]

    });

    this.route.params.subscribe(params => {

      if (params['id']) {
        this.isEditMode = true;
        this.feedId = params['id'];
        this.loadFeed();
      }

    });

  }

  loadFeed() {

    this.feedService.getFeedById(this.feedId).subscribe((feed: any) => {

      let price = feed.pricePerUnit;



      if (typeof feed.pricePerUnit === 'object' && feed.pricePerUnit.$numberDecimal) {

        price = feed.pricePerUnit.$numberDecimal;

      }

      this.feedForm.patchValue({

        feedName: feed.feedName,

        type: feed.type,

        description: feed.description,

        unit: feed.unit,

        pricePerUnit: price

      });

    });

  }




  onSubmit(successDialog: TemplateRef<any>) {

    if (this.feedForm.invalid) {

      this.feedForm.markAllAsTouched();

      return;

    }

    const data = {

      ...this.feedForm.value,

      pricePerUnit: Number(this.feedForm.value.pricePerUnit)

    };

    if (this.isEditMode) {

      this.feedService.updateFeed(this.feedId, data).subscribe(() => {

        this.dialog.open(successDialog);

      });

    } else {

      this.feedService.addFeed(data).subscribe(() => {

        this.dialog.open(successDialog);

      });

    }

  }




  closeDialog() {

    this.dialog.closeAll();

    this.router.navigate(['/view-feed']);

  }

  goBack() {

    this.router.navigate(['/view-feed']);

  }
}
