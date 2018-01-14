

var eksamenslib = {

    /**
     * En funksjon som tar antall sekunder og gjør det om til formatet HH:MM:SS
     * @param _s Antall sekunder som skal gjøres om til annet format
     * @returns {string} Sekundene gjort om til gitt format
     */
    sekunderTilHHMMSS: function(_s){
        var t = Math.floor(_s / 3600),
            m = Math.floor((_s - (t * 3600)) / 60),
            s = Math.floor((_s - (t * 3600) - (m * 60)));
        if(t < 10) t = "0" + t;
        if(m < 10) m = "0" + m;
        if(s < 10) s = "0" + s;
        return t + ":" + m + ":" + s;
    },

    /**
     * Tar først inn cordinatene til 2 punkter og så inn en x-verdi som man ønsker å finne y verdien til
     * @param ax Første punkt x-verdi
     * @param ay Første punkt y-verdi
     * @param bx Andre punkt x-verdi
     * @param by Andre punkt y-verdi
     * @param x Verdien man ønsker å finne y verdien til
     * @returns {number} y-verdien av x-verdien man ville finne
     */
    interpolasjon: function(ax,ay,bx,by,x){
        return (((x - ax)*(by - ay))/(bx - ax)) + ay;
    },

    /**
     * Bruker interpolasjonsfunksjonen men legger på grenser for y verdiene slik at høyere og lavere verdier blir justert
     * til spesifisert grense.
     * @param ax Første punkt x-verdi
     * @param ay Første punkt y-verdi
     * @param bx Andre punkt x-verdi
     * @param by Andre punkt y-verdi
     * @param min Minste grense for y
     * @param max Max grense for y
     * @param x Verdien man ønsker å finne y verdien til
     * @returns {number} y-verdien av x-verdien man ville finne
     */
    interpolasjonLim: function(ax,ay,bx,by,min,max,x){
        var res = interpolasjon(ax,ay,bx,by,x);
        if(res < min) res = min;
        else if(res > max) res = max;
        return res;
    },

    /**
     * Tar en input element og evt minimuns og maksimums grense for tallet og enten gir tilbake tallet eller false hvis den er
     * ugyldig eller ikke eksisterende
     * @param inn_el Et input element
     * @param min [optional] Minimunsgrense, alt som er større enn
     * @param max [optional] Maximumsgrense, alt som er mindre enn
     * @returns {*} Enten verdien hvis den er gyldig eller false
     */
    innTextTilTall: function(inn_el, min, max){
        if(typeof min === "undefined") min = -Number.MAX_VALUE;
        if(typeof max === "undefined") max = Number.MAX_VALUE;

        var val = Number(inn_el.value),
            len = inn_el.value.length;

        if (!inn_el.classList.toggle('er-ugyldig',((isNaN(val) || val <= min || val >= max) && len > 0)))
            if(inn_el.classList.toggle('er-gyldig',len > 0)) return val;
        return false;
    }

};