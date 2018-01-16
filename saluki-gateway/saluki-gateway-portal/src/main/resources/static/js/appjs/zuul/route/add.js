$().ready(function() {
	validateRule();
});
$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$("#routeForm").ajaxSubmit({
		type : "POST",
		url : "/zuul/route/save",
		dataType : 'json',
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#routeForm").validate(
			{
				rules : {
					path : {
						required : true
					},
					serviceFileName : {
						required : {
							depends : function(value, element) {
								return ($('#zipFile').val() != null
										&& value != null && value != '');
							}
						}
					}
				},
				messages : {
					path : {
						required : icon + "请输入路由路径！"
					},
					serviceFileName : {
						required : icon + "上传proto目录文件，需要指定目录中的服务定义文件名！"
					}
				}
			})
}