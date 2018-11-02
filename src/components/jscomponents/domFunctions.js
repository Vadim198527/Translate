export const textFunctions = {
  vue: null,

  select(vue) {
    this.vue = vue
    const select = window.getSelection()
    let stanResult = null
    if (select.toString() !== '' && select.toString() !== ' ') {
      const rng = this.getRange(select)
      let rngData = rng.cloneContents()
      select.empty()

      rngData = this.clearSpan(rngData)
      const id = this.toSpan(rngData)


      stanResult = rngData.getElementById(id)

      rng.deleteContents()
      if (rngData.firstElementChild.tagName === 'P' || rngData.firstElementChild.tagName === 'H3') {
        const pesH = rngData.children
        const id1 = pesH[0].id
        const template = document.createElement('template')
        template.innerHTML = pesH[0].innerHTML
        document.getElementById(id1).appendChild(template.content)

        const id2 = pesH[pesH.length - 1].id
        template.innerHTML = pesH[pesH.length - 1].innerHTML
        document.getElementById(id2).insertBefore(template.content, document.getElementById(id2).firstChild)

        if (pesH.length > 2) {
          const fragment = document.createDocumentFragment()
          for (let i = 1; i < pesH.length - 1; i++) {

            const pClone = pesH[i].cloneNode(true)
            pClone.innerHTML = pesH[i].innerHTML
            fragment.appendChild(pClone)
          }

          document.getElementById(id2).parentElement.insertBefore(fragment, document.querySelector(`#${id2}`))

        }
      } else {
        rng.insertNode(rngData)
      }
      this.makeWord()
    } else {
      select.empty()
    }

    return stanResult
  },

  cancelSelect(span, vue) {
    this.vue = vue
    const spans = document.querySelectorAll(`#${span.id}`)
    spans.forEach(span => {
      const textNode = document.createTextNode(span.innerText)
      span.parentElement.replaceChild(textNode, span)
    })

    this.vue.$refs.textWindow.innerHTML = this.vue.$refs.textWindow.innerHTML
  },

  makeWord() {

  },

  clearSpan(rngData) {

    const spans = rngData.querySelectorAll('span')
    spans.forEach(elem => {
      const textNode = document.createTextNode(elem.innerText)
      const root = elem.parentElement ? elem.parentElement : rngData
      root.replaceChild(textNode, elem)
    })

    const div = document.createElement('div')
    div.appendChild(rngData)
    const template = document.createElement('template')
    template.innerHTML = div.innerHTML
    return template.content
  },

  toSpan(rngData) {
    const walker = document.createTreeWalker(rngData, NodeFilter.SHOW_TEXT)
    let elem
    const arr = []
    while (elem = walker.nextNode()) {
      arr.push(elem)
    }

    const id = 'span' + (+this.vue.$store.getters['book/currentVocabItemId'])
    this.vue.$store.dispatch('book/incCurrentVocabItemId')
    arr.forEach(elem => {
      const span = document.createElement('span')
      span.classList.add('selection')
      span.id = id
      span.innerText = elem.data
      const root = elem.parentElement ? elem.parentElement : rngData
      root.replaceChild(span, elem)
    })

    return id
  },

  getRange(select) {
    const rng = select.getRangeAt(0)
    const startNode = rng.startContainer
    const endNode = rng.endContainer

    if ((startNode.nodeType === 1 && startNode.classList.contains('selection')) ||
      startNode.parentElement.classList.contains('selection')) {
      const span = startNode.nodeType === 1 ? startNode.nodeType : startNode.parentElement
      const spans = document.querySelectorAll('#' + span.id)
      rng.setStartBefore(spans[0])
    }

    if ((endNode.nodeType === 1 && endode.classList.contains('selection')) ||
      endNode.parentElement.classList.contains('selection')) {
      const span = endNode.nodeType === 1 ? endNode.nodeType : endNode.parentElement
      const spans = document.querySelectorAll('#' + span.id)
      rng.setEndAfter(spans[spans.length - 1])
    }

    return rng
  }
}






















