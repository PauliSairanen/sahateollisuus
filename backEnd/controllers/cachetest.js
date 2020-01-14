//this file is for testing and reference
//
//operates globally
//if multiple sorting function are used, then everyone of each requires own cache storage
//some variables for caching storage
const maxcachestorage=50;
var cachestorage = [];
//in ms milliseconds
const timeoutcache=3600000;
function cachenow(iden,datain) {
    
    var dataout
    //var tmpref=-1;
    var ii;
    for(ii=0;ii<cachestorage.length;ii++)
    {
        if(cachestorage[ii].iden==iden)
        {
            tmpref=ii;
        
            if(cachestorage[ii].time<(new Date()).getTime() -timeoutcache)
            {

                //dataout = sortingfunc(datain);
                dataout = ("edit:"+datain);
                cachestorage[ii].data=dataout;
                cachestorage[ii].time=(new Date()).getTime();
    
                //console.log("old data, refreshing");
                return dataout;

            }
            //(new Date()).getTime()
            dataout=cachestorage[ii].data;
            //console.log("data is already");

            return dataout;
        }
    } 
    

    ii=cachestorage.length;
    
    if(ii>=maxcachestorage)
    {

        for(ii=1;ii<cachestorage.length;ii++)
        {
            cachestorage[ii-1]=cachestorage[ii];
        }
        ii--
    }
    

    //console.log(ii);
    //console.log(maxcachestorage);

    cachestorage[ii]={};
    cachestorage[ii].iden =iden;
    
    //dataout = sortingfunc(datain);
    dataout = ("edit:"+datain);
    cachestorage[ii].data=dataout;
    cachestorage[ii].time=(new Date()).getTime();
    
    //console.log("data stored into cache");
    return dataout;
}


/*
//testing functions, not for actual usage
cachenow("a","dfggf");
cachenow("b","dfgggf");
cachenow("a","dfrggdsfdff");
cachenow("c","dsfggf");
cachenow("a","dfrggdsfewqewff");
cachenow("d","dfr");
cachenow("e","dfr");



console.log(cachestorage);
*/
