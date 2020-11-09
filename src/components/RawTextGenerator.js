import React from "react";
import styled from "styled-components";
//Copy to clipboard functionality
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const RawPre = styled.pre`
  background: #272822;
  color: #f8f8f2;
  white-space: pre;
  word-wrap: break-word;
  overflow: hidden;
  margin: 10px;
  padding: 15px;
`;
const RawCode = styled.code`
    margin: 25px 25px;
    padding: 20px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin: 10px 10px;
  font-size: 1.5rem;
  &:hover {
    font-size: 1.65rem;
    transition: all 200ms;
  }
`;

const RawLabel = styled.p`
  ${StyledFontAwesomeIcon}:hover & {
    background-color: red;
    color: green;
  }
`;

function RawTextGenerator({ code, copied, setCopied }) {
  const rawCode = `
  :root {
    --primary: #${code[0]};
    --secondary: #${code[1]};
    --tertiary: #${code[2]};
    --background: #${code[3]};
    --fontColor: #${code[4]};
  }`;
  return (
    <>
      <RawPre>
        {copied === rawCode && <RawLabel>Copied to clipboard</RawLabel>}

        <CopyToClipboard text={rawCode} onCopy={() => setCopied(rawCode)}>
          <StyledFontAwesomeIcon icon={faCopy} />
        </CopyToClipboard>

        <RawCode type="text" value={rawCode || ""}>
          {rawCode}
        </RawCode>
      </RawPre>
    </>
  );
}

export default RawTextGenerator;
