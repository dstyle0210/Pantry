/**
 * 내부에서 이미지형 , 유튜브형으로 나누어짐(data.type에 따라)
 */
Vue.component('cpnt-main-view-model', {
    render (h) { // <-- h must be in scope
        var item = this.item;
        if(item.type=="video"){
            return <cpnt-main-video data={item}></cpnt-main-video>
        }else{
            return <cpnt-main-normal data={item}></cpnt-main-normal>
        };
    },
    props:{
        data:Object
    },
    computed:{
        item:function(){
            return this.data;
        }
    },
    methods:{}
});