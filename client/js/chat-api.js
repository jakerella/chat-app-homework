
(function(ns) {
    window.chat = ns = (ns || {});

    /**
     * This initializes the chat client and will call the provided message
     * handler any time a new message is received from the server.
     *
     * @param  {Function} messageHandler  The function to execute when a new message is received.
     * @return {void}
     */
    ns.listenForMessages = function listenForMessages(messageHandler) {
        var socket = io();
        messageHandler = messageHandler || (function() {});
        socket.on('message', messageHandler);
    };

})(window.chat);
