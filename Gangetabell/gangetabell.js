/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

(function(){
    var konstruer = {
        talltabell: function(elem){
            var rad, radElemLen, data;
            for(var i = 0; i <= 10; i++){
                rad = document.createElement('tr');
                radElemLen = (i == 10 ? 1 : 10);
                for(var j = 0; j < radElemLen; j++){
                    data = document.createElement('td');
                    data.innerHTML = (i * 10 + j);
                    data.setAttribute('verdi',(i * 10 + j)+'');
                    rad.appendChild(data);
                }
                elem.appendChild(rad);
            }
        },
        gangestykke: function(elem){
            var rands = [], res = 1, tall = 2, domain = 10;
            elem.innerHTML = "";
            for(var i = 0; i < tall; i++){
                res *= (rands[i] = Math.floor((Math.random()*domain)+1));
                elem.innerHTML += rands[i] + ( i + 1 >= tall ? "":" &middot; ");
            }
            return res;
        }
    };

    var gangestykke = document.getElementById('gangestykke'),
        talltabell = document.getElementById('talltabell'),
        poengRiktigElem = document.getElementById('poengRiktig'),
        poengGaltElem = document.getElementById('poengGalt'),
        riktigSvar = konstruer.gangestykke(gangestykke);

    konstruer.talltabell(talltabell);

    var poeng = { riktig: 0, galt: 0 };
    poengRiktigElem.innerHTML = poeng.riktig.toString();
    poengGaltElem.innerHTML = poeng.galt.toString();

    function nårGalt(event,egentligRiktig){
        gangestykke.className = 'galt';
        event.target.className = 'galt';
        egentligRiktig.className = 'riktig';
        poeng.galt++;
        poengGaltElem.innerHTML = poeng.galt.toString();
    }

    function nårRiktig(event){
        gangestykke.className = 'riktig';
        event.target.className = 'riktig';
        poeng.riktig++;
        poengRiktigElem.innerHTML = poeng.riktig.toString();
    }

    function reset(event,egentligRiktig){
        gangestykke.className = 'none';
        event.target.className = 'none';
        if(egentligRiktig != false) egentligRiktig.className  = 'none';
        riktigSvar = konstruer.gangestykke(gangestykke);
        talltabell.style.pointerEvents = 'auto';
    }


    talltabell.onclick = function(event) {
        if (event.target.tagName == "TD") {
            talltabell.style.pointerEvents = 'none';
            var egentligRiktig = false;
            if (parseInt(event.target.innerHTML) == riktigSvar) {
                nårRiktig(event);
            } else {
                egentligRiktig = talltabell.querySelector("[verdi=\"" + riktigSvar + "\"]");
                nårGalt(event, egentligRiktig);
            }
            setTimeout(reset.bind(this, event, egentligRiktig), 1500);
        }
    };

    talltabell.onmouseover = function(event){
        if (event.target.tagName == "TD") {
            event.target.style.backgroundColor = "lightgrey";
        }
    };

    talltabell.onmouseout = function(event){
        if (event.target.tagName == "TD") {
            event.target.style.backgroundColor = "inherit";
        }
    };


})();
