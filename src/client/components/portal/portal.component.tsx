import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class Portal extends React.PureComponent {
  domNode?: HTMLDivElement;

  componentDidMount() {
    const node = (this.domNode = document.createElement('div'));
    document.body.appendChild(node);
    this.forceUpdate();
  }

  componentWillUnmount() {
    const node = this.domNode;
    if (node) {
      document.body.removeChild(node);
    }
  }

  render() {
    const node = this.domNode;
    const { children } = this.props;

    if (!node) {
      return null;
    }

    return ReactDOM.createPortal(children, node);
  }
}
