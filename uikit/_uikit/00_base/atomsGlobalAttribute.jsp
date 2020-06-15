<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); // 한글을 받는경우, 전달되는 파라매터를 UTF-8로 변환함. %>
<%
    /**** ATOMS 글로벌 jsp 변수 적용 ****/
    // ATOM 기본 어트리뷰트 생성구문
    String _id = (request.getParameter("id")==null) ? "" : request.getParameter("id"); // [String:""] 헤딩의 id
    String _target = (request.getParameter("target")==null) ? "" : request.getParameter("target"); // [String:""] 버튼의 target
    String _title = (request.getParameter("title")==null) ? "" : request.getParameter("title"); // [String:""] 버튼의 title
    String _tabIndex = (request.getParameter("tabIndex")==null) ? "" : request.getParameter("tabIndex"); // [String:""] 버튼의 tabindex
    String _style = (request.getParameter("style")==null) ? "" : request.getParameter("style"); // [String:""] 인라인 스타일시트

    // 어트리뷰트 생성
    String _attr = "";
    _attr += (_id.equals("")) ? "" : (" id=\""+_id+"\""); // id설정
    _attr += (_target.equals("")) ? "" : (" target=\""+_target+"\""); // 링크타겟
    _attr += (_title.equals("")) ? "" : (" title=\""+_title+"\""); // 링크타이틀
    _attr += (_tabIndex.equals("")) ? "" : (" tabindex=\""+_tabIndex+"\""); // 탭인덱스

    // style적용
    String _addStyle = "";
    _addStyle += (_style.equals("")) ? "" : " style=\""+_style+"\""; // 스타일 강제적용
%>