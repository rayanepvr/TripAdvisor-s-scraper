/**
 * Creating a page named _error.js lets you override HTTP error messages
 */
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import * as React from "react";

class ErrorPage extends React.Component {

    static propTypes() {
        return {
            errorCode: React.PropTypes.number.isRequired,
            url: React.PropTypes.string.isRequired
        }
    }

    static getInitialProps({res, xhr}) {
        const errorCode = res ? res.statusCode : (xhr ? xhr.status : null)
        return {errorCode}
    }

    render() {
        var response
        switch (this.props.errorCode) {
            case 200: // Also display a 404 if someone requests /_error explicitly
            case 404:
                response = (
                    <div>
                        <Head>
                        </Head>

                            <h1 className="display-4">Page Not Found</h1>
                            <p>This page does not exist.</p>
                    </div>
                )
                break
            case 500:
                response = (
                    <div>

                            <h1 className="display-4">Internal Server Error</h1>
                            <p>An internal server error occurred.</p>
                    </div>
                )
                break
            default:
                response = (
                    <div>
                            <style dangerouslySetInnerHTML={{__html: Styles}}/>
                            <h1 className="display-4">HTTP { this.props.errorCode } Error</h1>
                            <p>
                                An <strong>HTTP { this.props.errorCode }</strong> error occurred while
                                trying to access <strong>{ this.props.router.pathname }</strong>
                            </p>
                    </div>
                )
        }

        return response
    }

}

export default withRouter(ErrorPage)
