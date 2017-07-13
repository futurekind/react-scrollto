import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { polyfill } from 'smoothscroll-polyfill'

const _Anchor = (props, context) => {
    return <div 
                ref={ el => context.onRef({
                    id: props.anchorId,
                    behavior: props.behavior,
                    block: props.block
                }, el) }
            >{ props.children }</div>
}

class ScrollToWrapper extends Component {
    constructor() {
        super()

        this.scrollToRefs = {}
    }

    componentDidMount () {
        polyfill()    
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps.to !== this.props.to) {
            if(this.props.to)
                this.scrollToElement(this.props.to)
        }
    }

    getChildContext() {
        return {
            onRef: this.handleAddRef
        }
    }
    
    render () {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }

    handleAddRef = (props, el) => {
        this.scrollToRefs = {
            ...this.scrollToRefs,
            [props.id]: {
                props,
                el,
            }
        }
    }

    scrollToElement(id) {
        const { el, props } = this.scrollToRefs[id]

        if(!el) return;
        
        el.scrollIntoView(props)
        this.props.onScrollFinished()
    }
}

_Anchor.contextTypes = {
    onRef: PropTypes.func
};

_Anchor.defaultProps = {
    behavior: 'smooth',
    block: 'start'
}

_Anchor.propTypes = {
    anchorId: PropTypes.string.isRequired,
    behavior: PropTypes.oneOf(['auto', 'instant', 'smooth']),
    block: PropTypes.oneOf(['start', 'end']),
}

ScrollToWrapper.defaultProps = {
    onScrollFinished: () => {}
}

ScrollToWrapper.propTypes = {
    to: PropTypes.string,
    onScrollFinished: PropTypes.func,
}

ScrollToWrapper.childContextTypes = {
    onRef: PropTypes.func
};

export const Anchor = _Anchor
export default ScrollToWrapper