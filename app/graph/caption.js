import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { generate } from 'shortid'

const captionDefaults = {
  id: null,
  text: null,
  x: null,
  y: null,
  scale: 1
}

export const captionShape = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired
}

export function newCaption(attributes = {}) {
  let caption = merge({}, captionDefaults, attributes)

  if (!caption.id) {
    caption.id = generate()
  }

  return caption
}

export default {
  "new": newCaption
}