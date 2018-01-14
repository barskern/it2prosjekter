/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


document.addEventListener('DOMContentLoaded', function () {

    var init = {
        kuga_animasjon: function(){
            var Lysbilde = function(src, dur, fra, til, tekstbobler){
                this.src = src;
                this.tekstbobler = tekstbobler;
                this.timeline = new TimelineMax({ paused: true });
                this.el = document.createElement('div');
                this.el.className = "pres-bil--lysbilde";
                this.el.style.backgroundImage = "url("+src+")";

                this.timeline.fromTo(this.el,dur,fra,til);
                var naa;
                for(var i = 0; i < this.tekstbobler.length; i++){
                    naa = this.tekstbobler[i];
                    this.el.appendChild(naa.el);
                    this.timeline.fromTo(naa.el, 1,
                        { autoAlpha: 0, left: naa.x, top: naa.y, scale: 0 },
                        { autoAlpha: 1, scale: 1 },
                        "-=0.8");
                }
            };
            var Tekstboble = function(x, y, tekst){
                this.x = x;
                this.y = y;
                this.tekst = tekst;
                this.el = document.createElement('div');
                this.el.className = "pres-bil--lysbilde--tekstboble";
                this.el.innerHTML = this.tekst;
            };

            var bildeDir = "bilder/";
            var pres_kuga_el = document.getElementById('pres-kuga');
            var lyd = new Audio("lyder/musikk_eksamen_H2014.mp3");

            var kuga_lysbilder = [
                new Lysbilde(bildeDir+'kuga_side.jpg',2,{autoAlpha: 1, left: '100%'},{left: 0},[
                    new Tekstboble('70%','40%',"Kraftig, sporty og enda mer elegant både innvendig og utvendig. Vi er " +
                        "stolte over å kunne lansere den helt nye Ford Kuga, vår mest kompetente SUV hittil. Nye Ford " +
                        "Kuga har blitt større og byr på den absolutt nyeste teknologien."),
                    new Tekstboble('5%','5%',"<strong><i>Intelligent firehjulsdrift</i></strong><br>Kugas intelligente firehjulsdrift reagerer umiddelbart og justerer seg til " +
                        "skiftende underlag og kjøreforhold. Den sender nøyaktig riktig mengde effekt til det enkelte hjul " +
                        "som trenger mest veigrep. Og siden firehjulsdriften bare kobles inn ved behov, spares det drivstoff " +
                        "når underlaget er mindre krevende. Hvis du ønsker å se hva som skjer under hjulene dine i løpet av" +
                        " turen, vil en informasjonsskjerm for firehjulsdriften kontinuerlig vise - som et søylediagram - " +
                        "hvor mye effekt som sendes til hvert hjul.")
                ]),
                new Lysbilde(bildeDir+'kuga_front.jpg',2,{autoAlpha: 1, x:"-100%"},{ x:"0%" },[
                    new Tekstboble('5%','5%',"<strong><i>Dynamisk kurvekontroll for maksimum grep</i></strong><br>Dynamisk kurvekontroll reagerer på veioverflaten 100 ganger pr. sekund " +
                        "(det er 33 ganger raskere enn øyet blunker). Ved å bruke denne informasjonen balanseres kontinuerlig" +
                        " mengde effekt og bremsing som leveres til hvert av de to forhjulene. Dette maksimerer veigrepet og " +
                        "skjerper kjøreegenskapene, og hjelper deg på den måten gjennom svingene og over ujevnheter i veien. " +
                        "Dynamisk kurvekontroll er en spissteknologi som er standard på Kuga."),
                    new Tekstboble('70%',"10%","<strong><i>Mer grep gjennom svingene</i></strong><br>Kugas system for forbedret dynamisk " +
                        "kurvekontroll (eDDC) kontroller på en presis måte fordelingen av effekt til begge akslene for dermed " +
                        "å redusere understyring og forbedre kontrollen over bilen. Dette gjør at bilen føles mer dynamisk og" +
                        " reaksjonsvillig. <br> Når det akselereres gjennom svingene bruker eDCC bremsene på det indre forhjulet" +
                        " og, om nødvendig, på bakhjulet, slik at motoreffekten overføres til de ytre hjulene, som har bedre veigrep.")
                ]),
                new Lysbilde(bildeDir+'kuga_interiør.jpg',2,{autoAlpha: 0,scale:0},{autoAlpha: 1,scale:1},[
                    new Tekstboble("40%","60%","<strong><i>Active City Stop</i></strong><br>Active City Stop aktiverer automatisk bremsene ved lave hastigheter for å unngå" +
                        " sammenstøt, og Ford SYNC gir handsfree-kontroll over musikk, telefonoppringninger og mye mer."),
                    new Tekstboble("60%","20%","Et intelligent system for firehjulsdrift tilpasser seg terrenget og kjøreforholdene på et øyeblikk."),
                    new Tekstboble("15%","10%","<strong><i>Effektiv drivsstoffbruk</i></strong><br>Girskiftindikator med mer drivstoffeffektiv giring. Et lys i instrumentpanelet" +
                        " forteller deg når du må skifte gir for å oppnå maksimal drivstoffeffektivitet. Det er en enkel, men" +
                        " effektiv måte å bidra til at bilturene blir mer økonomiske.")
                ]),
                new Lysbilde(bildeDir+'kuga_bak.jpg',2,{autoAlpha: 0},{autoAlpha: 1},[
                    new Tekstboble("70%","50%","<strong><i>Helautomatisk bakluke</i></strong><br>Vi er også stolte over å være de første som lanserer automatisk bakluke " +
                        "på en SUV-modell. Den er imponerende enkel å betjene, selv med hendene fulle. Du beveger simpelthen" +
                        " foten under støtfangeren og bakluken åpner og lukker seg.")
                ])
            ];

            for(var i = 0; i < kuga_lysbilder.length; i++){
                pres_kuga_el.appendChild(kuga_lysbilder[i].el);
            }

            var byttBilde = (function(){
                var indeks = 0, naa = undefined, time = 0;
                return function(i){
                    indeks += i;
                    if(naa) naa.timeline.reverse();
                    if(indeks >= kuga_lysbilder.length) indeks = 0;
                    if(indeks < 0) indeks = kuga_lysbilder.length - 1;
                    naa = kuga_lysbilder[indeks];
                    setTimeout(function(){
                        naa.timeline.play();
                    }, time);
                    time = 1200;
                };
            })();
            byttBilde(0);

            var knapp_neste = document.getElementById('neste'),
                knapp_forrige = document.getElementById('forrige');

            knapp_neste.onclick = byttBilde.bind(null,1);
            knapp_forrige.onclick = byttBilde.bind(null,-1);

            lyd.play();
            lyd.loop = true;
        },
        kalk: function(){
            var literPerKm = 0.65;

            var inn_kjoering = document.getElementById('inn_kjoring'),
                inn_lengde = document.getElementById('inn_lengde'),
                inn_pris = document.getElementById('inn_pris'),
                ut_svar = document.getElementById('ut_svar');

            var oppdaterSvar = function(){
                var kjoring = eksamenslib.innTextTilTall(inn_kjoering),
                    lengde = eksamenslib.innTextTilTall(inn_lengde,0),
                    pris = eksamenslib.innTextTilTall(inn_pris,0);

                if(kjoring !== false && lengde !== false && pris !== false){
                    ut_svar.innerHTML = Math.floor(lengde * pris * literPerKm * kjoring);
                }
            };
            //Kjøres en gang siden det allerede er tall i inputen
            oppdaterSvar();

            inn_kjoering.onchange = oppdaterSvar;
            inn_lengde.oninput = oppdaterSvar;
            inn_pris.oninput = oppdaterSvar;
        },
        finnPrisen: function(){
            var bildata = {
                kuga: { navn: 'Kuga', trend: 401000, titanium: 420000, familie: 1000, forerass: 10200, stil: 9200 },
                cmax: { navn: 'C-max', trend: 320000, titanium: 335000, familie: 1000, forerass: 9400, stil: 3600 },
                focus: { navn: 'Focus', trend: 255000, titanium: 325000, familie: 900, forerass: 12500, stil: 9000 },
                mondeo: { navn: 'Mondeo', trend: 281000, titanium: 361000, familie: 1100, forerass: 9900, stil: 7200 }
            };

            var inn_biler = document.getElementById('inn_biler'),
                inn_variant_tre = document.getElementById('inn_variant_tre'),
                inn_variant_tit = document.getElementById('inn_variant_tit'),
                inn_familie = document.getElementById('inn_familie'),
                inn_forerass = document.getElementById('inn_forerass'),
                inn_stil = document.getElementById('inn_stil');

            var ut_pris_familie = document.getElementById('ut_pris_familie'),
                ut_pris_forerass = document.getElementById('ut_pris_forerass'),
                ut_pris_stil = document.getElementById('ut_pris_stil'),
                ut_pris_tre = document.getElementById('ut_pris_tre'),
                ut_pris_tit = document.getElementById('ut_pris_tit'),
                ut_totalpris = document.getElementById('ut_totalpris');

            var bil = null;

            var naa;
            for(var id in bildata){
                if(bildata.hasOwnProperty(id)){
                    naa = bildata[id];
                    var option_el = document.createElement('option');
                    option_el.innerHTML = naa.navn;
                    option_el.value = id;
                    inn_biler.appendChild(option_el);
                }
            }

            inn_biler.onchange = function(){
                bil = this.value;
                if(bil && bildata.hasOwnProperty(bil)) {
                    ut_pris_tre.innerHTML = bildata[bil].trend;
                    ut_pris_tit.innerHTML = bildata[bil].titanium;
                    ut_pris_familie.innerHTML = bildata[bil].familie;
                    ut_pris_forerass.innerHTML = bildata[bil].forerass;
                    ut_pris_stil.innerHTML = bildata[bil].stil;
                }
            };

            document.forms['form_finn_prisen'].onchange = function(){
                if(bil && bildata.hasOwnProperty(bil) && (inn_variant_tit.checked || inn_variant_tre.checked)) {
                    var sum = (inn_variant_tit.checked ? bildata[bil].titanium : bildata[bil].trend);
                    if(inn_familie.checked) sum += bildata[bil].familie;
                    if(inn_forerass.checked) sum += bildata[bil].forerass;
                    if(inn_stil.checked) sum += bildata[bil].stil;

                    ut_totalpris.innerHTML = sum;
                }
            };
        }
    };

    init.kuga_animasjon();
    init.kalk();
    init.finnPrisen();
});
