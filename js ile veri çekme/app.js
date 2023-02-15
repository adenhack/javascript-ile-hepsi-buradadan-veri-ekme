class Request {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    get(url, callback) {
        this.xhr.open("GET", url);
        this.xhr.onload = () => {
            if (this.xhr.status === 200) {
                callback(null, this.xhr.responseText);
            } else {
                callback("get request: bir hata oluştu!");
            }
        };
        this.xhr.send();
    }
}
const request = new Request();
request.get("https://www.hepsiburada.com", function(err, response) {
    if (err === null) {
        const list = document.querySelector(".list");

        var parser = new DOMParser();
        var doc = parser.parseFromString(response, "text/html");
        let dec = doc.body.querySelectorAll(".sf-dod-gGjqzZ").length;
        for (let i = 1; i < dec; i++) {

            let dec1 = doc.body.querySelectorAll(".sf-dod-gGjqzZ")[i].firstElementChild.title; //ürün başlığı
            let dec2 = doc.body.querySelectorAll(".sf-dod-gGjqzZ")[i].firstElementChild.getAttribute("href"); //buton
            let dec3 = doc.body.querySelectorAll(".sf-dod-kMMdmw")[i].firstChild.textContent; //fiyat
            let dec4 = doc.body.querySelectorAll(".sf-dod-gxYgqs")[i].src; //resim
            list.innerHTML += `
            <div class="container2">
                <div class="urunresim"> 
                        <img src="${dec4}" class="resim"> 
                </div>
                <div class="urunler">
                <div class="liste1"> ${dec1}</div> 
                <div class="liste2"> ${dec3}</div> 
                <div class="liste3"> 
                <a href="https://www.hepsiburada.com/${dec2}" target="_blank" class="btn btn-primary">MAĞAZAYA GİT</a></div>    
                </div>
            </div>
                `;
        }
    } else {
        console.log(err);
    }
});