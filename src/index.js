"use strict";
const bootstrap = require("./bootstrap");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */

  register({ strapi }) {
    // console.log('strapi::: ', strapi)
    // console.log('emailService::: ', emailService)
    // console.log('emailService::: ', emailService.email)

    // const emailService = strapi.plugins['email'].services
    // console.log('emailService::: ', emailService.email.send)
    // strapi.plugins['email'].services.email.send({
    //   to: 'paul.portfoplus@gmail.com',
    //   subject: 'Hello world',
    //   text: 'Hello world',
    //   html: `<h4>Hello world</h4>`,
    // });
    // console.log('Email sent');
  },


  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap,
};
