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

class RequestBetaCacheService {
  static CACHE_KEY = '@sweatbank/beta-request';

  static setEmail = (email) => {
    const emails = this.getCachedEmailList();
    emails.push(email);
    this.setCachedEmailList(emails);
  };

  static hasEmail = (email) => {
    return this.getCachedEmailList().includes(email);
  }

  static getCachedEmailList = () => {
    const value = localStorage.getItem(this.CACHE_KEY);
    if (value === null) return [];
    return JSON.parse(value);
  }

  static setCachedEmailList = (l) => {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(l));
  }
}

export class RequestBetaService {
  static requestBetaByEmail = (email) => {
    try {
      if (RequestBetaCacheService.hasEmail(email)) {
        return {
          success: false,
          message: 'Beta already requested for this email',
        }
      }
      EmailJsService.sendRequestBetaEmail(email);
      RequestBetaCacheService.setEmail(email);
      return {
        success: true,
        message: null,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Something Went Wrong',
      };
    }
  }
}