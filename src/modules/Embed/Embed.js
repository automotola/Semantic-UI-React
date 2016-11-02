import cx from 'classnames'
import React, { Component, PropTypes } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  SUI,
} from '../../lib'

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
export default class Embed extends Component {

  render() {
    const { className } = this.props

    const classes = cx(
      'ui',
      'ember',
      className,
    )
    const rest = getUnhandledProps(Embed, this.props)
    const ElementType = getElementType(Embed, this.props)

    return <ElementType {...rest} className={classes} />
  }
}

Embed._meta = {
  name: 'Embed',
  type: META.TYPES.MODULE,
}

Embed.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Additional classes. */
  className: PropTypes.string,
}
