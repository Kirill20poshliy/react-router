import { Component, ErrorInfo, ReactNode } from 'react'

export default class ErrorBoundary extends Component<{children: ReactNode},  {hasError: boolean}> {
    constructor(props: {children: ReactNode}) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error: Error)  {
        console.log('[ERROR]: ' + error.message)
        return {
            hasError: true
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log('[ERROR]: ' + error)
        console.log('[INFO]: ' + errorInfo)
    }

    render() {
        if(this.state.hasError) {
            return <p style={{color: "red"}}>Something went wrong!</p>
        }
        return this.props.children
    }
}
