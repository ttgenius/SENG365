function  validateForm (){
    var search_string = document.getElementById("search_string").value;
    if (search_string == ""){
        alert("Search  string  is  empty!");
        return false;
    }else{
        return true;
    }
}