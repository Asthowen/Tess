const path = require('path');
const fs = require('fs');

class LanguageManager {
    constructor() {
        this.jsonLanguage = null;
        this.fallbackLanguage = 'en';
        this.languageFolder = null;
        this.json = null;
    }

    setLanguageFolder(languageFolder){
        this.languageFolder = languageFolder;
        return this;
    }

    setLanguage(language) {
        this.jsonLanguage = language;
        return this;
    }

    withLanguageAutoDetection() {
        this.jsonLanguage = Intl.DateTimeFormat().resolvedOptions().locale.replace('-', '_').split('_')[0];
        return this;
    }

    build() {
        let filePath = path.join(this.languageFolder, this.jsonLanguage) + '.json';
        if (!fs.existsSync(filePath)) filePath = path.join(this.languageFolder, this.fallbackLanguage) + '.json';

        this.json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        return this;
    }

    getTranslation(key) {
        if (!this.json.hasOwnProperty(key)) return '';
        return this.json[key];
    }
}

module.exports = LanguageManager;