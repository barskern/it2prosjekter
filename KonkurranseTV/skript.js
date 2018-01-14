/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


document.addEventListener('DOMContentLoaded',function(){

    /**
     * Tar først inn cordinatene til 2 punkter og så inn en x-verdi som man ønsker å finne y verdien til
     * @param xa Første punkt x-verdi
     * @param ya Første punkt y-verdi
     * @param xb Andre punkt x-verdi
     * @param yb Andre punkt y-verdi
     * @param x Verdien man ønsker å finne y verdien til
     * @returns y-verdien av x-verdien man ville finne
     */
    function interpolasjon(xa,ya,xb,yb,x){
        return yb + ((yb - ya) * ((x - xb)/(xa - xb)));
    }

    var init = {
        skinkevekt: function(){
            var input_el = document.getElementById('skinkevekt--text--input'),
                resultat_el = document.getElementById('skinkevekt--text--resultat'),
                gjettninger_el = document.getElementById('skinkevekt--text--gjettninger'),
                skinkens_vekt = 8,
                rotasjonsgrense = 25,
                lyd_feil = new Audio("lyder/paafugl.mp3"),
                lyd_riktig = new Audio("lyder/kanarifugl.mp3");

            function oppdatervekt(input){
                var rotering = interpolasjon(0,-rotasjonsgrense,skinkens_vekt,0,input);
                if(rotering > rotasjonsgrense) rotering = rotasjonsgrense;
                else if(rotering < -rotasjonsgrense) rotering = -rotasjonsgrense;
                TweenLite.to(".skinkevekt--vekt",3,{rotation:-rotering, ease: Elastic.easeOut.config(1, 0.3)});
                TweenLite.to(".skinkevekt--vekt--skinke",6,{rotation:rotering, ease: Elastic.easeOut.config(1, 0.2)});

                var boette_elastic = interpolasjon(0,0.3,6,0.1,input);
                if(boette_elastic < 0.1) boette_elastic = 0.1;
                else if(boette_elastic > 0.3) boette_elastic = 0.3;
                TweenLite.to(".skinkevekt--vekt--boette",5,{rotation:rotering, ease: Elastic.easeOut.config(1, boette_elastic)});
            }

            var antall_gjett = 0;
            input_el.onchange = function(e){
                var gjettning = e.target.value,
                    melding = "Du gjettet ";
                lyd_feil.pause();
                lyd_feil.currentTime = 0;
                lyd_riktig.pause();
                lyd_riktig.currentTime = 0;
                if(gjettning == skinkens_vekt) {
                    melding += gjettning + ", som er <strong>RIKTIG</strong>! Godt jobbet!"
                    lyd_riktig.play();
                } else if(gjettning > skinkens_vekt) {
                    lyd_feil.play();
                    melding += gjettning+", som er for <strong>høyt</strong>. Tror nok du må senke forventningene litt.";
                } else {
                    lyd_feil.play();
                    melding += gjettning+", som er for <strong>lavt</strong>. Den er ikke så lett nei.";
                }
                antall_gjett++;
                oppdatervekt(parseFloat(gjettning));
                resultat_el.innerHTML = melding;
            };
            TweenLite.to(".skinkevekt--vekt--skinke",0,{x:"-38.6%",y:"-6%"});
            TweenLite.to(".skinkevekt--vekt--boette",0,{x:"48.2%",y:"-3.8%"});
            oppdatervekt(0);
        }
    };

    init.skinkevekt();
});