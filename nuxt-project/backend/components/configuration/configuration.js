const fs = require('fs')
const defaultConfiguration = require('./defaults')

class Configuration {
  constructor (folder, name) {
    // The directory to the folder path that will used
    this.folderDir = `${this.getUserHome()}${folder}`

    // The file name of the configuration file
    this.name = name

    // The current full configuration path
    this.path = `${this.getUserHome()}${folder}/${name}`
    // The current default configuration

    this.default = defaultConfiguration

    // The configuration that will be loaded into memory
    this.configuration = this.load()
  }

  /**
   * Loads the configuration file and store it in memory and
   * if no configuraiton exists, create it.
   */
  load () {
    let configuration = this.getDefault()

    if (this.exists()) {
      configuration = JSON.parse(fs.readFileSync(this.path, 'utf8'))
      return configuration
    } else {
      this.create()
      return configuration
    }
  }

  /**
   * Returns true with the file exists.
   */
  exists () {
    const exists = fs.existsSync(this.path)
    return exists
  }

  /**
   * Creates the configuration file and folder withW
   * the class details.
   */
  create () {
    if (!this.exists()) {
      fs.mkdirSync(this.folderDir)
      fs.writeFileSync(this.path, JSON.stringify(this.default, null, '\t'))
    }
  }

  /**
   * Updates the current configuration file with the provided content.
   * @param {object} content The configuration that will be set
   */
  update (content) {
    if (this.exists()) {
      this.bind(content)
      fs.writeFileSync(this.path, JSON.stringify(content, null, '\t'))
    }
  }

  /**
   * Sets the current configuration to be used.
   * @param {object} content The content that will be set
   */
  bind (content) {
    this.configuration = content
  }

  /**
   * Checks if the string ends with a suffix.
   * @param {string} string string to check
   * @param {string} suffix suffix to check
   */
  endsWith (string, suffix) {
    return string.indexOf(suffix, string.length - suffix.length) !== -1
  }

  /**
   * Return a value from the configuration based on the key
   * @param key string
   */
  getKey (key) {
    return this.configuration[key]
  }

  /**
   * Returns the default configuration from the default file
   */
  getDefault () {
    return this.default
  }

  /**
   * Returns the whole configuration content
   */
  getConfiguration () {
    return this.configuration
  }

  /**
   * Returns the home directory of the active user
   */
  getUserHome () {
    const homeDirectory = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'].replace(/\\/g, '/')
    return this.endsWith(homeDirectory, '/') ? homeDirectory : `${homeDirectory}/`
  }
}

module.exports = Configuration
