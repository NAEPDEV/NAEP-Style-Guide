steal(
	"./content_list.js",
	"./frame_helper.js",
	"./versions.js",
	"./styles/styles.less!",
	"./tablesorter/jquery.tablesorter.combined.js",
	"./tablesorter/widget-columnSelector.js",
	"./tablesorter/widget-output.min.js",
	"./tablesorter/widget-build-table.js",
	"./custom_controls.js",
	"./prettify",function(ContentList, FrameHelper, Versions){
	var codes = document.getElementsByTagName("code");
	for(var i = 0; i < codes.length; i ++){
		var code = codes[i];
		if(code.parentNode.nodeName.toUpperCase() === "PRE"){
			code.className = code.className +" prettyprint";
		}
	}
	prettyPrint();

	new ContentList(".contents");
	new FrameHelper(".docs");
	new Versions( $("#versions, .sidebar-title:first") );
});
