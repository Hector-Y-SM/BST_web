export class Student{
    constructor(id, name, email, rating){
        this.id = id;
        this.name = name;
        this.email = email;
        this.rating = rating;
    }
}

class NodeChild{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BST {
    constructor() {
        this.root = null; 
    }

    insert(student){
        this.root = this.insertAux(this.root, student)
    }

    insertAux(current, student){
        if(current == null){
            return new NodeChild(student);
        }

        if(student.rating < current.value.rating){
            current.left = this.insertAux(current.left, student);
        } else if (student.rating > current.value.rating) {
            current.right = this.insertAux(current.right, student);
        } else {
            if(student. id < current.value.id){
                current.left = this.insertAux(current.left, student);
            } else {
                current.right = this.insertAux(current.right, student);            
            }
        }

        return current;
    }

    search(id){
        return this.searchAux(this.root, id);
    }

    searchAux(current, id){
        if(current == null){ return null; }
        if(id == current.value.id){ return current}
    
        return id < current.value.id ?
                    this.searchAux(current.left, id)
                    : this.searchAux(current.right, id);
    }

    delete(id){
        this.root = this.deleteAux(this.root, id);
    }

    deleteAux(current, id){
        if(current == null){ return null; }

        if(id < current.value.id){
            current.left = this.deleteAux(current.left, id);
        } else if(id > current.value.id){
            current.right = this.deleteAux(current.right, id);
        } else {
            // No children
            if(current.left == null && current.right == null){
                return null;
            } else if(current.left == null || current.right == null) { // one Children
                  return current.left !== null? current.left : current.right;  
            } else { // two Children (min right)
                let successor = this.findMin(current.right);
                current.value = successor.value;
                current.right = this.deleteAux(current.right, successor.value.id)
            }
        }

        return current;
    }

    findMin(current){
        while(current.left != null){
            current = current.left;
        }
        return current;
    }

    edit(id, newName, newEmail, newRating){
        const student = this.search(id);

        if(student !== null){
            this.delete(id);
            const updateStudent = new Student(id, newName, newEmail, newRating);
            this.insert(updateStudent);
            return;
        }

        return `Student with id ${id} does not exist.`
    }
}