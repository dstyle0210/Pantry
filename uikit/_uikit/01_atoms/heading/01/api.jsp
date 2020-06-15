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
    <title>Dstyle uikit : 헤딩</title>
    <link rel="stylesheet" href="button.css">
    <link rel="stylesheet" href="/uikit/_vender/codemirror/lib/codemirror.css" />
    <link rel="stylesheet" href="/uikit/_vender/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/uikit/_vender/bootstrap/css/bootstrap-theme.min.css" />
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
        .apiExampleList{display:flex;}
        .apiExampleList>li{flex:1;}
        .apiWrapper{width:90%;margin:0 auto;}
        *{list-style:none;margin:0;padding:0;}
        .preview{width:100%;height:200px;border:0;}
        .previewForm ul{display:flex;}
        .previewForm li{margin-left:20px;}
        .previewForm li:first-child{margin-left:0;}
        .apiDemo,.apiCode,.apiTable{padding-bottom:20px;margin-bottom:20px;border-bottom:1px dashed #333;overflow:hidden;width:100%;}
    </style>
</head>
<body>
<div class="apiWrapper">
    <section class="apiHeader">
        <h1>헤딩 01</h1>
        <p>헤딩요소(h1~h6) 에서만 사용가능한 클래스</p>
    </section>
    <section class="apiDemo">
        <h3>Demo</h3>
        <form action="demo.jsp" target="api" method="post" id="props" class="previewForm">
            <ul>
                <li class="form-group">
                    <label for="opt0">hx</label>
                    <select name="hx" id="opt0" class="form-control">
                        <option value="">기본</option>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                        <option value="h4">h4</option>
                        <option value="h5">h5</option>
                        <option value="h6">h6</option>
                    </select>
                </li>
                <li class="form-group">
                    <label for="opt1">borderYn</label>
                    <select name="borderYn" id="opt1" class="form-control">
                        <option value="">기본</option>
                        <option value="Y">보더 사용</option>
                        <option value="N">보더 미사용</option>
                    </select>
                </li>
                <li class="form-group">
                    <label for="opt2">title</label>
                    <input type="text" name="title" id="opt2" value="헤딩" class="form-control" />
                </li>
            </ul>
        </form>
        <script>
            $(function(){
                $("#props select").on("change",function(){
                    $("#props").submit();
                });
                $("#props input").on("keyup",function(){
                    $("#props").submit();
                });
            });
            function setDemo(hei){
                $("#api").height(hei);
            };
        </script>
        <iframe src="demo.jsp" frameborder="0" name="api" id="api" class="preview"></iframe>
    </section>

    <section class="apiCode">
        <h3>선언코드(기본값)</h3>
<pre><code class="language-jsp">
&lt;jsp:include page="heading.jsp">
    &lt;jsp:param name="hx" value="h2">&lt;/jsp:param>
    &lt;jsp:param name="borderYn" value="N">&lt;/jsp:param>
    &lt;jsp:param name="title" value="헤딩">&lt;/jsp:param>
    &lt;jsp:param name="desc" value="서브타이틀 or 부가설명">&lt;/jsp:param>
&lt;/jsp:include>
</code></pre>
        <script>
            $(function(){
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
    </section>

    <section class="apiTable">
    <h2>API 표 (jsp:param)</h2>
    <table class="table">
        <thead class="thead-dark">
        <tr>
            <th>파라매터명</th>
            <th>데이터형식</th>
            <th>데이터범위</th>
            <th>기본값</th>
            <th>설명</th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-success">
            <td>hx</td>
            <td>String</td>
            <td>h1,h2,h3,h4,h5,h6</td>
            <td>"h2"</td>
            <td>헤딩 요소의 헤딩엘리먼트( h* )적용, atom의 수정클래스에도 적용됨</td>
        </tr>
        <tr>
            <td>borderYn</td>
            <td>String</td>
            <td>"Y" | "N"</td>
            <td>"N"</td>
            <td>헤딩 하단에 라인 적용, hx 파라매터에 따라 하단간격 조정됨</td>
        </tr>
        <tr>
            <td>title</td>
            <td>String</td>
            <td>*</td>
            <td>"헤딩"</td>
            <td>헤딩에 들어갈 타이틀 텍스트</td>
        </tr>
        <tr>
            <td>desc</td>
            <td>String</td>
            <td>*</td>
            <td>"서브타이틀 or 부가설명"</td>
            <td>헤딩 텍스트 우측에 들어간 서브텍스트 "" 빈 값일경우, 우측 "bar" 영역을 포함하여 미표시됨</td>
        </tr>
        </tbody>
    </table>
    </section>
</div>
</body>
</html>