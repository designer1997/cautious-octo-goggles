import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AlertColor, Button, Paper, TextField } from "@mui/material";
import { PlayerRef, Player } from "@remotion/player";
import DraggableText from "../DraggableText/DraggableText.component";
import { IPosition, IVisulInfo } from "../../general/interface";
import { useMutation } from "@tanstack/react-query";
import {
  defaultHeader,
  SaveNewVisualInfoAddress,
} from "../../general/serviceAddress";
import UserAlert from "./UserAlert.component";


export const PlayerContent = ({ serviceResult }: IPlayerContent) => {
  const [open, setOpen] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  const [text, setText] = useState<string | undefined>(
    serviceResult.text || "new text"
  );
  const [position, setPosition] = useState<IPosition | undefined>(
    serviceResult.position || { x: 0, y: 0 }
  );

  useEffect(() => {
    setText(serviceResult.text);
  }, [serviceResult]);

  // manage player statuse when content is changing
  const playerRef = useRef<PlayerRef>(null);
  const pause = () => playerRef?.current?.pause();
  const play = () => playerRef?.current?.play();

  // pause the player for edditing the text
  const textChanged = (e: any) => {
    setText(e.target.value);
  };

  const handleClick = () => {
     saveInformation();
  };

  const saveInformation = (newPosition?: IPosition) => {
    const currentPostition = newPosition || position;
    console.log("New position: " + JSON.stringify(currentPostition));
    if (!text || text === "") {
      setOpen(true);
      setAlertText("Please enter the text. It can not be empty.");
      setAlertSeverity("error");
      return;
    }
    setAlertText("information saved successfully! ");
    setAlertSeverity("success");

    addVisualInfo.mutate(
      {
        text,
        position: currentPostition,
      },
      {
        onSuccess: () => {
          setOpen(true);
          setPosition(currentPostition);
        },
      }
    );
  };
  
  const addVisualInfo = useMutation({
    mutationFn: (info: any) =>
      fetch(SaveNewVisualInfoAddress, {
        method: "post",
        headers: defaultHeader,
        body: JSON.stringify(info),
      }),
  });

  return (
    <Body>
      <Paper
        sx={{
          p: 3,
        }}
      >
        <TextField
          value={text}
          fullWidth
          label="Title"
          id="fullWidth"
          placeholder="Please type your text in here"
          onChange={textChanged}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>Save</Button>
      </Paper>
      <Player
        ref={playerRef}
        inputProps={{
          pause,
          play,
          text,
          setText,
          position: serviceResult.position,
          setPosition,
          setOpen,
          saveInformation,
        }}
        className="player"
        component={DraggableText}
        compositionWidth={1000}
        compositionHeight={500}
        durationInFrames={1000}
        fps={60}
        controls
        loop
        clickToPlay={false}
      />
      <UserAlert
        open={open}
        setOpen={setOpen}
        text={alertText}
        severity={alertSeverity}
      />
    </Body>
  );
};

const Body = styled.div`
  padding-top: 30px;

  .MuiPaper-root {
    margin-bottom: 20px;    
    display: flex;
    gap: 15px;
    
    .MuiButton-root {
      min-width: 160px;
      cursor: pointer;
    }
  }

  .player {
    width: 100% !important;
  }
`;

interface IPlayerContent {
  serviceResult: IVisulInfo;
}
