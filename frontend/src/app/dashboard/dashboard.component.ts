import { Component, AfterViewInit } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage:any;
	data:any;
	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardServiceService,private ngxService:NgxUiLoaderService,private snackBarService:SnackbarService) {
	this.ngxService.start();
	}
	ngOnInit() {
		this.dashboardData();
	}
	dashboardData(){
		this.dashboardService.getDetails().subscribe((res:any)=>{
			this.responseMessage = res.message;
			this.data = res.data;
			this.snackBarService.openSnackBar(this.responseMessage,'success');
			this.ngxService.stop();
		},(error:any)=>{
			this.responseMessage = error.error.message;
			this.snackBarService.openSnackBar(this.responseMessage,'error');
			this.ngxService.stop();
		})
	}
}
