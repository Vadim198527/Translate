let isFull = false;
let restElem = null;
let indexParent = 0;
let indexChild = 0;


export const fromXmlToHtml = (xml, pages, {styleOfWindow, clientWidth, clientHeight}) => {

  const insertPlace = document.createElement('div')
  insertPlace.style.cssText = styleOfWindow
  insertPlace.style.position = 'absolute'
  insertPlace.style.width = clientWidth + 'px'
  insertPlace.style.height = clientHeight + 'px'
  insertPlace.style.overflox = 'hidden'
  insertPlace.style.left = '10000px'

  document.querySelector('body').appendChild(insertPlace);

  paginate(xml, insertPlace, pages)
  insertPlace.parentElement.removeChild(insertPlace)
}

const paginate = (
  xml,
  insertPlace,
  pages
) => {

  restElem = null;
  let body = xml.querySelector('body')

  for (let i = 0; i < body.children.length; i++) {
    indexParent = 0
    indexChild = 0
    if (body.children[i].tagName.toLowerCase() === 'section') {
      const secRoot = body.children[i]

      const maxIndexParent = secRoot.children.length - 1;

      const maxIndexLastChild = secRoot.children[maxIndexParent].children.length - 1;

      let j = 0
      while ((!((indexParent > maxIndexParent || (indexParent === maxIndexParent && indexChild > maxIndexLastChild))) || restElem) && j++ < 10) {
        insertPlace.innerHTML = '';
        isFull = false;
        const page = fill(insertPlace, secRoot);
        page.id = 'page' + pages.length
        pages.push(page)
      }
    }
  }
}


const fill = (
  insertPlace,
  secRoot,
) => {
  fillRest(insertPlace);
  for (let i = indexParent; i < secRoot.children.length && !restElem; i++) {
    let currentParent = secRoot.children[i];

    if (currentParent.tagName.toLowerCase() === 'title') {

      insertTitle(currentParent, insertPlace)
      indexParent = i + 1;
      indexChild = 0;
    } else if (currentParent.tagName.toLowerCase() === 'section') {
      indexParent = i;

      let j;
      for (j = indexChild; j < currentParent.children.length && !isFull; j++) {

        let currentChild = currentParent.children[j];
        if (currentChild.tagName.toLowerCase() === 'title') {

          insertTitle(currentChild, insertPlace);


        } else if (currentChild.tagName.toLowerCase() === 'p') {

          insertP(currentChild, insertPlace);

        }

        indexChild = j + 1;

      }

      if (j === currentParent.children.length) {
        indexParent = i + 1;
        indexChild = 0;
      }

    } else if (currentParent.tagName.toLowerCase() === 'p') {

      insertP(currentParent, insertPlace)
      indexParent = i + 1;
      indexChild = 0;

    } else {
      indexParent = i + 1;
      indexChild = 0;
    }

  }

  const div = document.createElement('div');
  div.innerHTML = insertPlace.innerHTML;

  return div
}


const fillRest = (insertPlace) => {
  if (restElem) {
    if (restElem.tagName.toLowerCase() === 'h3') {
      insertTitle(restElem, insertPlace);
    } else if (restElem.tagName.toLowerCase() === 'p') {
      insertP(restElem, insertPlace);
    }
  }

}


const insertTitle = (elem, div) => {
  const h3 = document.createElement('h3');
  h3.id = elem.id;
  if (elem.tagName.toLowerCase() === 'title') {
    h3.innerHTML = elem.firstElementChild.firstElementChild.innerHTML;
  } else {
    h3.innerHTML = elem.innerHTML;
  }
  div.appendChild(h3);

  if (!vlez(div)) {
    if (div.innerHTML !== '') {
      restElem = h3;
      div.removeChild(h3);
    }

    isFull = true;
  } else {
    restElem = null
  }

}


const insertP = (elem, div) => {

  const p = document.createElement('p');
  p.id = elem.id;
  p.innerHTML = elem.innerHTML;

  if (elem !== restElem) {
    p.classList.add('start')
  }

  div.appendChild(p);


  if (!vlez(div)) {

    isFull = true;
    let textRest = p.innerHTML.trim();
    p.innerHTML = '';

    if (!vlez(div)) {
      div.removeChild(p)
      p.innerHTML = textRest.trim()
      restElem = p
    } else {
      textRest += ' '
      let word
      while (vlez(div)) {
        word = textRest.slice(0, textRest.indexOf(' '))

        p.innerHTML = p.innerHTML + word + ' '
        textRest = textRest.slice(textRest.indexOf(' ')).trim() + ' '
      }

      p.innerHTML = p.innerHTML.trim()

      if (!vlez(div)) {
        if (p.innerHTML.indexOf(' ') === -1) {
          div.removeChild(p)
          p.innerHTML = p.innerHTML + ' ' + textRest.trim()
          restElem = p
        } else {
          textRest = p.innerHTML.slice(p.innerHTML.lastIndexOf(' ')) + ' ' + textRest
          textRest = textRest.trim()
          p.innerHTML = p.innerHTML.slice(0, p.innerHTML.lastIndexOf(' '))
          restElem = document.createElement('p')
          restElem.id = p.id
          restElem.innerHTML = textRest
        }
      }
    }
  } else {
    restElem = null
  }


}


const vlez = elem => {
  return elem.clientHeight >= elem.scrollHeight
}


































