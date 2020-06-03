CodeMirror.jspSupport = function(block){
    $(block).find(".cm-tag").each(function(){
        if( $(this).text()=="jsp:include" ){
            $(this).html("<span class='cm-jsp'>jsp</span>:<span class='cm-include'>include</span>");
        };
    });
};
/*
if(content == "jsp:include"){
    sp.className = sp.className + " cm-jsp";

    var jsp = document.createElement("span");
    jsp.appendChild( document.createTextNode("jsp") );
    var jsp2 = document.createElement("span");
    jsp2.appendChild( document.createTextNode("include") );
    var dot = document.createTextNode(":");
    sp.appendChild(jsp);
    sp.appendChild(dot);
    sp.appendChild(jsp2);
    console.log(sp);

    var jsp = (document.createElement("span")).appendChild( document.createTextNode("jsp") );
    console.log(jsp);
    var include = (document.createElement("span")).appendChild( document.createTextNode("include") );
    sp.appendChild(jsp);
    sp.appendChild(document.createTextNode(":"));
    sp.appendChild(include);
*/