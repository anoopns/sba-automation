const Page = require('./page');
const { testData }  = require('../data/testdata');

class AudioPage extends Page {

    get audioTrackTitle () { return $('.audiotrack__title') }
    get subscribeDropdown () { return $('.podcast-subscribe__label span.icon--arrow-down') }
    get subscribeList () { return $$('.podcast-subscribe__list li') }
    get playerButton () { return $('.audiotrack__icon--play-pause') }
    get playPauseButton () { return $('.audio-player__icon--play-pause') }
    get stepForwardButton () { return $('.icon--step-forward-20') }
    get volumeButton () { return $('.audio-player__volume-icon') }
    get languageIcon () { return $('.icon--translation') }
    get languageList () { return $$('.language-toggle__list li') }
    get volumeLevel () { return $('.audio-player__volume-level') }
    get playerProgress () { return $('.audio-player__progress') }
    get playerElapsedTime () { return $('.audio-player__time--elapsed') }

    async getTitle(){
        return await this.audioTrackTitle.getText();
    }

    async validateSubscriptionList (arrayToCompare) {
        await this.subscribeDropdown.waitForExist({ timeout: 5000 });
        await this.subscribeDropdown.click();
        const listItems = await this.subscribeList;
        if(listItems.length === 0)
            return false;
        return await this.validateArray(arrayToCompare, listItems);
    }

    async validateLanguageList(arrayToCompare){
        await this.languageIcon.waitForExist({ timeout: 5000 });
        await this.languageIcon.moveTo();
        const listItems = await this.languageList;
        if(listItems.length === 0)
            return false;
        return await this.validateArray(arrayToCompare, listItems);
    }

    async validateArray(array1, array2){
        let result;
        for(let i = 0; i < array1.length; i++){
                result = false;
                for(let j = 0; j < array2.length; j++){
                    let text = await array2[j].getText();
                    if(text === array1[i]){
                        result = true;
                        break;
                    }
                }
                if(!result)
                    return result;
        }
        return result;
    }

    async clickSubscriptionList(){
        await this.subscribeDropdown.click();
    }

    async clickLanguageIcon(){
        await this.languageIcon.click();
    }

    async clickPlayerLaunchButton(){
        await this.playerButton.click();
    }

    async clickPlayPauseButton(){
        await this.playPauseButton.click();
    }

    async clickForwardButton(){
        await this.stepForwardButton.click();
    }

    async clickVolumeButton(){
        await this.volumeButton.click();
    }

    async isPlayerMuted(){
        const attr = await this.volumeLevel.getAttribute('style');
        return attr.trim() === 'width: 0%;'? true : false;
    }

    async getCurrentProgress(){
        const attr = await this.playerProgress.getAttribute('style');
        return attr.match(/[\d\.]+/g)[0];
    }

    async getElapsedTime(){
        return await this.playerElapsedTime.getText();
    }

    async isPlayerLaunched(){
        //await browser.debug();
        await this.playerProgress.waitForDisplayed({ timeout: 5000 });
        return true;
    }

    async isPlayerPaused(){
        const currentProgress = await this.getCurrentProgress();
        await browser.pause(5000);
        return currentProgress === await this.getCurrentProgress()
    }

    async open () {
        await super.open(testData.testUrl);
        await browser.maximizeWindow();
    }
}

module.exports = new AudioPage();
