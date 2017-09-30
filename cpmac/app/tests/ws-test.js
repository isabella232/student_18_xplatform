const WS = require("~/shared/lib/ws/ws");

QUnit.test("WebSocket Test", (assert) => {
    const socket = new WS.Socket();
    const returnedPromise = socket.send("test message");
    const thenable = returnedPromise.then((value) => assert.equal(value, "test message"));

    return thenable;
});

// QUnit.test("WebSocket Test", assert => {
//   assert.equal("Hello!!!!!!!!!!!!!!!! Send this back to meeeeeee!", WS.testMyWebSocket((message) => message),
//                "Echo was equal to sent message.");
// });

/*
 Mocha.describe("Websocket Test", () => {
 Mocha.describe("Echo Testing", () => {
 Mocha.it("should simply echo the sent message", () => {
 Assert.equal("Hello!!!!!!!!!!!!!!!! Send this back to meeeeeee!", WS.testMyWebSocket().open());
 });
 });
 });
 */