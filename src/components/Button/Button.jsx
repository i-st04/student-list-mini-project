import styles from './Button.module.scss';
import { Children, Component } from 'react';

class Button extends Component {

    classes = `${this.props.success ? styles.success : ''} ${this.props.warning ? styles.warning : ''} ${this.props.danger ? styles.warning : ''} ${this.props.small ? styles.small : ''}`;

    render(){
        return(
            <button className={`${styles.button} ${this.classes}`} disabled = {this.props.disabled} onClick={this.props.onClick} >{this.props.children}</button>
        )
    }
}


export { Button };