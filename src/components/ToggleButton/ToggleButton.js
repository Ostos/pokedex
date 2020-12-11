import clsx from "clsx";
import { useState } from "react";
import "./ToggleButton.scss";

const ToggleButton = (props) => {
    const { label1, label2, handler1, handler2 } = props;
    const [button1Selected, setButton1Selected] = useState(true);
    const [button2Selected, setButton2Selected] = useState(false);

    function toggleButtons() {
        setButton1Selected(!button1Selected);
        setButton2Selected(!button2Selected);
    };

    function onToggleButton1(e) {
        if(button1Selected)
            return;
        toggleButtons();
        handler1();
    }

    function onToggleButton2(e) {
        if(button2Selected)
            return;
        toggleButtons();
        handler2();
    }

    return(
        <div className="ToggleButton">
            <button
                onClick={onToggleButton1}
                className={clsx("ToggleButton__button", {
                    "ToggleButton__button--selected": button1Selected
                })}
            >
                {label1}
            </button>
            <button
                onClick={onToggleButton2}
                className={clsx("ToggleButton__button", {
                    "ToggleButton__button--selected": button2Selected
                })}
            >
                {label2}
            </button>
        </div>
    );
};

export default ToggleButton;