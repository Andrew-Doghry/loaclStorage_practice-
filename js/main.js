let nameInput = document.querySelector('#BN');
let authInput = document.querySelector('#AN');
let publDateInput = document.querySelector('#BPD');
let bookDescInput = document.querySelector('#BD');
let books = document.querySelector('.books');
let arr=[];
if(localStorage.getItem('books')){
    arr = JSON.parse(localStorage.getItem('books'));
    arr.forEach((e)=>{
        addElementToPage(e)
    });
}
function createBook (){
    let book = {
        id : Date.now(),
        bName : nameInput.value,
        AuthName:authInput.value,
        publDate:publDateInput.value,
        bookDesc: bookDescInput.value,
    };
    arr.push(book);
    return book;
}
function addElementToPage (obj){

        let name = document.createElement('div');
        name.classList.add('name')
    name.innerText=obj.bName;
    let author = document.createElement('div');
    author.classList.add('author')
    author.innerText=obj.AuthName;
    let publDate = document .createElement('div');
    publDate.classList.add('publDate')
    publDate.innerText=obj.publDate;
    let bookDesc= document.createElement('div');
    bookDesc.classList.add('bookDesc')
    bookDesc.innerText=obj.bookDesc;
    let book = document.createElement('div')
    let del = document.createElement('span')
    let icon = document.createElement('i')
    icon.className='fas fas fa-trash'
    del.appendChild(icon);
    del.classList.add('delete')
    del.setAttribute('id',`${obj.id}`);
    book.classList.add('book')
    book.setAttribute('book-id',`${obj.id}`)
    book.appendChild(name);
    book.appendChild(author);
    book.appendChild(publDate);
    book.appendChild(bookDesc);
    book.appendChild(del);
    books.appendChild(book);

}


let add = document.querySelector('input[type="submit"]');
add.onclick =(function (){
    if(nameInput.value=='' || authInput==''|| publDateInput.value==''||bookDescInput.value==''){
        throw new Error ('sorry can\'t add this empty book meta data');
    }else{
        let book = createBook();
        window.localStorage.setItem('books',JSON.stringify(arr));
        addElementToPage(book);
        console.log(`done for the book ${book.bName}`)
        nameInput.value='';
        authInput.value = '';
        publDateInput.value= '';
        bookDescInput.value='';   
    }
})
function deleteElement (e){
    if(JSON.parse(localStorage.getItem('books')).length === 0 ){
        throw new Error ('sorry the loacl storage and your book list is empty');
    }else {
        let arr = JSON.parse(localStorage.getItem('books'));
        let targetId = e.id;
        arr = arr.filter(e=> e.id == targetId ? false:true);
        localStorage.setItem('books',JSON.stringify(arr));
        let elements = document.querySelectorAll('.book');
        let targetElement ; 
        for(let i = 0 ; i < elements.length;i++ ){
            if(elements[i].getAttribute('book-id')==targetId){
                targetElement=elements[i];
            }
        }
        targetElement.remove();
    }

    }




document.addEventListener('click',e=>{
    if(e.target.classList.contains('delete')){
        deleteElement(e.target)
    }



});


let clearAll  = document.querySelector('.clearAll');
clearAll.onclick=(e=> {
    if(JSON.parse(localStorage.getItem('books')).length==0){
        throw new Error ('sorry the storage is already empty')
    }else if(confirm('do you want to clear the book notes?')){
        localStorage.clear();
        document.querySelector('.books').innerHTML = '';
        arr = [];
    }
})