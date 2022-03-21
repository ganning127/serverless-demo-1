const multipart = require('parse-multipart');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);

    // TODO: assign the body variable the correct value
    const body = req.body;

    // parse the body
    const parts = multipart.Parse(body, boundary);

    // let convertedResult = Buffer.from(parts[0].data).toString('base64');

    const result = await analyzeImage(parts[0].data);
    context.res = {
        body: {
            result
        }
    };
    console.log(result)
    context.done();
}

async function analyzeImage(img) {
    // const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const subscriptionKey = "f1c515cbfc374e8b83937d241c2242d8";

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })
    const uriBase = 'https://democampfaceapi.cognitiveservices.azure.com' + '/face/v1.0/detect';

    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?

        //ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type': "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    })

    let data = await resp.json();

    return data;
}