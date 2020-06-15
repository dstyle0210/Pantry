<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); // 한글을 받는경우, 전달되는 파라매터를 UTF-8로 변환함. %>
<%@ include file="../../../00_base/atomsGlobalAttribute.jsp" %><%-- ATOMS 글로벌 변수처리(id,target,title,tabIndex,style) --%>
<%
    /*
     * @File Name : 01_atoms/heading/01/input.jsp
     * @author : Dstyle
     * @Description : 입력요소
     *
     * @Modification Information
     *
     * 수정일 : 수정자 : 수정내용
     * ------------------------
     * 2020.06.09 : Dstyle : 최초생성
     */
%>
<%
    /** {String} input type 어트리뷰트
     */
    String type = (request.getParameter("type")==null) ? "text" : request.getParameter("type");

    /** {String} 헤딩 서브타이틀 or 부가설명(헤딩 옆에 나옴)
     */
    String placeholder = (request.getParameter("placeholder")==null) ? "" : request.getParameter("placeholder");
    placeholder = (placeholder.equals("")) ? "" : " placeholder='"+placeholder+"'";

    // CSS관련 클래스 적용
    String addClass = "";
    addClass += (size.equals("")) ? "" : " -"+size; // 입력요소크기
%>
<%}if(type.equals("select")){%>
<select<%=_attr %><%=_addStyle %>>
    <option value="">선택</option>
    <option value="">옵션1</option>
    <option value="">옵션2</option>
    <option value="">옵션3</option>
</select>
<%}else if(type.equals("textarea")){%>
<textarea class="a-form" <%=_attr %><%=_addStyle %><%=placeholder%>></textarea>
<%}else{%>
<input type="<%=type %>" class="a-form" <%=_attr %><%=_addStyle %><%=placeholder%> />
<%}%>

