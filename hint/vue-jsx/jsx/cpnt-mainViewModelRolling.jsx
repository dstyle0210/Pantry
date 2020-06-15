Vue.component('card-item-rolling', {
    render (h) { // <-- h must be in scope
        var items = this.items;
        var itemClassName = "card-rolling ";
        return (
            <div class="cpnt-mainViewModelRolling" id={this.rollingId}>
                <ul>
                    {items.map(item =>
                        <li><a href={item.href} title=""><img src={item.src} alt={item.title + " 이미지"} /></a></li>
                    )}
                </ul>
                <div class="rolling-indicator" id={this.indicatorId}></div>
            </div>
        );
    },
    props:{
        data:Object
    },
    mounted:function(){
        mainViewModelRolling({
            slider: "#"+this.rollingId,
            indicator:"#"+this.indicatorId,
            isAutoPlay: true,
            currentIdx:0,
            delay:3000
        });
    },
    computed:{
        items:function(){
            var items = [];
            $(this.data).each(function(idx,item){
                var vo = gyHomepage._util.deepCopyData(jsxVo.mainViewModel); // VO 깊은복사 : VO 종속제거
                item = $.extend(vo,{layout:"cardItemMM stamp"},item);
                items.push(item);
            });
            return items;
        },
        rollingId:function(){
            return "cpnt-mainViewModelRolling";
            // return this.id;
        },
        indicatorId:function(){
            return this.rollingId+"Indicator";
        }
    }
});

