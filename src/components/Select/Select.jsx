import React, { Component } from "react";
import { v4 as uuid } from 'uuid';
import styles from './Select.module.scss';

class Select extends Component {
    state = {
        open: false,
        selected: null,
    }

    dropDwonToggle = () => {
        if (this.props.disabled) return;
        this.setState({
            open: !this.state.open,
        })
    }

    valueChange = (option) => {
        this.setState({
            selected: option,
        });
        this.props.onChange(option.college_id); //forwards outside the component
    }

    renderOptions = () => (
        <ul className={styles.options}>
            {this.props.options.map((option) => <li key={uuid()} onClick={() => this.valueChange(option)} >{option.name}</li>)}
        </ul>
    )

    renderLabel = () => {
        return <label className={styles.selectLabel}>{this.props.label}</label>
    }

    renderPlaceholder = () => {
        return <span className={styles.selectPlaceholder}>{this.props.value ? this.props.value : this.props.placeholder}</span>
    }

    render() {
        return (
            <section className={styles.select}>
                {this.props.label && this.renderLabel()}
                <section className={`${styles.selectField} ${this.props.customClass} ${this.props.disabled ? styles.disabled : ''}`} onClick={this.dropDwonToggle}>
                    {this.state?.selected?.name}
                    {!this.state?.selected && this.renderPlaceholder()}
                    {this.state.open && this.renderOptions()}
                </section>
            </section>
        )
    }
}

export { Select };