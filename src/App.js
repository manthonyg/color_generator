import styled from "styled-components";
import Values from "values.js";
import React, { useState, useEffect } from "react";
import rgbHex from "rgb-hex";
//Copy to clipboard functionality
import { CopyToClipboard } from "react-copy-to-clipboard";
// Font awesome lib
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Tree shaking to just get the icon we want
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import RawTextGenerator from "./components/RawTextGenerator";

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const FlexItem = styled.div`
  min-width: 250px;
  flex-basis: 0s;
  flex: 1 1 0px;
  height: 200px;
  background-color: #${(props) => props.color};
  margin: 5px;
  width: 250px;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  &:after {
    content: "${(props) => (props.copied ? "copied" : "")}";
    position: absolute;
    background-color: #fff;
    opacity: 0.5;
    top: 10px;
    right: 20px;
    font-size: 0.7rem;
    color: #000;
  }
`;

const ColorInput = styled.input`
  width: 400px;
  height: 40px;
  margin: 10px;
`;

const Button = styled.button`
  background-color: #a9a9a7;
  color: whitesmoke;
  width: 100px;
  border: none;
  height: 47px;
  border-radius: 3px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin: 0px 10px;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  text-align: center;
`;
function App() {
  const [colorScheme, setColorScheme] = useState([]);
  const [input, setInput] = useState("ffffff");
  const [copied, setCopied] = useState("");
  const [brightnesses, setBrightnesses] = useState([]);

  const inputHex = (event) => {
    event.preventDefault();

    const allColorsObj = new Values(input).tints(20);

    setColorScheme(
      allColorsObj.map((colorObj) =>
        rgbHex(colorObj.rgb[0], colorObj.rgb[1], colorObj.rgb[2])
      )
    );

    setBrightnesses(
      colorScheme.map((color) => new Values("#" + color).getBrightness())
    );
  };
  console.log(brightnesses);

  const getHexInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <Heading>Input base color</Heading>
      <Form>
        <ColorInput
          onChange={getHexInput}
          name="colorInput"
          type="text"
        ></ColorInput>
        <Button type="submit" onClick={inputHex}>
          Submit Color
        </Button>
      </Form>

      <h3>Results</h3>
      <Flex>
        {colorScheme.map((color, i) => (
          <FlexItem copied={color === copied} key={color} color={color}>
            #{color.toUpperCase()} {brightnesses[i]}%
            <CopyToClipboard text={color} onCopy={() => setCopied(color)}>
              <StyledFontAwesomeIcon icon={faCopy} />
            </CopyToClipboard>
          </FlexItem>
        ))}
      </Flex>

      <RawTextGenerator
        code={colorScheme}
        copied={copied}
        setCopied={setCopied}
      />
    </>
  );
}

export default App;
