

var submitBtn = document.getElementById("submitBtn");
var nameInput = document.getElementById("bookName");
var urlInput = document.getElementById("webUrl");
var inputs = document.getElementsByClassName("form-control")
var books;

var test = JSON.parse(localStorage.getItem("bookList"));
if (localStorage.getItem("bookList") == null) {
    books = [];
}
else {
    books = JSON.parse(localStorage.getItem("bookList"));
    displayData();
}

submitBtn.onclick = function () {
    
    if(validateName()&&validateUrl());
    if(submitBtn.innerHTML=="Update"){
        updateInfo();
        
    }
    else {
        
        addBook();
    }
    
    displayData();
    resetForm();

}

function addBook() {

    var book =
    {
        Name: nameInput.value,
        Url: urlInput.value,

    }
    books.push(book);
    localStorage.setItem("bookList", JSON.stringify(books));
}

function displayData() {
    var trs = "";
    for (var i = 0; i < books.length; i++) {
        trs += `
        <tr>
        <td>${books[i].Name}</td>
        <td> <button onclick="location.href= '${books[i].Url}';" class='btn btn-info' >Visit</button> </td>
        <td> <button onclick='updateInfo(${i})' class="btn btn-warning" >Update</button> </td>
        <td> <button onclick='deleteBook(${i})' class='btn btn-danger'>Delete</button> </td>
        
        
        </tr>
        
        
       `
    }
    document.getElementById("tableBody").innerHTML = trs;


}

function deleteBook(index) {
    books.splice(index, 1);
    displayData();
    localStorage.setItem("bookList", JSON.stringify(books))
}

function resetForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

}


function updateInfo(index) {
    
    nameInput.value = books[index].Name;
    urlInput.value = books[index].Url;
    submitBtn.innerHTML = "Update";
    submitBtn.onclick=function(){

        books[index].Name=nameInput.value;
        books[index].Url= urlInput.value;
        localStorage.setItem("bookList", JSON.stringify(books));
        displayData();
    }

    

}

function search(searchTxt)
{
    var trs = "";
    for (var i = 0; i < books.length; i++) {
        if(books[i].Name.toLowerCase().includes(searchTxt.toLowerCase()))
        {

            trs += `
            <tr>
            <td>${books[i].Name}</td>
            <td> <button onclick="location.href= '${books[i].Url}';" class='btn btn-info' >Visit</button> </td>
            <td> <button onclick='updateInfo(${i})' class="btn btn-dark" >Update</button> </td>
            <td> <button onclick='deleteBook(${i})' class='btn btn-danger'>delete</button> </td>
            
            
            </tr>
            
            
           `
        }
      
    }
    document.getElementById("tableBody").innerHTML = trs;

}

function validateName()
{
    var nameRejex=/^[a-zA-Z ]{2,30}$/;
    if (!nameRejex.test(nameInput.value))
    {
        submitBtn.disabled="true";
        return false;
    }
    else 
    {
        submitBtn.removeAttribute("disabled");
        return true;
    }
}

nameInput.onkeyup=function()
{
    validateName();
}

function validateUrl()
{
    var urlRejex=/(https?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}/;
    if(!urlRejex.test(urlRejex.value))
    {
        submitBtn.disabled="true";
        return false;
    }
else 
{
    submitBtn.removeAttribute("disabled");
    return true;
    
}
}
urlInput.onkeyup=function()
{
    validateUrl();

}
