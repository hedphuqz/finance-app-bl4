import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.boundary} role="alert">
          <p className={styles.message}>
            Something went wrong rendering this chart.
          </p>
          <p className={styles.detail}>{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}
