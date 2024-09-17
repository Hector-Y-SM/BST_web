import { BST, Student } from "./helper/BST.js";

const add_btn = document.getElementById('add_btn');
const save_btn = document.getElementById('save_btn');
const search_btn = document.getElementById('btn_search')
const edit_id_input = document.getElementById('edit_id'); 
const preOrder = document.getElementById('btn_preorder');
const postOrder = document.getElementById('btn_postorder');
const inOrder = document.getElementById('btn_inorder');
const name_inp = document.getElementById('name_inp');
const email_inp = document.getElementById('email_inp');
const rating_inp = document.getElementById('rating_inp');
const id_inp = document.getElementById('id_inp');
const studentContainer = document.getElementById('tree_container');

const usedIds = new Set();
const bst = new BST();

function generateUniqueId() {
    let id;
    do {
        id = Math.floor(Math.random() * 101);
    } while (usedIds.has(id));
    
    usedIds.add(id);     
    return id;
}

add_btn.addEventListener('click', () => {
    if(name_inp.value == '' || email_inp.value == '' || rating_inp.value == '' || rating_inp.value > 100 || rating_inp.value < 0){
        alert('campos invalidos');
        return;
    }

    const id = generateUniqueId();
    const rating = parseFloat(rating_inp.value);
    const student = new Student(id, name_inp.value, email_inp.value, rating);
    
    bst.insert(student);
    print(id, student);
    clearInputs(); 
});

search_btn.addEventListener('click', () =>{
    studentContainer.innerHTML = ''; 
    const res = bst.search(id_inp.value);
    if(res != null){
        print(id_inp.value, res.value)
    }
})

function edit(id) {
    const student = bst.search(id);
    if(student != null) {
        name_inp.value = student.value.name;
        email_inp.value = student.value.email;
        rating_inp.value = student.value.rating;

        save_btn.style.display = 'block';
        add_btn.style.display = 'none';
        edit_id_input.value = id; 
    }
}

function deleteStudent(id) {
    if (bst.search(id) != null) {
        bst.delete(id);

        const studentDiv = document.getElementById(`student-${id}`);
        if (studentDiv) {
            studentDiv.remove();
        }
    }
}

save_btn.addEventListener('click', () => {
    const id = parseInt(edit_id_input.value); 
    const newName = name_inp.value;
    const newEmail = email_inp.value;
    const newRating = parseFloat(rating_inp.value);

    bst.edit(id, newName, newEmail, newRating);
    clearInputs(); 

    save_btn.style.display = 'none';
    add_btn.style.display = 'block';

    updateStudentList(); 
});

const print = (id, student) => {
    const studentDiv = document.createElement('div');
    studentDiv.id = `student-${id}`;  
    studentDiv.textContent = `ID: ${student.id}, Name: ${student.name}, Email: ${student.email}, Rating: ${student.rating}`;

    const btn_edit = document.createElement('button');
    btn_edit.textContent = 'Edit';
    btn_edit.addEventListener('click', () => edit(id));

    const btn_delete = document.createElement('button');
    btn_delete.textContent = 'Delete';
    btn_delete.addEventListener('click', () => deleteStudent(id));

    studentDiv.appendChild(btn_edit); 
    studentDiv.appendChild(btn_delete);
    studentContainer.appendChild(studentDiv);
};


function clearInputs() {
    name_inp.value = '';
    email_inp.value = '';
    rating_inp.value = '';
    edit_id_input.value = '';
}

function updateStudentList(type) {
    studentContainer.innerHTML = ''; 

    function preOrder(node) {
        if (node === null) return;
        print(node.value.id, node.value); 
        preOrder(node.left);  
        preOrder(node.right); 
    }

    function postOrden(node) {
        if (node === null) return;
        postOrden(node.left);  
        postOrden(node.right); 
        print(node.value.id, node.value); 
    }

    function inOrder(node){
        if (node === null) return;
        inOrder(node.left);  
        print(node.value.id, node.value); 
        inOrder(node.right);  
    }

    if(type == 0){
        preOrder(bst.root);
    } else if(type == 1){
        postOrden(bst.root)
    } else if (type == 2){
        inOrder(bst.root)
    }
}

preOrder.addEventListener('click', () => { updateStudentList(0) })
postOrder.addEventListener('click', () => { updateStudentList(1) })
inOrder.addEventListener('click', () => { updateStudentList(2) })