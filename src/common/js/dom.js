import Vue from 'vue'
const isServer = Vue.prototype.$isServer

const isDOM = (typeof HTMLElement === 'object')
  ? obj => obj instanceof HTMLElement
  : obj => obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (!isDOM(el)) {
    console.error('请传入 Dom 对象')
    return
  }
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
  return el
}

export function removeClass(el, cls) {
  if (!isDOM(el)) {
    console.error('请传入 Dom 对象')
    return
  }
  if (hasClass(el, cls)) {
    let newClass = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    el.className = newClass.replace(/^\s+|\s+$/g, '')
  }
  return el
}

export function getData(el, name, val) {
  if (!isDOM(el)) {
    console.error('请传入 Dom 对象')
    return
  }
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

 // jquery offset原生实现
export function getOffset(el) {
  let docElem = document.documentElement
  let box = el.getBoundingClientRect()
  return {
    top: box.top + docElem.scrollTop,
    left: box.left + docElem.scrollLeft
  }
}

// https://github.com/iview/iview/blob/2.0/src/utils/dom.js
/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()
