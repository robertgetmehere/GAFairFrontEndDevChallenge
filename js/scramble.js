var gmh = {
    initialize: function() {
        this.sltGridSize = document.getElementById('gridSize');
        this.inputImage = document.getElementById('inputImage');
        this.outputImage = document.getElementById('outputImage');
        this.toggle = document.getElementById('scrambleImg');
        this.loader = document.getElementById('showLoading');
        this.mode=0;
    },
    reset:function() {
        this.mode = 0;
        this.toggle.innerHTML = 'scramble!';
        this.loader.style.display = 'none';
        this.outputImage.innerHTML='';
    },
    scramble: function() {
        this.loader.style.display = 'block';

        this.outputImage.innerHTML = '';
        var gridSize = parseInt(this.inputImage.clientWidth)/parseInt(this.sltGridSize.value);
        var arrTiles = new Array();
        var index=0;
        var imageSource = this.getImage();

        for (var j=0;j<gridSize;j++) {

            for (var i=0;i<gridSize;i++) {

                var d = document.createElement('div');

                d.style.width               = this.sltGridSize.value + 'px';
                d.style.height              = this.sltGridSize.value + 'px';
                d.style.display             = 'inline-block';
                d.style.float               = 'left';
                d.style.backgroundPosition  = (this.inputImage.clientWidth-this.sltGridSize.value*i) + 'px ' + (this.inputImage.clientWidth-this.sltGridSize.value*j) + 'px';
                d.style.backgroundImage     = 'url(\'' + imageSource + '\')';
                arrTiles.push({index: index, item: d});
                index++;
            }
        }

        if (this.mode == 0) {
            arrTiles.sort(this.randomizeOrder);
            this.mode = 1;
            this.toggle.innerHTML = 'un-scramble!';
        } else {
            arrTiles.sort(this.ascendingOrder);
            this.mode = 0;
            this.toggle.innerHTML = 'scramble!';
        }

        index = 0;
        var df = document.createDocumentFragment();
        var r = document.createElement('div');
        r.style.width = this.inputImage.clientWidth + 'px';
        r.style.height = this.sltGridSize.value + 'px';
        r.style.display = 'block';
        console.log('created new row');
        r.appendChild(arrTiles[0].item);

        for (var j=1;j<arrTiles.length;j++) {
            console.log ('gridsize: ' + gridSize + 'index: ' + index + ' j:' + j);
            if (index < gridSize-1) {
                r.appendChild(arrTiles[j].item);
                console.log('added item to row');
                index++;
            } else {
                df.appendChild(r);
                console.log('appended row');
                index = 0;
                var r = document.createElement('div');
                r.style.width = this.inputImage.clientWidth + 'px';
                r.style.height = this.sltGridSize.value + 'px';
                r.style.display = 'block';
                console.log('created new row');
                r.appendChild(arrTiles[j].item);

            }
        }
        df.appendChild(r);
        this.outputImage.appendChild(df);
        this.loader.style.display = 'none';
    },
    getImage: function() {
        for (var i=0;i<this.inputImage.attributes.length;i++){
            if (this.inputImage.attributes[i].name == 'src') {
                return this.inputImage.attributes[i].nodeValue;
            }
        }
    },
    randomizeOrder: function(){
        return (Math.round(Math.random())-0.5);
    },
    ascendingOrder: function(a, b) {
        return (a.index-b.index);
    }
}

gmh.initialize();