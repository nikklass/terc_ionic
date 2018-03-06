import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { Company } from '../../models/companies/company.interface';
import { Usercompany } from '../../models/companies/usercompany.interface';
import { Profile } from '../../models/profiles/profile.interface';

@Injectable()
export class CompanyService {

    company = {} as Company;
    userProfile = {} as Profile;

    sending : boolean = false;

    constructor(private auth: AuthServiceProvider) {
    }

    /*check if user is signed up to company/ sacco*/
    checkUserCompanySignup(company: Company) {
        
        return new Promise((resolve, reject) => {
        
            //get data
            this.auth.getAuthData('authcompanies/userCompanyStatus/' + company.id).subscribe(result => {

                let res = result.json(); 

                resolve(res);

            }, (err) => {
                
                reject(err);

            });

        });

    }

    /*fetch user companies/ saccos*/
    getUserCompanies(user_id, page=1) {
        
        return new Promise((resolve, reject) => {
        
            //get data
            this.auth.getAuthData('authcompanies?user_id=' + user_id + '&page=' + page).subscribe(result => {

                let res= result.json(); 

                resolve(res);

            }, (err) => {
                
                reject(err);

            });

        });

    }

    /*fetch  companies/ saccos for logged in user*/
    getAuthCompanies(page=1) {
        
        return new Promise((resolve, reject) => {
        
            //get data
            this.auth.getAuthData('authcompanies?page=' + page).subscribe(result => {

                let res= result.json(); 

                resolve(res);

            }, (err) => {
                
                reject(err);

            });

        });

    }

    /*fetch  companies/ saccos*/
    getCompanies(page=1) {
        
        return new Promise((resolve, reject) => {
        
            //get data
            this.auth.getAuthData('companies?page=' + page).subscribe(result => {

                let res= result.json(); 

                resolve(res);

            }, (err) => {
                
                reject(err);

            });

        });

    }


    //add new company/ sacco
    addUserCompany(companyId: number) {
        
        let full_name = this.userProfile.first_name;
        if (this.userProfile.last_name != null) {
        full_name = full_name + " " + this.userProfile.last_name;
        }
        let user_id = this.userProfile.user_id;

        return new Promise((resolve, reject) => {
        
            
            let usercompanyObj: Usercompany = {
                creator_id: this.userProfile.user_id,
                company_id: companyId
            }

            //post data
            this.auth.postAuthData(usercompanyObj, 'companies').then(result => {

                resolve(result);

            }, (err) => {
                
                reject(err);

            });

        });

    }

    //add new company/ sacco join request 
    sendCompanyJoinRequest(usercompany: Usercompany) {
        
        return new Promise((resolve, reject) => {

            //post data
            this.auth.postAuthData(usercompany, 'companyjoinrequests').then(result => {

                resolve(result);

            }, (err) => {
                
                reject(err);

            });

        });

    }

}
