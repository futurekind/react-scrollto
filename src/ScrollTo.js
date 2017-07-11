import React, { Component } from 'react'
import { polyfill } from 'smoothscroll-polyfill'

export const ScrollToAnchor = props => {
    return <div ref={ el => props.onRef(props.scrollToId, el) }>{ props.children }</div>
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
                    if(child.props.scrollToId)
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

    scrollToElement(el) {
        this.scrollToRefs[el].scrollIntoView({ behavior: 'smooth' })
    }
}

export default ScrollToWrapper