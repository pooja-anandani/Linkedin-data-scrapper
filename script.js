function generate() {
    var cookies = document.getElementById('cookies').value
    var url = document.getElementById('url').value
    console.log(cookies, url);
    fetch('http://localhost:3019/', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ cookies, url })

    })

        .then(res => res.json())
        .then(res => {
            // Handle response 
            console.log('Response: ', res);
            // $("showData").tabulator({res});
            CreateTableFromJSON(res)
            // download(' http://:::3019'+res.userfile,res.userfile)
        })
        .catch(err => {
            // Handle error 
            console.log('Error message: ', err);
        });
}


// function download(url,filename){ 
//     axios({ 
//         url:url,
//         method:'GET', 
//         responseType: 'blob' 
// }) 
// .then((response) => { 
//        const url = window.URL 
//        .createObjectURL(new Blob([response.data])); 
//               const link = document.createElement('a'); 
//               link.href = url; 
//               link.setAttribute('download',filename); 
//               document.body.appendChild(link); 
//               link.click(); 
// }) 
// }

function CreateTableFromJSON(result) {


    // var obj = result;
    var obj = result
    var col = []
    var divcontainer=document.getElementById('showData')
    var table = document.createElement("table");
    for (x in obj) {
    

        const data = obj[x];
        if (Array.isArray(data)) {
          
            data.forEach(value => {
                for (y in value) {
                    if (y === 'location'){
                        table.innerHTML += `<tr><td>${y}</td>
                        <td>${JSON.stringify(value[y])}</td></tr>`
    
    
                    }
                    table.innerHTML += `<tr><td>${y}</td>
                    <td>${value[y]}</td></tr>`
                   
                }
            });
        } else {
            
            for (y in data) {
                if (y === 'location'){
                    table.innerHTML += `<tr><td>${y}</td><td>${JSON.stringify(data[y])}</td></tr>`


                }
                table.innerHTML += `<tr><td>${y}</td>
                <td>${data[y]}</td></tr>`

                }
               
               
               
                
            }
        }
        divcontainer.appendChild(table)

    }
   
















