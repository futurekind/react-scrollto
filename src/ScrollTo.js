import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { polyfill } from 'smoothscroll-polyfill'

const _Anchor = props => {
    return <div ref={ el => props.onRef(props.anchorId, el) }>{ props.children }</div>
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
            this.scrollToElement(this.props.to)
        }
    }
    
    render () {
        return (
            <div>
                { React.Children.map(this.props.children, child => {
                    if(child.props.anchorId)
                        return <child.type onRef={ this.handleAddRef } {...child.props}  />
                    return child
                }) }
            </div>
        )
    }

    handleAddRef = (id, el) => {
        this.scrollToRefs = {
            ...this.scrollToRefs,
            [id]: el
        }
    }

    scrollToElement(id) {
        const el = this.scrollToRefs[id]

        if(!el) return;
        
        el.scrollIntoView({ behavior: 'smooth' })
        this.props.onScrollFinished(id, el)
    }
}

_Anchor.propTypes = {
    anchorId: PropTypes.string.isRequired,
}

ScrollToWrapper.defaultProps = {
    onScrollFinished: () => {}
}

ScrollToWrapper.propTypes = {
    to: PropTypes.string,
    onScrollFinished: PropTypes.func,
}

export const Anchor = _Anchor
export default ScrollToWrapper