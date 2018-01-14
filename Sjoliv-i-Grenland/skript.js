/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

//Kjører når dokumentet er lastet
document.addEventListener('DOMContentLoaded',function(){

    var init = {
        bildeserie: function (){

            //Henter alle bildene på bakgrunn av en god navn implementasjon så kan man lett legge til flere bilder
            //Baattyper inneholder arrayer med først informasjon om lokalisasjonen av bildene innenfor kilden, og deretter
            //antall bilder som er i lokalisasjonen. Bildene MÅ ha navnene "1.jpg", "2.jpg" osv..
            var kilde = "bilder/baater", baattyper = [["askeladden",3],["bayliner",3],["quicksilver",3]];

            var allebilder = [];
            for(var i = 0; i < baattyper.length; i++){
                for(var j = 0; j < baattyper[i][1]; j++){
                    allebilder.push(kilde + "/" + baattyper[i][0] + "/" + (j+1) + ".jpg");
                }
            }

            //Bytter bilde til neste og starter på nytt når man har passert lengden til arrayen
            var nestebilde = (function(){
                var naa = 0, bildeserie = document.getElementById('bildeserie');
                return function(){
                    bildeserie.style.backgroundImage = "url("+allebilder[naa]+")";
                    naa++;
                    if(naa >= allebilder.length) naa = 0;
                }
            })();

            nestebilde();
            setInterval(nestebilde, 4000);
        },
        bakgrunnslyd: function(){
            var music_toggle_el = document.getElementById('music-toggle'),
                music_background_el = document.getElementById('music-background');

            music_toggle_el.onclick = function(){
                if(music_background_el.paused) {
                    music_background_el.play();
                    this.classList.remove('paused');
                }
                else {
                    music_background_el.pause();
                    this.classList.add('paused');
                }
            };
        },
        kalkulator: function(){
            var avstand_input_el = document.getElementById('avstand--input'),
                tid_input_el = document.getElementById('tid--input'),
                avstand_resultat_el = document.getElementById('avstand--resultat'),
                tid_resultat_el = document.getElementById('tid--resultat');

            avstand_input_el.onchange = function(e){
                avstand_resultat_el.innerHTML = (parseFloat(e.target.value) *  1852) + " km";
            };

            function timerTilTimerOgMinutter(time) {
                return (function(i) {return i+(Math.round(((time-i)*60),10)/100);})(parseInt(time, 10));
            }
            tid_input_el.onchange = function(e){
                var timerOgMinutter = timerTilTimerOgMinutter(Math.round((avstand_input_el.value / e.target.value)*100)/100);
                var timer = Math.floor(timerOgMinutter);
                tid_resultat_el.innerHTML =  timer + " timer og " + Math.round((timerOgMinutter - timer)*100) + " minutter";
            };
        },
        gjettespill: function(){
            var by_velger_select_el = document.getElementById('guessing-game--select');

            var byer = [
            ["Kragerø", 14],
            ["Lyngør", 32],
            ["Kristiansand", 85],
            ["Sandefjord", 23],
            ["Strömstad", 46],
            ["Göteborg",109]
            ];
            for(var i = 0; i < byer.length; i++){
                var option_el = document.createElement('option');
                option_el.innerHTML = byer[i][0];
                option_el.value = byer[i][1];
                by_velger_select_el.appendChild(option_el);
            }

            var input_el = document.getElementById('guessing-game--input'),
                resultat_el = document.getElementById('guessing-game--resultat'),
                knapp_el = document.getElementById('guessing-game--button'),
                resultat_el = document.getElementById('guessing-game--resultat');

            knapp_el.onclick = function(){
                var gjettning = parseFloat(input_el.value),
                    riktig = parseFloat(by_velger_select_el.value),
                    tiprosent = Math.abs(riktig)/10;

                var melding;
                if((gjettning < (riktig + tiprosent) && gjettning > riktig - tiprosent) || gjettning == riktig){
                    melding = "Du gjettet riktig! Den nøyaktige avstanden er "+riktig+" nautiske mil";
                } else if(gjettning > riktig){
                    melding = "Du gjettet for høyt! Prøv litt lavere.";
                } else {
                    melding = "Du gjettet for lavt! Prøv litt høyere.";
                }
                resultat_el.innerHTML = melding;
            }
        }
    };


    init.bildeserie();
    init.bakgrunnslyd();
    init.kalkulator();
    init.gjettespill();
});