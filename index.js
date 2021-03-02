
var APP_ID = 'YOUR APPLICATION ID HERE';
var USER_ID = 'ANY USER ID';
var ACCESS_TOKEN = null; // ADD AN ACCESS TOKEN IF YOUR USER HAS ONE
var GROUP_CHANNEL_URL = 'ANY OF YOUR CHANNEL URL HERE';

/////////////////////////////////////////////////////////////////////////

var API_TOKEN = null;

/**
 * INIT SENDBIRD
 */
var sb = new SendBird({ appId: APP_ID });

/**
 * CONNECT TO WEBSOCKET
 */

sb.connect(USER_ID, ACCESS_TOKEN, (user, error) => {
    if (error) {
        alert(error);
    }
});

function processFile(fileInput) {
    console.dir(fileInput);
    const files = fileInput.files;
    if (files) {
        const file = files[0];
        sendFileMessage(file);
    }
}

function sendFileMessage(file) {
    const params = new sb.FileMessageParams();
    params.file = file;
    params.fileName = file.name;
    params.fileSize = file.size;
    params.thumbnailSizes = [{maxWidth: 160, maxHeight: 160}];
    params.mimeType = file.type;
    sb.GroupChannel.getChannel(GROUP_CHANNEL_URL, (groupChannel, error) => {
        groupChannel.sendFileMessage(params, (fileMessage, error) => {
            if (error) {
                console.dir(error)
            } else {
                console.log('Message sent');
                console.dir(fileMessage);
            }
        });            
    })
}

