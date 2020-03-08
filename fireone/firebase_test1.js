//change ONe

const post_list =  document.querySelector('#post-list');
const form = document.querySelector('#add-post-form');

function renderPost(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let post = document.createElement('span');
    let cross = document.createElement('div');



    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    post.textContent=doc.data().post;
    cross.textContent='X';

    li.appendChild(name);
    li.appendChild(post);
    li.appendChild(cross);


    post_list.appendChild(li);


    // deleting the data on clicking the cross button

    cross.addEventListener('click',(e)=>{

        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id)
         db.collection('storex').doc(id).delete();  
    })
}


//getting data

// db.collection('storex').get().then((snapshot)=>{
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach(element => {
//         renderPost(element)
//     });
// })

//adding data to firebase

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('storex').add({
        name : form.name.value,
        post : form.post.value
    })
    form.name.value="";
    form.post.value="";
})




function post_search(name){
        db.collection('storex').where('name','==',name).get().then((snapshot)=>{
            snapshot.docs.forEach(element => {
                renderPost(element)
        });
    })
}


function show_all(){
    db.collection('storex').get().then((snapshot)=>{
        snapshot.docs.forEach(element => {
            renderPost(element)
    });
})
}







// search the post through post name
var search=document.querySelector(".search");

search.addEventListener('click',(e)=>{
    e.preventDefault();
    let name = form.name.value;
    post_list.innerHTML="";
    post_search(name)

})


// show all post
var show=document.querySelector(".show-all");

show.addEventListener('click',(e)=>{
    e.preventDefault();
    post_list.innerHTML="";
    show_all();

})