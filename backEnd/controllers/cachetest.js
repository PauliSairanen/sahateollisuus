//this file is for testing and reference
//
//operates globally
//if multiple sorting function are used, then everyone of each requires own cache storage
//some variables for caching storage
const maxcachestorage=50;
var cachestorage = [];
//in ms milliseconds
const timeoutcache=3600000;

//this is caching function, iden is input and return is output
//actual function to be cached is inside, see nearby
function cachenow(iden) {
    
    //here is the function to be cached
    //funcin = function(inp){return "edited:"+inp;};
    //copy funtion, do not run the function,function is run elsewhere
    funcin = giveinfo;
    
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

                //dataout = sortingfunc(iden);
                dataout = funcin(iden);
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
    
    //dataout = sortingfunc(iden);
    dataout = funcin(iden);
    cachestorage[ii].data=dataout;
    cachestorage[ii].time=(new Date()).getTime();
    
    //console.log("data stored into cache");
    return dataout;
}

tabl=[]
tabl["a"]="some";
tabl["b"]="something";
tabl["c"]="somewhere";
tabl["d"]="someone";
tabl["e"]="somebody";
giveinfo =function(inp)
{
    
    return tabl[inp];
}


//testing functions, not for actual usage
cachenow("a");
tabl["a"]="some-added";
cachenow("b");
cachenow("a");
cachenow("c");
cachenow("a");
cachenow("d");
cachenow("e");



console.log(cachestorage);
console.log(tabl);


