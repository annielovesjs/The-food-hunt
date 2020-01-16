import React from 'react';
import styles from './styles.module.css';
import classnames from 'classnames';

class IntroModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            introDisplay: false,
            firstVisit: true
        };
    }

    showPopup = () => {
        this.setState({firstVisit: false });
        if(this.state.introDisplay === false) {
            let i = 0;
            document.querySelector('#modal-container').removeAttribute("class");
            document.querySelector('#modal-container').classList.add('one');
        } 
    }

    closePopup = () => {
        document.querySelector('#modal-container').classList.add('out');
    }

    render() {
        return (
            <div>
                <div className={classnames(styles.introPrompt, this.state.firstVisit ? styles.firstIntroPrompt : '' )} onClick={this.showPopup}>
                    <img className={styles.dp} src={this.props.dp} onClick={this.showPopup}/>
    <p className={classnames(this.state.firstVisit ? styles.visible: styles.invisible)}>{this.props.helper}</p>
                </div>
                <div id="modal-container">
                    <div className="modal-background">
                        <div className="modal">
                            <span className="close" onClick={this.closePopup}>&times;</span>
                            <h2 id="intro">{this.props.firstVisitText}</h2>
                            <p>{this.props.description}</p>
                            <a className={styles.site} href="http://annieliang.io">Check out my other projects at annieliang.io</a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default IntroModal;