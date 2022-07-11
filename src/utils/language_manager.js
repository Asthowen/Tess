const path = require('path');
const fs = require('fs');


/**
 * This class makes it easier to manage languages in Tess.
 * @class
 */
class LanguageManager {
    constructor() {
        this.jsonLanguage = null;
        this.fallbackLanguage = 'en';
        this.languageFolder = null;
        this.json = null;
    }

    /**
     * This method allows to define the folder containing the JSON files of the translations.
     * @param {String} languageFolder The path to the folder containing the translations.
     * @return {LanguageManager}
     */
    setLanguageFolder(languageFolder){
        this.languageFolder = languageFolder;
        return this;
    }

    /**
     * This method allows to define the language of the JSON used.
     * @param {String} language The language code, example: fr, en, de...
     * @return {LanguageManager}
     */
    setLanguage(language) {
        this.jsonLanguage = language;
        return this;
    }

    /**
     * This method automatically finds the user's language.
     * @return {LanguageManager}
     */
    withLanguageAutoDetection() {
        this.jsonLanguage = Intl.DateTimeFormat().resolvedOptions().locale.replace('-', '_').split('_')[0];
        return this;
    }

    /**
     * This method allows to read and parse the JSON with the help of the previously defined values and to save it in memory
     * @return {LanguageManager}
     */
    build() {
        let filePath = path.join(this.languageFolder, this.jsonLanguage) + '.json';
        if (!fs.existsSync(filePath)) filePath = path.join(this.languageFolder, this.fallbackLanguage) + '.json';
        if (!fs.existsSync(filePath)) {
            this.json = {};
            return this;
        }

        this.json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        return this;
    }

    /**
     * This method allows you to retrieve a translation using its name.
     * @param {String} key The value to retrieve in the JSON.
     * @return {String}
     */
    getTranslation(key) {
        if (!this.json.hasOwnProperty(key)) return '';
        return this.json[key];
    }
}

module.exports = LanguageManager;