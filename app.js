
//Book class
class Book{
    constructor(title,author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;      
    }
}

//UI class
class Ui{
   static displayBooks()
   {
 
    const books=Store.getBooks();
    
        books.forEach((book)=>Ui.addBookToList(book))
    }

    static addBookToList(book){
        const list=document.querySelector('tbody')
        var row=document.createElement('tr')
        row.innerHTML=`
        <td><button class='clsbtn'>X</button>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>`
        // console.log(row)
        list.appendChild(row)
       
    }

    static remBook(e){
        if(e.target.className==='clsbtn'){
        console.log(e.target.parentElement.parentElement)  
    tbody.removeChild(e.target.parentElement.parentElement)  
    // Store.removeBook();
    Ui.showAlert('Book deleted from the list','error');

    }

    
    }
    static showAlert(messagee,classs){
        var msg=document.createElement('div')
       var main=document.querySelector('.main')
       var table=document.querySelector('table')
        // if(e.target.className==='clsbtn'){
        //     // alert('Book deleted');
        //     msg.textContent='Book deleted from list'
        //     msg.className='error'
        // }
        // if(e.target.className==='form-control'){
        //     // alert('Book added');

        // if(author.value===''||title.value===''||isbn.value==='')
        // {
        //     msg.textContent='PLease fillin all fields'
        //     msg.className='info'
        // }else{
        //     msg.textContent='Book added to list'
        //     msg.className='success'
        // }
            
        // }
        msg.textContent=messagee;
            msg.className=classs;

        main.insertBefore(msg,table)
        setTimeout(()=>
            {
                // console.log('delete child')
                main.removeChild(msg)
                Ui.clearfield();
            },3000)
    }

    static clearfield(){
        title.value=''
        author.value=''
        isbn.value=''
    }
}
//storage class
class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

//Event: Display books
document.addEventListener('DOMContentLoaded',Ui.displayBooks())
// Ui.displayBooks();

//Event: Add a Book
var form=document.getElementById('form-control')
form.addEventListener('submit',addbook)
function addbook(e){
e.preventDefault();
var title=document.getElementById('title')
console.log(title.value)
var author=document.getElementById('author')
var isbn=document.getElementById('isbn')
var subbtn=document.getElementById('sub-btn')

if(author.value===''||title.value===''||isbn.value==='')
{
    Ui.showAlert('PLease fill in all fields','info');
}else{
    const book =new Book(title.value,
        author.value,
        isbn.value)
    Ui.addBookToList(book)
    Store.addBook(book);
    
    Ui.showAlert('Book added to list','success');
}

}

//Event: REmove a Book
var tbody=document.querySelector('tbody')
tbody.addEventListener('click',(e)=>{
console.log(e.target.parentElement.parentElement.children[2].textContent)
    Ui.remBook(e);
var bookisbn=e.target.parentElement.parentElement.children[2].textContent
Store.removeBook(e.target.parentElement.parentElement.children[2].textContent);

})