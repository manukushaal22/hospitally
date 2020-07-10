const headers = ['SL', 'Date', 'Diagnosis', 'Weight', 'Doctor'];
showLoaderView(false);
showProfileView(false);

const get_record = (id) => {
    fetch('https://jsonmock.hackerrank.com/api/medical_records?userId='+id).then((data)=>{
        data.json().then((dataRecord)=>{
        showLoaderView(false);
        showProfileView(true);
        document.getElementById("patient-name").innerText = dataRecord.data[0].userName;
        document.getElementById("patient-dob").innerText = "DOB: " + dataRecord.data[0].userDob;
        document.getElementById("patient-height").innerText = "Height: "+dataRecord.data[0].meta.height;
        makeBody(dataRecord.data);
        });
    });
}

function makeBody(data){
    let table = document.getElementById("table-body");
    document.getElementById("table-body").innerHTML ="";
    for(let i=0;i<data.length;i++){
        let row = table.insertRow(-1);
        let c1 = row.insertCell(0);
        c1.appendChild(document.createTextNode(i+1));
        let c2 = row.insertCell(1);
        let d=new Date(data[i].timestamp);
        c2.appendChild(document.createTextNode(d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()));
        let c3 = row.insertCell(2);
        c3.appendChild(document.createTextNode(data[i].diagnosis.name+"("+data[i].diagnosis.severity+")"));
        let c4 = row.insertCell(3);
        c4.appendChild(document.createTextNode(data[i].meta.weight));
        let c5 = row.insertCell(4);
        c5.appendChild(document.createTextNode(data[i].doctor.name));
    }
}

function processSelection(){
    let selectedElement =document.getElementById("patient-select");
    let selectedId = document.getElementById("patient-select").options[selectedElement.selectedIndex].value;
    if(selectedId!=="-1") {
        showLoaderView(true);
        showProfileView(false);
        get_record(selectedId)
    }
    else{
        showLoaderView(false);
        showProfileView(false);
    }
}

function showLoaderView(show) {
    var x = document.getElementById("loader-view");
    if (show) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function showProfileView(show) {
    var x = document.getElementById("profile-view");
    if (show) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}