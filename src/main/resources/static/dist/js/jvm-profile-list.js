/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
$(function() {
    var serverBasic = 'http://'+location.host+'/';

    var trTemplate = '<tr class="odd gradeX">\n\
                            <td>{{Method}}</td>\n\
                            <td>{{Precent}}%</td>\n\
                            <td>{{Time}}s</td>\n\
                        </tr>';
    var listCount = 25;
    var freshProfileList = function(data) {
        $("#profile-list").html("");
        for (var i = 0; i < data.length; i++) {
            if (data[i].error) {
                continue;
            }
            var temp = trTemplate.replace(/{{Method}}/g, data[i].Method).replace(/{{Precent}}/g, data[i].Precent.toFixed(2)).replace(/{{Time}}/g, data[i].Time.toFixed(2));
            $("#profile-list").append(temp);
        }
    }

    setInterval(function() {
        if (!$("#profile-panel").is(':visible')) {
            return;
        }
        $.get(serverBasic + '/vm_profile_list/' + $("#vm-id").val() + "/" + listCount, function(response) {
            $.get(serverBasic + '/vm_mon_info/' + $("#vm-id").val(), function(response) {
                response = eval("(" + response + ")");
                if("success"==response.status){
                     freshProfileList(response.data);
                }else{
                     console.log(response.message);
                }
            });
        });
    }, 1000);

    $(".profile-list-count").change(function() {
        listCount = $(this).val();
    });

});
