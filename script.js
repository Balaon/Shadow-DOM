class MyTag extends HTMLElement {

    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'closed' });
        this.url = `https://jsonplaceholder.typicode.com/posts/${this.getAttribute('jsonId')}`;

        this.shadow.innerHTML = ` 
        <link rel="stylesheet" href="style.css"> 
        `;
        this.getData(this.render.bind(this));
    }

    getData(callback) {
        fetch(this.url)
            .then(response => response.json(), error => console.log(error))
            .then(json => callback(json), error => console.log(error));
    }
    render(json) {
        let elem = document.createElement('div');
        let title = document.createElement('h3');
        let body = document.createElement('p');

        title.innerText = json.title;
        body.innerText = json.body;
        elem.appendChild(title);
        elem.appendChild(body);
        this.shadow.appendChild(elem);

    }
}

customElements.define('my-tag', MyTag);