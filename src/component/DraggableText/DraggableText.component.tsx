import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { TextField, Typography } from "@mui/material";
import { AbsoluteFill } from "remotion";
import { ITextElement } from "../../general/interface";

/**
 *   The Draggable component for text editing and changing position
 *   input elements in this component can be replaced with any other components
 *
 * @export
 * @param {ITextElement} {
 *   text,
 *   setText,
 *   position,
 * }
 * @return {*}
 */
const DraggableText = ({
  text,
  setText,
  position,
  saveInformation,
  pause,
  play,
}: ITextElement) => {
  const handleStop = (e: any, data: any) => {
    const position = {
      x: data.x,
      y: data.y,
    };
    setLocalPosition(position);
    saveInformation(position);
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      saveInformation();
    }
  };

  // Draggable component does not work directly with position props, so the localPosition defined here
  const [localPosition, setLocalPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (position) {
      setLocalPosition(position);
    }
  }, [position]);

  return (
    <AbsoluteFill style={AbsoluteStyle}>
      <Draggable
        onStop={handleStop}
        bounds="parent"
        position={localPosition}
        onStart={() => pause()}
      >
        <div>
          <Typography variant="h4">{text}</Typography>
          <TextField
            id="inputText"
            helperText="Press enter to save changes"
            className="inputStyle"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleEnter}
          />
        </div>
      </Draggable>
    </AbsoluteFill>
  );
};

export default DraggableText;

const AbsoluteStyle = {
  justifyContent: "center",
  alignItems: "center",
  fontSize: 30,
  backgroundColor: "#f1f1f1",
};
