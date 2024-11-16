import { EditorElement } from "@/providers/editor/editor-provider";
import React from "react";
import TextComponent from "./text"
import Container from "./container";


type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent elemnet={element} />;

    case "__body":
        return <Container element={element}/>
    default:
      break;
  }
};

export default Recursive;
