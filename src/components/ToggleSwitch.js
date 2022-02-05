import React, { useState } from "react";
import styled from "./ToggleSwitch.module.css";

function ToggleSwitch(props) {
    const [isToggled, setIsToggled] = useState(false);
    const onToggle = () => { setIsToggled(!isToggled); props.TimerStatus(isToggled); }
    return (
        <label className={styled['toggle-switch']}>
            <input type="checkbox" checked={isToggled} onChange={onToggle} />
            <span className={styled.switch} />
        </label>
    );
}
export default ToggleSwitch;