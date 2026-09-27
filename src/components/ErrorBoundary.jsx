import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FIIK Application Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('fiik_role');
      localStorage.removeItem('fiik_auth');
    } catch (e) {
      // ignore
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-lg shadow-xl">
            <div className="h-14 w-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-red-200">
              ⚠️
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              FIIK Application Recovery
            </span>
            <h2 className="text-xl font-black text-navy-950 mt-3">
              Application Error Caught
            </h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              The application encountered an unexpected runtime state. A safe error boundary prevented a blank screen crash.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 bg-red-50/80 border border-red-200 rounded-lg text-left text-[11px] font-mono text-red-900 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="bg-navy-950 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-md shadow transition-colors"
              >
                Reset Session &amp; Return Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-fiik-orange hover:bg-fiik-orangeDark text-white text-xs font-bold px-5 py-2.5 rounded-md shadow transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
