import cx from 'classnames'
import React, { Component, PropTypes } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  SUI,
  useKeyOnly,
} from '../../lib'
import Icon from '../../elements/Icon'

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
export default class Embed extends Component {
  static autoControlledProps = [
    'active',
  ]

  static defaultProps = {
    icon: 'video play',
  }

  handleClick = () => this.trySetState({ active: true })

  renderEmbed() {
    const { children, source, sourceId } = this.props

    if (children) return <div>{children}</div>

    if (source === 'youtube') {
      const src = [
        `//www.youtube.com/embed/${sourceId}?autohide=true&amp;autoplay=true&amp;color=%23444444&amp;hq=true&amp;`,
        'jsapi=false&amp;modestbranding=true',
      ].join('')

      return (
        <div className='embed'>
          <iframe
            allowFullScreen=''
            frameBorder='0'
            height='100%'
            scrolling='no'
            src={src}
            width='100%'
          />
        </div>
      )
    }
  }

  render() {
    const { className, icon, placeholder } = this.props
    const { active } = this.state

    const classes = cx(
      'ui',
      useKeyOnly(active, 'active'),
      'embed',
      className,
    )
    const rest = getUnhandledProps(Embed, this.props)
    const ElementType = getElementType(Embed, this.props)

    return (
      <ElementType {...rest} className={classes} onClick={this.handleClick}>
        {Icon.create(icon)}
        <img className='placeholder' src={placeholder} />
        {active && this.renderEmbed()}
      </ElementType>
    )
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

  icon: PropTypes.string,

  placeholder: PropTypes.string,

  source: PropTypes.oneOf(['youtube', 'vimeo']),

  sourceId: PropTypes.string,
}
