/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

document.addEventListener('DOMContentLoaded',function(){

    var init = {
        flyanimasjon: function(){

            var fly_lyd_el = document.getElementById('flypassering--fly-lyd'),
                lyd_veksler = document.getElementById('flypassering--lyd-veksler'),
                pause = false;

            lyd_veksler.onclick = function(){
                this.classList.toggle('pause', !pause);
                pause = !pause;
                if(pause) {
                    fly_lyd_el.volume = 0;
                } else {
                    fly_lyd_el.volume = 1;
                }
            };

            function flyStarter(){
                fly_lyd_el.play();
            }

            TweenMax.fromTo('.flypassering--fly',6.5,
                {top:"100%",left:"0",x:"-100%"},
                {top:"0%",left:"100%",x:"0%",ease:Linear.easeNone,repeat:-1,repeatDelay:9,onStart:flyStarter,onRepeat:flyStarter});

            function update_sky(sky_el){
                var dybde = Math.random(),
                    hoeyde = Math.random(),
                    retning = Math.round(Math.random()),
                    orientasjon = (Math.random() < 0.5 ? -1 : 1),
                    delay = Math.floor(Math.random()*3);

                var varighet = eksamenslib.interpolasjon(0,9,1,45,dybde),
                    skaler = eksamenslib.interpolasjon(0,0.8,1,0.3,dybde),
                    plassering = (hoeyde * 100).toFixed(0),
                    zindex = (dybde < 0.4 ? 30 : 10);

                return TweenMax.fromTo(sky_el,varighet,
                    {left:(retning*100)+"%",xPercent:((retning-1)*100),top:plassering+"%",scaleX:skaler*orientasjon,scaleY:skaler,zIndex:zindex},
                    {left:((retning-1)*-100)+"%",xPercent:(retning*-100),delay:delay,ease:Linear.easeNone,onComplete:update_sky,onCompleteParams:[sky_el]});
            }

            var antallSkyer = 10,
                flypassering_el = document.getElementById('flypassering');
            for(var i = 0;i < antallSkyer; i++){
                var sky = document.createElement('div');
                sky.className = "flypassering--sky";
                flypassering_el.appendChild(sky);
                update_sky(sky).startTime(-6);
            }
        },
        flykalkulator: function(){
            var inn_knop = document.getElementById('flykalk--inn-knop'),
                inn_avstand = document.getElementById('flykalk--inn-avstand'),
                inn_fot = document.getElementById('flykalk--inn-fot'),
                ut_timer = document.getElementById('flykalk--ut-timer'),
                ut_minutter = document.getElementById('flykalk--ut-minutter'),
                ut_meter = document.getElementById('flykalk--ut-meter');

            function oppdaterTid(){

                var knop = eksamenslib.innTextTilTall(inn_knop,0),
                    avstand = eksamenslib.innTextTilTall(inn_avstand,0);

                if(knop && avstand){
                    var hastighet = knop * 1.852,
                        tid = (avstand/hastighet),
                        timer = Math.floor(tid),
                        minutter = Math.floor((tid - timer) * 60);

                    ut_timer.innerHTML = timer;
                    ut_minutter.innerHTML = minutter;
                }
            }

            function oppdaterMeter(){
                var fot = Number(inn_fot.value);

                if (!inn_fot.classList.toggle('er-ugyldig',((isNaN(fot) || fot < 0) && inn_fot.value.length > 0))) {
                    if (inn_fot.classList.toggle('er-gyldig', inn_fot.value.length > 0)) {
                        ut_meter.innerHTML = (fot * 0.3048).toFixed(1);
                    }
                }
            }

            inn_knop.oninput = oppdaterTid;
            inn_avstand.oninput = oppdaterTid;
            inn_fot.oninput = oppdaterMeter;

            var instrumenter_els = document.getElementsByClassName('flykalk--instrument'),
                timelines = [],
                overlays = [];
            for(var i = 0; i < instrumenter_els.length; i++){
                var naa_el = instrumenter_els[i],
                    naa_tekst_el = naa_el.querySelector('.flykalk--instrument--tekst');

                if(naa_tekst_el) {
                    overlays[i] = naa_el.querySelector('.overlay');
                    timelines[i] = new TimelineLite({paused: true});

                    timelines[i]
                        .fromTo(naa_tekst_el, 1.5,
                            {top: "100%", autoAlpha: 0},
                            {top: "50%", y: "-50%", autoAlpha: 1, ease: Elastic.easeOut.config(1, 0.4),
                                onCompleteParams: [timelines[i]], onComplete: function (parent) {parent.pause();}
                            }, "inn")
                        .to(naa_tekst_el, 0.5, {top: "100%", y: "0%", ease: Power1.easeIn}, "ut");

                    naa_tekst_el.onclick = function (e) {
                        e.stopPropagation();
                    };

                    naa_el.onclick = (function () {
                        var toggle = false,
                            timeline = timelines[i],
                            overlay = overlays[i];

                        return function () {
                            if (overlay) overlay.classList.toggle('er-synlig', !toggle);
                            if (!toggle) timeline.play("inn");
                            else timeline.play("ut");
                            toggle = !toggle;
                        }
                    })();
                }
            }
        },
        flytid: function(){
            var select_fra = document.getElementById('flytid--select-fra'),
                select_til = document.getElementById('flytid--select-til'),
                inn_hastighet = document.getElementById('flytid--inn-hastighet'),
                ut_timer = document.getElementById('flytid--ut-timer'),
                ut_minutter = document.getElementById('flytid--ut-minutter');

            var destinasjonsnavn = {
                gar: "Gardemoen",
                fle: "Flestrand",
                vae: "Værnes",
                bod: "Bodø",
                eve: "Evenes",
                tro: "Tromsø"
            }, destinasjonsvelgere = document.getElementsByClassName('flytid--destinasjoner');

            for(var id in destinasjonsnavn){
                if(destinasjonsnavn.hasOwnProperty(id)) {
                    var option_el = document.createElement('option');
                    option_el.value = id;
                    option_el.innerHTML = destinasjonsnavn[id];

                    for(var i = 0; i < destinasjonsvelgere.length; i++){
                        if(i > 0) option_el = option_el.cloneNode(true);
                        destinasjonsvelgere[i].appendChild(option_el);
                    }
                }
            }

            var alleAvstander = {
                gar: {fle:40,vae:60,bod:100,eve:150,tro:200},
                fle: {vae:50,bod:80,eve:130,tro:180}
            };

            var prevfra, prevtil;
            function oppdaterTid(){
                var knop = eksamenslib.innTextTilTall(inn_hastighet,0),
                    fra = select_fra.value,
                    til = select_til.value;

                if(fra.length == 3){
                    if(prevfra) prevfra.removeAttribute('disabled');
                    prevfra = select_til.querySelector('[value='+fra+']');
                    prevfra.setAttribute('disabled','true');
                }
                if(til.length == 3){
                    if(prevtil) prevtil.removeAttribute('disabled');
                    prevtil = select_fra.querySelector('[value='+til+']');
                    prevtil.setAttribute('disabled','true');
                }

                if(knop && fra && til){
                    var kmt = knop * 1.852,
                        mil = (alleAvstander[fra] && alleAvstander[fra][til]) || (alleAvstander[til] && alleAvstander[til][fra]);

                    if(mil != false) {
                        var tid = (mil * 1000) / kmt,
                            timer = Math.floor(tid),
                            minutter = ((tid - timer) * 60).toFixed(0);

                        ut_timer.innerHTML = timer;
                        ut_minutter.innerHTML = minutter;
                    }
                }
            }

            select_fra.onchange = oppdaterTid;
            select_til.onchange = oppdaterTid;
            inn_hastighet.oninput = oppdaterTid;
        }
    };

    init.flyanimasjon();
    init.flykalkulator();
    init.flytid();
});