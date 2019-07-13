
browser.runtime.onMessage.addListener((message) => {
    console.log(message.content);
});

console.log("started content script");
