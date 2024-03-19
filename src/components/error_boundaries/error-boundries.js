import React, { Component } from 'react'
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }
    render() {
        if (this.state.hasError) {
            return <div style={{ textAlign: 'center', color: 'red' }}>
                <h2 style={{ textAlign: 'center', color: 'red' }}>Some Error Spotted here! Please contact support</h2></div>
        }
        return this.props.children
    }
}