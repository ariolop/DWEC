"use strict";

const lis = document.querySelectorAll('li');

for (const li of lis) {
    li.chi
    const hijos = li.querySelectorAll('li');

    if(li.children.length > 0)
    {
        li.firstChild.data += '[' + hijos.length + ']';
    }
}