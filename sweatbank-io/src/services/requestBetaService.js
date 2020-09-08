import React from 'react';
import * as emailjs from 'emailjs-com';

class EmailJsService {
  static SERVICE_ID = 'gmail_service';
  static USER_ID = 'user_NOMrgBHUx47Vs2iPFPdoV';
  static REQUEST_BETA_TEMPLATE_ID = 'template_beta';

  static sendRequestBetaEmail = (email) => {
    let templateParams = {
      email: email,
      to_name: 'sweatbankapp@gmail.com',
      subject: 'BETA Requested',
    };
    
    emailjs.send(
      EmailJsService.SERVICE_ID,
      EmailJsService.REQUEST_BETA_TEMPLATE_ID,
      templateParams,
      EmailJsService.USER_ID,
    );
  }
}

export class RequestBetaService {
  static requestBetaByEmail = (email) => {
    try {
      EmailJsService.sendRequestBetaEmail(email);
      return true;
    } catch (e) {
      return false;
    }
  }
}