define(function(require, exports, module){
    var schema = ['#69D2E7', '#E94C6F', '#E0E4CC', '#A7DBDB', '#F38630', '#FA6900', '#542733', '#C6D5CD', '#DB3340', '#1FDA9A', '#D96459', '#8C4646', '#D0C91F', '#59C4C5', '#FFC33C', '#FF4C65', '#FCEBB6', '#78C0A8', '#F0A830', '#6E9ECF', '#B1EB00', '#FF85CB', '#354458', '#EB7260', '#E9E0D6', '#4298B5', '#92B06A', '#E19D29', '#BCCF02', '#9B539C', '#FFA200', '#00A03E', '#0087CB', '#982395'];

    function ColorProvider(){
        this.hashCode = function(str){
            var hash = 0, i, char;
            if (str.length === 0) return hash;
            for (i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = parseInt(Math.abs(hash & hash) / schema.length); // Convert to 32bit integer
            }
            return hash;
        }

        this.get = function(str){
            var index;

            if (!str){
                index = parseInt(Math.random() * (schema.length - 1));
            } else {
                index = this.hashCode(str);
            }

            return schema[index];
        }
    }

    return ColorProvider;
});
