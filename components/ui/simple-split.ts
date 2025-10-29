// Lightweight SplitText-like utility (fallback for GSAP SplitText)
// Splits an element's text into word and/or char spans and exposes arrays: .words and .chars
// API: const s = new SimpleSplit(element, { type: 'words,chars' }); ... s.revert()
export default class SimpleSplit {
  el: HTMLElement
  type: string
  words: HTMLElement[] = []
  chars: HTMLElement[] = []
  originalHTML: string

  constructor(el: HTMLElement, opts: { type?: string } = {}) {
    this.el = el
    this.type = opts.type || "chars"
    this.originalHTML = el.innerHTML
    this.split()
  }

  split() {
    const raw = this.el.textContent ?? ""
    const wantWords = this.type.includes("words")
    const wantChars = this.type.includes("chars")

    if (wantWords) {
      const words = raw.trim().split(/\s+/)
      this.el.innerHTML = ""
      words.forEach((w, i) => {
        const wordSpan = document.createElement("span")
        wordSpan.className = "st-word"
        wordSpan.style.display = "inline-block"
        wordSpan.style.whiteSpace = "nowrap"
        if (wantChars) {
          // split into chars inside the word
          Array.from(w).forEach((c) => {
            const ch = document.createElement("span")
            ch.className = "st-char"
            ch.style.display = "inline-block"
            ch.textContent = c
            wordSpan.appendChild(ch)
            this.chars.push(ch)
          })
        } else {
          wordSpan.textContent = w
        }
        this.words.push(wordSpan)
        this.el.appendChild(wordSpan)
        if (i < words.length - 1) this.el.appendChild(document.createTextNode(" "))
      })
    } else if (wantChars) {
      this.el.innerHTML = ""
      Array.from(raw).forEach((c) => {
        const ch = document.createElement("span")
        ch.className = "st-char"
        ch.style.display = "inline-block"
        ch.textContent = c
        this.el.appendChild(ch)
        this.chars.push(ch)
      })
    }
  }

  revert() {
    try {
      this.el.innerHTML = this.originalHTML
    } catch (e) {
      // ignore
    }
  }
}
