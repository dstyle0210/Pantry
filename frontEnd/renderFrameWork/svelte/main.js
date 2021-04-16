import App from './App.svelte';
import Stock from './Stock.svelte';
import data from './report.js';

const example = new App({
	target: document.getElementById("example"),
	props: {
		name: 'world'
	}
});

const stock = new Stock({
	target: document.getElementById("stock"),
	props: {
		data: data
	}
});

export {example,stock};