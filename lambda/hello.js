exports.handler = async function (event) {
    console.log("Request: ", JSON.stringify(event.undefined, 2));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello CDK! Good Night! You hit the endpoint -  ${event.path}\n`
    }
}