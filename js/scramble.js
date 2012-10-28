var gmh = {
    initialize: function() {
        this.seriesInput = document.getElementById('seriesInput');
        this.seriesOutput = document.getElementById('seriesOutput');
        this.procSeries = document.getElementById('procSeries');
        this.procSeries.onclick = this.procInput;
        this.hasError = true;
        this.output = {};
        this.series = {a:0,b:0,c:0,t:0};
        this.arrSeries = null;
    }
}