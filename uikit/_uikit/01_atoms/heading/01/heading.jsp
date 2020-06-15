<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); // 한글을 받는경우, 전달되는 파라매터를 UTF-8로 변환함. %>
<%@ include file="../../../00_base/atomsGlobalAttribute.jsp" %><%-- ATOMS 글로벌 변수처리(id,target,title,tabIndex,style) --%>
<%
/*
 * @File Name : 01_atoms/heading/01/heading.jsp
 * @author : Dstyle
 * @Description : 헤딩요소
 *
 * @Modification Information
 *
 * 수정일 : 수정자 : 수정내용
 * ------------------------
 * 2020.06.09 : Dstyle : 최초생성
 */
%>
<%
    /** {String} 헤딩 타이틀
     */
    String title = (request.getParameter("text")==null) ? "헤딩" : request.getParameter("text");

    /** {String} 헤딩 서브타이틀 or 부가설명(헤딩 옆에 나옴)
     */
    String desc = (request.getParameter("text")==null) ? "서브타이틀 or 부가설명" : request.getParameter("text");

    /** {String} 헤딩요소의 Hx 값 (h1 ~ h6)
     */
    String hx = (request.getParameter("hx")==null || request.getParameter("hx")=="") ? "h1" : request.getParameter("hx");

    /** {String} 헤딩요소 아래 보더여부(보더가 없는 경우, 하단 패딩도 없음)
     * "N" : 보더없음(기본값)
     * "Y" : 보더있음
     */
    String borderYn = (request.getParameter("borderYn")==null || request.getParameter("borderYn")=="") ? "N" : request.getParameter("borderYn");

    // 옵션에 따른 수정 클래스(modifiner) 적용
    String addClass = "";
    addClass += (hx.equals("")) ? "" : " -"+hx; // 헤딩 깊이
    addClass += (borderYn.equals("N")) ? "" : " -border"; // 버튼색상
%>
<div class="a-heading<%=addClass%>" <%=attr %><%=addStyle %>>
    <<%=hx%> class="a-heading__title"><%=title%></<%=hx%>>
    <i class="a-heading__bar">|</i>
    <span class="a-heading__desc"><%=desc %></span>
</div>
