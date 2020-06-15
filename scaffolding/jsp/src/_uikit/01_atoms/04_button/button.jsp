<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% request.setCharacterEncoding("UTF-8"); // 한글을 받는경우, 전달되는 파라매터를 UTF-8로 변환함. %>
<%
    /*
     * @File Name : 01_atoms/04_button/heading.jsp
     * @author : Dstyle
     * @Description : 버튼요소
     *
     * @Modification Information
     *
     * 수정일 : 수정자 : 수정내용
     * ------------------------
     * 2020.04.21 : Dstyle : 최초생성
     */
%>
<%
    /** {String} 버튼구현 형식
     * A : a 엘리먼트
     * BTN : button 엘리먼트
     */
    String type = (request.getParameter("type")==null) ? "A" : request.getParameter("type");

    /** {String} 버튼의 id
     */
    String id = (request.getParameter("id")==null) ? "" : request.getParameter("id");

    /** {String} 버튼의 target
     */
    String target = (request.getParameter("target")==null) ? "" : request.getParameter("target");

    /** {String} 버튼의 title
     */
    String title = (request.getParameter("title")==null) ? "" : request.getParameter("title");

    /** {String} 버튼의 tabindex
     */
    String tabIndex = (request.getParameter("tabIndex")==null) ? "" : request.getParameter("tabIndex");

    /** {String} 버튼의 href
     */
    String href = (request.getParameter("href")==null) ? "#" : request.getParameter("href");


    /** {String} 버튼명
     */
    String text = (request.getParameter("text")==null) ? "버튼" : request.getParameter("text");

    /** {String} 버튼 컬러
     */
    String color = (request.getParameter("color")==null) ? "" : request.getParameter("color");

    /** {String} 버튼 사이즈
     */
    String size = (request.getParameter("size")==null) ? "" : request.getParameter("size");

    /** {String} 블럭화(display)
     * inline : inline
     * inline-block : (기본) inline-block
     * block : block
     */
    String display = (request.getParameter("display")==null) ? "" : request.getParameter("display");

    /** {String} 인라인스타일시트
     */
    String style = (request.getParameter("style")==null) ? "" : request.getParameter("style");

    // href 을 제외한 변수로, 어트리뷰트를 생성
    String attr = "";
    attr += (id.equals("")) ? "" : (" id=\""+id+"\""); // id설정
    attr += (target.equals("")) ? "" : (" target=\""+target+"\""); // 링크타겟
    attr += (title.equals("")) ? "" : (" title=\""+title+"\""); // 링크타이틀
    attr += (tabIndex.equals("")) ? "" : (" tabindex=\""+title+"\""); // 탭인덱스


    // CSS관련 클래스 적용
    String addClass = "";
    addClass += (color.equals("")) ? "" : " -"+color; // 버튼색상
    addClass += (size.equals("")) ? "" : " -"+size; // 버튼크기
    addClass += (display.equals("")) ? "" : " -"+display; // 블럭화

    // style적용
    String addStyle = "";
    addStyle += (style.equals("")) ? "" : " style=\""+style+"\""; // 스타일 강제적용
%>
<a href="<%=href%>" class="a-button<%=addClass %>"<%=attr %><%=addStyle %>><span><%=text %></span></a>
