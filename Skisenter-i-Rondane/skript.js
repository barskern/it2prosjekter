/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

(function(){

    document.addEventListener('DOMContentLoaded',function(){

        var meny_knapp = document.getElementById('meny_knapp'),
            hovedside = document.getElementById('hoved_beholder'),
            meny_beholder = document.getElementById('meny_beholder'),
            fixed_header = document.getElementById('fixed_header');

        meny_knapp.onclick = (function(){
            var translated = false, i,
                meny_knapp_barn = meny_knapp.children,
                len = meny_knapp_barn.length,
                barn_ny_vinkel = Math.atan((meny_knapp.scrollHeight)/(meny_knapp.scrollWidth)),
                barn_ny_skalar = Math.sqrt((meny_knapp.scrollHeight*meny_knapp.scrollHeight)+(meny_knapp.scrollWidth*meny_knapp.scrollWidth))/meny_knapp.scrollWidth,
                barn_halv_høyde = meny_knapp_barn[0].scrollHeight/2;

            return function (){
                hovedside.style.left = hovedside.style.backgroundPositionX = (!translated ? meny_beholder.scrollWidth+"px" : "0");
                meny_knapp_barn[0].style.transform = (!translated ? "translate(0,-"+barn_halv_høyde+"px) rotate(-"+barn_ny_vinkel+"rad) scale("+barn_ny_skalar+",1)" : "");
                meny_knapp_barn[len-1].style.transform = (!translated ? "translate(0,"+barn_halv_høyde+"px) rotate("+barn_ny_vinkel+"rad) scale("+barn_ny_skalar+",1)" : "");

                for(i = 1; i < len-1; i++){
                    meny_knapp_barn[i].style.opacity = (!translated ? 0 : "");
                }
                translated = !translated;
            };
        })();
        window.onscroll = function(){
            var scrollTop = document.body.scrollTop;
            if(scrollTop <= 60) fixed_header.style.height = (120 - (40 * (scrollTop/60)))+"px";
            else if(scrollTop > 60) fixed_header.style.height = (120 - 40)+"px";
        };


        var hotell_viser = document.getElementById('hotell_viser'),
            hotell_velger = document.getElementById('hotell_velger');

        //Alle hotellene

        function Hotell(id, navn, tlf, epost, bildeURL){
            this.element = undefined;

            this.id = id;
            this.navn = navn;
            this.tlf = tlf;
            this.epost = epost;
            this.bildeURL = bildeURL;

            this.temperaturer = {
                element: undefined,
                data: [],
                setup: function(){
                    var len = this.data.length;
                    for(var i = 0; i < len; ++i){
                        var kort = document.createElement('div');
                        var farge = (this.data[i] == 0 ? "groenn" : (this.data[i] > 0 ? "roed" : "blaa"));
                        kort.className = "kort--temperatur";
                        kort.innerHTML =
                            "<text class='kort--temperatur--content flex-center flex-colomn'><strong>Dag "+(i+1)+"</strong>" +
                            "<hr/>" +
                            "<div class='sirkel-border " + farge + "'>" +
                            "<div class='content flex-center'><tspan class='kort--temperatur--content--data " + farge + "'>"+this.data[i]+"</tspan></div>" +
                            "</div>" +
                            "</text>";
                        this.element.appendChild(kort);
                    }
                },
                endre: function(dag, nyTemperatur){
                    if(dag > 0 && dag < this.data.length) {
                        this.data[dag] = nyTemperatur;
                        this.updater(dag);
                    }
                },
                updater: function(dag){
                    var i = 0, len = this.data.length;
                    if(dag != undefined){
                        i = dag;
                        len = ++dag;
                    }
                    var alleKort = this.element.children;
                    for(; i < len; i++){
                        if(i < alleKort.length) alleKort[i].innerHTML = this.data[i];
                    }
                }
            };

            this.init = function(){
                var option_elem = document.createElement('option');
                option_elem.innerHTML = this.navn;
                option_elem.value = this.id;
                hotell_velger.appendChild(option_elem);

                //Kontaktinformasjon

                var kontakt_informasjon_cont_elem = document.createElement('div'),
                    hotell_text_elem = document.createElement('p'),
                    overlay = document.createElement('div');

                kontakt_informasjon_cont_elem.className = "kontakt_informasjon";
                overlay.className = "overlay";

                this.updater = this.updater.bind(this, hotell_text_elem);
                this.updater();

                kontakt_informasjon_cont_elem.appendChild(overlay);
                kontakt_informasjon_cont_elem.appendChild(hotell_text_elem);

                kontakt_informasjon_cont_elem.style.backgroundImage = "url(bilder/hoteller/" + this.bildeURL + ")";

                overlay.onclick = function(){
                    this.classList.toggle('er-trykket');
                };

                this.element = kontakt_informasjon_cont_elem;


                //Temperaturer

                var flex_cont_elem = document.createElement('div');
                flex_cont_elem.className = "flex-wrap kort_cont";
                this.temperaturer.element = flex_cont_elem;
            };
            this.updater = function(hotell_text_elem){
                hotell_text_elem.innerHTML = "<b>" + this.navn + "</b></br>"
                    + hotellprefixer.tlf + " <a href=\"tel: " + this.tlf + "\"><i>+47 "
                    + this.tlf.substr(0, 2) + ' ' + this.tlf.substr(2, 2) + ' ' + this.tlf.substr(4,2) + ' '
                    + this.tlf.substr(6,2) + "</i></a></br>"
                    + hotellprefixer.epost + " <a href=\"mailto: " + this.epost + "\">" + this.epost + "</a>";
            };
            this.init();
        }

        //Versjon 1 - Kontaktinformasjon til alle hotellene

        var hotellprefixer = { tlf: "", epost: "" };
        var hoteller = {
            sbs: new Hotell("sbs","Spidsbergseter", "61284000", "post@sgh.no", "spidsbergseter.jpg"),
            rbl: new Hotell("rbl","Rondablikk", "61294940", "post@rondablikk.no", "rondablikk.jpg"),
            rsp: new Hotell("rsp","Rondane SPA", "61209090", "post@rondane.no", "rondaneSPA.jpg"),
            brk: new Hotell("brk","Brekkesenter", "61233711", "post@brekkeseter.no", "brekkeseter.jpg"),
            hjk: new Hotell("hjk","Hjerkinn", "61215100", "fjellstua@hjerkinn.no", "hjerkinn.jpg")
        };

        /*for(var id in hoteller){
            if(hoteller.hasOwnProperty(id)) {
                var hotell = hoteller[id];


                //Option element

                var option_elem = document.createElement('option');
                option_elem.innerHTML = hotell.navn;
                option_elem.value = id;
                hotell_velger.appendChild(option_elem);


                //Kontaktinformasjon

                var kontakt_informasjon_cont_elem = document.createElement('div'),
                    hotell_text_elem = document.createElement('p'),
                    overlay = document.createElement('div');

                kontakt_informasjon_cont_elem.className = "kontakt_informasjon";
                overlay.className = "overlay";

                hotell.updater = hotell.updater.bind(null,hotell_text_elem);
                hotell.updater();

                kontakt_informasjon_cont_elem.appendChild(overlay);
                kontakt_informasjon_cont_elem.appendChild(hotell_text_elem);

                kontakt_informasjon_cont_elem.style.backgroundImage = "url(bilder/" + hotell.bildeURL + ")";

                hotell.element = kontakt_informasjon_cont_elem;


                //Temperaturer

                var flex_cont_elem = document.createElement('div');
                flex_cont_elem.className = "flex-wrap kort_cont";
                hotell.temperaturer.element = flex_cont_elem;
            }
        }*/

        //Versjon 2 - Temperatur og værstatestikk

        var alleTemperaturer = {
            sbs: [-6,-5,-3,-2,0,2,3],
            rbl: [-9,-8,-5,-5,-3,-3,-3],
            rsp: [-11,-10,-8,-8,-5,-5,-4],
            brk: [-10,-9,-7,-5,-5,-2,0],
            hjk: [-13,-12,-10,-9,-9,-7,-7]
        };

        for(var tempID in alleTemperaturer){
            if(alleTemperaturer.hasOwnProperty(tempID)){
                hoteller[tempID].temperaturer.data = alleTemperaturer[tempID];
                hoteller[tempID].temperaturer.setup();
            }
        }


        function byttHotell(id){
            if(hoteller.hasOwnProperty(id)) {
                hotell_viser.innerHTML = '';
                var hotell = hoteller[id];
                hotell_viser.appendChild(hotell.element);
                hotell_viser.appendChild(hotell.temperaturer.element);
            }
        }
        hotell_velger.onchange = function (event){
            byttHotell(event.target.value);
        };
        byttHotell(hotell_velger.value);


        //Bildeserie

        var bildeserie_elem = document.getElementById('bildeserie');

        var bilder = [];

        var vinkelPerBilde = 360/5;
        var tz = Math.round(((250+40)/2)/Math.tan(Math.PI/5));

        for(var i = 1; i < 6; i++){
            var bilde = new Image();
            bilde.src = "bilder/situasjonsbilder/"+i+".jpg";
            bilde.className = "bildeserie--bilde";
            bilde.style.transform = "rotateY("+(vinkelPerBilde*(i-1))+"deg) translateZ("+tz+"px)";
            bilder.push(bilde);
            bildeserie_elem.appendChild(bilde);
        }

        var nesteBilde = (function(){
            var indeks = 0;
            return function(){
                bildeserie_elem.style.transform = "translateZ(-"+tz+"px) rotateY(-"+(indeks*vinkelPerBilde)+"deg)";
                indeks++;
            };
        })();

        nesteBilde();
        setInterval(nesteBilde,6000);

    });
})();
