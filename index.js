require('dotenv').config();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const Natural_Language_Understanding_j7 = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY,
    }),
    serviceUrl: process.env.URL,
});

exports.handler = async (event) => {
    try {
        const params = {
            'text': event.historial_clinico,
            'features': {
                'entities': {
                    'emotion': true,
                    'sentiment': true,
                    'limit': 5,
                },
                'keywords': {
                    'emotion': true,
                    'sentiment': true,
                    'limit': 5,
                },
            },
        };

        const textAnalyze = await Natural_Language_Understanding_j7.analyze(params);

        return textAnalyze.result;
    } catch (err) {
        throw new Error(err);
    }
};