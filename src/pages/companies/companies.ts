import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CompanyResultList } from '../../models/companies/companyresultlist.interface';
import { Company } from '../../models/companies/company.interface';
import { Pagination } from '../../models/pagination/pagination.interface';
import { PaginationData } from '../../models/pagination/paginationdata.interface';
import { CompanyService } from '../../providers/company-service/company-service';
import { Profile } from '../../models/profiles/profile.interface';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

@IonicPage()
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {

  @ViewChild('content') content:any;

  private loader : any;

  private loaderget : any;

  private companyList: Company[];

  private userProfile: Profile;

  private resultList: CompanyResultList;

  private pagination: Pagination;

  private paginationData: PaginationData;

  //define infinite scroll variables
  page = 1;
  currentpage: number = 1;
  perPage: number;
  total: number;
  totalPage: number;
  prevUrl: string;
  nextUrl: string;
  //end define infinite scroll variables

  constructor(
  			  public navCtrl: NavController, 
          public companyService: CompanyService, 
          public myUserData: MyUserData,
  			  public alertCtrl: AlertController, 
  			  public navParams: NavParams, 
	        private loadingCtrl:LoadingController) {
          
          //show the loader image
          this.loader = this.loadingCtrl.create({
              content: "Loading ..."
          });
  		
  }

  selectCompany(company: Company) {
  	this.navCtrl.push('ChatthreadsPage', { company });
  }

  showAddCompanyDialog() {
  	
    this.alertCtrl.create({

  		title: 'Add New Company',
  		inputs: [{
  			name: 'companyName'
  		}],
  		buttons: [
  			{
  				text: 'Cancel',
  				role: 'cancel'
  			},
  			{
  				text: 'Save',

  				handler: data => {

  					if (data.companyName) {
                  
                this.loader = this.loadingCtrl.create({
                    content: "Saving ..."
                });

                this.loader.present();

                this.companyService.addUserCompany(data.companyName).then((result: any) => {

                    if(this.loader){ this.loader.dismiss(); }

                    //refresh companys
                    this.getCompanies();

                }, (err) => {

                    if(this.loader){ this.loader.dismiss(); }

                    let error =  JSON.parse(err._body);
                      
                    let alert = this.alertCtrl.create({
                      cssClass:'alert-danger',
                      title:'Error', 
                      subTitle: error.message,
                      buttons: ['OK']
                    });
                    alert.present();

                });

            } else {

                return false;

            }


  				}
  			}
  		]
  	}).present();
  }

  getCompanies() {
    
      this.loaderget = this.loadingCtrl.create({
          content: "Loading ..."
      });

      this.loaderget.present();

      let user_id = this.userProfile.user_id;

      this.companyService.getUserCompanies(user_id).then((result) => {

          if(this.loaderget){ this.loaderget.dismiss(); }

          //get whole result
          this.resultList =  <CompanyResultList>result;

          //console.log("company list: ");
          console.log(this.resultList.data);

          //get data portion
          this.companyList = <Company[]>this.resultList.data;

          //get meta portion
          this.pagination = <Pagination>this.resultList.meta;

          this.paginationData = <PaginationData>this.pagination.pagination;

          this.page = this.paginationData.current_page;
          this.perPage = this.paginationData.per_page;
          this.total = this.paginationData.total;
          this.totalPage = this.paginationData.total_pages;
          //this.prevUrl = this.paginationData.links.previous;
          //this.nextUrl = this.paginationData.links.next;

          //this.scrollToTop();

        }, (err) => {

            if(this.loaderget){ this.loaderget.dismiss(); }

            let errormsg =  JSON.parse(err._body);
            let alert = this.alertCtrl.create({
              cssClass:'alert-danger',
              title:'Error', 
              subTitle: errormsg.message,
              buttons: ['OK']
            });
            alert.present();

        });
    
  }

  doInfinite(): Promise<any> {

    this.currentpage = this.page;

    this.page = this.page + 1;

    let user_id = this.userProfile.user_id;

    return new Promise((resolve) => {
      setTimeout(() => {

        
          this.companyService.getUserCompanies(user_id, this.page).then((result) => {

            //get whole result
            this.resultList =  <CompanyResultList>result;

            //get data portion
            //this.companyList = <Channel[]>this.resultList.data;

            //load more data
            for(let i=0; i<this.resultList.data.length; i++) {
               this.companyList.push(<Company>this.resultList.data[i]);
            }

            //get meta portion
            this.pagination = <Pagination>this.resultList.meta;

            this.paginationData = <PaginationData>this.pagination.pagination;

            //this.data = result;
            this.page = this.paginationData.current_page;
            this.perPage = this.paginationData.per_page;
            this.total = this.paginationData.total;
            this.totalPage = this.paginationData.total_pages;
            //this.prevUrl = this.paginationData.links.previous;
            //this.nextUrl = this.paginationData.links.next;

            /*console.log(this.page);
            console.log(this.totalPage);
            console.log(this.resultList);
            console.log(this.companyList);
            console.log(this.pagination);*/

            resolve();

        }, (err) => {
            
            let errormsg =  JSON.parse(err._body);
            let alert = this.alertCtrl.create({
              cssClass:'alert-danger',
              title:'Error', 
              subTitle: errormsg.message,
              buttons: ['OK']
            });
            alert.present();

            resolve();

        });

        //infiniteScroll.complete();


        
      }, 500);
    })

  }


  /*scrollToTop() {

    if (this.content != null) {
      setTimeout(() => {
        this.content.scrollToTop(500);//500ms animation speed
      }, 500);
    }

  }
*/

  /*refresh() {
    //get companies
    this.getSaccos();
  }*/


  ionViewWillLoad() {
    
    //get user stored in db
    this.myUserData.getUser().then((user) => {

        this.userProfile = <Profile>JSON.parse(user);

        //get chatthread chat messages
        setTimeout(() => {

          this.loader.dismiss();

          //get companies
          this.getCompanies();

        }, 1000);

    });
  }


}
