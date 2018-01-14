/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

/**
 * En spydfinale gjennomføres på følgende måte: Alle finalens 8 deltakere gjennomfører 3
 * kast (omganger). De 4 beste får lov til å kaste 3 nye kast (totalt 6 omganger). Det lengste
 * kastet i løpet av de 6 omgangene vinner.
 */

(function(){
    function init(event){
        oppgave1 = (function(){
            var parent = document.getElementById('spydkast'),
                illustrasjon = parent.querySelector('img'),
                paragraf = parent.querySelector('#tekst1'),
                statusInt = 0,
                statuser = (function(){
                    function Egenskap(bildeNavn, tekst){
                        this.bildeNavn = bildeNavn;
                        this.tekst = tekst;
                    }
                    return [
                        new Egenskap("1_vanlig_lop_400.jpg","\<strong\>Fase 1: Løp\<\/strong\>\<br\/\>Først har spydkasteren vanligvis spydet i hvileposisjon før han setter i gang med å løpe. Her er målet å skape energi i form av bevegelse."),
                        new Egenskap("2_tilbakeforing_400.jpg","\<strong\>Fase 2: Tilbakeføring \<\/strong\>\<br\/\>Spydkasteren fører spydet bak kroppen for å gjøre spydet klart til kast. Målet er å gjøre spydet klart for avgang i siste fase."),
                        new Egenskap("3_kryssteg_400.jpg","\<strong\>Fase 3: Krysstegsfasen\<\/strong\>\<br\/\>Spydkasteren løper i kryssteg for å få riktig rytme i kastet og komme i posisjon med det som kalles stembeinet (beinet han står på når han kaster i fase 4)."),
                        new Egenskap("4_utkast_400.jpg","\<strong\>Fase 4: Utkast\<\/strong\>\<br\/\>Spydkasteren setter stembeinet i bakken og lar spydet fly gjennom lufta ved å overføre energien fra de foregående bevegelsene til spydet. I denne fasen kan spydet akselerere fra 25 km/t til 110 km/t i løpet av 12/100 sekund hos de beste kasterne i verden. Trykket på stambeinet er ca. ti ganger kroppsvekten.")
                    ];
                })();

            document.getElementById('gåfram').addEventListener('click',function(event){ håndterTrykk(1); });
            document.getElementById('gåtilbake').addEventListener('click',function(event){ håndterTrykk(-1); });

            function håndterTrykk(retning){
                statusInt += retning;
                if(statusInt >= statuser.length) statusInt = 0;
                else if(statusInt < 0) statusInt = statuser.length - 1;
                oppgave1();
            }

            return function(){
                illustrasjon.src = "bilder/spydkast/" + statuser[statusInt].bildeNavn;
                paragraf.innerHTML = statuser[statusInt].tekst;
            };
        })();
        oppgave1();

        oppgave2 = (function(){
            var parent = document.getElementById('andreas'),
                video = parent.querySelector('video'),
                overlay = document.getElementById('overlay'),
                input = overlay.querySelector('input'),
                output = overlay.querySelector('p'),
                riktigSvar = false;

            input.onkeyup = function(event){
                if(event.keyCode == 13 && !riktigSvar) {
                    var gjettning = parseInt(this.value);
                    if(gjettning){
                        if(gjettning <= 36 && gjettning >= 26){
                            output.innerHTML = "Meget godt tippet, for kastet var bare til ære for fotografen! Og derfor var det på 31 meter.";
                            input.style.opacity = 0;
                            riktigSvar = true;
                        } else {
                            output.innerHTML = "Prøv en gang til, det er ikke så langt som man tror. Klikk for å se klippet igjen.";
                        }
                    }
                }
            };

            video.onprogress = function(event){
                if(event.target.currentTime > 15){
                    event.target.pause();
                    overlay.style.opacity = 0.8;
                    input.style.display = "block";
                    input.style.opacity = 0.8;
                    input.focus();
                }
            };

            return function(elem){
                if(elem.paused && !riktigSvar){
                    elem.currentTime = 0;
                    elem.play();
                    overlay.style.opacity = 0;
                    output.innerHTML = "";
                }
            };
        })();

        oppgave3 = (function(){

            var finaletabell = document.getElementById('finaletabell'),
                superfinaletabell = document.getElementById('superfinaletabell'),
                nyDeltKnapp = document.getElementById('nyDeltaker'),
                superfinaleKnapp = document.getElementById('superfinaleknapp'),
                sirkelpiler = document.getElementsByClassName('sirkelpil');

            var info = [["Finale"],["Navn","1. kast","2. kast","3. kast"]];
            for(var j = 0; j < info.length; j++) {
                var rad = document.createElement('tr');
                for (var i = 0; i < info[j].length; i++) {
                    var data = document.createElement('td');
                    data.innerHTML = info[j][i];
                    if(j == 0) data.colSpan = "100";
                    rad.appendChild(data);
                }
                finaletabell.appendChild(rad);
                superfinaletabell.appendChild(rad.cloneNode(true));
            }
            superfinaletabell.firstElementChild.firstElementChild.innerHTML = "Super Finale";

            var deltakere = [], highestResults = {};
            var nyDeltaker = (function(){
                var currentid = 0;
                return function() {
                    var rad = document.createElement('tr');
                    for (var i = 0; i < 5; ++i) {
                        var input = document.createElement('input');
                        if(i == 0){
                            input.type = "hidden";
                            input.value = currentid;
                            rad.appendChild(input);
                        } else {
                            var data = document.createElement('td');
                            if(i > 1) {
                                input.type = "number";
                                input.min = 0;
                                input.max = 200;
                                input.placeholder = 0;

                                (function(i, id){
                                    input.oninput = function(){
                                        var naa = deltakere[id];
                                        naa[i-2] = parseInt(this.value);
                                        var highest = 0, highestIndex;
                                        for(var j = 0; j < naa.length; j++){
                                            if(naa[j] > highest){
                                                highest = naa[j];
                                                highestIndex = j;
                                            }
                                            rad.children[j+2].style.background = "transparent";
                                        }
                                        if(highest > 0) {
                                            rad.children[highestIndex+2].style.background = "yellow";
                                            highestResults[id] = highest;
                                        }
                                    };
                                })(i, currentid);

                            } else if(i == 1){
                                input.type = "text";
                                input.size = 10;
                                input.placeholder = "Ny deltaker";
                                input.focus();
                            }
                            data.appendChild(input);
                            rad.appendChild(data);
                        }
                    }
                    deltakere[currentid] = [];
                    finaletabell.appendChild(rad);
                    currentid++;
                };
            })();

            nyDeltKnapp.onclick = function(){
                nyDeltaker();
            };
            nyDeltaker();

            var byttTabeller = (function(){
                var naa = finaletabell, andre = superfinaletabell;
                return function(){
                    naa = [andre, andre = naa][0];
                    naa.style.display = "table";
                    andre.style.display = "none";
                };
            })();

            superfinaleKnapp.onclick = function(event){
                while(superfinaletabell.childElementCount > 2){
                    superfinaletabell.deleteRow(2);
                }

                for(var j = 0; j < sirkelpiler.length; j++){
                    sirkelpiler[j].style.display = "flex";
                }
                var sortable = [];
                for(var highest in highestResults) sortable.push([highest,highestResults[highest]]);
                sortable.sort(function(a, b){ return b[1] - a[1]; });

                for(var i = 0; i < 4; i++){
                    if(sortable[i] != undefined) superfinaletabell.appendChild(finaletabell.children[(parseInt(sortable[i][0])+2)].cloneNode(true));
                }
                if(superfinaletabell.style.display == "none") byttTabeller();
            };

            for(var u = 0; u < sirkelpiler.length; u++){
                sirkelpiler[u].onclick = byttTabeller;
            }

            return function(){

            };
        })();
    }
    window.addEventListener('DOMContentLoaded',init);
})();