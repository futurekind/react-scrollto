import React, { Component } from 'react'

import ScrollToWrapper, { Anchor } from './ScrollTo';

class App extends Component {
    constructor() {
        super();

        this.state = {
            scrollToEl: null
        }
    }
    
    render () {
        return (
            <ScrollToWrapper to={ this.state.scrollToEl } onScrollFinished={ this.handleScrollFinished }>
                <button onClick={ () => this.handleScrollTo('foo') }>Foo</button>
                <button onClick={ () => this.handleScrollTo('bar') }>Bar</button>
                <button onClick={ () => this.handleScrollTo('baz') }>Baz</button>
                
                <Anchor anchorId="foo">
                    <div style={{height: 500}}>
                        <h2>Foo</h2>
                    </div>
                </Anchor> 

                <Anchor anchorId="bar" block="end">
                    <div style={{height: 500}}>
                        <h2>Bar</h2>
                    </div>
                </Anchor> 

                <div style={{height: 500}}>
                    <Anchor anchorId="baz" behavior="instant">
                        <h2>Baz</h2>
                    </Anchor>
                </div>


            </ScrollToWrapper>
        )
    }

    handleScrollTo = (id) => {
        this.setState({
            scrollToEl: id
        })
    }

    handleScrollFinished = (id, el) => {
        this.setState({
            scrollToEl: null
        })
    }
}

export default App