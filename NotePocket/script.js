// Zdefiniowanie zmiennych potrzebnych w innych funkcjach
noteTitle = document.getElementById("noteTitle");
note = document.getElementById("note");
let number = 1;
let num = 1;
// Ładowanie zapisanych w Local Storage notatek
window.onload = function loadNoteF(){
    
    for (let i = 1; i <= 12; i++)
    {
        let ndata = JSON.parse(localStorage.getItem(i));
    
        document.getElementById('T' + i).innerHTML = ndata['Title'];
        document.getElementById('Nd' + i).innerHTML = ndata['Note'];
        number = ndata['ID'];
    }
}
// Dodawanie notatki w overlay'u z przyciemnionym tłem, żeby było bardziej pro
function addNote(){
    document.getElementById('overlay').style.display='block';
    document.getElementById('inputBox').style.display='block';
}
// Zamknięcie overlay'a jak się na niego kliknie
function closeOverlay(){
    document.getElementById('overlay').style.display='none';
    document.getElementById('inputBox').style.display='none';
}
// Usuwanie notatki
function removeNote(){

    document.getElementById('T' + num).innerHTML = "";
    document.getElementById('Nd' + num).innerHTML = "";
    localStorage.removeItem(num);
    sortNotes()
}
// Edycja notatki
function editNote(idnum)
{
    num = idnum
    document.getElementById('overlay').style.display='block';
    document.getElementById('inputBox').style.display='block';
    let ndata = JSON.parse(localStorage.getItem(idnum));
    document.getElementById('noteTitle').value = ndata['Title'];
    document.getElementById('note').innerHTML = ndata['Note'];
}
// Zapisanie zmian w notatce
function saveChanges(){

    localStorage.removeItem(num);
    let ndata = { "Title" : noteTitle.value,"Note" : note.value, "ID" : num};
    let noteData = JSON.stringify(ndata);
    localStorage.setItem(num, noteData);
    
    document.getElementById('T' + num).innerHTML = noteTitle.value;
    document.getElementById('Nd' + num).innerHTML = note.value;
    location.reload();
}
// Dodanie notatki do Local Storage
function addNoteF(){
    
    let ndata = { "Title" : noteTitle.value,"Note" : note.value, "ID" : number};
    let noteData = JSON.stringify(ndata);
    localStorage.setItem(number, noteData);
    
    document.getElementById('T' + number).innerHTML = noteTitle.value;
    document.getElementById('Nd' + number).innerHTML = note.value;
    
    number += 1;
    if (number > 12) { number = 12};
}
// Sortowanie notatek, dzięki temu nową notatkę dodajemy zawsze na końcu
function sortNotes(){
    
    location.reload();
    for (let n = 1; n < 12; n++)
    {
        let ndata = JSON.parse(localStorage.getItem(n));
        
        if (n > num)
        {
            ndata = { "Title" : ndata['Title'],"Note" : ndata['Note'], "ID" : n - 1}
            let noteData = JSON.stringify(ndata);
            localStorage.removeItem(n);
            localStorage.setItem(n -1 , noteData);
            
        }
    }
}