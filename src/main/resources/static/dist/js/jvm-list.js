/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
$(function() {
    var serverBasic = '';
    var vmListTemplate = '<li id={{id}} title="{{name}} (pid {{pid}})"><a data-vm-id="{{pid}}" class="{{active}} vm-title" href="javascript:;"><img src="dist/app-icon/{{app_icon}}"> (pid {{pid}}) {{name}} </a></li>';
    var vmBasicInfoTemplate = '<div>\n\
                                <strong>{{key}}</strong>\n\
                                <label style="font-weight:400">{{value}}</label>\n\
                            </div>';
    var vmArgsTemplate = '<div>\n\
                                <label style="font-weight:400">{{value}}</label>\n\
                            </div>';
    var arr = new Array();
    var freshVmList = function(data) {
        var idArr = new Array();
        outer: for (var i = 0; i < data.length; i++) {
            var name = data[i].Name;
            var pid = data[i].VmID;
            var icon = data[i].Icon;
            var id = (name + pid).replace(/\./g, "");
			var selectID = $("#vm-id").val();
            var ele = vmListTemplate.replace(/{{name}}/g, name).replace(/{{pid}}/g, pid).replace(/{{id}}/g, id).replace(/{{app_icon}}/g, icon).replace(/{{active}}/, selectID && selectID==id?'active':'');
            idArr.push(id);
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] === id) {
                    continue outer;
                }
            }
            arr.push(id);
            $("#side-list").append(ele);
        }
        for (var i = 0; i < arr.length; i++) {
            if (!idArr.contains(arr[i])) {
                $("#" + arr[i]).remove();
                arr.remove(arr[i]);
            }
        }
    }

    var loadVmList = function() {
        $.get(serverBasic + 'vm_list', function(response) {
             response = eval("(" + response + ")");
             if("success"==response.status){
                freshVmList(response.data);
             }else{
                console.log(response.message);
             }
        });
    }

    loadVmList();
    setInterval(function() {
        loadVmList();
    }, 2000);

    var freshOsInfo = function(data) {
        var processerNum = data.ProcesserNum;
        var arch = data.Arch;
        var osVersion = data.OsVersion;
        var loadAvg = data.LoadAvg.toFixed(2);
        $("#ProcesserNum").text(processerNum);
        $("#OsArch").text(arch);
        $("#OsVersion").text(osVersion);
        $("#LoadAvg").text(loadAvg);
    }

    var loadOsInfo = function() {
        $.get(serverBasic + "os_info", function(response) {
            response = eval("(" + response + ")");
            if("success"==response.status){
                freshOsInfo(response.data);
            }else{
                console.log(response.message);
            }
        });
    }
    loadOsInfo();
    setInterval(function() {
        loadOsInfo();
    }, 3000);

    $(".vm-list").on('click', '.vm-title', function() {
        var vmId = $(this).attr('data-vm-id');
        $('.vm-list a').each(function(){
            $(this).removeClass('active')
         });
		$(this).addClass("active");
        $("#vm-id").val(vmId);
        var url = serverBasic + "vm_basic_info/" + vmId;
        $.get(url, function(response) {
            response = eval("(" + response + ")");
            if("success"==response.status){
                data = response.data;
            }else{
                console.log(response.message);
                return false;
            }
            $('.basic-info').html("");
            var keys = ["PID", "User", "Vendor", "VmName", "VmVersion"];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = data[key];
                var temp = vmBasicInfoTemplate.replace(/{{key}}/g, key+": ").replace(/{{value}}/g, value);
                $('.basic-info').append(temp);
            }
            var systemProps = data.SystemProperties;
            $('#sysprops').html("");
            for(var key in systemProps){
            	var value = systemProps[key];
            	var temp = vmBasicInfoTemplate.replace(/{{key}}/g, key+"=").replace(/{{value}}/g, value);
            	$('#sysprops').append(temp);
            }
            var vmArgs = data.VmArgs;
            $('#vmargs').html("");
            for(var i=0; i<vmArgs.length; i++){
            	var temp = vmArgsTemplate.replace(/{{value}}/g, vmArgs[i]);
            	$('#vmargs').append(temp);
            }
            var args = data.Args;
            $('#args').html("");
            if(args instanceof Array){
            	for(var i=0; i<args.length; i++){
	            	var temp = vmArgsTemplate.replace(/{{value}}/g, args[i]);
	            	$('#args').append(temp);
	            }
            }else{
            	var temp = vmArgsTemplate.replace(/{{value}}/g, args);
            	$('#args').append(temp);
            }
        });
        if(!$("#page-wrapper-begin").hasClass('sr-only')) $("#page-wrapper-begin").addClass("sr-only");
        if($("#page-wrapper").hasClass('sr-only')) $("#page-wrapper").removeClass("sr-only");
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      var activeTab = $(e.target).text();
      var previousTab = $(e.relatedTarget).text();
      $(".active-tab span").html(activeTab);
      $(".previous-tab span").html(previousTab);
   });

    $(".header-tabs a").each(function(){
    	$(this).click(function(){
    		$(this).parent().parent().find("h5").each(function(){
    			$(this).removeClass('active');
    		});
    		$(this).parent().addClass("active");
    		var targetId = $(this).attr("data-id");
    		$(".page-panel").each(function(){
    			$(this).removeClass('panel-active');
    		});
    		$("#"+targetId).addClass("panel-active");
    	});
    });
    Array.prototype.remove = function(ele) {
        var dx = -1;
        for (i = 0; i < this.length; i++) {
            if (ele === this[i]) {
                dx = i;
            }
        }
        if (dx === -1 || isNaN(dx) || dx > this.length) {
            return false;
        }
        for (var i = 0, n = 0; i < this.length; i++) {
            if (this[i] != this[dx]) {
                this[n++] = this[i]
            }
        }
        this.length -= 1
    };

    Array.prototype.contains = function(ele) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === ele) {
                return true;
            }
        }
        return false;
    }

});
