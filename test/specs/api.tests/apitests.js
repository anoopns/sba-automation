const supertest = require('supertest');
const { testData } = require('../../data/testdata');
const { apiData } = require("../../data/test.validation.data");
const assert = require('assert');

describe('API tests', () => {

    it('should validate mp3 files in response', async () => {
        const resp = await supertest(testData.apiUrl).get(testData.uri);
        assert.equal(resp.status, '200');
        resp.body.forEach(element => {
            assert.equal(element.program, apiData.program);
            assert.equal(element.channelName, apiData.channelName);
            if(!element.archiveAudio.mp3.includes('.mp3'))
                assert.fail('Not a valid mp3 file');
        });
    })
})

