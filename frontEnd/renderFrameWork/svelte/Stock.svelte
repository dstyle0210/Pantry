<script>
    export let data;
    console.log(data);
</script>
<!--
{
        "cStocks": 2,
        "consensus": 15074,
        "dividend": 471,
        "name": "기업은행",
        "owner": 250183,
        "quarter": 4717,
        "stockPrice": 9240,
        "stocks": 738664360,
        "sNo": "024110",
        "cap": 6825258686400,
        "rStocks": 738664358,
        "dividendAll": 347910912618,
        "myconsensus": 1159489087382,
        "myROE": "4.63",
        "RIM": "-0.39",
        "myCap": 15261163000000,
        "myStockPrice": 20660.483797161905,
        "myStockBuyPrice": 18594,
        "mySafeMargin": 101.23376623376623
    }
-->

<table>
    <tr>
        <th>이름</th>
        <th>컨센서스</th>
        <th>종가</th>
        <th>적정주가</th>
        <th>매수예정</th>
        <th>안전마진률</th>
    </tr>
{#each data.data as stock}
    <tr>
        <td>{stock.name}</td>
        <td>{stock.consensus}억</td>
        <td>{stock.stockPrice}원</td>
        <td>{stock.myStockPrice.toFixed(0)}</td>
        <td>{stock.myStockBuyPrice.toFixed(0)}</td>
        <td>{stock.mySafeMargin.toFixed(2)}%</td>
    </tr>
{/each}
</table>
<div>asdsadsad</div>


<style>

    table{background:#000;}

</style>

