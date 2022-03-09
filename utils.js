export function getProperty(element, property) {
  return element.style.getPropertyValue(property);
}

export function setProperty(element, property, value) {
  element.style.setProperty(property, value);
}
