const loginUrl = "https://api.jsonbin.io/b/6090305b8a409667ca049a13";

const settingsUrl = "https://api.jsonbin.io/b/6090305b8a409667ca049a13/latest";
const settingsHeaders = {
    headers: {
        "Content-Type": "application/json", 
        "X-Master-Key": "$2b$10$QYJKmo6nsMVTEw1K7sk33.VrcLemXKVeEh.IyZEBp9LLkJpxBKAGC",
        "X-Bin-Versioning": false,
    }
}

const getMessageUrl = "https://api.jsonbin.io/v3/b/609030148a409667ca0499dc/latest";
const postMessageUrl = "https://api.jsonbin.io/v3/b/609030148a409667ca0499dc";
const messageHeaders = {
    headers: {
        "Content-Type": "application/json", 
        "X-Master-Key": "$2b$10$QYJKmo6nsMVTEw1K7sk33.VrcLemXKVeEh.IyZEBp9LLkJpxBKAGC",
        "X-Bin-Versioning": false,
    }
};

export { loginUrl, settingsUrl, settingsHeaders, getMessageUrl, postMessageUrl, messageHeaders };