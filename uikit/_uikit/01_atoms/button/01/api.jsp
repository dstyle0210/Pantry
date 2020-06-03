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
    <title>Dstyle uikit : 버튼01</title>
    <link rel="stylesheet" href="button.css">
    <script src="/uikit/_vender/jquery/jquery.min.js"></script>
    <script src="/uikit/_vender/lodash/lodash.js"></script>

    <style>
        .apiExampleList{display:flex;}
        .apiExampleList>li{flex:1;}
    </style>

</head>
<body>
<h1>버튼01</h1>
<p>버튼의 기본형태</p>

기본형태
<jsp:include page="button.jsp"></jsp:include>

<h2>API 표 (jsp:param)</h2>
<table>
    <tr>
        <th>파라매터명</th>
        <th>데이터형식</th>
        <th>데이터범위</th>
        <th>기본값</th>
        <th>설명</th>
    </tr>
    <tr>
        <td>href</td>
        <td>String</td>
        <td>*</td>
        <td>"#"</td>
        <td>버튼링크의 "href" 어트리뷰트의 값, "" 로 지정 할경우 span 엘리먼트로 대체 됨</td>
    </tr>
    <tr>
        <td>target</td>
        <td>String</td>
        <td>*</td>
        <td>""</td>
        <td>버튼링크의 "target" 어트리뷰트의 값, "" 로 지정 할경우 어트리뷰트 미적용됨</td>
    </tr>
    <tr>
        <td>title</td>
        <td>String</td>
        <td>*</td>
        <td>""</td>
        <td>버튼링크의 "title" 어트리뷰트의 값, "" 로 지정 할경우 어트리뷰트 미적용됨</td>
    </tr>
    <tr>
        <td>tabIndex</td>
        <td>String</td>
        <td>*</td>
        <td>""</td>
        <td>버튼링크의 "tabIndex" 어트리뷰트의 값, "" 로 지정 할경우 어트리뷰트 미적용됨</td>
    </tr>
    <tr>
        <td>id</td>
        <td>String</td>
        <td>*</td>
        <td>""</td>
        <td>버튼링크의 "id" 어트리뷰트의 값, "" 로 지정 할경우 어트리뷰트 미적용됨</td>
    </tr>
    <tr>
        <td>text</td>
        <td>String</td>
        <td>*</td>
        <td>"버튼"</td>
        <td>버튼 링크 내 글자</td>
    </tr>
    <tr>
        <td>color</td>
        <td>String</td>
        <td>gray, darkGray, brand, subBrand, white, disabled</td>
        <td>gray</td>
        <td>버튼의 색상변경</td>
    </tr>
    <tr>
        <td>size</td>
        <td>String</td>
        <td>xs, sm, nm, lg, xl</td>
        <td>nm</td>
        <td>버튼의 크기변경</td>
    </tr>
    <tr>
        <td>display</td>
        <td>String</td>
        <td>block, inline-block, inline</td>
        <td>inline-block</td>
        <td>버튼링크의 display 속성</td>
    </tr>
    <tr>
        <td>style</td>
        <td>String</td>
        <td>*</td>
        <td>""</td>
        <td>버튼링크의 "style" 어트리뷰트의 값, "" 로 지정 할경우 어트리뷰트 미적용됨</td>
    </tr>
</table>


<h2>예제</h2>

<section>
    <h2>색상 변형</h2>
    <ul class="apiExampleList">
        <li>
            <dl>
                <dt>기본(gray)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="color" value="gray"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>진한회색(darkGray)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="color" value="darkGray"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>브랜드(brand)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="color" value="brand"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>서브브랜드(subBrand)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="color" value="subBrand"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>흰색(white)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="color" value="white"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>비활성화(disabled)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="color" value="disabled"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
    </ul>
</section>

<section>
    <h2>크기 변형</h2>
    <ul class="apiExampleList">
        <li>
            <dl>
                <dt>제일작은( -xs )</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="size" value="xs"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>작은(-sm)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="size" value="sm"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>기본(-nm)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="size" value="nm"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>조금 큰(-lg)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="size" value="lg"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>매우 큰(-xl)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="size" value="xl"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
    </ul>
</section>

<section>
    <h2>전시 변형</h2>
    <ul class="apiExampleList">
        <li>
            <dl>
                <dt>블럭( -block )</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="display" value="block"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>인라인 (-inline)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="display" value="inline"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
        <li>
            <dl>
                <dt>인라인 블럭(-inline-block)</dt>
                <dd>
                    <jsp:include page="button.jsp">
                        <jsp:param name="display" value="inline-block"></jsp:param>
                    </jsp:include>
                </dd>
            </dl>
        </li>
    </ul>
</section>


<link rel="stylesheet" href="/uikit/_vender/codemirror/lib/codemirror.css" />
<link rel="stylesheet" href="/uikit/_vender/codemirror/theme/material-ocean.css" />
<link rel="stylesheet" href="/uikit/_vender/codemirror/custom/codemirror-jspSupport.css" /> <!-- jsp:include , jsp:param 을 이쁘게 만들기 위한 별도커스텀 개발한거 -->
<script src="/uikit/_vender/codemirror/lib/codemirror.js"></script>
<script src="/uikit/_vender/codemirror/addon/runmode/runmode.js"></script>
<script src="/uikit/_vender/codemirror/mode/meta.js"></script>
<script src="/uikit/_vender/codemirror/addon/mode/loadmode.js"></script>
<script src="/uikit/_vender/codemirror/addon/mode/overlay.js"></script>
<script src="/uikit/_vender/codemirror/addon/mode/multiplex.js"></script>
<script src="/uikit/_vender/codemirror/custom/codemirror-jspSupport.js"></script> <!-- jsp:include , jsp:param 을 이쁘게 만들기 위한 별도커스텀 개발한거 -->

<pre><code class="language-jsp">
&lt;jsp:include page="test.jsp">
    // 페이지 로드
    &lt;jsp:param name="color" value="gray">&lt;/jsp:param>
&lt;/jsp:include>
</code></pre>
<script>
$(function(){
    /////////////////////////
    // CodeMirror
    CodeMirror.modeURL = '/uikit/_vender/codemirror/mode/%N/%N.js';
    var codeBlocks = document.querySelectorAll('pre > code');

    function parseMode(mode) {
        // switch (mode) {
        //   case 'js':
        //   case 'javascript':
        //     mode = 'jsx'
        // }
        let syntax = CodeMirror.findModeByName(mode);
        if (syntax == null) syntax = CodeMirror.findModeByName('Plain Text');
        return syntax;
    }



    _.forEach(codeBlocks, block => {
        var syntax = parseMode(block.className.substring(9));
        CodeMirror.requireMode(syntax.mode, () => {
            var value = _.unescape(block.innerHTML);
            block.innerHTML = '';

            // SET CODEMIRROR's THEME
            block.parentNode.className = 'cm-s-material-ocean CodeMirror';
            // block.parentNode.className = 'cm-s-default CodeMirror';

            CodeMirror.runMode(value, syntax.mime, block, {
                tabSize: 2
            });

            CodeMirror.jspSupport(block); // jsp:include 와 jsp:param 에 대해 : 을기준으로 별도 태그분리

            // CodeMirror theme css가 적용된 이후 표시하도록 한다.
            block.style.visibility = 'visible';

        });
    });
});
</script>

</body>
</html>