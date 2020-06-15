<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); // 한글을 받는경우, 전달되는 파라매터를 UTF-8로 변환함. %>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dstyle Uikit Demo: 버튼 01</title>
    <link rel="stylesheet" href="heading.css">
    <link rel="stylesheet" href="/uikit/_vender/codemirror/lib/codemirror.css" />
    <link rel="stylesheet" href="/uikit/_vender/codemirror/theme/dstylePantry.css" />
    <link rel="stylesheet" href="/uikit/_vender/codemirror/custom/codemirror-jspSupport.css" /> <!-- jsp:include , jsp:param 을 이쁘게 만들기 위한 별도커스텀 개발한거 -->

    <script src="/uikit/_vender/jquery/jquery.min.js"></script>
    <script src="/uikit/_vender/lodash/lodash.js"></script>
    <script src="/uikit/_vender/bootstrap/bootstrap.min.js"></script>
    <script src="/uikit/_vender/codemirror/lib/codemirror.js"></script>
    <script src="/uikit/_vender/codemirror/addon/runmode/runmode.js"></script>
    <script src="/uikit/_vender/codemirror/mode/meta.js"></script>
    <script src="/uikit/_vender/codemirror/addon/mode/loadmode.js"></script>
    <script src="/uikit/_vender/codemirror/addon/mode/overlay.js"></script>
    <script src="/uikit/_vender/codemirror/addon/mode/multiplex.js"></script>
    <script src="/uikit/_vender/codemirror/custom/codemirror-jspSupport.js"></script> <!-- jsp:include , jsp:param 을 이쁘게 만들기 위한 별도커스텀 개발한거 -->

    <style>
        .resultWrapper{padding:20px;border:1px solid #ccc;}
    </style>
</head>
<body>
<div class="resultWrapper">

    <jsp:include page="heading.jsp"></jsp:include>

</div>


<div class="codeWrapper">
<pre><code class="language-html">
<jsp:include page="heading.jsp"></jsp:include>
</code></pre>
    <script>
        $(function(){
            // trim 처리
            $("pre>code").html( $("pre>code").html().trim() );
            /////////////////////////
            // CodeMirror
            CodeMirror.modeURL = '/uikit/_vender/codemirror/mode/%N/%N.js';
            var codeBlocks = document.querySelectorAll('pre > code');

            function parseMode(mode) {
                let syntax = CodeMirror.findModeByName(mode);
                if (syntax == null) syntax = CodeMirror.findModeByName('Plain Text');
                return syntax;
            }

            _.forEach(codeBlocks, block => {
                var syntax = parseMode(block.className.substring(9));
            CodeMirror.requireMode(syntax.mode, () => {
                var value = _.unescape(block.innerHTML);
            block.innerHTML = '';
            block.parentNode.className = 'cm-s-dstylePantry CodeMirror';
            CodeMirror.runMode(value, syntax.mime, block, {
                tabSize: 2
            });
            CodeMirror.jspSupport(block); // jsp:include 와 jsp:param 에 대해 : 을기준으로 별도 태그분리
            block.style.visibility = 'visible';
        });
        });
        });
    </script>
</div>
<script>
    window.onload = function(){
        console.log(parent);
        parent.setDemo($("body").height());
    }
</script>
</body>
</html>