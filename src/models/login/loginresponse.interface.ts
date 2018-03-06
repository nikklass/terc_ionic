export interface Loginresponse {

	  result?: {
	  	access_token?:string;
	  	response_token?:string;
	  	expires_in?:string;
	  }
	  error?: {
	  	status_code?:string;
	  	message?:string;
	  }

}