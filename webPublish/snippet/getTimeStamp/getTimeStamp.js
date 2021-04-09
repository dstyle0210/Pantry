// 현재 시간 찍기
function getTimeStamp(date){
    return date.toISOString().slice(0, 10);
    /*
    const now = new Date();
    const year = now.getFullYear();
    const month = (function(m){
        return (m<10) ? "0"+m:""+m;
    })(now.getMonth()+1);
    const date = (function(d){
        return (d<10) ? "0"+d:""+d;
    })(now.getDate());
    return year+""+month+""+date;
     */
}
console.log( getTimeStamp(new Date()) );