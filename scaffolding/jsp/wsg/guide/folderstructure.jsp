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
    <title>가이드 > 폴더구조</title>
    <link rel="stylesheet" href="../_lib/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../_lib/bootstrap/css/bootstrap-theme.min.css">
    <script src="../_lib/jquery/jquery-1.11.3.min.js"></script>
    <script src="../_lib/jquery/jquery-migrate-1.2.1.min.js"></script>
    <script src="../_lib/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
<div class="row">
    <div class="col-xs-10 col-xs-offset-1">

        <h2>스케폴딩 폴더구조표</h2>

        <article>
            <h3>/src : 소스</h3>
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>1depth</th>
                    <th>2depth</th>
                    <th>3depth</th>
                    <th>엔트리포인트( /src/_entry )</th>
                    <th>설명</th>
                </tr>
                </thead>
                <tr>
                    <td>/src</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>진행중인 소스가 담기는 폴더</td>
                </tr>
                <tr>
                    <td>/src</td>
                    <td>/_entry</td>
                    <td></td>
                    <td></td>
                    <td>SCSS(.scss) 및 typescript(.ts)을 번들하기 위한 엔트리 포인트용 파일 모음</td>
                </tr>
                <tr>
                    <td>/src/</td>
                    <td>/_uikit</td>
                    <td></td>
                    <td></td>
                    <td>반복성을 가진 uikit의 모음 폴더, Atomic design system을 기반으로 하지만, 변형하여 사용함, <a href="">WSG > 컨벤션 > uikit</a> 항목 참조</td>
                </tr>
                <tr>
                    <td>/src/</td>
                    <td>/_uikit</td>
                    <td>/00_base</td>
                    <td>*_uikit_base.scss</td>
                    <td>브라우저 초기화(reset) 및 프로젝트 베이스(base) , uikit 공통 변수, 믹스인 , 함수.</td>
                </tr>
                <tr>
                    <td>/src/</td>
                    <td>/_uikit</td>
                    <td>/01_atmos</td>
                    <td>*_uikit_atoms.{scss | js}</td>
                    <td>최소 단위 엘리먼트 또는 클래스 모음, text , table , form 요소들이 포함 됨</td>
                </tr>
                <tr>
                    <td>/src/</td>
                    <td>/_uikit</td>
                    <td>/02_modules</td>
                    <td>*_uikit_modules.{scss | js}</td>
                    <td>모듈 단위 엘리먼트 모음 , 상품 , atoms의 조합 등 , 작은기능의 조합(드롭다운) 등</td>
                </tr>
                <tr>
                    <td>/src/</td>
                    <td>/_uikit</td>
                    <td>/03_components</td>
                    <td>*_uikit_components.{scss | js}</td>
                    <td>컴포넌트 단위 엘리먼트 모음 , 스와이퍼 , 전시배치 등 모듈 및 아톰을 포함하여 반복사용성을 가진 컴포넌트 모음</td>
                </tr>
                <tr>
                    <td>/src/</td>
                    <td>/css</td>
                    <td></td>
                    <td>*_uikit_components.{scss | js}</td>
                    <td>컴포넌트 단위 엘리먼트 모음 , 스와이퍼 , 전시배치 등 모듈 및 아톰을 포함하여 반복사용성을 가진 컴포넌트 모음</td>
                </tr>
            </table>
        </article>

        <article>
            <h3>/dist : 최종산출물</h3>
            <table class="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>1depth</th>
                    <th>2depth</th>
                    <th>3depth</th>
                    <th>설명</th>
                </tr>
                </thead>
                <tr>
                    <td>/dist</td>
                    <td></td>
                    <td></td>
                    <td>최종결과물이 담기는 폴더</td>
                </tr>
                <tr>
                    <td>/dist</td>
                    <td>/css</td>
                    <td></td>
                    <td>최종결과물 중 CSS 파일이 압축되어 담기는 폴더</td>
                </tr>
                <tr>
                    <td>/dist</td>
                    <td>/images</td>
                    <td></td>
                    <td>최종결과물 중 이미지 파일이 담기는 폴더</td>
                </tr>
                <tr>
                    <td>/dist</td>
                    <td>/include</td>
                    <td></td>
                    <td>최종결과물 중 공통적으로 사용되는 jsp 파일의 모음</td>
                </tr>
                <tr>
                    <td>/dist</td>
                    <td>/js</td>
                    <td></td>
                    <td>최종결과물 중 javascript 파일이 압축되어 담기는 폴더</td>
                </tr>
                <tr>
                    <td>/dist</td>
                    <td>/pages</td>
                    <td></td>
                    <td>최종결과물 중 페이지 jsp 파일의 모음</td>
                </tr>
            </table>
        </article>
    </div>
</div>
</body>
</html>