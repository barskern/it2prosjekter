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
        banner: function(){
            var banner_el = document.getElementById('banner'),
                banner_tekst_el = document.getElementById('banner--tekst'),
                lyd_el = document.getElementById('banner--lyd'),
                lyd_veksler_el = document.getElementById('banner--lyd-veksler'),
                index = 0;

            /*
            * Default:
            *   bottom: 15px
            *   right: 15px
            */

            var bildeInfo = [
                    {url:"eidsvoll.jpeg",
                        tekst:{
                            content:"Samfunnsengasjement",css:{left:"auto",top:"15px",y:"0%",right:"15px"}
                        }
                    },
                    {url:"franskvingaard.jpg",
                        tekst:{
                            content:"Studieopphold i utlandet",css:{top:"100%",y:"-110%"}
                        }
                    },
                    {url:"frigjoeringen.jpg",
                        tekst:{
                            content:"Evne til å lede og samarbeide",css:{left:"15px",top:"15px",y:"0%",right:"auto"}
                        }
                    },
                    {url:"sprakstudier.png",
                        tekst:{
                            content:"Arbeider med fag og mennesker",css:{top:"100%",y:"-110%"}
                        }
                    },
                    {url:"vikinskip.jpg",
                        tekst:{
                            content:"Kunne inspirere, utfordre og formidle kunnskap",css:{}
                        }
                    }
                ];


            lyd_veksler_el.onclick = function(){
                if(lyd_el.paused){
                    lyd_el.play();
                    this.classList.remove('pause');
                } else {
                    lyd_el.pause();
                    this.classList.add('pause');
                }
            };

            function nesteBanner(){
                banner_el.style.backgroundImage = "url(bilder/"+bildeInfo[index].url+")";
                TweenMax.to(banner_tekst_el,2,{css:bildeInfo[index].tekst.css,ease:Elastic.easeOut.config(0.4,0.2)});
                banner_tekst_el.innerHTML = bildeInfo[index].tekst.content;
                index++;
                if(index >= bildeInfo.length) index = 0;

            }

            TweenMax.to(banner_tekst_el,0,{right:"-70%"});

            nesteBanner();
            setInterval(nesteBanner,6000);
        },
        studiekalk: function(){
            var inn_kar = document.getElementById('studiekalk--inn-kar'),
                inn_bonus = document.getElementById('studiekalk--inn-bonus'),
                inn_grense = document.getElementById('studiekalk--inn-grense'),
                select_grense = document.getElementById('studiekalk--select-grense'),
                ut_svar = document.getElementById('studiekalk--ut-svar');

            var poenggrenser = {
                lekhis: {navn:"Lektorutdanning i historie",grense:50},
                lekspr: {navn:"Lektorutdanning i språkfag/engelsk",grense:48}
            };

            for(var id in poenggrenser){
                if(poenggrenser.hasOwnProperty(id)){
                    var option_el = document.createElement('option');
                    option_el.value = id;
                    option_el.innerHTML = poenggrenser[id].navn;
                    select_grense.appendChild(option_el);
                }
            }

            function oppdaterSvar() {
                var kar = eksamenslib.innTextTilTall(inn_kar, 0, 6),
                    bonus = eksamenslib.innTextTilTall(inn_bonus, 0, 10),
                    grense = eksamenslib.innTextTilTall(inn_grense, 0, 80);

                if(this == select_grense){
                    grense = poenggrenser[select_grense.value].grense;
                    inn_grense.value = grense;
                }
                if(this == inn_grense){
                    select_grense.value = "";
                }

                if (kar && grense) {
                    if(!bonus) bonus = 0;
                    if ((kar * 10) + bonus >= grense) {
                        ut_svar.innerHTML = "kan du";
                    } else {
                        ut_svar.innerHTML = "kan du ikke";
                    }
                }
            }
            inn_kar.oninput = oppdaterSvar;
            inn_bonus.oninput = oppdaterSvar;
            inn_grense.oninput = oppdaterSvar;
            select_grense.onchange = oppdaterSvar;
        }
    };

    init.banner();
    init.studiekalk();
});
