
(function(chat) {
    chat = chat || (window.chat = {});

    chat.init = function initChat(messageHandler) {
        var socket = io();

        messageHandler = messageHandler || (function() {});
        socket.on('message', messageHandler);
    };

})(window.chat);
