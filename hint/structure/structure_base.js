var structure_base = {
    structureVo:{
        url:"", // 적용 url (PK) , 페이지가 없는 경우 빈값적용
        link:"", // 기본적으로는 url을 적용하나, 별도로 있는 경우, 해당값을 사용. 페이지 링크 영역에서 사용함
        title:"", // 기본적으로는 "name"값을 적용하나, 별도로 있는경우엔 해당값을 사용. 페이지 타이틀 영역에서 사용함
        name:"", // 페이지의 이름
        desc:"", // 페이지 타이틀 영역의 설명문구
        pageId:"", // 해당메뉴 아이디 (PK)
        categoryId:"", // 대카테고리(GNB메뉴) 아이디
        parentId:"", // 부모카테고리 아이디
        type:"" // "db" or "" , db 일경우 게시판
    },
    setStructureVo:function(pages,categoryId){
        _.each(pages,function(item,idx,origin){
            origin[idx].categoryId = categoryId;
            origin[idx] = _.extend(gyHomepage._util.deepCopyData(structure_base.structureVo),item);
            origin[idx].title = (origin[idx].title!=="") ? origin[idx].title : origin[idx].name;
            origin[idx].link = (origin[idx].link!=="") ? origin[idx].link : origin[idx].url;
            origin[idx].url = origin[idx].url+".jsp"; // 퍼블 경로
            origin[idx].link = (origin[idx].pageId!=="") ? ((origin[idx].type!=="") ? origin[idx].link+".jsp" : origin[idx].link+".jsp") : origin[idx].link;
            // origin[idx].type = (origin[idx].type!=="") ? origin[idx].type : "static"; // 서버 타는거면, type="db" , 아니면 "static"
        });
    },
    pageVo:{
        page:null, // 현재 페이지
        parent:null, // 부모 페이지(없는경우 undefined)
        child:null, // 자식 페이지(없는경우 undefined)
        category:null // 현재페이지가 속한 카테고리
    },
    getPageVo:function(categoryId,selectKey){ // selectKey 는 url값 이거나, pageId 여야 한다.
        var selectType = selectKey.indexOf("/"); // url 형식이면 "/" 가 무조건 있다.
        var page = (selectType<0) ? _.filter(structure_base[categoryId],{pageId:selectKey})[0] : _.filter(structure_base[categoryId],{url:selectKey})[0];
        return _.extend(gyHomepage._util.deepCopyData(structure_base.pageVo),{
            page:page,
            child:_.filter(structure_base[page.categoryId],{parentId:page.pageId}),
            parent:_.filter(structure_base[page.categoryId],{pageId:page.parentId})[0],
            category:structure_base.category[page.categoryId]
        });
    }
};