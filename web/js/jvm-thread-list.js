$(function() {
    var serverBasic = 'http://localhost:8080';

    var trTemplate = '<tr class="odd gradeX">\n\
                            <td>{{TID}}</td>\n\
                            <td>{{Name}}</td>\n\
                            <td>{{State}}</td>\n\
                            <td>{{CPU}}</td>\n\
                            <td>{{TotalCPU}}</td>\n\
                            <td>{{BlockedBy}}</td>\n\
                        </tr>';
    var listCount = 25;
    var freshThreadList = function(data) {
        $("#thread-list").html("");
        for (var i = 0; i < data.length; i++) {
            if (data[i].error) {
                continue;
            }
            var temp = trTemplate.replace(/{{TID}}/g, data[i].TID).replace(/{{Name}}/g, data[i].Name).replace(/{{State}}/g, data[i].State).replace(/{{CPU}}/g, data[i].CPU.toFixed(2)).replace(/{{TotalCPU}}/g, data[i].TotalCPU.toFixed(2)).replace(/{{BlockedBy}}/g, data[i].BlockedBy);
            $("#thread-list").append(temp);
        }
    }

    var freshThreadCount = function(data) {
        if(data.error){
            return false;
        }
        var count = data.ThreadCount;
        $("#thread-count").text(count);
    }

    setInterval(function() {
            if (!$("#thread-panel").is(':visible')) {
                return;
            }
            $.get(serverBasic + '/vm_thread_list/' + $("#vm-id").val() + "/" + listCount, function(data){
                freshThreadList(eval("(" + data + ")"));
            });
            $.get(serverBasic + '/vm_thread_count/' + $("#vm-id").val(), function(data){
                freshThreadCount(eval("(" + data + ")"));
            });
    }, 1000);

    $(".thread-list-count").change(function(){
        listCount = $(this).val();
    });

});
