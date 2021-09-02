const AudioPage = require('../pageobjects/audio.hindi.page');
const { playerTestData } = require('../data/test.validation.data');
const { containsAnArray } = require('../utils/commutils');
const assert = require('assert');

describe('Front End Tests', () => {

    it('should have valid title', async () => {
        await AudioPage.open();
        assert.equal(await AudioPage.getTitle(), playerTestData.title);
    });

    it('should have valid subscriptions', async () => {
        assert.equal(await AudioPage.validateSubscriptionList(playerTestData.podcasts), true);
        AudioPage.clickSubscriptionList();
    })

    it('should launch player and can pause, mute, unmute & fastforward', async () => {
        await AudioPage.clickPlayerLaunchButton();
        assert.equal(await AudioPage.isPlayerLaunched(), true);
        await AudioPage.clickPlayPauseButton();
        assert.equal(await AudioPage.isPlayerPaused(), true);
        await AudioPage.clickPlayPauseButton();
        await AudioPage.clickVolumeButton();
        assert.equal(await AudioPage.isPlayerMuted(), true);
        await AudioPage.clickVolumeButton();
        assert.equal(await AudioPage.isPlayerMuted(), false);
        const currentProgress = await AudioPage.getCurrentProgress();
        await AudioPage.clickForwardButton();
        const latestProgress = await AudioPage.getCurrentProgress();
        if(parseFloat(latestProgress) < (parseFloat(currentProgress) + 3))
            assert.fail('Not fastforwarded');
    })  

    it('should show language list', async () => {
        assert.equal(await AudioPage.validateLanguageList(playerTestData.languageList), true);
        await AudioPage.clickLanguageIcon();
    })

});


