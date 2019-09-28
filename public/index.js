window.onload = ()=>{
    let placeholder = document.querySelector('.noteplaceholder');
    fetch('http://localhost:3000/getnotes')
    .then(response=>response.json()).then(item=>{
        item.forEach(data=>{
        let newentry = document.createElement('div');
        let heading = document.createElement('h3');
        let note = document.createElement('p');
        heading.innerHTML = data.title;
        note.innerHTML = data.note;
        newentry.appendChild(heading);
        newentry.appendChild(note);
        placeholder.insertBefore(newentry, placeholder.childNodes[0]);
        });
    });
}

const logout = ()=>{
    console.log('loggin out');
    const data = {
        logout: true
    };
    fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(data =>{
        window.location.pathname = '/login';
    });
};

const addnote = ()=>{
    document.querySelector('.inputbar').style.display='none';
    let notetext = document.querySelector('.newnote').value;
    let title = document.querySelector('.title').value;
    const note = {
        title: title,
        text: notetext
    };
    fetch('http://localhost:3000/addnote', {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    })
    .then(response=>response.json())
    .then(data=>{
        let placeholder = document.querySelector('.noteplaceholder');
        let newentry = document.createElement('div');
        let heading = document.createElement('h3');
        let note = document.createElement('p');
        heading.innerHTML = data.title;
        note.innerHTML = data.note;
        newentry.appendChild(heading);
        newentry.appendChild(note);
        placeholder.insertBefore(newentry, placeholder.childNodes[0]);
    });
}

const showinputbar = ()=>{
    document.querySelector('.inputbar').style.display='block';
}