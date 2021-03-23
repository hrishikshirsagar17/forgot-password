import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'kt-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  loading: boolean;
  constructor(private loaderService: LoaderService) { 
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
  
  ngOnInit() {
  }
  
  ngOnDestroy() {
  }

}
