import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  SUI,
  useKeyOnly,
  useTextAlignProp,
  useVerticalAlignProp,
  useWidthProp,
} from '../../lib'
import Icon from '../../elements/Icon'

function TableCell(props) {
  const {
    active,
    children,
    className,
    collapsing,
    content,
    disabled,
    error,
    icon,
    negative,
    positive,
    singleLine,
    textAlign,
    verticalAlign,
    warning,
    width,
  } = props
  const classes = cx(
    useKeyOnly(active, 'active'),
    useKeyOnly(collapsing, 'collapsing'),
    useKeyOnly(disabled, 'disabled'),
    useKeyOnly(error, 'error'),
    useKeyOnly(negative, 'negative'),
    useKeyOnly(positive, 'positive'),
    useKeyOnly(singleLine, 'single line'),
    useKeyOnly(warning, 'warning'),
    useTextAlignProp(textAlign),
    useVerticalAlignProp(verticalAlign),
    useWidthProp(width, 'wide'),
    className,
  )

  const ElementType = getElementType(TableCell, props)
  const rest = getUnhandledProps(TableCell, props)

  if (children) {
    return <ElementType {...rest} className={classes}>{children}</ElementType>
  }

  return (
    <ElementType {...rest} className={classes}>
      {Icon.create(icon)}
      {content}
    </ElementType>
  )
}

TableCell._meta = {
  name: 'TableCell',
  type: META.TYPES.COLLECTION,
  parent: 'Table',
  props: {
    textAlign: SUI.TEXT_ALIGNMENTS,
    verticalAlign: SUI.VERTICAL_ALIGNMENTS,
    width: SUI.WIDTHS,
  },
}

TableCell.defaultProps = {
  as: 'td',
}

TableCell.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** A cell can be active or selected by a user. */
  active: PropTypes.bool,

  /** Primary content of the TableCell. */
  children: customPropTypes.every([
    customPropTypes.disallow(['content', 'icon']),
    PropTypes.node,
  ]),

  /** Classes that will be added to the TableCell className. */
  className: PropTypes.string,

  /** A cell can be collapsing so that it only uses as much space as required. */
  collapsing: PropTypes.bool,

  /** Shorthand for primary content of the TableCell. Mutually exclusive with the children. */
  content: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.string,
  ]),

  /** A cell can be disabled. */
  disabled: PropTypes.bool,

  /** A cell may call attention to an error or a negative value. */
  error: PropTypes.bool,

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.element,
    ]),
  ]),

  /** A cell may let a user know whether a value is bad. */
  negative: PropTypes.bool,

  /** A cell may let a user know whether a value is good. */
  positive: PropTypes.bool,

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine: PropTypes.bool,

  /** A table cell can adjust its text alignment. */
  textAlign: PropTypes.oneOf(TableCell._meta.props.textAlign),

  /** A table cell can adjust its text alignment. */
  verticalAlign: PropTypes.oneOf(TableCell._meta.props.verticalAlign),

  /** A cell may warn a user. */
  warning: PropTypes.bool,

  /** A table can specify the width of individual columns independently. */
  width: PropTypes.oneOf(TableCell._meta.props.width),
}

TableCell.create = createShorthandFactory(TableCell, content => ({ content }))

export default TableCell