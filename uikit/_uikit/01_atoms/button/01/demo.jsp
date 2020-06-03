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
</head>
<body>

<jsp:include page="button.jsp"></jsp:include>

</body>
</html>