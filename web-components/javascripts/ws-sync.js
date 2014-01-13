(function () {
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var connection = new WebSocket('ws://temp.gysserae.ro:8080');

    var lastReceivedValue = null;

    connection.onopen = function () {
    };

    connection.onerror = function (error) {
    };

    connection.onmessage = function (message) {
        lastReceivedValue = message.data;
        $.address.value(message.data);
    };

    $.address.change(function () {
        if (lastReceivedValue == $.address.value()) return;
        if (connection.readyState == 1) {
            connection.send($.address.value());
        }
    });
})();
