import React, { Component } from "react";
import styles from './Input.module.scss';


class Input extends Component {

    state = {
        value: '',
    }

    onInputChange = (e) => {
        const value = e.target.value;

        if (this.props.type === 'tel') {
            if (value.length < 9) {
                e.target.setCustomValidity('Please enter a valid phone number');
            } else {
                e.target.setCustomValidity('');
            }
        }

        if (this.props.type === 'date') {
            let date = new Date(Date.parse(value));
            let selectedYear = date.getFullYear(0);

            if (selectedYear > 2012) {
                e.target.setCustomValidity('You are not of age!');
            }{
                e.target.setCustomValidity('');
            }
        }

        this.setState({
            value: value,
        });
        this.props.onChange(value);
    }


    renderLabel = () => {
        return <label>{this.props.label}</label>
    }

    render() {
        return (
            <section className={`${styles.input} ${this.props.small ? styles.small : ''}`}>
                {this.props.label && this.renderLabel()}
                < input placeholder={this.props.placeholder} className={`${styles.inputField} ${this.props.customClass}`} defaultValue={this.props.value? this.props.value : this.state.value} onChange={this.onInputChange} type={this.props.type} required />
            </section>
        )
    }
}

export { Input };