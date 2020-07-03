import xlsx from 'xlsx'
/**
 * @param f - e.target
 */
export default function xlsxToJson(f){
    return new Promise((res)=>{
        //console.log(f.files[0])
        let file = f.files[0]
        if(file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            let reader = new FileReader();
            reader.onload = function(e){
                let data = e.target.result;
                let xlsxBin = xlsx.read(data, {type:'binary'});
                const wsName = xlsxBin.SheetNames[0]
                const ws = xlsxBin.Sheets[wsName];

                const jsonData = xlsx.utils.sheet_to_json(ws,{header:1});
                console.log(jsonData)
                let check = true
                while(check && jsonData.length > 0){
                    for(let i in jsonData){
                        if(!jsonData[i].length > 0){
                            jsonData.splice(i,1)
                            check = true;
                            break;
                        }
                        else{
                            check = false;
                        }
                    }
                }
                
                res(jsonData)
            };
            reader.readAsBinaryString(file)
        }
        else{
            console.log("invalid file input")
           res(null)
        }
    })
    
}