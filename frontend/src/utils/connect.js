import { connect } from 'react-redux'

export const connectRedux = (component, selector, actions) =>
    connect(
      selector,
      actions,
      (stateProps, dispatchProps, ownProps) => {
        const { children, ...otherOwnProps } = ownProps
        return {
          children,
          props: otherOwnProps,
          actions: dispatchProps,
          state: stateProps
        }
      }
    )(component)