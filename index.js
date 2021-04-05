var client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
$(document).ready(function () {
    $('#dis-button').click(function () {
        client.end()
        setTimeout(function () {
            $('#stat-brooker').val('Disconnected!')
            setTimeout(function () {
                $('#stat-brooker').val('Press Connect Again!')
            }, 1000);
        }, 1000);
    })
    // on connect
    $("#connect-btn").on('click', function () {
        $('#stat-brooker').val('Connecting...');
        client.on('connect', function () {
            $('#stat-brooker').val('Connected!')
        })
   
        
        //disconnect
       
        $("#pub-btn").on('click', function () {
            var topic = $("#topic-pub").val();
            var payload = $("#input-pub").val();
            var Time_Stamp = new Date().toLocaleString('en-us', { date: 'long' });
            $("#pub-table").prepend('<tr><td>' + topic + '</td><td>' + payload + '</td><td>' + Time_Stamp + '</td></tr>')
            client.publish(topic, payload);
        })



        $(document).ready(function () {
            $("#sub-button").on('click', function () {
                var topic = $("#sub-topic").val();
                var Time_Stamp = new Date().toLocaleString('en-us', { date: 'long' });
                $("#sub-table").prepend('<tr><td>' + topic + '</td><td>' + Time_Stamp + '</td></tr>')
                client.subscribe(topic);
            })

        })

        // ON MESSAGE
        var topic = $("#topic-pub").val();
        var payload = $("#input-pub").val();
        client.on('message', function (topic, payload) {
            var Time_Stamp = new Date().toLocaleString('en-us', { date: 'long' });
            $('#brooker-table').prepend('<tr><td>' + topic + '</td><td>' + payload + '</td><td>' + Time_Stamp + '</td></tr>')
        })
  
    })

})

