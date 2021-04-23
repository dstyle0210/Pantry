<script>
    export let data;
    console.log("test");
    console.log(data);
</script>

<table>
    <tr>
        <th>이름</th>
        <th>링크</th>
        <th>컨센서스</th>
        <th>종가</th>
        <th>적정주가</th>
        <th>매수예정</th>
        <th>안전마진률</th>
        <th>배당률</th>
        <th>업종</th>
    </tr>
{#each data.data as stock}
    <tr>
        <td>
            <a href="https://navercomp.wisereport.co.kr/v2/company/c1010001.aspx?cmp_cd={stock.sNo}">{stock.name}</a>
        </td>
        <td>
            <a href="https://finance.naver.com/item/main.nhn?code={stock.sNo}">[N]</a>
            <a href="https://dart.fss.or.kr/html/search/SearchCompany_M2.html?textCrpNM={stock.sNo}">[Dart]</a>
            <a href="http://www.thebell.co.kr/free/content/Search.asp?page=&amp;sdt=&amp;period=180&amp;part=T&amp;keyword={stock.name}">[theBell]</a>
            <a href="http://comp.fnguide.com/SVO2/asp/SVD_Main.asp?pGB=1&gicode=A{stock.sNo}">[Wise]</a>
        </td>
        <td>{stock.consensus}억</td>
        <td>{stock.stockPrice}원</td>
        <td>{stock.myStockPrice.toFixed(0)}</td>
        <td>{stock.myStockBuyPrice.toFixed(0)}</td>
        <td><b>{stock.mySafeMargin.toFixed(2)}%</b></td>
        <td>{((stock.dividend/stock.stockPrice)*100).toFixed(2)}%</td>
        <td>{stock.type}</td>
    </tr>
{/each}
</table>

