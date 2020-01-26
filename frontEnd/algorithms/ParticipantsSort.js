export default participantsSort = dataToBeSorted => {

    let sortedCompanies = [];
    let finalArray = [];
    dataToBeSorted.forEach(object => {
        if (!sortedCompanies.includes(object.Company)) {
            sortedCompanies.push(object)
        }
    });
    sortedCompanies.sort(function (a, b) {
        if (a.Company < b.Company) { return -1; }
        if (a.Company > b.Company) { return 1; }
        return 0;
    });
    sortedCompanies.forEach(Company => {
        if (finalArray[Company.Company] == undefined) {
            finalArray[Company.Company] = [];
            dataToBeSorted.forEach(object => {
                if (object.Company == Company.Company) {
                    finalArray[Company.Company].push({

                        FirstName: object.FirstName,
                        LastName: object.LastName,
                        Country: object.Country,
                        Role: object.Icomefrom,
                        Telephone: object.PhoneNumber.split(" "),
                        Email: object.Email.split(" ")
                    });
                }
            });
            finalArray[Company.Company].sort(function (a, b) {
                if (a.LastName < b.LastName) { return -1; }
                if (a.LastName > b.LastName) { return 1; }
                return 0;
            });
        }
    });
    console.log('Sort Finished!')
    // for (company in finalArray) {
    //     console.log('This is a new Data entry')
    //     console.log('The Company is' + company)
    //     console.log(finalArray[company])
    //     console.log('\n')
    // }
    return finalArray;
}