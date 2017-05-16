const logger = require('../logger/logger')
const nodemailer = require('nodemailer')
const _ = require('lodash')

class Email {
  constructor (service, username, password) {
    this.service = service
    this.username = username
    this.transporter = this.build(password)

    this.verify((error, result) => {
      if (error) {
        logger.error(`Error creating email connection, error=${error}`)
      } else {
        logger.info(`Email Client is ready, service=${this.service}, email: ${this.username}`)
      }
    })
  }

  /**
   * Builds the transporter from nodemailer that will be used to send the emails
   * @param {string} pass The password that is being used to authenticate with the service
   */
  build (pass) {
    return nodemailer.createTransport({
      service: this.service,
      auth: {
        user: this.username,
        pass
      }
    })
  }

  /**
   * Verifies the connection the service.
   * @param {function} callback The callback function to confirm the connection
   */
  verify (callback) {
    this.transporter.verify((error, result) => {
      callback(error, result)
    })
  }

  /**
   * Returns a build object ready to be passed into the transporter for sending a email.
   * @param {object} message The object containing the message details (from, to, subject, text, html)
   */
  buildMessage (message) {
    return {
      from: this.username,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: _.defaultTo(message.html, message.text)
    }
  }

  /**
   * Sends a email to the provided person with the provided content
   * @param {string} to The person who is getting sent the email
   * @param {string} subject The subject text for the email
   * @param {string} text  The content text for the email
   * @param {string} html The html to be used instead of the text (defaults to the text)
   * @param {*} callback  Default callback for error and confirmation checking
   */
  send (to, subject, text, html = undefined, callback) {
    const message = this.buildMessage({to, subject, text, html})
    this.transporter.sendMail(message, (error, info) => {
      if (error) { callback(error, null) }
      callback(null, info)
    })
  }
}

module.exports = Email
