import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';

import { CompanyResultList } from '../../models/companies/companyresultlist.interface';
import { Company } from '../../models/companies/company.interface';
import { Usercompany } from '../../models/companies/usercompany.interface';
import { Pagination } from '../../models/pagination/pagination.interface';
import { PaginationData } from '../../models/pagination/paginationdata.interface';
import { CompanyService } from '../../providers/company-service/company-service';
import { Profile } from '../../models/profiles/profile.interface';
import { MyUserData } from '../../providers/my-user-data/my-user-data';

@IonicPage()
@Component({
  selector: 'page-companies-modal',
  templateUrl: 'companiesmodal.html',
})
export class CompaniesmodalPage {

  @ViewChild('content') content:any;

  private loader : any;

  private loaderget : any;

  private companyList: Company[];

  private userProfile: Profile;

  private resultList: CompanyResultList;

  private pagination: Pagination;

  private paginationData: PaginationData;

  //define infinite scroll variables
  private page = 1;
  private currentpage: number = 1;
  private perPage: number;
  private total: number;
  private totalPage: number;
  private userSigned: boolean;
  private userJoinRequest: boolean;
  //end define infinite scroll variables

  constructor(
  			  private navCtrl: NavController, 
          private companyService: CompanyService, 
          private myUserData: MyUserData,
          private alertCtrl: AlertController, 
          private view: ViewController,
  			  private navParams: NavParams, 
	        private loadingCtrl:LoadingController) {
          
          //show the loader image
          this.loader = this.loadingCtrl.create({
              content: "Loading ..."
          });
  		
  }

  selectCompany(company: Company) {
  	this.navCtrl.push('ChatthreadsPage', { company });
  }

  closeModal() {
    this.view.dismiss(); 
  }

  showConfirm(company: Company) {
    
    this.loader = this.loadingCtrl.create({
        content: "Checking ..."
    });
    this.loader.present();
    this.companyService.checkUserCompanySignup(company).then((result: any) => {
        
        if(this.loader){ this.loader.dismiss(); }
        
        //get the user_signed result from json api
        this.userSigned = result.user_signed;
        //get the user_signed result from json api
        this.userJoinRequest = result.user_join_request;
        console.log(result);

        if (this.userSigned) {
          //user is already signed up to company, stop with a message
          const message = "You have already joined <br><strong>" + company.name + "</strong>";
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'Error', 
            subTitle: message,
            buttons: ['OK']
          });
          alert.present();

        } else if (this.userJoinRequest) {
          //user is already signed up to company, stop with a message
          const message = "You have already sent a join request to <br><strong>" + company.name + "</strong>. <br>Please wait for admin response.";
          let alert = this.alertCtrl.create({
            cssClass:'alert-danger',
            title:'Error', 
            subTitle: message,
            buttons: ['OK']
          });
          alert.present();

        } else {
          //start user is not yet signed up, continue
          let confirm = this.alertCtrl.create({
            title: 'Join Sacco?',
            message: 'You are about to join a new Sacco <br><strong>' + company.name + '</strong> <br>Do you want to continue?',
            cssClass: 'alertCustomCss',
            buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    
                    //start sendCompanyJoinRequest
                    this.loader = this.loadingCtrl.create({
                        content: "Sending request ..."
                    });

                    this.loader.present();

                    let companyObj: Usercompany = {
                      company_id: company.id
                    };

                    //start send company join request
                    this.companyService.sendCompanyJoinRequest(companyObj).then((result: any) => {

                        if(this.loader){ this.loader.dismiss(); }
                        //console.log(result);

                        const message = "A sacco join request has been sent to <br><strong>" + company.name + "</strong><br>Please wait for a response from the sacco admin";
                        let alert = this.alertCtrl.create({
                          cssClass:'alert-success',
                          title:'Success', 
                          subTitle: message,
                          buttons: [
                          {
                            text: 'OK',
                            handler: () => {
                              //console.log('completed well');
                              confirm.dismiss();
                              this.view.dismiss(); 
                            }
                          }]
                        });
                        alert.present();
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
                    //end send company join request

                  }

                },
                {
                  text: 'Cancel',
                  handler: () => {
                  }

                }
              ]
            });
            confirm.present();
            //end user is not yet signed up, continue
        }

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

  }

  getCompanies() {
    
      this.loaderget = this.loadingCtrl.create({
          content: "Loading ..."
      });

      this.loaderget.present();

      let page = 1;

      this.companyService.getAuthCompanies(page).then((result) => {

          if(this.loaderget){ this.loaderget.dismiss(); }

          //get whole result
          this.resultList =  <CompanyResultList>result;

          //get data portion
          this.companyList = <Company[]>this.resultList.data;

          console.log(this.companyList);

          //get meta portion
          this.pagination = <Pagination>this.resultList.meta;

          this.paginationData = <PaginationData>this.pagination.pagination;

          this.page = this.paginationData.current_page;
          this.perPage = this.paginationData.per_page;
          this.total = this.paginationData.total;
          this.totalPage = this.paginationData.total_pages;

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

    return new Promise((resolve) => {
      setTimeout(() => {
        
          this.companyService.getAuthCompanies(this.page).then((result) => {

            //get whole result
            this.resultList =  <CompanyResultList>result;

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
        
      }, 500);
    })

  }

  ionViewWillLoad() {
    
    //get user stored in db
    this.myUserData.getUser().then((user) => {

        this.userProfile = <Profile>JSON.parse(user);

        //get companies
        setTimeout(() => {

          //this.loader.dismiss();
          if(this.loader){ this.loader.dismiss(); }

          //get companies
          this.getCompanies();

        }, 1000);

    });
  }


}
